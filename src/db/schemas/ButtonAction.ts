import type { Field } from "payload";

export const ButtonActionFields: Field[] = [
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
