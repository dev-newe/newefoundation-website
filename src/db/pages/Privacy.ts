import type { GlobalConfig } from "payload";
import { RichTextFieldGroup } from "@/db/schemas/RichTextFieldGroup";

export const PrivacyPage: GlobalConfig = {
  slug: "app_privacy",
  label: "Privacy Policy Page",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },

    {
      name: "description",
      type: "text",
      required: true,
    },

    RichTextFieldGroup("content", "Content"),

    {
      name: "contactCta",
      type: "group",
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "description",
          type: "text",
          required: true,
        },
        {
          name: "button",
          type: "group",
          fields: [
            {
              name: "label",
              type: "text",
              required: true,
            },
            {
              name: "href",
              type: "text",
              required: true,
            },
          ],
        },
      ],
    },
  ],
};
