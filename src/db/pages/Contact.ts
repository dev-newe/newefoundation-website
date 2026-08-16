import type { GlobalConfig } from "payload";
import { ImageFieldGroup } from "@/db/globals/ImageField";
import { ButtonActionFields } from "@/db/globals/ButtonAction";

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
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "description",
          type: "textarea",
          required: true,
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
          fields: [
            { name: "fieldName", type: "text", required: true },
            { name: "fieldLabel", type: "text", required: true },
            {
              name: "fieldType",
              type: "select",
              options: [
                { label: "Text", value: "text" },
                { label: "Email", value: "email" },
                { label: "Phone", value: "tel" },
                { label: "Message", value: "textarea" },
                { label: "Select", value: "select" },
                { label: "Checkbox", value: "checkbox" },
                { label: "Radio", value: "radio" },
                { label: "File", value: "file" },
              ],
              defaultValue: "text",
              required: true,
            },
            // if type is select - FIXED condition
            {
              name: "selectOptions",
              type: "array",
              admin: {
                condition: (data, siblingData) => {
                  // Check the fieldType value from sibling data
                  return siblingData?.fieldType === "select";
                },
              },
              fields: [
                { name: "label", type: "text", required: true },
                { name: "value", type: "text", required: true },
              ],
            },
            // if type is checkbox - FIXED condition
            {
              name: "isChecked",
              type: "checkbox",
              admin: {
                condition: (data, siblingData) => {
                  return siblingData?.fieldType === "checkbox";
                },
              },
              defaultValue: false,
            },
            // if type is radio - FIXED condition
            {
              name: "radioOptions",
              type: "array",
              admin: {
                condition: (data, siblingData) => {
                  return siblingData?.fieldType === "radio";
                },
              },
              fields: [
                { name: "label", type: "text", required: true },
                { name: "value", type: "text", required: true },
              ],
            },
            // if type is file - FIXED condition
            {
              name: "fileTypes",
              type: "array",
              admin: {
                condition: (data, siblingData) => {
                  return siblingData?.fieldType === "file";
                },
              },
              fields: [
                {
                  name: "type",
                  type: "select",
                  options: [
                    { label: "PDF", value: "pdf" },
                    { label: "Image", value: "image" },
                    { label: "Document", value: "document" },
                    { label: "Video", value: "video" },
                    { label: "Audio", value: "audio" },
                    { label: "Other", value: "other" },
                  ],
                  defaultValue: "image",
                  required: true,
                },
              ],
            },
            { name: "fieldPlaceholder", type: "text", required: true },
            {
              name: "width",
              type: "select",
              options: [
                { label: "Full", value: "full" },
                { label: "Half", value: "half" },
              ],
              defaultValue: "full",
            },
            { name: "regexValidation", type: "text" },
            { name: "className", type: "text" },
            { name: "fieldRequired", type: "checkbox", defaultValue: true },
          ],
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

    // CTA Section
    {
      name: "cta",
      type: "group",
      fields: [
        { name: "title", type: "text", required: true },
        { name: "description", type: "textarea", required: true },
        {
          name: "buttons",
          type: "array",
          fields: ButtonActionFields,
        },
      ],
    },
  ],
};

export default ContactPage;
