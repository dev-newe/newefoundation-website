import type { GlobalConfig } from "payload";
import { ImageFieldGroup } from "@/db/schemas/ImageField";
import { ButtonActionFields } from "@/db/schemas/ButtonAction";

export const Navigation: GlobalConfig = {
  slug: "app_navigation",
  label: "Navigation",
  access: {
    read: () => true,
  },
  fields: [
    ImageFieldGroup("logo", "Brand Logo"),
    {
      name: "brandName",
      type: "group",
      fields: [{ name: "text", type: "text", required: true }],
    },
    {
      name: "navItems",
      type: "array",
      fields: [
        { name: "label", type: "text", required: true },
        { name: "href", type: "text", required: true },
        { name: "isDropdown", type: "checkbox", defaultValue: false },
        {
          name: "groupA",
          type: "group",
          admin: {
            condition: (data, siblingData) => Boolean(siblingData?.isDropdown),
          },
          fields: [
            { name: "title", type: "text" },
            {
              name: "items",
              type: "array",
              fields: [
                { name: "label", type: "text", required: true },
                { name: "href", type: "text", required: true },
              ],
            },
          ],
        },
        {
          name: "groupB",
          type: "group",
          admin: {
            condition: (data, siblingData) => Boolean(siblingData?.isDropdown),
          },
          fields: [
            { name: "title", type: "text" },
            {
              name: "items",
              type: "array",
              fields: [
                { name: "label", type: "text", required: true },
                { name: "href", type: "text", required: true },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "ctaButton",
      type: "group",
      fields: ButtonActionFields,
    },
  ],
};
