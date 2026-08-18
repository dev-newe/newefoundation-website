import PageTransition from "@/components/animations/ComponentTransition";
import RichText from "@/components/ui/RichText";
import SectionWrapper from "@/components/ui/SectionWrapper";
import ContactCard from "@/components/shared/legal/ContactCard";
import { AppPrivacy } from "@/payload-types";
import { Calendar } from "lucide-react";

type PrivacyProps = {
  data?: AppPrivacy | null;
};

const Privacy = ({ data }: PrivacyProps) => {
  const privacy = {
    title: data?.title ?? "Privacy Policy",
    description:
      data?.description ?? "Learn how we collect, use, and protect your personal information.",
    content: data?.content ?? null,
    contactCta: {
      title: data?.contactCta?.title ?? "Privacy Concerns?",
      description:
        data?.contactCta?.description ??
        "We are committed to securing your personal information. For any data-related queries, please write to us.",
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
    <SectionWrapper size="wide">
      <PageTransition>
        {/* Header Block */}
        <header className="border-border/60 mb-12 border-b pb-8">
          <h1 className="text-primary font-serif text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            {privacy.title}
          </h1>
          <p className="text-muted-foreground mt-4 max-w-3xl text-base leading-relaxed">
            {privacy.description}
          </p>
          {privacy.lastUpdated && (
            <p className="text-muted-foreground mt-4 flex items-center gap-1.5 text-sm">
              <Calendar className="size-4" />
              Last updated on {privacy.lastUpdated}
            </p>
          )}
        </header>
      </PageTransition>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_350px]">
        <PageTransition>
          {/* Main Text Content */}
          <main className="bg-card border-border/40 rounded-2xl border p-6 shadow-sm md:p-10">
            {privacy.content ? (
              <RichText content={privacy.content} />
            ) : (
              <p className="text-muted-foreground">
                No privacy policy content is available at this time.
              </p>
            )}
          </main>
        </PageTransition>

        {/* Sidebar info */}
        <PageTransition>
          <aside className="h-fit lg:sticky lg:top-28">
            <ContactCard
              title={privacy.contactCta.title}
              description={privacy.contactCta.description}
              buttonLabel={privacy.contactCta.button.label}
              buttonHref={privacy.contactCta.button.href}
            />
          </aside>
        </PageTransition>
      </div>
    </SectionWrapper>
  );
};

export default Privacy;
