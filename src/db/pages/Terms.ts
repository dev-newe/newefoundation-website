import type { GlobalConfig } from "payload";
import { RichTextFieldGroup } from "@/db/schemas/RichTextFieldGroup";

export const TermsPage: GlobalConfig = {
  slug: "app_terms",
  label: "Terms and Conditions Page",
  access: {
    read: () => true,
  },
  fields: [
    // Terms list section
    {
      name: "termsList",
      type: "group",
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "agreementCheckboxText",
          type: "text",
          required: false,
        },
        RichTextFieldGroup("description", "Description"),
      ],
    },
  ],
};
