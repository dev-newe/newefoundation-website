import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { AppHomepage } from "@/payload-types";
import SectionWrapper from "@/components/ui/SectionWrapper";
import RippleSurface from "@/components/shared/cta/RippleSurface";
import { cn } from "@/lib/utils";

type CTAProps = {
  data?: AppHomepage["cta"];
};

const CTA = ({ data }: CTAProps) => {
  const cta = {
    title: data?.title ?? "Your small action creates a",
    highlight: data?.highlight ?? "ripple of real change",
    buttons:
      data?.buttons && data.buttons.length > 0
        ? data.buttons
        : [
            { label: "Donate Now", href: "/#donate" },
            { label: "Become a member", href: "/#become-a-member" },
          ],
  };

  return (
    <SectionWrapper
      as="section"
      id="cta"
      size="full"
      className="!px-0"
      ariaLabelledby="data-heading"
    >
      <RippleSurface
        className="m-3 overflow-hidden rounded-2xl"
        contentClassName="relative py-section px-page flex flex-col items-center justify-center gap-10"
      >
        {/* Dot grid overlay */}
        <div className="dot-grid opacity-20" aria-hidden="true" />

        <h2 id="data-heading" className="text-background relative z-10 text-center font-serif">
          <span>{cta?.title}</span>
          <br />
          <span className="text-secondary">{cta?.highlight}</span>
        </h2>

        <div className="flex flex-col gap-3 md:flex-row">
          <Link
            href={cta?.buttons[0]?.href || "#"}
            className={cn(
              buttonVariants({ variant: "accent", size: "lg" }),
              "h-12 w-full px-6 sm:w-auto"
            )}
          >
            {cta?.buttons[0]?.label}
          </Link>

          <Link
            href={cta?.buttons[1]?.href || "#"}
            className={cn(
              buttonVariants({ variant: "secondary", size: "lg" }),
              "h-12 w-full px-6 sm:w-auto"
            )}
          >
            {cta?.buttons[1]?.label}
          </Link>
        </div>
      </RippleSurface>
    </SectionWrapper>
  );
};

export default CTA;
