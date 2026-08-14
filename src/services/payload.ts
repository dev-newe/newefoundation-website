import { getPayload } from "payload";
import config from "@payload-config";
import { cache } from "react";
import { AppHomepage } from "@/payload-types";

type GlobalMap = {
  app_homepage: AppHomepage;
  //TODO: Add other global types here
};

/**
 * Loads the entire global configuration from Payload CMS.
 * Wrapped in React's `cache` to deduplicate database queries if multiple components fetch data during a single request lifecycle.
 */
export const getGlobal = cache(
  async <T extends keyof GlobalMap>(slug: T): Promise<GlobalMap[T]> => {
    const payload = await getPayload({ config });
    const data = await payload.findGlobal({
      slug,
      depth: 1,
    });
    return data as GlobalMap[T];
  }
);
