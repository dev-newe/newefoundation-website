import Marquee from "@/components/ui/marquee";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { AppHomepage } from "@/payload-types";
import { resolvePayloadImage } from "@/services/payload";

type PartnersProps = {
  data?: AppHomepage["ourPartners"];
};

type Partner = NonNullable<NonNullable<AppHomepage["ourPartners"]>["partners"]>[number];
//TODO: Proper fallbacks
const defaultPartners: Partner[] = [];

export const Partners = ({ data }: PartnersProps) => {
  const partners = {
    title: data?.title ?? "Partners in Change",
    description:
      data?.description ??
      "We work alongside mission-aligned allies who trust us to make a difference.",
    partners: data?.partners && data.partners.length > 0 ? data.partners : defaultPartners,
  };

  return (
    <SectionWrapper
      id="partners"
      as="section"
      size="full"
      className="mx-auto max-w-[2048px]"
      ariaLabelledby="partners-heading"
    >
      <h2
        id="partners-heading"
        className="text-fluid-5xl text-foreground text-center font-serif font-medium"
      >
        {partners.title}
      </h2>

      <p className="text-foreground/60 mx-auto max-w-150 text-center text-sm leading-relaxed sm:text-base">
        {partners.description}
      </p>

      <div className="mt-6 w-full">
        <Marquee isAccessible>
          {partners.partners.map((partner) => (
            <PartnerCard key={partner.id ?? partner.name} partner={partner} isAccessible />
          ))}
        </Marquee>

        <Marquee direction="right">
          {partners.partners.map((partner) => (
            <PartnerCard key={partner.id ?? partner.name} partner={partner} />
          ))}
        </Marquee>
      </div>
    </SectionWrapper>
  );
};

type PartnerCardProps = {
  partner: Partner;
  isAccessible?: boolean;
};

const PartnerCard = ({ partner, isAccessible = false }: PartnerCardProps) => {
  const { url, alt } = resolvePayloadImage(partner.logo);

  const content = (
    <div className="flex h-12 w-32 shrink-0 items-center justify-center opacity-65 grayscale transition-all duration-300 select-none hover:opacity-100 hover:grayscale-0">
      <img
        src={url}
        alt={alt ?? partner.name}
        width={128}
        height={48}
        className="max-h-full max-w-full object-contain"
      />
    </div>
  );

  if (!partner.url) {
    return content;
  }

  return (
    <a
      href={partner.url}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={isAccessible ? undefined : -1}
      className="cursor-pointer"
    >
      {content}
    </a>
  );
};

export default Partners;
