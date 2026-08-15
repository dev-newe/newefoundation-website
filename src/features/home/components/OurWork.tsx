import DetailedWork from "@/features/work/components/DetailedWork";
import { AppHomepage } from "@/payload-types";

type WorkProps = {
  data: AppHomepage["ourWork"];
};

const OurWork = ({ data }: WorkProps) => {
  console.log("OurWork data:", data); // Debugging line to check the data being passed
  const ourWorkData = {
    title: data?.title ?? "Our Work",
    description:
      data?.subtitle ??
      "Focusing our resources on what matters most. See our most recent activities that brought about change.",
    images: data?.featuredProject?.images ?? [],
  };
  return (
    <section className="px-4 py-20 sm:px-8 md:px-16 lg:min-h-180 lg:px-20">
      <div className="">
        {/* Section heading */}
        <div className="text-center">
          <h2 className="text-primary text-5xl font-medium lg:text-6xl">{ourWorkData.title}</h2>

          <p className="mx-auto mt-2 max-w-xl text-lg">{ourWorkData.description}</p>
        </div>

        {/* Featured work */}
        <div className="mt-16 space-y-24">
          <DetailedWork data={data?.featuredProject} />
        </div>
      </div>
    </section>
  );
};
export default OurWork;
