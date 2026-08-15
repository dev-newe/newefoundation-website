"use client";

import { useAppContext } from "@/context/AppContext";
import BrandLogo from "@/components/shared/navbar/components/BrandLogo";
import DesktopNav from "@/components/shared/navbar/components/DesktopNav";
import MobileNav from "@/components/shared/navbar/components/MobileNav";
import { AppNavigation } from "@/payload-types";
import { Heart } from "lucide-react";
import Link from "next/link";

interface NavbarProps {
  data?: AppNavigation | null;
}

const Navbar = ({ data }: NavbarProps) => {
  const contextNav = useAppContext()?.navigation;
  const navData = data ?? contextNav;

  return (
    <header className="sticky top-0 z-50 mx-auto w-full">
      <div className="flex w-full items-center justify-between bg-white/80 px-6 py-3.5 shadow-xs backdrop-blur-sm dark:bg-gray-950/80">
        {/* Brand Logo */}
        <BrandLogo content={navData?.brandName} logo={navData?.logo} />

        {/* Desktop Navigation */}
        <DesktopNav navItems={navData?.navItems} ctaButton={navData?.ctaButton} />

        {/* Mobile Navigation Toggle & Drawer */}
        <div className="flex items-center gap-4 md:hidden">
          <MobileNav
            navItems={navData?.navItems}
            brandName={navData?.brandName}
            logo={navData?.logo}
            ctaButton={navData?.ctaButton}
          />
        </div>
      </div>
      <Link href="#contact">
        <button className="group bg-accent fixed right-0 bottom-0 z-50 m-4 flex h-12 w-12 cursor-pointer items-center justify-center gap-1.5 rounded-full p-2 text-center text-white transition-all duration-200 hover:w-28">
          <Heart className="size-5 fill-white/20 text-white" />
          <span className="hidden transition-all duration-200 group-hover:block">Donate</span>
        </button>
      </Link>
    </header>
  );
};

export default Navbar;
