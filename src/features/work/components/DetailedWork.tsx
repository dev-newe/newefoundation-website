import { AppHomepage } from "@/payload-types";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { resolvePayloadImage } from "@/services/payload";

type FeaturedProps = {
  data?: AppHomepage["ourWork"]["featuredProject"];
};

const DetailedWork = ({
  data,
  reversed = false,
  className,
}: FeaturedProps & { reversed?: boolean; className?: string }) => {
  const detailWorkData = {
    title: data?.title ?? "Placeholder Title",
    description:
      data?.description ??
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever  since 1966, when designers at Letraset\n an since 1966, when designers at Letraset and James Mosley, the librarian at\nDate: 23-9-25",
    category: data?.category ?? "Placeholder Category",
    images:
      data?.images && data.images.length > 0
        ? data.images.map((image) => resolvePayloadImage(image.img, "/navjyoti.png"))
        : [],
  };

  const workImages = detailWorkData.images.filter((image) => image.url);
  const imageCount = workImages.length;

  return (
    <article
      className={cn(
        "bg-muted grid items-center gap-8 rounded-lg p-2",
        "lg:grid-cols-[1.1fr_1fr] lg:gap-0",
        reversed && "lg:grid-cols-[1fr_1.1fr]",
        className
      )}
      id="featured-work"
    >
      <div className={cn("order-1 mt-auto mb-0 p-8", reversed ? "lg:order-1" : "lg:order-2")}>
        <div className="border-accent/30 bg-accent/10 text-accent mb-4 w-fit rounded-2xl border px-3 py-1 text-sm font-medium">
          {detailWorkData.category}
        </div>

        <h3 className="text-2xl leading-tight font-medium sm:text-3xl">{detailWorkData.title}</h3>

        <p className="mt-7 text-justify text-base leading-7 whitespace-pre-line sm:text-lg">
          {detailWorkData.description}
        </p>
      </div>

      {imageCount === 0 && (
        <div
          className={cn(
            "order-2 min-h-105 rounded-[2rem] border border-white/80 bg-gray-200",
            reversed ? "lg:order-2" : "lg:order-1"
          )}
        />
      )}

      {imageCount > 0 && (
        <div
          className={cn(
            "order-2 grid gap-2",
            imageCount === 1 && "grid-cols-1",
            imageCount === 2 && "grid-cols-2",
            imageCount === 3 && "grid-cols-2",
            imageCount === 4 && "grid-cols-2",
            imageCount === 1 && "min-h-105",
            imageCount === 2 && "min-h-160",
            imageCount === 3 && "min-h-160",
            imageCount === 4 && "min-h-160",
            "lg:min-h-105",
            imageCount === 1 && "lg:grid-cols-1",
            imageCount === 2 && "lg:grid-cols-2",
            imageCount === 3 && "lg:grid-cols-[1.45fr_0.8fr]",
            imageCount === 4 && "lg:grid-cols-2",
            reversed && "lg:order-2",
            !reversed && "lg:order-1"
          )}
        >
          {workImages.map((image, index) => (
            <div
              key={index}
              className={cn(
                "relative overflow-hidden rounded-xl border border-white/80",
                imageCount === 1 && "min-h-105",
                imageCount === 2 && "min-h-60",
                imageCount === 3 && "min-h-60",
                imageCount === 4 && "min-h-60",
                imageCount === 1 && "lg:min-h-125",
                imageCount === 2 && "lg:min-h-105",
                imageCount === 3 &&
                  index === 0 &&
                  "col-span-2 lg:col-span-1 lg:row-span-2 lg:min-h-125",
                imageCount === 3 && index > 0 && "lg:min-h-60",

                imageCount === 4 && "lg:min-h-62.5"
              )}
            >
              <Image
                src={image.url}
                alt={image.alt}
                fill
                sizes={
                  imageCount === 3
                    ? index === 0
                      ? "(max-width: 1024px) 50vw, 45vw"
                      : "(max-width: 1024px) 50vw, 25vw"
                    : "(max-width: 1024px) 50vw, 30vw"
                }
                className="object-cover transition-transform duration-500 hover:scale-[1.03]"
              />
            </div>
          ))}
        </div>
      )}
    </article>
  );
};

export default DetailedWork;
