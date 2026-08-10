export default function Loading() {
  return (
    <main
      className="px-page flex min-h-[80vh] items-center justify-center"
      aria-label="Loading"
      role="status"
    >
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="space-y-1">
          <p className="text-fluid-sm text-muted-foreground">Please wait a moment...</p>
        </div>

        {/* Progress indicator */}
        <div className="bg-muted h-1 w-32 overflow-hidden rounded-full" aria-hidden="true">
          <div className="bg-accent h-full w-1/2 animate-[loading_1.4s_ease-in-out_infinite] rounded-full" />
        </div>
      </div>
    </main>
  );
}
