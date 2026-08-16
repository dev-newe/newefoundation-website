import Link from "next/link";
import Image from "next/image";
import { getFooterData } from "@/lib/payload/getFooterData";
import { AppFooter } from "@/payload-types";

type FooterProps = {
  data?: AppFooter | null;
};

const fallbackFooterData: AppFooter = {
  id: "fallback-footer",
  brand: {
    name: "Navjyoti Foundation",
    icon: "logo",
    address:
      "78/89, G.T. Road West,\nSimla, Serampore,\nHooghly, West Bengal, India.\nPincode - 712203",
    phone: "9830965220, 7001166714",
    email: "info@newefoundation.org",
  },
  linkGroups: [
    {
      id: "quick-links",
      title: "QUICK LINKS",
      links: [
        { id: "1", label: "Home", href: "/" },
        { id: "2", label: "About Us", href: "/about" },
        { id: "3", label: "Contact", href: "/contact" },
      ],
    },
    {
      id: "activity",
      title: "ACTIVITY",
      links: [
        { id: "4", label: "Our Work", href: "/our-work" },
        { id: "5", label: "Campaigns", href: "/campaigns" },
        { id: "6", label: "Become a Member", href: "/become-a-member" },
      ],
    },
    {
      id: "legal",
      title: "LEGAL & TRANSPARENCY",
      links: [
        { id: "7", label: "Privacy Policy", href: "/privacy-policy" },
        { id: "8", label: "Terms of Service", href: "/terms-of-service" },
        { id: "9", label: "Annual Reports", href: "/annual-reports" },
      ],
    },
  ],
  copyright: "© 2026 Navjyoti Foundation. All rights reserved. Registered Charity No. 292336.",
};

const Footer = async ({ data: propData }: FooterProps) => {
  const remoteData = propData ?? (await getFooterData());
  const footerData = remoteData || fallbackFooterData;

  const { brand, linkGroups, copyright } = footerData;

  // Split link groups: first 2 (Quick Links, Activity) and the last one (Legal & Transparency)
  const mainLinkGroups = linkGroups?.slice(0, 2) || [];
  const legalGroup = linkGroups && linkGroups.length > 2 ? linkGroups[2] : null;

  const displayCopyright = copyright
    ? copyright.startsWith("©")
      ? copyright
      : `© ${copyright}`
    : "© 2026 Navjyoti Foundation. All rights reserved. Registered Charity No. 292336.";

  return (
    <footer className="bg-background border-border/40 text-foreground w-full border-t transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.3fr] lg:gap-10 xl:gap-14">
          {/* Column 1: Brand & Contact Info */}
          <div className="flex flex-col">
            {/* Header / Brand Logo & Name */}
            <div className="flex h-9 items-center">
              <Link
                href="/"
                className="group inline-flex items-center gap-2.5 transition-transform duration-200 hover:opacity-90"
                aria-label={`${brand?.name || "Navjyoti Foundation"} Home`}
              >
                <Image
                  src="/web-app-manifest-192x192.png"
                  alt={brand?.name || "Logo"}
                  width={36}
                  height={36}
                  className="size-8 rounded-md object-contain transition-transform duration-300 group-hover:scale-105"
                />
                <span className="text-primary font-serif text-xl leading-none font-bold tracking-tight sm:text-2xl">
                  {brand?.name || "Navjyoti Foundation"}
                </span>
              </Link>
            </div>

            {/* Address & Contact Details */}
            <div className="mt-5 space-y-2.5 text-sm text-[#5d625e] dark:text-stone-300">
              {brand?.address && (
                <p className="max-w-sm leading-relaxed whitespace-pre-line">{brand.address}</p>
              )}
              {brand?.phone && (
                <p className="leading-relaxed">
                  <span className="text-foreground/80 font-medium">Contact: </span>
                  {brand.phone.split(",").map((num, idx, arr) => {
                    const trimmed = num.trim();
                    return (
                      <span key={idx}>
                        <a
                          href={`tel:${trimmed.replace(/[^0-9+]/g, "")}`}
                          className="hover:text-accent underline-offset-4 transition-colors duration-150 hover:underline"
                        >
                          {trimmed}
                        </a>
                        {idx < arr.length - 1 && <span className="mr-1">,</span>}
                      </span>
                    );
                  })}
                </p>
              )}
              {brand?.email && (
                <p className="leading-relaxed">
                  <span className="text-foreground/80 font-medium">E-mail: </span>
                  <a
                    href={`mailto:${brand.email.trim()}`}
                    className="hover:text-accent underline-offset-4 transition-colors duration-150 hover:underline"
                  >
                    {brand.email.trim()}
                  </a>
                </p>
              )}
            </div>
          </div>

          {/* Columns 2 & 3: Main Link Groups (e.g. Quick Links & Activity) */}
          {mainLinkGroups.map((group) => (
            <div key={group.id || group.title} className="flex flex-col">
              <div className="flex h-9 items-center">
                <h3 className="text-primary font-sans text-xs font-bold tracking-wider uppercase dark:text-emerald-300">
                  {group.title}
                </h3>
              </div>
              <nav aria-label={group.title} className="mt-5">
                <ul className="space-y-3">
                  {group.links?.map((link) => (
                    <li key={link.id || link.label}>
                      <Link
                        href={link.href || "#"}
                        className="hover:text-accent inline-block text-sm text-[#5d625e] transition-colors duration-200 dark:text-stone-300 dark:hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          ))}

          {/* Column 4: Legal & Transparency + Copyright */}
          {legalGroup && (
            <div className="flex flex-col">
              <div className="flex h-9 items-center">
                <h3 className="text-primary font-sans text-xs font-bold tracking-wider uppercase dark:text-emerald-300">
                  {legalGroup.title}
                </h3>
              </div>
              <nav aria-label={legalGroup.title} className="mt-5">
                <ul className="space-y-3">
                  {legalGroup.links?.map((link) => (
                    <li key={link.id || link.label}>
                      <Link
                        href={link.href || "#"}
                        className="hover:text-accent inline-block text-sm text-[#5d625e] transition-colors duration-200 dark:text-stone-300 dark:hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Divider & Copyright */}
              <div className="border-border/80 mt-6 border-t pt-5 dark:border-stone-800">
                <p className="text-xs leading-relaxed text-[#5d625e] dark:text-stone-400">
                  {displayCopyright}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
