import { v2 as cloudinary } from "cloudinary";
import type { HandleDelete } from "@payloadcms/plugin-cloud-storage/types";
import type { CloudinaryAdapterOptions, CloudinaryDocument } from "./types";

export const getHandleDelete = (_options: CloudinaryAdapterOptions = {}): HandleDelete => {
  return async ({ filename, doc, req }) => {
    const mediaDoc = doc as unknown as CloudinaryDocument | undefined;

    // The public_id contains a random UUID minted at upload time, so it can NOT be
    // reconstructed from the filename. If it wasn't stored, there is nothing valid
    // to delete, and queueing a retry with a guessed ID could never succeed.
    const publicId = mediaDoc?.cloudinaryPublicId;
    if (!publicId) {
      console.error(
        `[Cloudinary] Cannot delete "${filename}": doc has no cloudinaryPublicId. ` +
          `Asset (if any) must be removed manually.`
      );
      return;
    }

    const resourceType = mediaDoc?.cloudinaryResourceType || "image";

    try {
      const response = await cloudinary.uploader.destroy(publicId, {
        resource_type: resourceType,
        invalidate: true,
      });

      // destroy() does not throw on logical failures; it returns { result: "..." }.
      // "not found" means it's already gone, which is fine (delete is idempotent).
      if (response?.result !== "ok" && response?.result !== "not found") {
        throw new Error(`Unexpected Cloudinary destroy result: ${response?.result}`);
      }
    } catch (error) {
      console.error(`[Cloudinary] Delete failed for ${filename} (${publicId}):`, error);
      if (req?.payload) {
        try {
          await req.payload.create({
            collection: "cloudinary-cleanup-jobs",
            overrideAccess: true,
            data: {
              publicId,
              resourceType,
              filename,
              errorDetails: error instanceof Error ? error.message : String(error),
              status: "pending",
              attempts: 0,
            },
          });
        } catch (dbError) {
          console.error("[Cloudinary] Failed to persist cleanup job:", dbError);
        }
      }
    }
  };
};
