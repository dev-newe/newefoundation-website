"use client";
import Link from "next/link";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <main className="px-page py-section flex min-h-[60vh] items-center justify-center" role="alert">
      <div className="container-narrow text-center">
        <div
          className="bg-accent/10 mx-auto mb-6 flex size-16 items-center justify-center rounded-full"
          aria-hidden="true"
        >
          <div className="bg-accent text-accent-foreground flex size-10 items-center justify-center rounded-full">
            <span className="text-xl font-bold">!</span>
          </div>
        </div>

        {/* Message */}
        <p className="text-fluid-sm text-accent mb-2 font-semibold tracking-widest uppercase">
          Something went wrong
        </p>

        <h1 className="text-fluid-3xl">We couldn&apos;t load this page</h1>

        <p className="text-fluid-base text-muted-foreground mx-auto mt-4 max-w-lg">
          Something unexpected happened while loading this page. Please try again, or come back in a
          little while.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button type="button" onClick={() => reset()} className="btn-primary">
            Try again
          </button>

          <Link href="/" className="btn-secondary">
            Go to homepage
          </Link>
        </div>

        {/* Development-only error information */}
        {process.env.NODE_ENV === "development" && (
          <details className="mx-auto mt-8 max-w-xl text-left">
            <summary className="text-muted-foreground cursor-pointer text-sm font-medium">
              Error details
            </summary>

            <pre className="bg-primary text-primary-foreground mt-3 overflow-x-auto rounded-(--radius) p-4 text-xs">
              {error.message}
            </pre>
          </details>
        )}
      </div>
    </main>
  );
}
