import { Navigation } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import MapPinMarker from "./MapPinMarker";

type MapSectionProps = {
  data?: {
    title?: string | null;
    locationBadge?: string | null;
    locationName?: string | null;
    address?: string | null;
    email?: string | null;
    phone?: string | null;
    googleMapsUrl?: string | null;
    embedUrl?: string | null;
  } | null;
};

const formatEmbedUrl = (url: string | null | undefined): string => {
  const fallback =
    "https://maps.google.com/maps?ll=22.7514381,88.3315948&t=m&z=17&ie=UTF8&output=embed";

  if (!url || typeof url !== "string" || url.trim() === "") {
    return fallback;
  }

  let cleanUrl = url.trim();

  // If the user pasted the entire <iframe src="..."> HTML code from Google Maps
  const iframeSrcMatch = cleanUrl.match(/src=["']([^"']+)["']/i);
  if (iframeSrcMatch) {
    cleanUrl = iframeSrcMatch[1];
  }

  // If official Google Maps embed URL (/maps/embed) or output=embed with ll=
  if (
    cleanUrl.includes("/maps/embed") ||
    (cleanUrl.includes("output=embed") && cleanUrl.includes("ll="))
  ) {
    return cleanUrl;
  }

  // If query format with q=lat,lng, convert to ll=lat,lng to suppress default Google red pin
  if (cleanUrl.includes("output=embed") && cleanUrl.includes("q=")) {
    return cleanUrl.replace(/q=/, "ll=");
  }

  // Extract coordinates like @22.7514381,88.3315948 or ?q=22.7514381,88.3315948
  const coordMatch = cleanUrl.match(/[@=](-?\d+\.\d+),(-?\d+\.\d+)/);
  if (coordMatch) {
    return `https://maps.google.com/maps?ll=${coordMatch[1]},${coordMatch[2]}&t=m&z=17&ie=UTF8&output=embed`;
  }

  // Shortlinks (maps.app.goo.gl) cannot be framed directly by browsers (Google refuses to connect)
  if (cleanUrl.includes("maps.app.goo.gl") || cleanUrl.includes("goo.gl/maps")) {
    return fallback;
  }

  return `https://maps.google.com/maps?ll=22.7514381,88.3315948&t=m&z=17&ie=UTF8&output=embed`;
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
  defaultEmbedUrl:
    "https://maps.google.com/maps?ll=22.7514381,88.3315948&t=m&z=17&ie=UTF8&output=embed",
};

const Map = ({ data }: MapSectionProps) => {
  const title = data?.title || defaultMapData.title;
  const locationBadge = data?.locationBadge || defaultMapData.locationBadge;
  const locationName = data?.locationName || defaultMapData.locationName;
  const address = data?.address || defaultMapData.address;
  const email = data?.email || defaultMapData.email;
  const phone = data?.phone || defaultMapData.phone;
  const googleMapsUrl = data?.googleMapsUrl || defaultMapData.googleMapsUrl;
  const embedUrl = formatEmbedUrl(data?.embedUrl);

  return (
    <SectionWrapper as="section" id="map" size="wide">
      {/* Section Heading */}
      <h2 className="text-primary text-center font-serif text-3xl font-medium tracking-tight sm:text-4xl lg:text-[40px] dark:text-emerald-100">
        {title}
      </h2>

      {/* Map Container Frame */}
      <div className="border-border/60 bg-card relative mt-8 aspect-4/3 min-h-[380px] w-full overflow-hidden rounded-[20px] border shadow-lg sm:aspect-16/9 sm:min-h-[460px] sm:rounded-[28px] md:min-h-[520px]">
        {/* Google Maps Embed Iframe */}
        <iframe
          title="Google Map Location of Serampore HQ"
          src={embedUrl}
          className="pointer-events-none h-full w-full cursor-help border-0 dark:brightness-200 dark:invert"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />

        {/* Custom Location Pin Marker */}
        <MapPinMarker />

        {/* Floating Office Information Card (Top-Right Overlay) */}
        <div className="bg-card/95 border-border/80 absolute top-4 right-4 z-20 max-w-[270px] rounded-[16px] border p-4 shadow-xl backdrop-blur-md transition-all duration-300 sm:top-6 sm:right-6 sm:max-w-xs sm:p-5 dark:bg-stone-900/95">
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
            className="bg-primary hover:bg-primary/90 mt-3.5 flex w-full items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-white shadow-xs transition-all hover:scale-[1.005] active:scale-[0.98] dark:bg-emerald-600 dark:hover:bg-emerald-500"
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
