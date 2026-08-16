import type { Field } from "payload";

export const FormInputField: Field[] = [
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
];
