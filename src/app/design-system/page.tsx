export const metadata = {
  title: "Design System · Navjyoti",
  description: "Living reference for the Navjyoti /  Foundation design language.",
};

/* ─── tiny local helpers (no extra deps) ─────────────────────────────── */
function Token({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div className="border-border flex items-start justify-between gap-4 border-b py-2">
      <code className="text-fluid-sm text-accent font-mono">{label}</code>
      <span className="text-fluid-sm text-muted-foreground shrink-0 text-right">
        {value}
        {note && <span className="text-fluid-xs block opacity-60">{note}</span>}
      </span>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-fluid-xs text-muted-foreground mt-10 mb-4 font-semibold tracking-widest uppercase">
      {children}
    </p>
  );
}

function Divider() {
  return <hr className="border-border my-12" />;
}

/* ─── Swatch grid ──────────────────────────────────────────────────────── */
const palette = [
  { name: "Background", var: "var(--background)", hsl: "40 33% 97%", hex: "#F8F4EF" },
  { name: "Foreground", var: "var(--foreground)", hsl: "160 15% 12%", hex: "#1A2420" },
  { name: "Primary", var: "var(--primary)", hsl: "158 42% 18%", hex: "#174D38" },
  { name: "Primary FG", var: "var(--primary-foreground)", hsl: "40 33% 97%", hex: "#F8F4EF" },
  { name: "Secondary", var: "var(--secondary)", hsl: "40 20% 94%", hex: "#EDE9E1" },
  { name: "Accent", var: "var(--accent)", hsl: "28 85% 52%", hex: "#E07820" },
  { name: "Accent FG", var: "var(--accent-foreground)", hsl: "0 0% 100%", hex: "#FFFFFF" },
  { name: "Muted", var: "var(--muted)", hsl: "40 15% 92%", hex: "#E8E4DC" },
  { name: "Muted FG", var: "var(--muted-foreground)", hsl: "160 8% 42%", hex: "#626E69" },
  { name: "Card", var: "var(--card)", hsl: "0 0% 100%", hex: "#FFFFFF" },
  { name: "Destructive", var: "var(--destructive)", hsl: "0 72% 51%", hex: "#DC3131" },
  { name: "Border", var: "var(--border)", hsl: "40 15% 88%", hex: "#DDD8CE" },
];

/* ─── Type scale ──────────────────────────────────────────────────────── */
const typeScale: { cls: string; label: string; min: string; max: string }[] = [
  { cls: "text-fluid-xs", label: "xs", min: "0.75rem / 12px", max: "0.8125rem / 13px" },
  { cls: "text-fluid-sm", label: "sm", min: "0.875rem / 14px", max: "0.9375rem / 15px" },
  { cls: "text-fluid-base", label: "base", min: "1rem / 16px", max: "1.0625rem / 17px" },
  { cls: "text-fluid-lg", label: "lg", min: "1.125rem / 18px", max: "1.25rem / 20px" },
  { cls: "text-fluid-xl", label: "xl", min: "1.25rem / 20px", max: "1.5rem / 24px" },
  { cls: "text-fluid-2xl", label: "2xl", min: "1.5rem / 24px", max: "1.875rem / 30px" },
  { cls: "text-fluid-3xl", label: "3xl", min: "1.875rem / 30px", max: "2.25rem / 36px" },
  { cls: "text-fluid-4xl", label: "4xl", min: "2.25rem / 36px", max: "3rem / 48px" },
  { cls: "text-fluid-5xl", label: "5xl", min: "2.75rem / 44px", max: "3.75rem / 60px" },
  { cls: "text-fluid-6xl", label: "6xl", min: "3.25rem / 52px", max: "4.5rem / 72px" },
];

