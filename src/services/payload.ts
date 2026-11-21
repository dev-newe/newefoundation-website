import {
  getCloudinaryUrl,
  isCloudinaryUrl,
  parseCloudinaryUrl,
  type CloudinaryTransformOptions,
} from "@/lib/utils/cloudinary";
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
 *   PAYLOAD GLOBAL DATA FETCH  (unchanged)
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

const getCachedGlobalFetcher = <T extends keyof GlobalMap>(slug: T) => {
  return unstable_cache(async () => fetchGlobalFromPayload(slug), [`payload_global_${slug}`], {
    revalidate: 60,
    tags: [`payload_global_${slug}`, slug],
  });
};

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
 *   PAYLOAD IMAGE RESOLVE
 * ——————————————————————————————————————————————————————————————————————————————————————————————————
 */

export type PayloadImageField = {
  media?: string | Media | null;
  src?: string | null;
  alt?: string | null;
} | null;

const isValidUrlString = (val: unknown): val is string =>
  typeof val === "string" && /^(\/|https?:\/\/)/.test(val.trim());

export { getCloudinaryUrl, isCloudinaryUrl, type CloudinaryTransformOptions };

/**
 * These fields are written by the Cloudinary adapter's handleUpload. They only exist on
 * the Media doc if the Media collection declares them as fields (so Payload persists them).
 */
type StoredCloudinaryFields = {
  cloudinaryPublicId?: string | null;
  cloudinaryResourceType?: string | null;
};

/**
 * Returns the stored publicId for IMAGE assets, so we can build delivery URLs directly
 * from ground truth instead of re-parsing the saved URL.
 */
const getStoredImagePublicId = (media: Media | undefined): string | undefined => {
  if (!media) {
    return undefined;
  }
  const { cloudinaryPublicId, cloudinaryResourceType } = media as unknown as StoredCloudinaryFields;
  if (!cloudinaryPublicId) {
    return undefined;
  }
  if (cloudinaryResourceType && cloudinaryResourceType !== "image") {
    return undefined;
  }
  return cloudinaryPublicId;
};

/**
 * Resolves a Payload CMS image group to a usable image URL and alt text.
 *
 * Resolution order for Cloudinary images:
 *   1. Stored cloudinaryPublicId on a populated Media doc (no URL parsing involved)
 *   2. A Cloudinary URL string (best-effort parse via getCloudinaryUrl)
 *   3. Any other URL / the fallback, returned as-is
 */
export const resolvePayloadImage = (
  imageField: PayloadImageField | undefined,
  fallbackUrl: string = "/placeholder.png",
  transformOptions?: CloudinaryTransformOptions
): { url: string; alt: string } => {
  if (!imageField || typeof imageField !== "object") {
    const finalFallback = isCloudinaryUrl(fallbackUrl)
      ? getCloudinaryUrl(fallbackUrl, transformOptions) || fallbackUrl
      : fallbackUrl;
    return { url: finalFallback, alt: "" };
  }

  const mediaObj =
    typeof imageField.media === "object" && imageField.media !== null
      ? imageField.media
      : undefined;

  if (
    process.env.NODE_ENV !== "production" &&
    typeof imageField.media === "string" &&
    !isValidUrlString(imageField.media)
  ) {
    console.warn(
      "[resolvePayloadImage] media is an unpopulated ID string; increase query depth to resolve it."
    );
  }

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

  const storedPublicId = getStoredImagePublicId(mediaObj);
  const uploadAccountCloudName =
    mediaObj?.url && isCloudinaryUrl(mediaObj.url)
      ? parseCloudinaryUrl(mediaObj.url)?.cloudName
      : undefined;

  const effectiveOptions: CloudinaryTransformOptions = {
    ...transformOptions,
    ...(uploadAccountCloudName ? { cloudName: uploadAccountCloudName } : {}),
  };

  if (storedPublicId) {
    const built = getCloudinaryUrl(storedPublicId, effectiveOptions);
    if (built) {
      finalUrl = built;
    }
  } else if (isCloudinaryUrl(finalUrl)) {
    finalUrl = getCloudinaryUrl(finalUrl, effectiveOptions) || finalUrl;
  }

  return {
    url: finalUrl,
    alt: finalAlt,
  };
};
