import BrandLogo from "@/components/shared/navbar/components/BrandLogo";
import DesktopNav from "@/components/shared/navbar/components/DesktopNav";
import MobileNav from "@/components/shared/navbar/components/MobileNav";
import { Heart } from "lucide-react";
import Link from "next/link";
import { getNavigationData } from "@/lib/payload/getNavigationData";
import { AppNavigation } from "@/payload-types";

const Navbar = async () => {
  const navData = await getNavigationData();
  const fallbackData: AppNavigation = {
    id: "fallback",
    brandName: { text: "Newefoundation" },
    logo: {
      media: {
        id: "fallback",
        alt: "Brand Logo",
        url: "/web-app-manifest-512x512.png",
        createdAt: "2026-08-16T00:00:00.000Z",
        updatedAt: "2026-08-16T00:00:00.000Z",
      },
    },
    navItems: [
      { id: "1", label: "Home", href: "/" },
      { id: "2", label: "About", href: "/about" },
      { id: "3", label: "Contact", href: "/contact" },
    ],
    ctaButton: { id: "1", label: "Donate", href: "/donate" },
  };

  return (
    <header className="sticky top-0 z-50 mx-6 my-4 flex items-center justify-center rounded-xl shadow-md">
      <div className="mx-auto flex w-full items-center justify-between rounded-xl bg-white/60 px-4 py-2.5 shadow-xs backdrop-blur-sm dark:bg-gray-950/80">
        {/* Brand Logo */}
        <BrandLogo
          content={navData?.brandName || fallbackData.brandName}
          logo={navData?.logo || fallbackData.logo}
        />

        {/* Desktop Navigation */}
        <DesktopNav
          navItems={navData?.navItems || fallbackData.navItems}
          ctaButton={navData?.ctaButton || fallbackData.ctaButton}
        />

        {/* Mobile Navigation Toggle & Drawer */}
        <div className="flex items-center gap-4 md:hidden">
          <MobileNav
            navItems={navData?.navItems || fallbackData.navItems}
            brandName={navData?.brandName || fallbackData.brandName}
            logo={navData?.logo || fallbackData.logo}
            ctaButton={navData?.ctaButton || fallbackData.ctaButton}
          />
        </div>
      </div>
      <Link href={navData?.ctaButton?.href || fallbackData.ctaButton.href || "#contact"}>
        <button className="group bg-accent fixed right-0 bottom-0 z-50 m-4 flex h-12 w-12 cursor-pointer items-center justify-center gap-1.5 rounded-full p-2 text-center text-white transition-all duration-200 hover:w-28">
          <Heart className="size-5 fill-white/20 text-white" />
          <span className="hidden transition-all duration-200 group-hover:block">Donate</span>
        </button>
      </Link>
    </header>
  );
};

export default Navbar;