/* ─── Spacing tokens ──────────────────────────────────────────────────── */
const spacingTokens = [
  { token: "--space-1", value: "0.25rem / 4px" },
  { token: "--space-2", value: "0.5rem / 8px" },
  { token: "--space-3", value: "0.75rem / 12px" },
  { token: "--space-4", value: "1rem / 16px" },
  { token: "--space-5", value: "1.25rem / 20px" },
  { token: "--space-6", value: "1.5rem / 24px" },
  { token: "--space-8", value: "2rem / 32px" },
  { token: "--space-10", value: "2.5rem / 40px" },
  { token: "--space-12", value: "3rem / 48px" },
  { token: "--space-16", value: "4rem / 64px" },
  { token: "--space-20", value: "5rem / 80px" },
  { token: "--space-24", value: "6rem / 96px" },
];

const fluidSpacing = [
  { token: "--space-mob", value: "clamp(1rem, 4vw, 1.5rem)", note: "~16–24px" },
  { token: "--space-tab", value: "clamp(1.5rem, 5vw, 2.5rem)", note: "~24–40px" },
  { token: "--space-dsk", value: "clamp(2rem, 6vw, 4rem)", note: "~32–64px" },
  { token: "--section-y-mob", value: "clamp(3rem, 10vw, 4rem)", note: "section py mobile" },
  { token: "--section-y-tab", value: "clamp(4rem, 8vw, 5.5rem)", note: "section py tablet" },
  { token: "--section-y-dsk", value: "clamp(5rem, 7vw, 7.5rem)", note: "section py desktop" },
  { token: "--page-x-mob", value: "clamp(1rem, 5vw, 1.5rem)", note: "page px mobile" },
  { token: "--page-x-tab", value: "clamp(1.5rem, 4vw, 2.5rem)", note: "page px tablet" },
  { token: "--page-x-dsk", value: "clamp(2rem, 5vw, 4rem)", note: "page px desktop" },
];

/* ─── Radius tokens ───────────────────────────────────────────────────── */
const radii = [
  { token: "--radius-sm", value: "0.375rem", cls: "rounded-[0.375rem]" },
  { token: "--radius", value: "0.75rem", cls: "rounded-[0.75rem]" },
  { token: "--radius-lg", value: "1rem", cls: "rounded-[1rem]" },
  { token: "--radius-xl", value: "1.5rem", cls: "rounded-[1.5rem]" },
  { token: "--radius-full", value: "9999px", cls: "rounded-full" },
];

/* ─── Shadow tokens ───────────────────────────────────────────────────── */
const shadows = [
  { token: "--shadow-sm", label: "Shadow sm", cls: "shadow-sm" },
  { token: "--shadow-base", label: "Shadow base", cls: "shadow" },
  { token: "--shadow-md", label: "Shadow md", cls: "shadow-md" },
  { token: "--shadow-lg", label: "Shadow lg", cls: "shadow-lg" },
];

