import SectionWrapper from "@/components/ui/SectionWrapper";
import { cn } from "@/lib/utils";
import { AppHomepage } from "@/payload-types";
import {
  GraduationCap,
  Users,
  FlaskConical,
  Heart,
  Target,
  Compass,
  HelpCircle,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

type AboutProps = {
  data?: AppHomepage["aboutUs"];
};

type AboutSection = NonNullable<NonNullable<AppHomepage["aboutUs"]>["sections"]>[number];

const defaultSections: AboutSection[] = [
  {
    icon: "GraduationCap",
    title: "Education",
    description:
      "Providing academic support, study materials, and mentorship to ensure every child has access to quality education. Our initiatives focus on reducing school dropout rates and creating a supportive learning environment for children from economically weaker sections.",
    stat: "100+ Students",
    id: "edu",
  },
  {
    icon: "Users",
    title: "Women Empowerment",
    description:
      "Empowering women through income-generating skills like tailoring, handicrafts, and digital literacy. We provide direct guidance on financial independence, self-help groups, and small business management to help women become self-reliant and confident.",
    stat: "15+ Women",
    highlighted: true,
    id: "emp",
  },
  {
    icon: "FlaskConical",
    title: "Skill Development",
    description:
      "Equipping youth with industry-relevant skills including computer training, communication, and entrepreneurship. We aim to improve local employability, encourage self-employment, and create sustainable livelihood opportunities for underserved individuals.",
    stat: "10+ Studies",
    id: "dev",
  },
];

//! Explicit registry of supported icons. No other icons entered will work.
const ICON_REGISTRY: Record<string, LucideIcon> = {
  GraduationCap,
  Users,
  FlaskConical,
  Heart,
  Target,
  Compass,
};

//TODO: Finalize the hrefs
const defaultIcons = [GraduationCap, Users, FlaskConical];
const defaultHrefs = ["#education", "#women-empowerment", "/documents/moa.pdf"];

const getAboutIcon = (iconName?: string | null, index: number = 0): LucideIcon => {
  if (iconName) {
    const matchedIcon = ICON_REGISTRY[iconName.trim()];
    if (matchedIcon) {
      return matchedIcon;
    }
  }
  return defaultIcons[index] || HelpCircle;
};

const About = ({ data }: AboutProps) => {
  const title = data?.title ?? "";
  const description = data?.description ?? "";
  const sections = data?.sections && data.sections.length > 0 ? data.sections : defaultSections;

  return (
    <SectionWrapper id="about" as="section" size="wide" className="bg-background">
      <div className="flex flex-col items-center justify-center gap-10">
        <div
          className={cn(
            "flex max-w-3xl flex-col items-center text-center",
            !title && !description && "sr-only"
          )}
        >
          {data?.badge && (
            <Badge variant="accent" className="mb-2">
              {" "}
              {data.badge}{" "}
            </Badge>
          )}

          <h2 id="about-heading" className="text-foreground text-fluid-5xl font-serif font-medium">
            {title || "Our Focus Pillars"}
          </h2>

          {description && (
            <p className="text-muted-foreground mt-4 text-sm leading-relaxed">{description}</p>
          )}
        </div>

        {/* Responsive Grid of Cards */}
        {sections.length > 0 && (
          <div className="grid w-full grid-cols-1 justify-items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sections.map((section, index) => {
              const Icon = getAboutIcon(section?.icon, index);
              const isDark = section?.highlighted;
              const href = defaultHrefs[index] || "#";

              return (
                <AboutCard
                  key={section?.id || section?.title}
                  title={section?.title ?? "Pillar"}
                  description={section?.description ?? ""}
                  icon={Icon}
                  stat={section?.stat ?? ""}
                  variant={isDark ? "dark" : "light"}
                  href={href}
                />
              );
            })}
          </div>
        )}
      </div>
    </SectionWrapper>
  );
};

interface AboutCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  stat: string;
  variant?: "light" | "dark";
  href?: string;
  className?: string;
}

const AboutCard = ({
  title,
  description,
  icon: Icon,
  stat,
  variant = "light",
  href = "#",
  className,
}: AboutCardProps) => {
  const isDark = variant === "dark";

  return (
    <article
      className={cn(
        "group border-border/40 flex h-full flex-col gap-4 rounded-2xl border p-8 shadow-sm transition-all duration-300 hover:shadow-md",
        isDark
          ? "bg-primary text-primary-foreground lg:-translate-y-4 lg:shadow-md lg:hover:shadow-lg"
          : "bg-card text-foreground",
        className
      )}
    >
      {/* Icon Circle */}
      <div
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-full",
          isDark ? "text-secondary bg-white/10" : "bg-primary/10 text-primary"
        )}
      >
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>

      {/* Title */}
      <h5 className={cn("font-serif", isDark ? "text-primary-foreground" : "text-foreground")}>
        {title}
      </h5>

      <p
        className={cn(
          "flex-grow text-sm leading-relaxed",
          isDark ? "text-primary-foreground/80" : "text-muted-foreground"
        )}
      >
        {description}
      </p>

      {/* Footer */}
      <footer className="border-border flex items-center justify-between border-t pt-2">
        <span className={cn("text-sm font-bold", isDark ? "text-secondary" : "text-accent")}>
          {stat}
        </span>

        <Link
          href={href}
          className={cn(
            buttonVariants({ variant: "ghost", size: "icon" }),
            "rounded-full border-none transition-all duration-300 hover:scale-105 active:scale-95",
            isDark && "hover:bg-secondary"
          )}
          aria-label={`Learn more about ${title}`}
        >
          <ArrowRight
            className="h-4 w-4 transition-transform hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
      </footer>
    </article>
  );
};

export default About;
