import { getCloudinaryUrl, type CloudinaryTransformOptions } from "@/lib/utils/cloudinary";
import {
  AppContactpage,
  AppCta,
  AppFooter,
  AppHomepage,
  AppNavigation,
  AppPrivacy,
  AppTerm,
  Media,
} from "@/payload-types";
import config from "@payload-config";
import { unstable_cache } from "next/cache";
import { getPayload } from "payload";
import { cache } from "react";

/**
 * ——————————————————————————————————————————————————————————————————————————————————————————————————
 *   PAYLOAD GLOBAL DATA FETCH
 * ——————————————————————————————————————————————————————————————————————————————————————————————————
 */

type GlobalMap = {
  app_homepage: AppHomepage;
  app_contactpage: AppContactpage;
  app_navigation: AppNavigation;
  app_footer: AppFooter;
  app_cta: AppCta;
  app_privacy: AppPrivacy;
  app_terms: AppTerm;
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

const isValidUrlString = (val: unknown): val is string =>
  typeof val === "string" && /^(\/|https?:\/\/)/.test(val.trim());

export { getCloudinaryUrl, type CloudinaryTransformOptions };

/**
 * Resolves a Payload CMS image group to a clean, usable image URL and alt text.
 * Handles both populated Media objects, string IDs, external src links, and fallback values.
 * Applies automatic Cloudinary dynamic optimization flags when Cloudinary URLs are resolved.
 */
export const resolvePayloadImage = (
  imageField: PayloadImageField | undefined,
  fallbackUrl: string = "/placeholder.png",
  transformOptions?: CloudinaryTransformOptions
): { url: string; alt: string } => {
  if (!imageField || typeof imageField !== "object") {
    const finalFallback = fallbackUrl.includes("res.cloudinary.com")
      ? getCloudinaryUrl(fallbackUrl, transformOptions)
      : fallbackUrl;
    return { url: finalFallback, alt: "" };
  }

  const mediaObj =
    typeof imageField.media === "object" && imageField.media !== null
      ? imageField.media
      : undefined;

  const mediaUrl = isValidUrlString(mediaObj?.url) ? mediaObj!.url.trim() : undefined;

  const stringMedia = isValidUrlString(imageField.media)
    ? (imageField.media as string).trim()
    : undefined;

  const externalSrc = isValidUrlString(imageField.src)
    ? (imageField.src as string).trim()
    : undefined;

  let finalUrl = mediaUrl || stringMedia || externalSrc || fallbackUrl;
  const finalAlt =
    imageField.alt || (mediaObj && typeof mediaObj.alt === "string" ? mediaObj.alt : "") || "";

  if (finalUrl.includes("res.cloudinary.com")) {
    finalUrl = getCloudinaryUrl(finalUrl, transformOptions);
  }

  return {
    url: finalUrl,
    alt: finalAlt,
  };
};
