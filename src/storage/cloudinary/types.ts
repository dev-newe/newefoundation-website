import type { TypeWithID } from "payload";

export interface CloudinaryAdapterOptions {
  folder?: string;
}

export interface CloudinaryData {
  url?: string;
  cloudinaryPublicId?: string;
  cloudinaryResourceType: "image" | "video" | "raw" | "auto";
  cloudinaryFormat?: string;
  width?: number;
  height?: number;
}

export type CloudinaryDocument = TypeWithID & CloudinaryData & Record<string, unknown>;