/* ═══════════════════════════════════════════════════════════════════════ */
export default function DesignPage() {
  return (
    <main
      style={{ backgroundColor: "hsl(var(--background))", color: "hsl(var(--foreground))" }}
      className="min-h-screen font-sans"
    >
      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <header
        style={{ backgroundColor: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}
        className="px-page py-section"
      >
        <div className="container-site">
          <p className="text-fluid-xs mb-4 tracking-widest uppercase opacity-60">
            Navjyoti · Foundation
          </p>
          <h1
            className="text-fluid-6xl mb-6 leading-none font-bold tracking-tight"
            style={{ color: "inherit" }}
          >
            Design System
          </h1>
          <p className="text-fluid-lg max-w-xl leading-relaxed opacity-80">
            Living reference for every colour, typeface, spacing token, and utility class defined in{" "}
            <code className="text-fluid-sm opacity-60">globals.css</code>.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <span className="btn-primary">Primary action</span>
            <span className="btn-secondary">Secondary action</span>
          </div>
        </div>
      </header>

      {/* ── MAIN CONTENT ───────────────────────────────────────────────── */}
      <div className="px-page py-section">
        <div className="container-site space-y-0">
          {/* ── 1. COLOUR PALETTE ──────────────────────────────────────── */}
          <section>
            <SectionLabel>1 · Colour palette</SectionLabel>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {palette.map(({ name, var: v, hsl, hex }) => (
                <div key={name} className="card-soft border-border overflow-hidden border">
                  <div style={{ background: `hsl(${hsl})`, height: "4rem" }} aria-hidden="true" />
                  <div className="p-3">
                    <p className="text-fluid-sm font-semibold">{name}</p>
                    <p className="text-fluid-xs text-muted-foreground font-mono">{hex}</p>
                    <p className="text-fluid-xs text-muted-foreground truncate font-mono opacity-70">
                      {hsl}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <Divider />

          {/* ── 2. TYPOGRAPHY ──────────────────────────────────────────── */}
          <section>
            <SectionLabel>2 · Fluid type scale</SectionLabel>
            <p className="text-fluid-sm text-muted-foreground mb-6">
              All sizes use <code>clamp()</code>. Resize the viewport to see them breathe. Base
              heading styles are set on <code>h1–h6</code> in the base layer.
            </p>

            {/* Heading demo */}
            <div className="card-soft p-mob border-border mb-6 border">
              <p className="text-fluid-xs text-muted-foreground mb-4 tracking-widest uppercase">
                h1–h6 base styles
              </p>
              {(["h1", "h2", "h3", "h4", "h5", "h6"] as const).map((Tag) => (
                <Tag key={Tag} style={{ marginBottom: "0.25em" }}>
                  {Tag.toUpperCase()} · Navjyoti
                </Tag>
              ))}
            </div>

            {/* Fluid classes */}
            <div className="space-y-1">
              {typeScale.map(({ cls, label, min, max }) => (
                <div
                  key={cls}
                  className="border-border flex items-baseline justify-between gap-4 border-b py-2"
                >
                  <span className={`${cls} leading-none font-medium`}>{label}</span>
                  <span className="text-fluid-xs text-muted-foreground shrink-0 font-mono">
                    {min} → {max}
                  </span>
                </div>
              ))}
            </div>

            {/* Prose */}
            <div className="card-soft p-mob border-border mt-6 border">
              <p className="text-fluid-xs text-muted-foreground mb-3 tracking-widest uppercase">
                .prose
              </p>
              <div className="prose">
                <p>
                  Navjyoti works at the intersection of land, community, and long-term — building
                  institutions that outlast their founders. This paragraph sits inside{" "}
                  <code>.prose</code>, which caps width at <code>65ch</code> and wires up the design
                  system&apos;s foreground and accent colours to prose variables.
                </p>
              </div>
            </div>
          </section>

          <Divider />

          {/* ── 3. SPACING ─────────────────────────────────────────────── */}
          <section>
            <SectionLabel>3 · Spacing tokens</SectionLabel>

            <div className="grid gap-8 md:grid-cols-2">
              {/* Base scale */}
              <div>
                <p className="text-fluid-xs text-muted-foreground mb-2 tracking-widest uppercase">
                  Base scale
                </p>
                {spacingTokens.map(({ token, value }) => (
                  <div
                    key={token}
                    className="border-border flex items-center gap-3 border-b py-1.5"
                  >
                    <div
                      style={{
                        width: value.split(" / ")[0],
                        height: "0.75rem",
                        backgroundColor: "hsl(var(--accent))",
                        borderRadius: "2px",
                        flexShrink: 0,
                      }}
                    />
                    <code className="text-fluid-xs text-accent">{token}</code>
                    <span className="text-fluid-xs text-muted-foreground ml-auto">{value}</span>
                  </div>
                ))}
              </div>

              {/* Fluid & semantic */}
              <div>
                <p className="text-fluid-xs text-muted-foreground mb-2 tracking-widest uppercase">
                  Fluid & semantic
                </p>
                {fluidSpacing.map(({ token, value, note }) => (
                  <Token key={token} label={token} value={value} note={note} />
                ))}
              </div>
            </div>

            {/* Utility class visual demo */}
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { cls: "p-mob", label: ".p-mob" },
                { cls: "p-tab", label: ".p-tab" },
                { cls: "p-dsk", label: ".p-dsk" },
              ].map(({ cls, label }) => (
                <div key={cls} className="border-border overflow-hidden rounded-(--radius) border">
                  <div
                    className={`${cls} bg-[hsl(var(--accent)/0.12)]`}
                    style={{ minHeight: "3rem" }}
                  >
                    <p className="text-fluid-xs text-accent font-mono">{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <Divider />

          {/* ── 4. RADIUS ──────────────────────────────────────────────── */}
          <section>
            <SectionLabel>4 · Border radius</SectionLabel>
            <div className="flex flex-wrap items-end gap-6">
              {radii.map(({ token, value, cls }) => (
                <div key={token} className="flex flex-col items-center gap-2">
                  <div
                    className={`${cls} border-primary bg-primary/8 border-2`}
                    style={{ width: "5rem", height: "5rem" }}
                  />
                  <code className="text-fluid-xs text-accent">{token}</code>
                  <span className="text-fluid-xs text-muted-foreground">{value}</span>
                </div>
              ))}
            </div>
          </section>

          <Divider />

          {/* ── 5. SHADOWS ─────────────────────────────────────────────── */}
          <section>
            <SectionLabel>5 · Shadows</SectionLabel>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {shadows.map(({ token, label, cls }) => (
                <div key={token} className="flex flex-col items-center gap-4">
                  <div
                    className={`${cls} bg-card rounded-(--radius)`}
                    style={{ width: "8rem", height: "6rem" }}
                  />
                  <div className="text-center">
                    <p className="text-fluid-sm font-medium">{label}</p>
                    <code className="text-fluid-xs text-accent">{token}</code>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <Divider />

          {/* ── 6. COMPONENT UTILITIES ─────────────────────────────────── */}
          <section>
            <SectionLabel>6 · Component utilities</SectionLabel>

            <div className="grid gap-8 md:grid-cols-2">
              {/* Buttons */}
              <div>
                <p className="text-fluid-xs text-muted-foreground mb-4 tracking-widest uppercase">
                  Buttons
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <button className="btn-primary">Primary action</button>
                  <button className="btn-secondary">Secondary action</button>
                  <button
                    className="btn-primary cursor-not-allowed opacity-50"
                    disabled
                    aria-disabled="true"
                  >
                    Disabled
                  </button>
                </div>
                <div className="mt-4 space-y-1">
                  <Token
                    label=".btn-primary"
                    value="accent bg · white text · full radius · 600 weight"
                  />
                  <Token
                    label=".btn-secondary"
                    value="secondary · border · full radius · 500 weight"
                  />
                </div>
              </div>

              {/* Cards */}
              <div>
                <p className="text-fluid-xs text-muted-foreground mb-4 tracking-widest uppercase">
                  Cards
                </p>
                <div className="space-y-4">
                  <div className="card-soft border-border border p-5">
                    <p className="text-fluid-sm mb-1 font-semibold">.card-soft</p>
                    <p className="text-fluid-sm text-muted-foreground">
                      White background · base radius · shadow-base
                    </p>
                  </div>
                  <div className="card-dark">
                    <p className="text-fluid-sm mb-1 font-semibold">.card-dark</p>
                    <p className="text-fluid-sm opacity-75">
                      Primary (forest green) background · base radius · spacing-6 padding
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <Divider />

          {/* ── 7. LAYOUT CONTAINERS ───────────────────────────────────── */}
          <section>
            <SectionLabel>7 · Layout containers</SectionLabel>
            <div className="space-y-4">
              <div
                style={{ border: "2px dashed hsl(var(--accent))", padding: "1rem" }}
                className="container-site"
              >
                <p className="text-fluid-sm">
                  <code className="text-accent">.container-site</code> — max-width{" "}
                  <strong>72rem (1152px)</strong>, auto-centred
                </p>
              </div>
              <div
                style={{ border: "2px dashed hsl(var(--primary))", padding: "1rem" }}
                className="container-narrow"
              >
                <p className="text-fluid-sm">
                  <code className="text-primary">.container-narrow</code> — max-width{" "}
                  <strong>42rem (672px)</strong>, for text-heavy sections
                </p>
              </div>
            </div>

            <div className="mt-6">
              <Token label=".px-page" value="responsive: mob → tab → desk via media queries" />
              <Token label=".py-section" value="responsive: mob → tab → desk via media queries" />
              <Token label=".gap-mob / gap-tab / gap-dsk" value="fluid gap utilities" />
            </div>
          </section>

          <Divider />

          {/* ── 8. INTERACTIVE STATES ──────────────────────────────────── */}
          <section>
            <SectionLabel>8 · Interactive & accessibility states</SectionLabel>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="card-soft border-border border p-5">
                <p className="text-fluid-xs text-muted-foreground mb-3 tracking-widest uppercase">
                  Focus ring
                </p>
                <button
                  className="btn-primary"
                  style={{ outline: "2px solid hsl(var(--ring))", outlineOffset: "2px" }}
                >
                  Focused state
                </button>
                <p className="text-fluid-xs text-muted-foreground mt-3">
                  <code>:focus-visible</code> — 2px ring at{" "}
                  <code style={{ color: "hsl(var(--accent))" }}>--ring</code> (accent / warm orange)
                </p>
              </div>

              <div className="card-soft border-border border p-5">
                <p className="text-fluid-xs text-muted-foreground mb-3 tracking-widest uppercase">
                  Selection
                </p>
                <p
                  className="text-fluid-sm"
                  style={{
                    background: "hsl(var(--accent) / 0.25)",
                    color: "hsl(var(--foreground))",
                    borderRadius: "var(--radius-sm)",
                    padding: "0.25rem 0.5rem",
                    display: "inline",
                  }}
                >
                  ::selection preview
                </p>
                <p className="text-fluid-xs text-muted-foreground mt-3">
                  Accent at 25% opacity over default foreground
                </p>
              </div>

              <div className="card-soft border-border border p-5">
                <p className="text-fluid-xs text-muted-foreground mb-3 tracking-widest uppercase">
                  Destructive
                </p>
                <button
                  className="btn-primary"
                  style={{ backgroundColor: "hsl(var(--destructive))" }}
                >
                  Delete item
                </button>
                <p className="text-fluid-xs text-muted-foreground mt-3">
                  <code>--destructive</code> 0 72% 51% · white foreground
                </p>
              </div>
            </div>
          </section>

          <Divider />

          {/* ── 9. MOTION PREFERENCE ───────────────────────────────────── */}
          <section>
            <SectionLabel>9 · Motion & accessibility</SectionLabel>
            <div className="card-soft border-border max-w-2xl border p-5">
              <div className="space-y-1">
                <Token label="scroll-behavior" value="smooth (auto when prefers-reduced-motion)" />
                <Token label="-webkit-font-smoothing" value="antialiased" />
                <Token label="animation-duration" value="0.01ms !important — reduced-motion" />
                <Token label="transition-duration" value="0.01ms !important — reduced-motion" />
                <Token label="--header-height" value="4.5rem" />
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* ── FOOTER ─────────────────────────────────────────────────────── */}
      <footer style={{ borderTop: "1px solid hsl(var(--border))" }} className="px-page py-8">
        <div className="container-site flex flex-wrap items-center justify-between gap-4">
          <p className="text-fluid-sm text-muted-foreground">
            Navjyoti · Foundation — Design System Alpha V1
          </p>
          <p className="text-fluid-xs text-muted-foreground font-mono opacity-60">
            globals.css · Tailwind v4 · Next.js 16
          </p>
        </div>
      </footer>
    </main>
  );
}
