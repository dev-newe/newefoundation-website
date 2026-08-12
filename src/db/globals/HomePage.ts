import type { GlobalConfig } from "payload";

const imageFieldGroup = (name: string, label: string) => ({
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

const buttonActionFields = [
  {
    name: "label",
    type: "text" as const,
    required: true,
  },
  {
    name: "href",
    type: "text" as const,
  },
  {
    name: "className",
    type: "text" as const,
  },
  {
    name: "icon",
    type: "text" as const,
  },
];

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
        {
          name: "brand",
          type: "group",
          fields: [
            { name: "name", type: "text", required: true },
            { name: "icon", type: "text", required: true },
          ],
        },
        {
          name: "navItems",
          type: "array",
          fields: [
            { name: "label", type: "text", required: true },
            { name: "href", type: "text", required: true },
            { name: "isActive", type: "checkbox", defaultValue: false },
          ],
        },
        {
          name: "ctaButton",
          type: "group",
          fields: buttonActionFields,
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
          fields: buttonActionFields,
        },
        imageFieldGroup("image", "Hero Image"),
      ],
    },

    // Pillars Section
    {
      name: "pillars",
      type: "array",
      fields: [
        { name: "id", type: "text", required: true },
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
            imageFieldGroup("primary", "Primary Image"),
            imageFieldGroup("secondary", "Secondary Image"),
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
            imageFieldGroup("image", "Featured Project Image"),
          ],
        },
        {
          name: "campaigns",
          type: "array",
          fields: [
            { name: "id", type: "text", required: true },
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
            { name: "id", type: "text", required: true },
            { name: "name", type: "text", required: true },
            { name: "role", type: "text", required: true },
            imageFieldGroup("image", "Member Photo"),
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
          fields: buttonActionFields,
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
