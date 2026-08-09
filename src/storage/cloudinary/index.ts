/**
 * !CUSTOM CLOUDINARY ADAPTER
 * - There is no official cloudinary support with Payload (As of 2.0.0-beta.57)
 * - This only handles basic upload, delete, and generate URL operations
 * - May be fragile
 */

import { v2 as cloudinary } from "cloudinary";
import type { Adapter } from "@payloadcms/plugin-cloud-storage/types";

import { getHandleUpload } from "./handleUpload";
import { getHandleDelete } from "./handleDelete";
import { getGenerateURL } from "./generateUrl";
import { getStaticHandler } from "./staticHandler";
import type { CloudinaryAdapterOptions } from "./types";

export const cloudinaryAdapter = (options: CloudinaryAdapterOptions = {}): Adapter => {
  if (
    !process.env.CLOUDINARY_CLOUD_NAME ||
    !process.env.CLOUDINARY_API_KEY ||
    !process.env.CLOUDINARY_API_SECRET ||
    !process.env.CLOUDINARY_FOLDER
  ) {
    throw new Error("Missing required ENV vars for Cloudinary Adapter");
  }

  const folder = options.folder || process.env.CLOUDINARY_FOLDER || "org-website";

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  return () => ({
    name: "cloudinary",
    handleUpload: getHandleUpload({ folder }),
    handleDelete: getHandleDelete({ folder }),
    generateURL: getGenerateURL({ folder }),
    staticHandler: getStaticHandler(),
  });
};
