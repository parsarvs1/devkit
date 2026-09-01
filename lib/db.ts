import { getCloudflareContext } from "@opennextjs/cloudflare";

/**
 * Returns the D1 database binding.
 * process.env.DB does NOT work on Cloudflare Workers —
 * bindings are only available through the Cloudflare context.
 */
export async function getDB() {
  const { env } = await getCloudflareContext();
  return env.DB;
}