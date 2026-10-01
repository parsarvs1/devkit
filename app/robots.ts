import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/dashboard/", "/settings/", "/account/"],
      },
    ],
    sitemap:
      "https://devkit.pars-paris1.workers.dev/sitemap.xml",
    host: "https://devkit.pars-paris1.workers.dev",
  };
}
