import { getPayload } from "payload";
import config from "@payload-config";
import { cache } from "react";
import { unstable_cache } from "next/cache";
import { AppHomepage, AppNavigation, AppFooter, Media } from "@/payload-types";

/**
 * ——————————————————————————————————————————————————————————————————————————————————————————————————
 **   PAYLOAD GLOBAL DATA FETCH
 * ——————————————————————————————————————————————————————————————————————————————————————————————————
 */

type GlobalMap = {
  app_homepage: AppHomepage;
  app_navigation: AppNavigation;
  app_footer: AppFooter;
};

/**
 * Low-level global configuration fetcher from Payload CMS with safe depth & error boundary.
 */
const fetchGlobalFromPayload = async <T extends keyof GlobalMap>(
  slug: T
): Promise<GlobalMap[T]> => {
  const payload = await getPayload({ config });

  const data = await payload.findGlobal({ slug, depth: 1, overrideAccess: true });

  if (!data) {
    throw new Error(`Global '${slug}' returned no data`);
  }

  return data as GlobalMap[T];
};

/**
 * Next.js Data Cache wrapper - caches database responses across server requests
 * with tag-based revalidation and 60-second background revalidation.
 */
const getCachedGlobalFetcher = <T extends keyof GlobalMap>(slug: T) => {
  return unstable_cache(async () => fetchGlobalFromPayload(slug), [`payload_global_${slug}`], {
    revalidate: 60,
    tags: [`payload_global_${slug}`, slug],
  });
};

/**
 * Loads the entire global configuration from Payload CMS.
 * Wrapped in Next.js `unstable_cache` (server-wide caching) and React's `cache`
 * (per-request deduplication) to eliminate redundant database queries and prevent timeouts.
 */
export const getGlobal = cache(
  async <T extends keyof GlobalMap>(slug: T): Promise<GlobalMap[T] | null> => {
    try {
      return await getCachedGlobalFetcher(slug)();
    } catch (error) {
      console.error(`[Payload] Cache retrieval failed for global '${slug}':`, error);
      return null;
    }
  }
);

/**
 * ——————————————————————————————————————————————————————————————————————————————————————————————————
 **   PAYLOAD IMAGE RESOLVE
 * ——————————————————————————————————————————————————————————————————————————————————————————————————
 */

export type PayloadImageField = {
  media?: string | Media | null;
  src?: string | null;
  alt?: string | null;
} | null;

/**
 * Resolves a Payload CMS image group to a clean, usable image URL and alt text.
 * Handles both populated Media objects, string IDs, external src links, and fallback values.
 * This guarantees a valid string URL is returned, preventing Next.js Image component from crashing on empty src.
 */
export const resolvePayloadImage = (
  imageField: PayloadImageField | undefined,
  fallbackUrl: string = "/placeholder.png"
): { url: string; alt: string } => {
  if (!imageField || typeof imageField !== "object") {
    return { url: fallbackUrl, alt: "" };
  }

  const media = typeof imageField.media === "object" ? imageField.media : undefined;

  return {
    url:
      media?.url ??
      (typeof imageField.media === "string" ? imageField.media : undefined) ??
      imageField.src ??
      fallbackUrl,
    alt: imageField.alt ?? media?.alt ?? "",
  };
};
