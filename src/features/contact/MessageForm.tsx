"use client";

import React, { useMemo, useState, useRef, useCallback } from "react";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { AppContactpage } from "@/payload-types";

type FormProps = {
  data?: AppContactpage["contactForm"];
};

type SupportedFieldType = "text" | "email" | "tel" | "textarea" | "select" | "checkbox";

// Single item from the formFields array
type PayloadFormField = NonNullable<
  NonNullable<AppContactpage["contactForm"]>["formFields"]
>[number];

const SUPPORTED_TYPES: SupportedFieldType[] = [
  "text",
  "email",
  "tel",
  "textarea",
  "select",
  "checkbox",
];

// ---------------------------------------------------------------------------
// Fallback fields shown when no Payload data is available
// ---------------------------------------------------------------------------
const FALLBACK_FIELDS: PayloadFormField[] = [
  {
    fieldName: "firstName",
    fieldLabel: "First Name",
    fieldType: "text",
    fieldPlaceholder: "Jane",
    width: "half",
    fieldRequired: true,
  },
  {
    fieldName: "lastName",
    fieldLabel: "Last Name",
    fieldType: "text",
    fieldPlaceholder: "Smith",
    width: "half",
    fieldRequired: true,
  },
  {
    fieldName: "email",
    fieldLabel: "Email Address",
    fieldType: "email",
    fieldPlaceholder: "jane@example.com",
    width: "full",
    fieldRequired: true,
  },
  {
    fieldName: "message",
    fieldLabel: "How can we help?",
    fieldType: "textarea",
    fieldPlaceholder: "Tell us about your project…",
    width: "full",
    fieldRequired: true,
  },
];

function buildZodSchema(fields: PayloadFormField[]) {
  const shape: Record<string, z.ZodTypeAny> = {};

  for (const field of fields) {
    const type = field.fieldType as SupportedFieldType;
    if (!SUPPORTED_TYPES.includes(type)) {
      continue;
    }

    let schema: z.ZodTypeAny;

    if (type === "checkbox") {
      schema = field.fieldRequired
        ? z.boolean().refine((v) => v === true, {
            message: `${field.fieldLabel} must be checked`,
          })
        : z.boolean();
    } else if (type === "select") {
      const values = (field.selectOptions ?? []).map((o) => o.value);

      const base = values.length > 0 ? z.enum(values as [string, ...string[]]) : z.string();

      schema = field.fieldRequired ? base : z.union([base, z.literal("")]).optional();
    } else {
      // text | email | tel | textarea
      let str = z.string();

      if (field.fieldRequired) {
        str = str.min(1, { message: `${field.fieldLabel} is required` });
      } else {
        shape[field.fieldName] = str.optional();
        continue;
      }

      if (type === "email") {
        str = str.email({ message: "Please enter a valid email address" });
      }

      if (type === "tel") {
        str = str.regex(/^\+?[\d\s\-().]{7,20}$/, {
          message: "Please enter a valid phone number",
        });
      }

      if (field.regexValidation) {
        try {
          const re = new RegExp(field.regexValidation);
          str = str.regex(re, { message: `${field.fieldLabel} format is invalid` });
        } catch {
          // Invalid regex from CMS — silently ignore
        }
      }

      schema = str;
    }

    shape[field.fieldName] = schema;
  }

  return z.object(shape);
}

// ---------------------------------------------------------------------------
// Build initial values map
// ---------------------------------------------------------------------------
function buildInitialValues(fields: PayloadFormField[]): Record<string, string | boolean> {
  const init: Record<string, string | boolean> = {};
  for (const f of fields) {
    if (!SUPPORTED_TYPES.includes(f.fieldType as SupportedFieldType)) {
      continue;
    }
    init[f.fieldName] = f.fieldType === "checkbox" ? (f.isChecked ?? false) : "";
  }
  return init;
}

