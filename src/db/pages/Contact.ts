import type { GlobalConfig } from "payload";
import { ImageFieldGroup } from "@/db/schemas/ImageField";
import { ButtonActionFields } from "@/db/schemas/ButtonAction";
import { FormInputField } from "../schemas/FormInputField";

export const ContactPage: GlobalConfig = {
  slug: "app_contactpage",
  label: "Contact Page",
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

    // Contact Information Section
    {
      name: "contactInfo",
      type: "group",
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "office",
          type: "group",
          fields: [
            { name: "title", type: "text", required: true },
            { name: "address", type: "textarea", required: true },
          ],
        },
        {
          name: "phone",
          type: "group",
          fields: [
            { name: "title", type: "text", required: true },
            {
              name: "numbers",
              type: "array",
              fields: [
                { name: "countryCode", type: "text", required: true },
                { name: "number", type: "text", required: true },
              ],
            },
          ],
        },
        {
          name: "email",
          type: "group",
          fields: [
            { name: "title", type: "text", required: true },
            {
              name: "addresses",
              type: "array",
              fields: [{ name: "address", type: "text", required: true }],
            },
          ],
        },
      ],
    },

    // Contact Form Section - FIXED
    {
      name: "contactForm",
      type: "group",
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "formFields",
          type: "array",
          fields: FormInputField,
        },
        {
          name: "submitButtonText",
          type: "text",
          required: true,
        },
      ],
    },

    // Map Section
    {
      name: "map",
      type: "group",
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
          defaultValue: "Find Us in Serampore",
        },
        {
          name: "locationBadge",
          type: "text",
          defaultValue: "SERAMPORE OFFICE",
        },
        {
          name: "locationName",
          type: "text",
          defaultValue: "Navjyoti Education and Women Empowerment Foundation",
        },
        {
          name: "address",
          type: "textarea",
          defaultValue:
            "78/89, G.T. Road West, Simla, Serampore,\nHooghly, West Bengal, India - 712203",
        },
        {
          name: "email",
          type: "text",
          defaultValue: "info@newefoundation.org",
        },
        {
          name: "phone",
          type: "text",
          defaultValue: "+91 9876543210",
        },
        {
          name: "googleMapsUrl",
          label: "Google Maps Navigation Link",
          type: "text",
          admin: {
            description: "Used for the 'Get Directions' button. Paste your Google Maps share link.",
          },
          defaultValue: "https://maps.app.goo.gl/ycM6MGpR1dr9Yk1K8",
        },
        {
          name: "embedUrl",
          label: "Google Maps Embed URL",
          type: "text",
          admin: {
            description:
              "Used for the on-page map iframe. On Google Maps desktop, click Share > 'Embed a map' > Then Copy the src url of the iframe tag and paste here. Note: Do not paste maps.app.goo.gl shortlinks here.",
          },
          defaultValue:
            "https://maps.google.com/maps?ll=22.7514381,88.3315948&t=m&z=17&output=embed",
        },
      ],
    },
  ],
};

export default ContactPage;
