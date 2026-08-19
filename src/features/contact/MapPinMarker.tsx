import Image from "next/image";
import BrandIcon from "@/app/icon.png";
import { cn } from "@/lib/utils";

type MapPinMarkerProps = {
  className?: string;
  alt?: string;
};

const MapPinMarker = ({
  className,
  alt = "Navjyoti Foundation Location Pin",
}: MapPinMarkerProps) => {
  return (
    <div
      className={cn(
        "pointer-events-none absolute top-1/2 left-1/2 z-10 flex -translate-x-1/2 -translate-y-full flex-col items-center select-none",
        className
      )}
    >
      {/* Subtle pulse ring at the pin anchor */}
      <div className="absolute bottom-0 flex items-center justify-center">
        <span className="bg-primary absolute h-4 w-4 animate-ping rounded-full opacity-35 dark:bg-emerald-400" />
        <span className="bg-primary/90 h-1.5 w-1.5 rounded-full dark:bg-emerald-400" />
      </div>

      {/* Slim Pin Structure */}
      <div className="relative -mb-0.5 flex flex-col items-center drop-shadow-[0_4px_10px_rgba(0,0,0,0.22)] filter transition-transform duration-300 hover:scale-105">
        <svg
          width="40"
          height="52"
          viewBox="0 0 40 52"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Slender Teardrop Pin Body */}
          <path
            d="M20 0C8.954 0 0 8.954 0 20C0 34.5 18 50.8 19.3 51.9C19.7 52.2 20.3 52.2 20.7 51.9C22 50.8 40 34.5 40 20C40 8.954 31.046 0 20 0Z"
            className="fill-primary dark:fill-emerald-700"
          />
          {/* Inner White Logo Backdrop Circle (thin 2.5px rim) */}
          <circle cx="20" cy="20" r="16.5" className="fill-white dark:fill-stone-900" />
        </svg>

        {/* Brand Logo cleanly framed */}
        <div className="absolute top-[3.5px] left-[3.5px] flex h-[33px] w-[33px] items-center justify-center overflow-hidden rounded-full bg-white p-0.5 dark:bg-stone-900">
          <Image
            src={BrandIcon}
            alt={alt}
            width={28}
            height={28}
            className="h-full w-full object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default MapPinMarker;
