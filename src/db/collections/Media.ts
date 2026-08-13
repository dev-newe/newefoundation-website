import type { CollectionConfig } from "payload";

//TODO: RBAC when non public things are uploaded (datasets)
export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      admin: { description: "Important for accessibility and SEO" },
    },
    {
      name: "caption",
      type: "textarea",
    },
    {
      name: "type",
      type: "select",
      options: [
        { label: "Image", value: "image" },
        { label: "Video", value: "video" },
        { label: "Audio", value: "audio" },
        { label: "Document", value: "document" },
        { label: "Dataset", value: "dataset" },
        { label: "Other", value: "other" },
      ],
      admin: { position: "sidebar" },
    },
    {
      name: "cloudinaryPublicId",
      type: "text",
      admin: { hidden: true },
    },
    {
      name: "cloudinaryResourceType",
      type: "text",
      admin: { hidden: true },
    },
    {
      name: "cloudinaryFormat",
      type: "text",
      admin: { hidden: true },
    },
  ],

  upload: {
    mimeTypes: [
      "image/*",
      "video/*",
      "audio/*",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.*",
      "application/vnd.ms-excel",
      "application/json",
      "text/csv",
      "application/zip",
      "application/x-zip-compressed",
      //TODO: Add more
    ],
    imageSizes: [
      {
        name: "thumbnail",
        width: 400,
        height: 300,
        position: "centre",
      },
      {
        name: "card",
        width: 768,
        height: 1024,
        position: "centre",
      },
      {
        name: "tablet",
        width: 1024,
        position: "centre",
      },
    ],
  },
};
