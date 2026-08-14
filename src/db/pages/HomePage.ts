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
    // Header Section
    {
      name: "header",
      type: "group",
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
    },

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

    // {
    //   name: "about",
    //   type: "group",
    //   fields: [
    //     { name: "title", type: "text", required: true },
    //     { name: "description", type: "textarea", required: true },
    //     { name: "highlighted", type: "checkbox", defaultValue: false },
    //   ],
    // },

    // Pillars Section
    {
      name: "aboutCards",
      type: "array",
      fields: [
        // { name: "id", type: "text", required: true },
        { name: "icon", type: "text", required: true },
        { name: "title", type: "text", required: true },
        { name: "description", type: "textarea", required: true },
        { name: "stat", type: "text", required: true },
        { name: "highlighted", type: "checkbox", defaultValue: false },
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
            ImageFieldGroup("image", "Featured Project Image"),
          ],
        },
        {
          name: "campaigns",
          type: "array",
          fields: [
            // { name: "id", type: "text", required: true },
            { name: "title", type: "text", required: true },
            { name: "description", type: "textarea", required: true },
            { name: "fundedPercentage", type: "number", required: true, min: 0, max: 100 },
            { name: "raisedAmount", type: "text", required: true },
            { name: "targetAmount", type: "text", required: true },
            { name: "buttonLabel", type: "text", required: true },
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

    // Footer Section
    {
      name: "footer",
      type: "group",
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
    },
  ],
};
