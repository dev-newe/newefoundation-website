import { ArrowRight, Heart, HandHeart, LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

import { AppHomepage } from "@/payload-types";
import { resolvePayloadImage } from "@/services/payload";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Asia from "./HeroImage";

type HeroProps = {
  data?: AppHomepage["hero"];
};

const iconMap: Record<string, LucideIcon> = {
  ArrowRight,
  Heart,
  HandHeart,
};

const Hero = ({ data }: HeroProps) => {
  const hero = {
    badge: {
      text: data?.badge?.text ?? "Creating lasting change",
    },
    title: {
      main: data?.title?.main ?? "Your help will change a life - Inspire hope, Empower futures",
      highlight: data?.title?.highlight,
    },
    buttons: data?.buttons,
    description:
      data?.description ??
      "Building an India where every individual has the power to thrive. Navjyoti Education and Women Empowerment foundation works to uplift underprivileged communities through education, skill development, and social awareness.",
    image: data?.image,
  };
  const heroImage = resolvePayloadImage(hero?.image, "/placeholder.png");
  const iconName = hero?.buttons?.[0]?.icon;

  const PrimaryIcon = iconName ? (iconMap[iconName] ?? ArrowRight) : ArrowRight;

  return (
    <SectionWrapper
      className="relative overflow-hidden"
      id="hero"
      size="full"
      ariaLabelledby="hero-heading"
    >
      <div className="mx-auto flex min-h-170 items-center px-6 py-20 sm:px-8 md:px-16 lg:min-h-180 lg:px-20">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-8">
          {/* Content */}
          <div className="relative z-10">
            {/* Status */}
            <div className="text-primary border-primary/30 bg-muted mb-7 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium">
              <span className="bg-accent h-1.5 w-1.5 rounded-full" />
              {hero?.badge?.text}
            </div>

            {/* Heading */}
            <h1 className="text-primary font-geist-sans text-5xl font-semibold xl:text-7xl">
              {hero?.title?.main} <span className="text-accent">{hero?.title?.highlight}</span>
            </h1>

            {/* Description */}
            <p className="text-muted-foreground mt-7 max-w-147.5 text-base leading-6 sm:text-[17px] sm:leading-7">
              {hero?.description}
            </p>

            {/* Actions */}
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              {/* Primary CTA */}
              <Link href={hero?.buttons?.[0]?.href ?? "#"}>
                <Button
                  size="lg"
                  className={cn("h-12", hero?.buttons?.[0]?.className)}
                  variant="accent"
                >
                  {hero?.buttons?.[0]?.label ?? "Become a Hero"}

                  <PrimaryIcon className="ml-2 size-4" />
                </Button>
              </Link>

              {/* Secondary CTA */}
              <Link href={hero?.buttons?.[1]?.href ?? "#"}>
                <Button
                  size="lg"
                  variant="outline"
                  className={cn("h-12", hero?.buttons?.[1]?.className)}
                >
                  {hero?.buttons?.[1]?.label ?? "Our Impact"}
                </Button>
              </Link>
            </div>
          </div>

          {/* India visual */}
          <div className="relative flex max-h-60 w-full items-center justify-center md:max-h-dvh md:min-h-50 lg:min-h-125">
            {/* Subtle background glow */}
            <div className="bg-accent/50 absolute top-[10%] left-[22%] size-40 rounded-full blur-3xl md:top-[25%] md:size-68" />
            <div
              className="absolute inset-0 z-1 -translate-x-10 scale-220 lg:scale-300 xl:-translate-x-20 xl:scale-280"
              style={{
                background: `radial-gradient(ellipse at center, transparent 5%, hsl(var(--background)/0.4) 45%, hsl(var(--background)) 60%, hsl(var(--accent-foreground)) 100%)`,
              }}
            />
            <div className="h-full w-full bg-cover bg-center">
              <Asia imageUrl={heroImage.url} />
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Hero;
