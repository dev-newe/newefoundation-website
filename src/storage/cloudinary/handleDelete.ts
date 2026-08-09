import { v2 as cloudinary } from "cloudinary";
import type { HandleDelete } from "@payloadcms/plugin-cloud-storage/types";
import path from "path";
import type { CloudinaryAdapterOptions, CloudinaryDocument } from "./types";

export const getHandleDelete = ({ folder }: CloudinaryAdapterOptions = {}): HandleDelete => {
  return async ({ filename, doc }) => {
    const mediaDoc = doc as unknown as CloudinaryDocument | undefined;
    const resourceType = mediaDoc?.cloudinaryResourceType || "image";

    const publicId =
      mediaDoc?.cloudinaryPublicId ||
      `${folder}/${resourceType === "raw" ? filename : path.parse(filename).name}`;

    try {
      await cloudinary.uploader.destroy(publicId, {
        resource_type: resourceType,
      });
    } catch (error) {
      console.error(`Cloudinary delete failed for ${filename}:`, error);
    }
  };
};
