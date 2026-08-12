"use client";

import Link from "next/link";
import { RefreshCw, Home } from "lucide-react";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  return (
    <main
      className="px-page py-section flex h-screen flex-col items-center justify-center text-center"
      role="alert"
    >
      <div className="container-narrow flex flex-col items-center">
        <p className="text-fluid-sm text-muted-foreground mb-4 font-semibold tracking-widest uppercase">
          Something went wrong
        </p>

        <h1 className="text-fluid-3xl mb-4 font-bold tracking-tight">
          We couldn&apos;t load this page
        </h1>

        <p className="text-fluid-base text-muted-foreground mx-auto mb-8 max-w-md leading-relaxed">
          Even the best stories have unexpected turns. You can try again, or head back home while we
          sort this out.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row">
          <button onClick={reset} className="btn-primary gap-2">
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
            <span>Try again</span>
          </button>

          <Link href="/" className="btn-secondary gap-2">
            <Home className="h-4 w-4" aria-hidden="true" />
            <span>Back to home</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
