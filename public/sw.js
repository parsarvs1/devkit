/* DevKit Service Worker
 *
 * Strategy:
 * - Precache: offline fallback, manifest, icons (small, essential).
 * - Cache-first: same-origin static assets (_next/static, images) with
 *   versioned cache cleanup.
 * - Network-first: navigations, falling back to the offline page when the
 *   network is unavailable.
 * - Never cached: authentication, session, API, dashboard, account,
 *   settings, or any non-successful responses.
 */

const VERSION = "devkit-v1";
const STATIC_CACHE = `${VERSION}-static`;
const NAV_CACHE = `${VERSION}-nav`;

const PRECACHE = [
  "/offline",
  "/manifest.json",
  "/pwa-192x192.png",
  "/pwa-512x512.png",
];

/* Routes that must never be served from cache — always network-only. */
const SENSITIVE_PATTERNS = [
  /^\/api\//,
  /^\/dashboard/,
  /^\/account/,
  /^\/settings/,
  /^\/login/,
  /^\/signup/,
  /auth/,
];

function isSensitive(url) {
  return SENSITIVE_PATTERNS.some((p) => p.test(url.pathname));
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter(
              (key) =>
                !key.startsWith(VERSION) &&
                (key.includes("-static") || key.includes("-nav"))
            )
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET") return;

  const url = new URL(request.url);

  // Only handle same-origin requests.
  if (url.origin !== self.location.origin) return;

  // Sensitive routes: network-only, never cached.
  if (isSensitive(url)) return;

  // Static assets: cache-first with background update.
  if (
    url.pathname.startsWith("/_next/static/") ||
    url.pathname.startsWith("/pwa-") ||
    url.pathname.startsWith("/screenshots/") ||
    url.pathname.endsWith(".png") ||
    url.pathname.endsWith(".svg") ||
    url.pathname.endsWith(".ico")
  ) {
    event.respondWith(
      caches.open(STATIC_CACHE).then(async (cache) => {
        const cached = await cache.match(request);
        const fetchPromise = fetch(request)
          .then((response) => {
            if (response.ok) {
              cache.put(request, response.clone());
            }
            return response;
          })
          .catch(() => cached);
        return cached || fetchPromise;
      })
    );
    return;
  }

  // Navigations: network-first with offline fallback.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(NAV_CACHE).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(async () => {
          const cache = await caches.open(NAV_CACHE);
          const cached = await cache.match(request);
          if (cached) return cached;
          const offline = await cache.match("/offline");
          if (offline) return offline;
          return Response.error();
        })
    );
    return;
  }

  // Default: network with cache fallback for same-origin GETs.
  event.respondWith(
    fetch(request).catch(async () => {
      const cache = await caches.open(STATIC_CACHE);
      const cached = await cache.match(request);
      return cached || Response.error();
    })
  );
});
