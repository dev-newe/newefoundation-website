import { Field } from "payload";

export const CurrentTimeFiled: Field = {
  name: "currentTime",
  type: "date" as const,
  required: true,
  defaultValue: () => new Date().toISOString(),
  admin: {
    date: {
      pickerAppearance: "dayOnly",
      displayFormat: "hh:mm:ss a, dd MMMM yyyy",
    },
  },
};
