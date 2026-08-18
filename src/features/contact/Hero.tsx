import Image from "next/image";
import { ArrowDown, ArrowLeft, ArrowRight, LucideIcon } from "lucide-react";
import { AppContactpage } from "@/payload-types";
import { resolvePayloadImage } from "@/services/payload";

type ContactHeroProps = {
  data?: AppContactpage["hero"];
};

const iconMap: Record<string, LucideIcon> = {
  ArrowRight,
  ArrowDown,
  ArrowLeft,
};

export default function ContactHero({ data }: ContactHeroProps) {
  const heroData = {
    image: resolvePayloadImage(data?.image, "/navjyoti.png"),
    title: {
      main:
        typeof data?.title === "object" && data?.title?.main
          ? data?.title?.main
          : "Together, We Can",
      highlight:
        typeof data?.title === "object" && data?.title?.highlight
          ? data?.title?.highlight
          : "Make a Change",
    },
    description:
      data?.description ??
      "Have a question, an idea, or a desire to make a difference? We'd love to hear from you.",
    badge: {
      text: data?.badge?.text ?? "CONTACT US",
    },
    buttons:
      data?.buttons && data?.buttons?.length > 0
        ? data?.buttons
        : [{ label: "Get in Touch", href: "#contact-form" }],
  };

  const iconName = heroData?.buttons?.[0]?.icon;

  const PrimaryIcon = iconName ? (iconMap[iconName] ?? ArrowDown) : ArrowDown;

  return (
    <section className="relative h-[calc(100svh-180px)] overflow-hidden">
      <Image
        src={heroData.image.url}
        alt={heroData.image.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/75" />

      <div className="relative z-10 flex h-[calc(100svh-180px)] items-end">
        <div className="mx-auto w-full max-w-7xl px-5 pb-16 sm:px-8 sm:pb-20 lg:px-10 lg:pb-24">
          <div className="max-w-4xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 backdrop-blur-md">
              <span className="bg-accent size-1.5 rounded-full" />

              <span className="text-[11px] font-semibold tracking-[0.22em] text-white">
                {heroData.badge.text}
              </span>
            </div>

            <h1 className="max-w-4xl font-serif text-5xl leading-[1.02] tracking-[-0.03em] text-white sm:text-6xl lg:text-8xl">
              {heroData.title.main}{" "}
              <span className="text-accent font-geist-sans">{heroData.title.highlight}</span>
            </h1>

            <p className="mt-6 max-w-xl font-serif text-base leading-7 text-white/85 sm:text-lg">
              {heroData.description}
            </p>

            <div className="mt-9 flex items-center gap-4">
              <a
                href={heroData.buttons[0].href ?? "#"}
                className="group inline-flex items-center gap-3 text-sm font-medium text-white"
              >
                <span className="group-hover:border-accent border-b border-white/60 pb-1 transition-colors">
                  {heroData.buttons[0].label}
                </span>

                <span className="group-hover:border-accent group-hover:bg-accent flex size-8 items-center justify-center rounded-full border border-white/40 transition-all duration-300">
                  <PrimaryIcon
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-y-0.5"
                  />
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
