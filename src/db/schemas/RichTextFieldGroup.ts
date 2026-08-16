import {
  lexicalEditor,
  BoldFeature,
  ItalicFeature,
  UnderlineFeature,
  LinkFeature,
  FixedToolbarFeature,
  EXPERIMENTAL_TableFeature,
} from "@payloadcms/richtext-lexical";
import type { Field } from "payload";

export const RichTextFieldGroup = (name: string, label: string): Field => ({
  name,
  label,
  type: "richText",
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      EXPERIMENTAL_TableFeature(),
      BoldFeature(),
      ItalicFeature(),
      UnderlineFeature(),
      LinkFeature(),
      FixedToolbarFeature(),
    ],
  }),
  required: true,
});
