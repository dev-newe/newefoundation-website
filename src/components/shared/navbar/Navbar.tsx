"use client";

import { useAppContext } from "@/context/AppContext";
import BrandLogo from "@/components/shared/navbar/components/BrandLogo";
import DesktopNav from "@/components/shared/navbar/components/DesktopNav";
import MobileNav from "@/components/shared/navbar/components/MobileNav";

const Navbar = () => {
  const header = useAppContext()?.header;

  return (
    <header className="sticky top-0 z-50 mx-auto w-full">
      <div className="flex w-full items-center justify-between bg-white/80 px-6 py-3.5 shadow-xs backdrop-blur-sm dark:bg-gray-950/80">
        {/* Brand Logo */}
        <BrandLogo content={header?.brandName} logo={header?.logo} />

        {/* Desktop Navigation */}
        <DesktopNav navItems={header?.navItems} ctaButton={header?.ctaButton} />

        {/* Mobile Navigation Toggle & Drawer */}
        <div className="flex items-center gap-4 md:hidden">
          <MobileNav
            navItems={header?.navItems}
            brandName={header?.brandName}
            logo={header?.logo}
            ctaButton={header?.ctaButton}
          />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
