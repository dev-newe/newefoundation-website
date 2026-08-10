import Link from "next/link";

export default function NotFound() {
  return (
    <main className="px-page py-section flex min-h-[60vh] items-center justify-center">
      <div className="container-narrow text-center">
        <div
          className="text-fluid-6xl text-primary mb-6 font-bold tracking-tight"
          aria-hidden="true"
        >
          404
        </div>

        {/* Message */}
        <p className="text-fluid-sm text-primary mb-2 font-semibold tracking-widest uppercase">
          Page not found
        </p>

        <h1 className="text-fluid-3xl">We couldn&apos;t find that page</h1>

        <p className="text-fluid-base text-muted-foreground mx-auto mt-4 max-w-lg">
          The page you&apos;re looking for may have been moved, removed, or the address may be
          incorrect.
        </p>

        {/* Action */}
        <div className="mt-8 flex justify-center">
          <Link href="/" className="btn-primary">
            Back to homepage
          </Link>
        </div>
      </div>
    </main>
  );
}
