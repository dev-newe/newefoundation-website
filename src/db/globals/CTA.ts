import type { GlobalConfig } from "payload";
import { ButtonActionFields } from "@/db/schemas/ButtonAction";

export const CTA: GlobalConfig = {
  slug: "app_cta",
  label: "CTA",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "cta",
      type: "group",
      fields: [
        { name: "title", type: "text", required: true },
        { name: "highlight", type: "text", required: true },
        {
          name: "buttons",
          type: "array",
          fields: ButtonActionFields,
        },
      ],
    },
  ],
};
