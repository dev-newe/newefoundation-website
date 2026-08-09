import type { GenerateURL } from "@payloadcms/plugin-cloud-storage/types";
import path from "path";
import type { CloudinaryAdapterOptions, CloudinaryData } from "./types";

const getResourceTypeFromExt = (filename: string): string => {
  const ext = path.extname(filename).toLowerCase();
  if ([".mp4", ".webm", ".mov", ".mp3", ".wav"].includes(ext)) {
    return "video";
  }
  if (![".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg", ".avif"].includes(ext)) {
    return "raw";
  }
  return "image";
};

export const getGenerateURL = ({ folder }: CloudinaryAdapterOptions = {}): GenerateURL => {
  return ({ filename, data }) => {
    const mediaData = data as CloudinaryData | undefined;

    // Return the saved URL directly if it is a valid Cloudinary URL
    if (mediaData?.url && mediaData.url.includes("res.cloudinary.com")) {
      return mediaData.url;
    }

    // Fallback: dynamically pick resource_type if data.url is missing
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME || "";
    const resourceType = mediaData?.cloudinaryResourceType || getResourceTypeFromExt(filename);

    const finalUrl = `https://res.cloudinary.com/${cloudName}/${resourceType}/upload/${folder}/${filename}`;

    return finalUrl;
  };
};
