import type { GlobalConfig } from "payload";
import { ImageFieldGroup } from "@/db/schemas/ImageField";
import { ButtonActionFields } from "@/db/schemas/ButtonAction";

export const HomePage: GlobalConfig = {
  slug: "app_homepage",
  label: "Home Page",
  access: {
    read: () => true,
  },
  fields: [
    // Hero Section
    {
      name: "hero",
      type: "group",
      fields: [
        {
          name: "badge",
          type: "group",
          fields: [{ name: "text", type: "text", required: true }],
        },
        {
          name: "title",
          type: "group",
          fields: [
            { name: "main", type: "text", required: true },
            { name: "highlight", type: "text", required: true },
          ],
        },
        {
          name: "description",
          type: "textarea",
          required: true,
        },
        {
          name: "buttons",
          type: "array",
          fields: ButtonActionFields,
        },
        ImageFieldGroup("image", "Hero Image"),
      ],
    },

    // Pillars Section
    {
      name: "aboutUs",
      type: "group",
      fields: [
        { name: "badge", type: "text", required: true },
        { name: "title", type: "text", required: true },
        { name: "description", type: "textarea", required: true },
        {
          name: "sections",
          type: "array",
          fields: [
            { name: "icon", type: "text", required: true },
            { name: "title", type: "text", required: true },
            { name: "description", type: "textarea", required: true },
            { name: "stat", type: "text", required: true },
            { name: "highlighted", type: "checkbox", defaultValue: false },
            { name: "href", type: "text" },
          ],
        },
      ],
    },

    // Mission & Vision Section
    {
      name: "missionVision",
      type: "group",
      fields: [
        {
          name: "mission",
          type: "group",
          fields: [
            { name: "title", type: "text", required: true },
            { name: "description", type: "textarea", required: true },
            {
              name: "stat",
              type: "group",
              fields: [
                { name: "value", type: "text", required: true },
                { name: "label", type: "text", required: true },
              ],
            },
          ],
        },
        {
          name: "vision",
          type: "group",
          fields: [
            { name: "title", type: "text", required: true },
            { name: "description", type: "textarea", required: true },
          ],
        },
        {
          name: "images",
          type: "group",
          label: "Mission Images",
          fields: [
            ImageFieldGroup("primary", "Primary Image", { required: true }),
            ImageFieldGroup("secondary", "Secondary Image", { required: true }),
            {
              name: "additionalImages",
              label: "Additional Carousel Images (Optional, up to 4 more)",
              type: "array",
              maxRows: 4,
              labels: {
                singular: "Additional Image",
                plural: "Additional Images",
              },
              fields: [ImageFieldGroup("image", "Image")],
            },
          ],
        },
      ],
    },

    // Our Partners Section
    {
      name: "ourPartners",
      type: "group",
      fields: [
        { name: "title", type: "text", required: true },
        { name: "description", type: "textarea", required: true },
        {
          name: "partners",
          type: "array",
          fields: [
            ImageFieldGroup("logo", "Partner Logo"),
            { name: "name", type: "text" },
            { name: "url", type: "text" },
          ],
        },
      ],
    },

    // Our Work Section
    {
      name: "ourWork",
      type: "group",
      fields: [
        { name: "title", type: "text", required: true },
        { name: "subtitle", type: "textarea", required: true },
        {
          name: "featuredProject",
          type: "group",
          fields: [
            { name: "category", type: "text", required: true },
            { name: "title", type: "text", required: true },
            { name: "description", type: "textarea", required: true },
            {
              name: "images",
              type: "array",
              fields: [ImageFieldGroup("img", "Work Image")],
            },
          ],
        },
      ],
    },

    // Team Section
    {
      name: "team",
      type: "group",
      fields: [
        { name: "title", type: "text", required: true },
        {
          name: "members",
          type: "array",
          fields: [
            // { name: "id", type: "text", required: true },
            { name: "name", type: "text", required: true },
            { name: "role", type: "text", required: true },
            ImageFieldGroup("image", "Member Photo"),
          ],
        },
      ],
    },
  ],
};
