import { v2 as cloudinary, type UploadApiResponse } from "cloudinary";
import type { HandleUpload } from "@payloadcms/plugin-cloud-storage/types";
import path from "path";
import type { CloudinaryAdapterOptions, CloudinaryData } from "./types";

const getResourceType = (mimeType: string): "image" | "video" | "raw" => {
  if (mimeType.startsWith("image/")) {
    return "image";
  }
  if (mimeType.startsWith("video/") || mimeType.startsWith("audio/")) {
    return "video";
  }
  return "raw";
};

export const getHandleUpload = ({ folder }: CloudinaryAdapterOptions = {}): HandleUpload => {
  return async ({ file, data }) => {
    const parsed = path.parse(file.filename);
    const resourceType = getResourceType(file.mimeType);

    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          public_id: resourceType === "raw" ? file.filename : parsed.name,
          resource_type: resourceType,
          use_filename: true,
          unique_filename: false,
          overwrite: true,
        },
        (error, result) => {
          if (error || !result) {
            return reject(error || new Error("Cloudinary upload failed."));
          }
          resolve(result as UploadApiResponse);
        }
      );

      uploadStream.end(file.buffer);
    });

    const cloudinaryFields: CloudinaryData = {
      url: result.secure_url,
      cloudinaryPublicId: result.public_id,
      cloudinaryResourceType: result.resource_type,
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
