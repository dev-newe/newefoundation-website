import type { TypeWithID } from "payload";

export interface CloudinaryAdapterOptions {
  folder?: string;
}

export type CloudinaryResourceType = "image" | "video" | "raw";

export interface CloudinaryData {
  url?: string;
  cloudinaryPublicId?: string;
  cloudinaryResourceType: CloudinaryResourceType;
  cloudinaryFormat?: string;
  width?: number;
  height?: number;
}

export type CloudinaryDocument = TypeWithID & CloudinaryData & Record<string, unknown>;
