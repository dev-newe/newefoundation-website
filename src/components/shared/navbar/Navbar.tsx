"use client";
import { useAppContext } from "@/context/AppContext";
import BrandLogo from "@/components/shared/navbar/components/BrandLogo";

const Navbar = () => {
  const header = useAppContext()?.header;
  return (
    <div className="sticky top-0 z-50 mx-auto w-full">
      <div className="flex h-16 w-full items-center justify-between bg-white/80 px-6 py-4 shadow-xs backdrop-blur-sm">
        <BrandLogo content={header?.brandName} logo={header?.logo} />
        <div className="flex items-center gap-4"></div>
      </div>
    </div>
  );
};

export default Navbar;