// ---------------------------------------------------------------------------
// Group consecutive half-width fields into paired rows
// ---------------------------------------------------------------------------
function groupIntoRows(fields: PayloadFormField[]): PayloadFormField[][] {
  const rows: PayloadFormField[][] = [];
  let i = 0;
  while (i < fields.length) {
    const cur = fields[i];
    if (cur.width === "half" && i + 1 < fields.length && fields[i + 1].width === "half") {
      rows.push([cur, fields[i + 1]]);
      i += 2;
    } else {
      rows.push([cur]);
      i++;
    }
  }
  return rows;
}

const MessageForm = ({ data: formData }: FormProps) => {
  const rawFields = formData?.formFields?.length ? formData.formFields : FALLBACK_FIELDS;
  const title = formData?.title ?? "Send a Message";
  const submitLabel = formData?.submitButtonText ?? "Send Message";

  const fields = useMemo(
    () => rawFields.filter((f) => SUPPORTED_TYPES.includes(f.fieldType as SupportedFieldType)),
    [rawFields]
  );

  const zodSchema = useMemo(() => buildZodSchema(fields), [fields]);
  const initialValues = useMemo(() => buildInitialValues(fields), [fields]);
  const rows = useMemo(() => groupIntoRows(fields), [fields]);

  // ---------------------------------------------------------------------------
  // State — one flat map for values and one for field-level errors
  // ---------------------------------------------------------------------------
  const [values, setValues] = useState<Record<string, string | boolean>>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState("");

  // ---------------------------------------------------------------------------
  // Validate a single field against the schema (parse only that key)
  // ---------------------------------------------------------------------------
  const validateField = useCallback(
    (name: string, val: unknown): string => {
      const singleSchema = z.object({
        [name]: (zodSchema.shape as Record<string, z.ZodTypeAny>)[name],
      });
      const result = singleSchema.safeParse({ [name]: val });
      if (!result.success) {
        const msg = result.error.flatten().fieldErrors[name]?.[0];
        return msg ?? "Invalid value";
      }
      return "";
    },
    [zodSchema]
  );

  // ---------------------------------------------------------------------------
  // Change handlers
  // ---------------------------------------------------------------------------
  function handleChange(name: string, val: string | boolean) {
    setValues((prev) => ({ ...prev, [name]: val }));
    // Re-validate on change only if already touched
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, val) }));
    }
  }

  function handleBlur(name: string) {
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, values[name]) }));
  }

  // ---------------------------------------------------------------------------
  // Submit
  // ---------------------------------------------------------------------------
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Mark everything touched and run full validation
    const allTouched: Record<string, boolean> = {};
    fields.forEach((f) => (allTouched[f.fieldName] = true));
    setTouched(allTouched);

    const result = zodSchema.safeParse(values);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const [key, msgs] of Object.entries(result.error.flatten().fieldErrors)) {
        if (msgs?.[0]) {
          fieldErrors[key] = msgs[0];
        }
      }
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    setStatus("idle");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fields: result.data }),
      });
      console.log(result.data);
      const json = await res.json();

      if (res.ok && json.success) {
        setStatus("success");
        setServerMessage(json.message ?? "Message sent!");
        setValues(initialValues);
        setErrors({});
        setTouched({});
      } else {
        setStatus("error");
        setServerMessage(json.message ?? "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setServerMessage("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  // ---------------------------------------------------------------------------
  // Shared input class
  // ---------------------------------------------------------------------------
  const inputBase =
    "h-11 rounded-md border-0 bg-primary/10 placeholder:text-primary/30 text-primary focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-0 transition-shadow";

  // ---------------------------------------------------------------------------
  // Render individual field control
  // ---------------------------------------------------------------------------
  function renderControl(field: PayloadFormField) {
    const type = field.fieldType as SupportedFieldType;
    const hasError = Boolean(errors[field.fieldName]);
    const errorRing = hasError ? "ring-2 ring-destructive/90" : "";

    if (type === "textarea") {
      return (
        <Textarea
          id={field.fieldName}
          placeholder={field.fieldPlaceholder}
          rows={5}
          value={values[field.fieldName] as string}
          onChange={(e) => handleChange(field.fieldName, e.target.value)}
          onBlur={() => handleBlur(field.fieldName)}
          className={cn(inputBase, "h-auto min-h-30 resize-y py-3", errorRing)}
        />
      );
    }

    if (type === "select") {
      return (
        <Select
          value={values[field.fieldName] as string}
          onValueChange={(val) => {
            handleChange(field.fieldName, val ?? "");
            // selects have no blur event — mark touched immediately
            setTouched((prev) => ({ ...prev, [field.fieldName]: true }));
          }}
        >
          <SelectTrigger className={cn(inputBase, "w-full", errorRing)} id={field.fieldName}>
            <SelectValue placeholder={field.fieldPlaceholder ?? "Select an option"} />
          </SelectTrigger>
          <SelectContent className="rounded-xl border-0 bg-[#ECEAE3] shadow-lg">
            {(field.selectOptions ?? []).map((opt) => (
              <SelectItem
                key={opt.value}
                value={opt.value}
                className="text-[#1F3D2E] focus:bg-[#1F3D2E]/10"
              >
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    }

    if (type === "checkbox") {
      return (
        <div className="flex items-center gap-3">
          <Checkbox
            id={field.fieldName}
            checked={values[field.fieldName] as boolean}
            onCheckedChange={(checked) => {
              handleChange(field.fieldName, Boolean(checked));
              setTouched((prev) => ({ ...prev, [field.fieldName]: true }));
            }}
            className="rounded-md border-[#1F3D2E]/30 data-[state=checked]:border-[#1F3D2E] data-[state=checked]:bg-[#1F3D2E]"
          />
          <label
            htmlFor={field.fieldName}
            className="cursor-pointer text-sm text-[#4A5C50] select-none"
          >
            {field.fieldPlaceholder ?? field.fieldLabel}
          </label>
        </div>
      );
    }

    // text | email | tel
    return (
      <Input
        id={field.fieldName}
        type={type}
        placeholder={field.fieldPlaceholder}
        value={values[field.fieldName] as string}
        onChange={(e) => handleChange(field.fieldName, e.target.value)}
        onBlur={() => handleBlur(field.fieldName)}
        autoComplete={type === "email" ? "email" : type === "tel" ? "tel" : undefined}
        className={cn(inputBase, errorRing)}
      />
    );
  }

  return (
    <div className="border-primary/20 w-full rounded-2xl border bg-white p-8">
      <h2 className="text-primary mb-7 font-serif text-[18px] font-medium">{title}</h2>

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {rows.map((row, ri) => (
          <div
            key={ri}
            className={cn(
              "grid gap-4",
              row.length === 2 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
            )}
          >
            {row.map((field) => {
              const isCheckbox = field.fieldType === "checkbox";
              const errorMsg = errors[field.fieldName];

              return (
                <div key={field.fieldName} className="flex flex-col gap-1.5">
                  {!isCheckbox && (
                    <Label htmlFor={field.fieldName} className="text-sm font-medium text-[#1F3D2E]">
                      {field.fieldLabel}
                      {field.fieldRequired && <span className="ml-0.5 text-[#1F3D2E]/50">*</span>}
                    </Label>
                  )}

                  {renderControl(field)}

                  {errorMsg && <p className="text-destructive/90 mt-0.5 text-xs">{errorMsg}</p>}
                </div>
              );
            })}
          </div>
        ))}

        {status === "success" && (
          <div className="rounded-xl bg-[#1F3D2E]/10 px-4 py-3 text-sm text-[#1F3D2E]">
            {serverMessage}
          </div>
        )}
        {status === "error" && (
          <div className="bg-destructive/10 text-destructive/90 rounded-xl px-4 py-3 text-sm">
            {serverMessage}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            "mt-1 inline-flex items-center justify-center rounded-full",
            "bg-[#1F3D2E] px-7 py-2.5 text-sm font-semibold text-white",
            "cursor-pointer transition-opacity hover:opacity-90 active:opacity-80",
            "disabled:cursor-not-allowed disabled:opacity-60",
            "focus-visible:ring-2 focus-visible:ring-[#1F3D2E] focus-visible:ring-offset-2 focus-visible:outline-none"
          )}
        >
          {isSubmitting ? "Sending…" : submitLabel}
        </button>
      </form>
    </div>
  );
};
export default MessageForm;
