"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Heart, ArrowRight } from "lucide-react";
import { AppHomepage } from "@/payload-types";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DesktopNavProps {
  navItems?: AppHomepage["header"]["navItems"];
  ctaButton?: AppHomepage["header"]["ctaButton"];
}

const DesktopNav = ({ navItems, ctaButton }: DesktopNavProps) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <div className="hidden items-center gap-8 md:flex">
      {/* Primary Navigation Links */}
      <nav className="flex items-center gap-1">
        {navItems?.map((item) => {
          const hasDropdown = Boolean(
            item.isDropdown &&
            ((item.groupA?.items && item.groupA.items.length > 0) ||
              (item.groupB?.items && item.groupB.items.length > 0))
          );

          if (hasDropdown) {
            const isOpen = openDropdown === item.id || openDropdown === item.label;

            return (
              <div
                key={item.id || item.label}
                className="relative"
                onMouseEnter={() => setOpenDropdown(item.id || item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {/* Dropdown Trigger */}
                <button
                  type="button"
                  onClick={() => setOpenDropdown(isOpen ? null : item.id || item.label)}
                  className={cn(
                    "flex cursor-pointer items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200",
                    isOpen
                      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-white"
                  )}
                  aria-expanded={isOpen}
                >
                  <span>{item.label}</span>
                  <ChevronDown
                    className={cn(
                      "size-4 transition-transform duration-200",
                      isOpen && "rotate-180 text-emerald-600 dark:text-emerald-400"
                    )}
                  />
                </button>

                {/* Dropdown Menu Overlay */}
                <div
                  className={cn(
                    "absolute top-full left-1/2 z-50 mt-2 -translate-x-1/2 transition-all duration-200 ease-out",
                    isOpen
                      ? "pointer-events-auto visible translate-y-0 opacity-100"
                      : "pointer-events-none invisible -translate-y-2 opacity-0"
                  )}
                >
                  <div className="min-w-65 rounded-2xl border border-gray-100 bg-white/95 p-4 shadow-xl backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/95">
                    <div
                      className={cn(
                        "grid gap-6",
                        item.groupA?.items &&
                          item.groupA.items.length > 0 &&
                          item.groupB?.items &&
                          item.groupB.items.length > 0
                          ? "min-w-110 grid-cols-2"
                          : "grid-cols-1"
                      )}
                    >
                      {/* Group A */}
                      {item.groupA?.items && item.groupA.items.length > 0 && (
                        <div className="space-y-2">
                          {item.groupA.title && (
                            <h4 className="px-3 text-xs font-bold tracking-wider text-emerald-600 uppercase dark:text-emerald-400">
                              {item.groupA.title}
                            </h4>
                          )}
                          <div className="space-y-1">
                            {item.groupA.items.map((subItem) => (
                              <Link
                                key={subItem.id || subItem.label}
                                href={subItem.href || "#"}
                                onClick={() => setOpenDropdown(null)}
                                className="group flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-emerald-50 hover:text-emerald-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-emerald-400"
                              >
                                <span>{subItem.label}</span>
                                <ArrowRight className="size-3.5 opacity-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:opacity-100" />
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Group B */}
                      {item.groupB?.items && item.groupB.items.length > 0 && (
                        <div className="space-y-2">
                          {item.groupB.title && (
                            <h4 className="px-3 text-xs font-bold tracking-wider text-emerald-600 uppercase dark:text-emerald-400">
                              {item.groupB.title}
                            </h4>
                          )}
                          <div className="space-y-1">
                            {item.groupB.items.map((subItem) => (
                              <Link
                                key={subItem.id || subItem.label}
                                href={subItem.href || "#"}
                                onClick={() => setOpenDropdown(null)}
                                className="group flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-emerald-50 hover:text-emerald-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-emerald-400"
                              >
                                <span>{subItem.label}</span>
                                <ArrowRight className="size-3.5 opacity-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:opacity-100" />
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          }

          return (
            <Link
              key={item.id || item.label}
              href={item.href || "#"}
              className="rounded-full px-4 py-2 text-base font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-white"
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Divider */}
      <div className="h-6 w-px bg-gray-200 dark:bg-gray-700" />

      {/* CTA / Donate Button */}
      <div className="flex items-center gap-4">
        <Link href={ctaButton?.href || "#"}>
          <Button
            className={cn(
              buttonVariants({ variant: "accent", size: "lg" }),
              "flex h-12 items-center justify-center gap-2 px-6 text-base font-semibold shadow-md transition-transform duration-200 hover:scale-[1.02]",
              ctaButton?.className
            )}
          >
            <Heart className="size-5 fill-white/20 text-white" />
            <span>{ctaButton?.label || "Donate Now"}</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default DesktopNav;
