import { v2 as cloudinary, type UploadApiErrorResponse, type UploadApiResponse } from "cloudinary";
import type { HandleUpload } from "@payloadcms/plugin-cloud-storage/types";
import path from "path";
import crypto from "crypto";
import type { CloudinaryAdapterOptions, CloudinaryData, CloudinaryResourceType } from "./types";

const VIDEO_CHUNK_SIZE = 6_000_000; // 6 MB

const getResourceType = (mimeType: string): CloudinaryResourceType => {
  if (mimeType.startsWith("image/")) {
    return "image";
  }
  if (mimeType.startsWith("video/") || mimeType.startsWith("audio/")) {
    return "video";
  }
  return "raw";
};

/**
 * Turns a user-supplied filename into something safe to use inside a public_id.
 * "/" would create folders, and characters like # ? % break delivery URLs.
 * Non-Latin characters are dropped; if nothing survives we fall back to "file"
 * (the UUID suffix keeps the public_id unique regardless).
 */
const sanitizeBaseName = (name: string): string => {
  const cleaned = name
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 100);
  return cleaned || "file";
};

const sanitizeExtension = (ext: string): string => ext.toLowerCase().replace(/[^.\w]/g, "");

export const getHandleUpload = ({ folder }: CloudinaryAdapterOptions = {}): HandleUpload => {
  return async ({ file, data }) => {
    if (!file.buffer || file.buffer.length === 0) {
      throw new Error(
        `Cloudinary upload failed for "${file.filename}": file buffer is missing or empty.`
      );
    }

    const parsed = path.parse(file.filename);
    const resourceType = getResourceType(file.mimeType);
    const baseName = `${sanitizeBaseName(parsed.name)}-${crypto.randomUUID()}`;

    // For "raw" assets Cloudinary does not track a separate format, so the
    // extension must stay inside the public_id or the delivery URL will be wrong.
    const publicId =
      resourceType === "raw" ? `${baseName}${sanitizeExtension(parsed.ext)}` : baseName;

    const uploadOptions = {
      folder,
      public_id: publicId,
      resource_type: resourceType,
    };

    const callbackResolver =
      (resolve: (r: UploadApiResponse) => void, reject: (e: unknown) => void) =>
      (error?: UploadApiErrorResponse, result?: UploadApiResponse) => {
        if (error || !result) {
          return reject(error || new Error("Cloudinary upload failed."));
        }
        resolve(result);
      };

    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      const callback = callbackResolver(resolve, reject);

      // upload_stream sends everything in one request; large videos need the chunked variant.
      const uploadStream =
        resourceType === "video"
          ? cloudinary.uploader.upload_chunked_stream(
              { ...uploadOptions, chunk_size: VIDEO_CHUNK_SIZE },
              callback
            )
          : cloudinary.uploader.upload_stream(uploadOptions, callback);

      uploadStream.end(file.buffer);
    });

    const cloudinaryFields: CloudinaryData = {
      url: result.secure_url,
      cloudinaryPublicId: result.public_id,
      cloudinaryResourceType: result.resource_type as CloudinaryResourceType,
      cloudinaryFormat: result.format,
    };

    return {
      ...data,
      filename: file.filename,
      mimeType: file.mimeType,
      filesize: result.bytes ?? file.filesize,
      width: result.width,
      height: result.height,
      ...cloudinaryFields,
    };
  };
};
