import type { GlobalConfig } from "payload";
import { ImageFieldGroup } from "@/db/globals/ImageField";
import { ButtonActionFields } from "@/db/globals/ButtonAction";

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
          fields: [
            ImageFieldGroup("primary", "Primary Image"),
            ImageFieldGroup("secondary", "Secondary Image"),
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

    // CTA Section
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
