import PageTransition from "@/components/animations/ComponentTransition";
import RichText from "@/components/ui/RichText";
import SectionWrapper from "@/components/ui/SectionWrapper";
import ContactCard from "@/components/shared/legal/ContactCard";
import { AppTerm } from "@/payload-types";
import { Calendar } from "lucide-react";

type TermsProps = {
  data?: AppTerm | null;
};

const Terms = ({ data }: TermsProps) => {
  const terms = {
    title: data?.title ?? "Terms and Conditions",
    description:
      data?.description ?? "Read the terms and conditions for using our website and services.",
    content: data?.content ?? null,
    contactCta: {
      title: data?.contactCta?.title ?? "Have Questions?",
      description:
        data?.contactCta?.description ??
        "If you have any questions or clarifications regarding our terms, feel free to contact our support team.",
      button: {
        label: data?.contactCta?.button?.label ?? "Contact Us",
        href: data?.contactCta?.button?.href ?? "/contact",
      },
    },
    lastUpdated: data?.updatedAt
      ? new Date(data.updatedAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : null,
  };

  return (
    <div className="bg-background min-h-screen py-10 transition-colors duration-200">
      <SectionWrapper size="wide">
        {/* Header Block */}
        <PageTransition>
          <header className="border-border/60 mb-12 border-b pb-8">
            <h1 className="text-primary font-serif text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              {terms.title}
            </h1>
            <p className="text-muted-foreground mt-4 max-w-3xl text-base leading-relaxed">
              {terms.description}
            </p>
            {terms.lastUpdated && (
              <p className="text-muted-foreground mt-4 flex items-center gap-1.5 text-sm">
                <Calendar className="size-4" />
                Last updated on {terms.lastUpdated}
              </p>
            )}
          </header>
        </PageTransition>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_350px]">
          <PageTransition>
            {/* Main Text Content */}
            <main className="bg-card border-border/40 rounded-2xl border p-6 shadow-sm md:p-10">
              {terms.content ? (
                <RichText content={terms.content} />
              ) : (
                <p className="text-muted-foreground">
                  No terms and conditions content is available at this time.
                </p>
              )}
            </main>
          </PageTransition>

          {/* Sidebar info */}
          <PageTransition>
            <aside className="h-fit space-y-6 lg:sticky lg:top-28">
              <ContactCard
                title={terms.contactCta.title}
                description={terms.contactCta.description}
                buttonLabel={terms.contactCta.button.label}
                buttonHref={terms.contactCta.button.href}
              />
            </aside>
          </PageTransition>
        </div>
      </SectionWrapper>
    </div>
  );
};

export default Terms;
