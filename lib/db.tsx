import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function getDB() {
  const { env } = await getCloudflareContext();
  return env.DB;
}