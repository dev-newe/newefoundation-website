import type { GlobalConfig } from "payload";

export const Footer: GlobalConfig = {
  slug: "app_footer",
  label: "Footer",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "brand",
      type: "group",
      fields: [
        { name: "name", type: "text", required: true },
        { name: "icon", type: "text", required: true },
        { name: "address", type: "textarea", required: true },
        { name: "phone", type: "text", required: true },
        { name: "email", type: "text", required: true },
      ],
    },
    {
      name: "linkGroups",
      type: "array",
      fields: [
        { name: "title", type: "text", required: true },
        {
          name: "links",
          type: "array",
          fields: [
            { name: "label", type: "text", required: true },
            { name: "href", type: "text", required: true },
            { name: "isActive", type: "checkbox", defaultValue: false },
          ],
        },
      ],
    },
    { name: "copyright", type: "text", required: true },
  ],
};
