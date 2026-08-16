import type { GlobalConfig } from "payload";
import { RichTextFieldGroup } from "@/db/schemas/RichTextFieldGroup";

export const PolicyPage: GlobalConfig = {
  slug: "app_policy",
  label: "Privacy and Policy Page",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "policyList",
      type: "group",
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },
        RichTextFieldGroup("description", "Description"),
      ],
    },
  ],
};
