import type { CollectionConfig } from "payload";

export const CloudinaryCleanupJobs: CollectionConfig = {
  slug: "cloudinary-cleanup-jobs",
  admin: {
    useAsTitle: "publicId",
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: "publicId",
      type: "text",
      required: true,
    },
    {
      name: "resourceType",
      type: "text",
      required: true,
    },
    {
      name: "filename",
      type: "text",
      required: true,
    },
    {
      name: "errorDetails",
      type: "text",
    },
    {
      name: "status",
      type: "select",
      defaultValue: "pending",
      options: [
        { label: "Pending", value: "pending" },
        { label: "Failed", value: "failed" },
        { label: "Completed", value: "completed" },
      ],
    },
    {
      name: "attempts",
      type: "number",
      defaultValue: 0,
    },
  ],
};
