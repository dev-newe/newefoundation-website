import type { MetadataRoute } from "next";

// import config from "@/payload.config";
// import { getPayload } from "payload";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL!;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // TODO: Uncomment this when payload collections are setup

  /*const payload = await getPayload({
    config,
  });*/

  // TODO: Uncomment this when payload collections are setup
  /*const [media] = await Promise.all([
    payload.find({
      collection: "media",
      where: {
        _status: {
          equals: "published",
        },
      },
      limit: 1000,
      depth: 0,
    }),
  ]);*/

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/terms`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/privacy`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  // TODO: Uncomment this when payload collections are setup
  /*const mediaUrls: MetadataRoute.Sitemap = media.docs
    .filter((m) => m.slug)
    .map((m) => ({
      url:
        m.slug === "home"
          ? SITE_URL
          : `${SITE_URL}/${m.slug}`,
      lastModified: m.updatedAt
        ? new Date(m.updatedAt)
        : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));*/

  return [
    ...staticPages,

    // TODO: Uncomment this when payload collections are setup
    // ...mediaUrls,
  ];
}
