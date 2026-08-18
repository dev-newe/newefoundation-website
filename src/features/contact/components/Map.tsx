import { Navigation } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import MapPinMarker from "@/features/contact/MapPinMarker";

type MapSectionProps = {
  data?: {
    title?: string;
    locationBadge?: string;
    locationName?: string;
    address?: string;
    email?: string;
    phone?: string;
    googleMapsUrl?: string;
    embedUrl?: string;
  };
};

const DEFAULT_EMBED_URL =
  "https://maps.google.com/maps?ll=22.7514381,88.3315948&t=m&z=17&ie=UTF8&output=embed";

const formatEmbedUrl = (url: string | null | undefined): string => {
  if (!url?.trim()) {
    return DEFAULT_EMBED_URL;
  }

  let cleanUrl = url.trim();

  // Support users pasting the entire <iframe ...> HTML.
  const iframeSrcMatch = cleanUrl.match(/src=["']([^"']+)["']/i);

  if (iframeSrcMatch) {
    cleanUrl = iframeSrcMatch[1];
  }

  let parsedUrl: URL;

  try {
    parsedUrl = new URL(cleanUrl);
  } catch {
    return DEFAULT_EMBED_URL;
  }

  // Only allow HTTPS Google Maps hosts.
  const allowedHosts = new Set(["www.google.com", "maps.google.com"]);

  if (parsedUrl.protocol !== "https:" || !allowedHosts.has(parsedUrl.hostname)) {
    return DEFAULT_EMBED_URL;
  }

  // Official Google Maps embed URL.
  if (parsedUrl.pathname === "/maps/embed") {
    return parsedUrl.toString();
  }

  // Legacy Google Maps embed URL.
  if (parsedUrl.pathname === "/maps" && parsedUrl.searchParams.get("output") === "embed") {
    // q=lat,lng → ll=lat,lng
    if (parsedUrl.searchParams.has("q")) {
      parsedUrl.searchParams.set("ll", parsedUrl.searchParams.get("q")!);
      parsedUrl.searchParams.delete("q");
    }

    if (parsedUrl.searchParams.has("ll")) {
      return parsedUrl.toString();
    }
  }

  // Extract coordinates from Google Maps URLs such as:
  // https://www.google.com/maps/search/.../@22.7514381,88.3315948,...
  const coordinateMatch = cleanUrl.match(/@(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/);

  if (coordinateMatch) {
    return `https://maps.google.com/maps?ll=${coordinateMatch[1]},${coordinateMatch[2]}&t=m&z=17&ie=UTF8&output=embed`;
  }

  // Anything else gets the safe DEFAULT_EMBED_URL.
  return DEFAULT_EMBED_URL;
};

const defaultMapData = {
  title: "Find Us in Serampore",
  locationName: "Navjyoti Education and Women Empowerment Foundation",
  locationBadge: "SERAMPORE OFFICE",
  address: "78/89, G.T. Road West, Simla, Serampore,\nHooghly, West Bengal, India - 712203",
  email: "info@newefoundation.org",
  phone: "+91 9876543210",
  googleMapsUrl:
    "https://www.google.com/maps/search/78%2F89,+G.T.+Road+West,+Simla,+Serampore,+Hooghly,+West+Bengal,+India.+Pincode+-+712203+/@22.7514381,88.3315948,17z/data=!3m1!4b1?entry=ttu&g_ep=EgoyMDI2MDgxMi4wIKXMDSoASAFQAw%3D%3D",
};

const Map = ({ data }: MapSectionProps) => {
  const title = data?.title || defaultMapData.title;
  const locationBadge = data?.locationBadge || defaultMapData.locationBadge;
  const locationName = data?.locationName || defaultMapData.locationName;
  const address = data?.address || defaultMapData.address;
  const email = data?.email || defaultMapData.email;
  const phone = data?.phone || defaultMapData.phone;
  const googleMapsUrl = data?.googleMapsUrl || defaultMapData.googleMapsUrl;
  const embedUrl = formatEmbedUrl(data?.embedUrl || DEFAULT_EMBED_URL);

  return (
    <SectionWrapper as="section" id="map" size="wide">
      {/* Section Heading */}
      <h2 className="text-primary text-center font-serif text-3xl font-medium tracking-tight sm:text-4xl lg:text-[40px] dark:text-emerald-100">
        {title}
      </h2>

      {/* Main Map & Card Container */}
      <div className="relative mt-8 flex flex-col gap-6 lg:block">
        {/* Map Container Frame */}
        <div className="border-border/60 bg-card relative aspect-4/3 min-h-[340px] w-full overflow-hidden rounded-[20px] border shadow-lg sm:aspect-16/9 sm:min-h-[420px] sm:rounded-[28px] md:min-h-[480px] lg:min-h-[540px]">
          {/* Google Maps Embed Iframe */}
          <iframe
            title="Google Map Location of Serampore HQ"
            src={embedUrl}
            className="h-full w-full border-0 dark:brightness-200 dark:invert"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            sandbox="allow-popups allow-popups-to-escape-sandbox allow-scripts allow-same-origin allow-top-navigation-by-user-activation"
            allowFullScreen
          />

          {/* Custom Location Pin Marker */}
          <MapPinMarker />
        </div>

        {/* Office Information / Directions Card (Below map on <=md, Floating top-right on >=lg) */}
        <div className="bg-card border-border/80 lg:bg-card/95 z-20 w-full rounded-[16px] border p-5 shadow-md transition-all duration-300 sm:rounded-[20px] sm:p-6 lg:absolute lg:top-6 lg:right-6 lg:max-w-xs lg:p-5 lg:shadow-xl lg:backdrop-blur-md dark:bg-stone-900 lg:dark:bg-stone-900/95">
          <span className="text-muted-foreground font-sans text-[10px] font-extrabold tracking-[0.14em] uppercase dark:text-emerald-400">
            {locationBadge}
          </span>

          <h3 className="text-primary mt-1 font-serif text-[17px] font-bold tracking-tight sm:text-[19px] dark:text-emerald-100">
            {locationName}
          </h3>

          <p className="mt-1.5 text-xs leading-relaxed text-[#4b514c] sm:text-[13px] dark:text-stone-300">
            {address}
          </p>

          <div className="border-border/60 mt-3 space-y-1 border-t pt-2.5 text-xs sm:text-[13px]">
            <a
              href={`mailto:${email}`}
              className="text-primary hover:text-accent block transition-colors dark:text-emerald-300"
            >
              {email}
            </a>
            <a
              href={`tel:${phone.replace(/\s+/g, "")}`}
              className="block text-[#4b514c] transition-colors hover:text-[#ea580c] dark:text-stone-300"
            >
              {phone}
            </a>
          </div>

          {/* Direct Directions Button */}
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary hover:bg-primary/90 mt-3.5 flex w-full items-center justify-center gap-1.5 rounded-lg px-3 py-2.5 text-xs font-semibold text-white shadow-xs transition-all hover:scale-[1.005] active:scale-[0.98] dark:bg-emerald-600 dark:hover:bg-emerald-500"
          >
            <Navigation className="h-3.5 w-3.5" />
            <span>Get Directions</span>
          </a>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Map;
