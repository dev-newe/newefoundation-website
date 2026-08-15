"use client";

import { AppHomepage } from "@/payload-types";
import Link from "next/link";

interface NavLinkProps {
  navItems?: AppHomepage["header"]["navItems"];
}

const NavLinks = ({ navItems }: NavLinkProps) => {
  return (
    <div className="flex items-center gap-4">
      {navItems?.map((link) => (
        <Link
          className="hover:text-secondary cursor-pointer font-semibold text-gray-600 transition-colors"
          key={link?.id}
          href={link?.href || "#"}
        >
          {link?.label}
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;
