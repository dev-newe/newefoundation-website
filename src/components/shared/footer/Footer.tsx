"use client";

import { useAppContext } from "@/context/AppContext";
import { Footer as FooterType } from "@/payload-types";

interface FooterProps {
  data?: FooterType | null;
}

const Footer = ({ data }: FooterProps) => {
  const contextFooter = useAppContext()?.footer;
  const footerData = data ?? contextFooter;

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <h3 className="text-xl font-bold text-white">
              {footerData?.brand?.name || "Navjyoti Foundation"}
            </h3>
            {footerData?.brand?.address && (
              <p className="text-sm whitespace-pre-line text-gray-400">
                {footerData.brand.address}
              </p>
            )}
            {footerData?.brand?.phone && (
              <p className="text-sm text-gray-400">Phone: {footerData.brand.phone}</p>
            )}
            {footerData?.brand?.email && (
              <p className="text-sm text-gray-400">Email: {footerData.brand.email}</p>
            )}
          </div>

          {/* Link Groups */}
          {footerData?.linkGroups?.map((group) => (
            <div key={group.id || group.title} className="space-y-3">
              <h4 className="text-sm font-semibold tracking-wider text-white uppercase">
                {group.title}
              </h4>
              <ul className="space-y-2 text-sm">
                {group.links?.map((link) => (
                  <li key={link.id || link.label}>
                    <a href={link.href || "#"} className="transition-colors hover:text-emerald-400">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-gray-800 pt-6 text-center text-xs text-gray-500">
          <p>
            {footerData?.copyright ||
              `© ${new Date().getFullYear()} Navjyoti Foundation. All rights reserved.`}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
