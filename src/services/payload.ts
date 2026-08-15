import { getPayload } from "payload";
import config from "@payload-config";
import { cache } from "react";
import { unstable_cache } from "next/cache";
import { AppHomepage, AppNavigation, AppFooter } from "@/payload-types";

type GlobalMap = {
  app_homepage: AppHomepage;
  app_navigation: AppNavigation;
  app_footer: AppFooter;
};

/**
 * Low-level global configuration fetcher from Payload CMS with safe depth & error boundary.
 */
async function fetchGlobalFromPayload<T extends keyof GlobalMap>(
  slug: T
): Promise<GlobalMap[T] | null> {
  try {
    const payload = await getPayload({ config });
    const data = await payload.findGlobal({
      slug,
      depth: 1,
      overrideAccess: true,
    });
    return (data as GlobalMap[T]) ?? null;
  } catch (error) {
    console.error(`[Payload] Error fetching global '${slug}':`, error);
    return null;
  }
}

/**
 * Next.js Data Cache wrapper - caches database responses across server requests
 * with tag-based revalidation and 60-second background revalidation.
 */
function getCachedGlobalFetcher<T extends keyof GlobalMap>(slug: T) {
  return unstable_cache(async () => fetchGlobalFromPayload(slug), [`payload_global_${slug}`], {
    revalidate: 60,
    tags: [`payload_global_${slug}`, slug],
  });
}

/**
 * Loads the entire global configuration from Payload CMS.
 * Wrapped in Next.js `unstable_cache` (server-wide caching) and React's `cache`
 * (per-request deduplication) to eliminate redundant database queries and prevent timeouts.
 */
export const getGlobal = cache(
  async <T extends keyof GlobalMap>(slug: T): Promise<GlobalMap[T] | null> => {
    try {
      const cachedFetcher = getCachedGlobalFetcher(slug);
      const data = await cachedFetcher();
      return data;
    } catch (error) {
      console.error(`[Payload] Cache retrieval failed for global '${slug}':`, error);
      return null;
    }
  }
);
