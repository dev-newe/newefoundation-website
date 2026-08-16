import type { CollectionConfig } from "payload";
import { Users } from "@/db/collections/Users";
import { Media } from "@/db/collections/Media";
import { CloudinaryCleanupJobs } from "@/db/collections/CloudinaryCleanupJobs";

export const CollectionConfigs: Array<CollectionConfig> = [Users, Media, CloudinaryCleanupJobs];
