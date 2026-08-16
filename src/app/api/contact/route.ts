import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { z } from "zod";

const contactBodySchema = z.object({
  fields: z.record(z.string(), z.unknown()),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parsed = contactBodySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { fields } = parsed.data;

    const emailValue = Object.entries(fields).find(
      ([key, val]) =>
        key.toLowerCase().includes("email") &&
        typeof val === "string" &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)
    )?.[1] as string | undefined;

    if (!emailValue) {
      return NextResponse.json(
        { success: false, message: "A valid email address is required." },
        { status: 422 }
      );
    }

    const payload = await getPayload({ config: configPromise });

    await payload.create({
      collection: "app_contact_form_responses",
      data: {
        email: emailValue,
        data: fields,
        submittedAt: new Date().toISOString(),
      },
      // Bypass access control – this is a server-side trusted call
      overrideAccess: true,
    });

    return NextResponse.json(
      { success: true, message: "Message sent. We'll be in touch soon!" },
      { status: 201 }
    );
  } catch (err) {
    console.error("[contact/route] error:", err);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}
