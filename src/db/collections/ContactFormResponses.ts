import type { CollectionConfig } from "payload";

export const ContactFormResponses: CollectionConfig = {
  slug: "contact_form_responses",
  labels: {
    singular: "Contact Form Response",
    plural: "Contact Form Responses",
  },
  admin: {
    useAsTitle: "email",
    defaultColumns: ["email", "createdAt"],
    description: "Responses from the contact form. Read-only for admins.",
  },
  access: {
    create: () => true,
    read: ({ req: { user } }) => Boolean(user),
    update: () => false,
    delete: () => false,
  },
  fields: [
    {
      name: "email",
      type: "email",
      required: true,
      admin: {
        description: "Submitter's email address",
      },
    },
    {
      name: "data",
      type: "json",
      required: true,
      admin: {
        description: "Raw form field values as a JSON object",
      },
    },
    {
      name: "submittedAt",
      type: "date",
      required: true,
      admin: {
        readOnly: true,
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
    },
  ],
  timestamps: true,
};

export default ContactFormResponses;
