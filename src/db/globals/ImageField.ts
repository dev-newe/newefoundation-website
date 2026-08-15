import type { GroupField } from "payload";

export const ImageFieldGroup = (name: string, label: string): GroupField => ({
  name,
  label,
  type: "group" as const,
  fields: [
    {
      name: "media",
      type: "upload" as const,
      relationTo: "media" as const,
      admin: {
        description: "Select or upload an image from Payload Media Library",
      },
    },
    {
      name: "src",
      type: "text" as const,
      admin: {
        description: "External image URL (used if no Media asset is attached)",
      },
    },
    {
      name: "alt",
      type: "text" as const,
      admin: {
        description: "Accessibility alt text",
      },
    },
  ],
});
