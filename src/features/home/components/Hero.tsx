import indiaSvg from "@/assets/svgs/india.svg";
import { ArrowRight, Heart, HandHeart, LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

import { AppHomepage } from "@/payload-types";

type HeroProps = {
  data?: AppHomepage["hero"];
};

const iconMap: Record<string, LucideIcon> = {
  ArrowRight,
  Heart,
  HandHeart,
};

const Hero = ({ data: hero }: HeroProps) => {
  const heroImage =
    typeof hero?.image === "object" && hero?.image !== null
      ? typeof hero?.image.media === "string"
        ? hero?.image.media
        : hero?.image.media?.url || hero?.image.src || "/navjyoti.png"
      : "/navjyoti.png";

  const iconName = hero?.buttons?.[0]?.icon;

  const PrimaryIcon = iconName ? (iconMap[iconName] ?? ArrowRight) : ArrowRight;

  return (
    <section className="bg-background relative overflow-hidden">
      <div className="mx-auto flex min-h-170 items-center px-6 py-20 sm:px-8 md:px-16 lg:min-h-180 lg:px-20">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-8">
          {/* Content */}
          <div className="relative z-10">
            {/* Status */}
            <div className="text-primary border-primary/30 mb-7 inline-flex items-center gap-2 rounded-full border bg-[#eeece5] px-3.5 py-1.5 text-xs font-medium">
              <span className="bg-accent h-1.5 w-1.5 rounded-full" />
              {hero?.badge?.text ?? "Creating lasting change"}
            </div>

            {/* Heading */}
            <h1 className="text-primary font-sans text-5xl font-semibold xl:text-7xl">
              {hero?.title?.main ?? "Your help will change a life - Inspire hope, Empower futures"}
            </h1>

            {/* Description */}
            <p className="mt-7 max-w-147.5 text-base leading-6 text-[#5d625e] sm:text-[17px] sm:leading-7">
              {hero?.description ??
                "Building an India where every individual has the power to thrive. Navjyoti Education and Women Empowerment foundation works to uplift underprivileged communities through education, skill development, and social awareness."}
            </p>

            {/* Actions */}
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              {/* Primary CTA */}
              <Link href={hero?.buttons?.[0]?.href ?? "#"}>
                <Button
                  size="lg"
                  className={cn(
                    "bg-accent hover:bg-accent/90 h-12 rounded-lg px-6 font-semibold text-white",
                    hero?.buttons?.[0]?.className
                  )}
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
                  className={cn(
                    "border-primary/70 text-primary hover:bg-primary/5 hover:text-primary/90 h-12 cursor-pointer rounded-lg px-6 font-medium",
                    hero?.buttons?.[1]?.className
                  )}
                >
                  {hero?.buttons?.[1]?.label ?? "Our Impact"}
                </Button>
              </Link>
            </div>
          </div>

          {/* India visual */}
          <div className="relative flex min-h-97.5 items-center justify-center lg:min-h-125">
            {/* Subtle background glow */}
            <div className="absolute top-[15%] right-[12%] size-48 rounded-full bg-[#f6e5ce]/60 blur-3xl" />
            <div
              className="h-150 w-full bg-cover bg-center"
              style={{
                backgroundImage: `url("${encodeURI(heroImage)}")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                maskImage: `url(${indiaSvg.src})`,
                WebkitMaskImage: `url(${indiaSvg.src})`,

                maskSize: "100% 100%",
                WebkitMaskSize: "100% 100%",

                maskPosition: "center",
                WebkitMaskPosition: "center",

                maskRepeat: "no-repeat",
                WebkitMaskRepeat: "no-repeat",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
