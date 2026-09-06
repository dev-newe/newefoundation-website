import DetailedWork from "@/features/work/components/DetailedWork";
import { AppHomepage } from "@/payload-types";
import SectionWrapper from "@/components/ui/SectionWrapper";

type WorkProps = {
  data?: AppHomepage["ourWork"];
};

const OurWork = ({ data }: WorkProps) => {
  const ourWorkData = {
    title: data?.title ?? "Our Work",
    description:
      data?.subtitle ??
      "Focusing our resources on what matters most. See our most recent activities that brought about change.",
    images: data?.featuredProject?.images ?? [],
  };
  return (
    <SectionWrapper
      id="our-work"
      as="section"
      size="full"
      className="px-4 py-20 sm:px-8 md:px-16 lg:min-h-180 lg:px-20"
      ariaLabelledby="our-work-heading"
    >
      {/* Section heading */}
      <h2 className="text-foreground text-fluid-4xl mb-4 text-center font-serif font-medium">
        {ourWorkData.title}
      </h2>

      <p className="text-foreground/60 mx-auto max-w-150 text-center text-sm leading-relaxed sm:text-base">
        {ourWorkData.description}
      </p>
      {/* Featured work */}
      <div className="mt-16 space-y-24">
        <DetailedWork data={data?.featuredProject} />
      </div>
    </SectionWrapper>
  );
};
export default OurWork;
