"use client";

import Link from "next/link";
import { ArrowLeft, HeartHandshake } from "lucide-react";
import "@/app/globals.css";

export default function NotFound() {
  return (
    <main className="px-page py-section flex h-screen flex-col items-center justify-center text-center">
      <div className="container-narrow flex flex-col items-center">
        <p className="text-fluid-sm text-muted-foreground mb-4 font-semibold tracking-widest uppercase">
          404 | Page not Found
        </p>

        <h1 className="text-fluid-3xl mb-4 font-bold tracking-tight">
          Looks like you&apos;ve hit a detour
        </h1>

        <p className="text-fluid-base text-muted-foreground mx-auto mb-8 max-w-md leading-relaxed">
          The page you&apos;re looking for isn&apos;t at this address. It may have been moved or
          removed, but your journey with us doesn&apos;t end here.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Link href="/" className="btn-primary gap-2">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>Back to home</span>
          </Link>

          <Link href="/#become-a-member" className="btn-secondary gap-2">
            <HeartHandshake className="h-4 w-4" aria-hidden="true" />
            <span>Support the mission</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
