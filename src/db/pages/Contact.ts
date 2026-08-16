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
        },
        {
          name: "locationText",
          type: "text",
        },
        {
          name: "embedUrl",
          type: "text",
        },
        ImageFieldGroup("mapImage", "Map Image"),
      ],
    },
  ],
};

export default ContactPage;
