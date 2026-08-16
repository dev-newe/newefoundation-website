import SectionWrapper from "@/components/ui/SectionWrapper";
import { AppHomepage } from "@/payload-types";
import { resolvePayloadImage } from "@/services/payload";
import DiagonalCarousel from "./DiagonalCarousel";

type MissionProps = {
  data?: AppHomepage["missionVision"] | null;
};

const defaultMissionVision = {
  mission: {
    title: "Our Mission",
    description:
      "To create resilient communities by addressing the root causes of inequality. We believe in grassroots action, empowering local leaders to drive sustainable, generational change from within.",
    stat: {
      value: "50k+",
      label: "LIVES\nIMPACTED\nANNUALLY",
    },
  },
  vision: {
    title: "Our Vision",
    description:
      "A world where geographic and socioeconomic barriers do not dictate a child's future, where communities are self-sustaining, and where compassion drives systemic innovation.",
  },
};

type MissionImageItem = {
  url: string;
  alt: string;
};

function getMissionImages(imagesData: unknown): MissionImageItem[] {
  if (!imagesData) {
    return [];
  }

  // Support group schema with primary, secondary, and additionalImages (up to 4 more)
  if (typeof imagesData === "object" && !Array.isArray(imagesData)) {
    const imagesObj = imagesData as {
      primary?: Parameters<typeof resolvePayloadImage>[0];
      secondary?: Parameters<typeof resolvePayloadImage>[0];
      additionalImages?: Array<{ image?: Parameters<typeof resolvePayloadImage>[0] } | unknown>;
    };

    const primaryResolved = resolvePayloadImage(imagesObj.primary, "");
    const secondaryResolved = resolvePayloadImage(imagesObj.secondary, "");

    const additionalResolved = Array.isArray(imagesObj.additionalImages)
      ? imagesObj.additionalImages
          .map((item: unknown) => {
            const imgField =
              item && typeof item === "object" && "image" in item
                ? (item as { image?: Parameters<typeof resolvePayloadImage>[0] }).image
                : (item as Parameters<typeof resolvePayloadImage>[0]);
            return resolvePayloadImage(imgField, "");
          })
          .filter((img): img is MissionImageItem => {
            return Boolean(img.url && img.url.trim() !== "" && img.url !== "/placeholder.png");
          })
      : [];

    const combined = [primaryResolved, secondaryResolved, ...additionalResolved].filter(
      (img): img is MissionImageItem => {
        return Boolean(img.url && img.url.trim() !== "" && img.url !== "/placeholder.png");
      }
    );

    if (combined.length > 0) {
      return combined;
    }
  }

  // Fallback support if data is stored as a direct array
  if (Array.isArray(imagesData)) {
    return imagesData
      .map((item: unknown) => {
        const imgField =
          item && typeof item === "object" && "image" in item
            ? (item as { image?: Parameters<typeof resolvePayloadImage>[0] }).image
            : (item as Parameters<typeof resolvePayloadImage>[0]);
        return resolvePayloadImage(imgField, "");
      })
      .filter((img): img is MissionImageItem => {
        return Boolean(img.url && img.url.trim() !== "" && img.url !== "/placeholder.png");
      });
  }

  return [];
}

const Mission = ({ data }: MissionProps) => {
  const mission = {
    title: data?.mission?.title || defaultMissionVision.mission.title,
    description: data?.mission?.description || defaultMissionVision.mission.description,
    stat: {
      value: data?.mission?.stat?.value || defaultMissionVision.mission.stat.value,
      label: data?.mission?.stat?.label || defaultMissionVision.mission.stat.label,
    },
  };

  const vision = {
    title: data?.vision?.title || defaultMissionVision.vision.title,
    description: data?.vision?.description || defaultMissionVision.vision.description,
  };

  const missionImages = getMissionImages(data?.images);

  return (
    <SectionWrapper
      as="section"
      id="mission"
      size="wide"
      className="bg-background relative overflow-hidden"
    >
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10 xl:gap-16">
        {/* Left Column - Staggered Content */}
        <div className="flex flex-col justify-between space-y-8 sm:space-y-10 lg:col-span-6">
          {/* Mission Block - Left Aligned */}
          <div className="max-w-lg space-y-3 sm:space-y-4">
            <h2 className="text-primary font-serif text-3xl leading-tight font-bold tracking-tight sm:text-4xl lg:text-[42px] dark:text-emerald-100">
              {mission.title}
            </h2>
            <p className="text-sm leading-relaxed text-[#5d625e] sm:text-base dark:text-stone-300">
              {mission.description}
            </p>
          </div>

          {/* Stat Block - Left Aligned with Mission */}
          <div className="flex flex-col items-start gap-1">
            <span className="text-accent font-serif text-4xl leading-none font-bold tracking-tight sm:text-[44px]">
              {mission.stat.value}
            </span>
            <span className="text-primary font-sans text-[10px] leading-[1.2] font-extrabold tracking-[0.14em] whitespace-pre-line uppercase sm:text-[11px] dark:text-emerald-400">
              {mission.stat.label}
            </span>
          </div>

          {/* Vision Block - Staggered / Shifted Right */}
          <div className="max-w-lg space-y-3 border-l-[3px] border-[#9fe3c1] pl-5 sm:ml-8 sm:space-y-4 sm:pl-6 lg:ml-12 dark:border-emerald-400">
            <h2 className="text-primary font-serif text-3xl leading-tight font-bold tracking-tight sm:text-4xl lg:text-[42px] dark:text-emerald-100">
              {vision.title}
            </h2>
            <p className="text-sm leading-relaxed text-[#5d625e] sm:text-base dark:text-stone-300">
              {vision.description}
            </p>
          </div>
        </div>

        {/* Right Column - Diagonal Carousel */}
        <div className="relative flex flex-col items-center justify-center lg:col-span-6">
          <DiagonalCarousel images={missionImages} alt="Navjyoti Foundation Mission and Vision" />
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Mission;
