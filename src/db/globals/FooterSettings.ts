import type { GlobalConfig } from "payload";

export const FooterSettings: GlobalConfig = {
  slug: "app_footer",
  label: "Footer Settings",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "brand",
      label: "Brand Information",
      type: "group",
      fields: [
        {
          name: "name",
          label: "Brand Name",
          type: "text",
          required: true,
          defaultValue: "Navjyoti Foundation",
        },
        {
          name: "icon",
          label: "Logo Identifier",
          type: "text",
          required: true,
          defaultValue: "logo",
        },
        {
          name: "address",
          label: "Address",
          type: "textarea",
          required: true,
          defaultValue:
            "78/89, G.T. Road West,\nSimla, Serampore,\nHooghly, West Bengal, India.\nPincode - 712203",
        },
        {
          name: "googleMapsUrl",
          label: "Maps URL",
          type: "text",
          admin: {
            description: "Direct Maps link for the location (optional)",
          },
        },
        {
          name: "phone",
          label: "Contact Numbers",
          type: "text",
          required: true,
          defaultValue: "9830965220, 7001166714",
        },
        {
          name: "email",
          label: "Contact Email",
          type: "text",
          required: true,
          defaultValue: "info@newefoundation.org",
        },
      ],
    },
    {
      name: "linkGroups",
      label: "Footer Link Columns",
      type: "array",
      labels: {
        singular: "Link Column",
        plural: "Link Columns",
      },
      fields: [
        {
          name: "title",
          label: "Column Title",
          type: "text",
          required: true,
        },
        {
          name: "links",
          label: "Navigation Links",
          type: "array",
          labels: {
            singular: "Link",
            plural: "Links",
          },
          fields: [
            {
              name: "label",
              label: "Link Label",
              type: "text",
              required: true,
            },
            {
              name: "href",
              label: "Link URL / Path",
              type: "text",
              required: true,
            },
            {
              name: "isActive",
              label: "Active Link",
              type: "checkbox",
              defaultValue: false,
            },
          ],
        },
      ],
    },
    {
      name: "copyright",
      label: "Copyright Notice",
      type: "text",
      required: true,
      defaultValue:
        "© 2026 Navjyoti Foundation. All rights reserved. Registered Charity No. 292336.",
    },
  ],
};

export const Footer = FooterSettings;
export default FooterSettings;
