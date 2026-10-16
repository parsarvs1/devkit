/* DevKit Service Worker.
 *
 * Strategy:
 *  - Precache: offline fallback, manifest, icons (small, essential).
 *  - Cache-first: same-origin static assets (_next/static, images) with
 *    versioned cache cleanup.
 *  - Network-first: navigations, falling back to the offline page when the
 *    network is unavailable.
 *  - Never cached: authentication, session, API, dashboard, account, settings,
 *    login, signup, or any non-successful responses.
 */

const VERSION = "devkit-v2";
const STATIC_CACHE = `${VERSION}-static`;
const NAV_CACHE = `${VERSION}-nav`;
const NAV_MAX_ENTRIES = 40;

const PRECACHE = [
  "/offline",
  "/manifest.json",
  "/pwa-192x192.png",
  "/pwa-512x512.png",
];

const SENSITIVE_PATTERNS = [
  /^\/api\//,
  /^\/dashboard/,
  /^\/account/,
  /^\/settings/,
  /^\/login/,
  /^\/signup/,
  /^\/workspace/,
];

function isSensitive(url) {
  return SENSITIVE_PATTERNS.some((p) => p.test(url.pathname));
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then(async (cache) => {
      for (const url of PRECACHE) {
        try {
          await cache.add(url);
        } catch (e) {
          console.warn("sw: precache failed for", url, e);
        }
      }
    }).then(() => self.skipWaiting())
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
                (key.endsWith("-static") || key.endsWith("-nav")) &&
                !key.startsWith(VERSION)
            )
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

async function trimCache(cacheName, maxEntries) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  if (keys.length > maxEntries) {
    await cache.delete(keys[0]);
    await trimCache(cacheName, maxEntries);
  }
}

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET") return;

  const url = new URL(request.url);

  // Only handle same-origin requests.
  if (url.origin !== self.location.origin) return;

  // Sensitive routes: never cached, network-only.
  if (isSensitive(url)) return;

  const isStaticAsset =
    url.pathname.startsWith("/_next/static/") ||
    url.pathname.startsWith("/pwa-") ||
    url.pathname.startsWith("/screenshots/") ||
    url.pathname.endsWith(".png") ||
    url.pathname.endsWith(".svg") ||
    url.pathname.endsWith(".ico");

  // Static assets: cache-first, refresh in background.
  if (isStaticAsset) {
    event.respondWith(
      caches.open(STATIC_CACHE).then(async (cache) => {
        const cached = await cache.match(request);
        fetch(request)
          .then((response) => {
            if (response.ok) {
              cache.put(request, response.clone());
            }
          })
          .catch(() => {});
        return (
          cached ||
          fetch(request).catch(() => caches.match("/offline"))
        );
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
            caches.open(NAV_CACHE).then(async (cache) => {
              await cache.put(request, clone);
              await trimCache(NAV_CACHE, NAV_MAX_ENTRIES);
            });
          }
          return response;
        })
        .catch(async () => {
          const navCache = await caches.open(NAV_CACHE);
          const cached = await navCache.match(request);
          if (cached) return cached;
          const staticCache = await caches.open(STATIC_CACHE);
          const offline = await staticCache.match("/offline");
          if (offline) return offline;
          return new Response(
            "Service unavailable",
            { status: 503, headers: { "Content-Type": "text/plain" } }
          );
        })
    );
    return;
  }

  // Default: network with static cache fallback.
  event.respondWith(
    fetch(request).catch(async () => {
      const cache = await caches.open(STATIC_CACHE);
      const cached = await cache.match(request);
      return (
        cached ||
        new Response("Network unavailable", {
          status: 503,
          headers: { "Content-Type": "text/plain" },
        })
      );
    })
  );
});
