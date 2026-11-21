import type { GenerateURL } from "@payloadcms/plugin-cloud-storage/types";
import path from "path";
import { getCloudinaryUrl, isCloudinaryUrl } from "@/lib/utils/cloudinary";
import type { CloudinaryAdapterOptions, CloudinaryData, CloudinaryResourceType } from "./types";

const getResourceTypeFromExt = (filename: string): CloudinaryResourceType => {
  const ext = path.extname(filename).toLowerCase();
  if ([".mp4", ".webm", ".mov", ".mp3", ".wav"].includes(ext)) {
    return "video";
  }
  if ([".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg", ".avif"].includes(ext)) {
    return "image";
  }
  return "raw";
};

const encodePath = (assetPath: string): string =>
  assetPath.split("/").map(encodeURIComponent).join("/");

export const getGenerateURL = ({ folder }: CloudinaryAdapterOptions = {}): GenerateURL => {
  return ({ filename, data }) => {
    const mediaData = data as Partial<CloudinaryData> | undefined;

    // 1. Normal case: the URL Cloudinary returned at upload time.
    if (isCloudinaryUrl(mediaData?.url)) {
      return mediaData.url;
    }

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const resourceType = mediaData?.cloudinaryResourceType || getResourceTypeFromExt(filename);
    const publicId = mediaData?.cloudinaryPublicId;

    // 2. Stored publicId, image: delegate to the shared SDK-based builder.
    if (publicId && resourceType === "image") {
      const built = getCloudinaryUrl(publicId);
      if (built) {
        return built;
      }
    }

    // 3. Stored publicId, video/raw (the shared builder is image-only): build manually, encoded.
    if (publicId && cloudName) {
      const format = mediaData?.cloudinaryFormat || path.extname(filename).replace(".", "");
      const needsExt = resourceType === "video" && format && !publicId.endsWith(`.${format}`);
      const assetPath = needsExt ? `${publicId}.${format}` : publicId;
      return `https://res.cloudinary.com/${cloudName}/${resourceType}/upload/${encodePath(assetPath)}`;
    }

    // 4. Last resort, only plausible for legacy docs uploaded before publicIds were stored.
    //    New uploads include a UUID in the public_id, so this guess will not resolve for them.
    console.warn(
      `[Cloudinary] generateURL: no stored url/publicId for "${filename}", guessing path.`
    );
    return `https://res.cloudinary.com/${cloudName}/${resourceType}/upload/${encodePath(
      `${folder}/${filename}`
    )}`;
  };
};
