"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Menu, X, ArrowRight, Heart, ChevronDown } from "lucide-react";
import { AppHomepage } from "@/payload-types";
import BrandLogo from "@/components/shared/navbar/components/BrandLogo";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  navItems?: AppHomepage["header"]["navItems"];
  brandName?: AppHomepage["header"]["brandName"];
  logo?: AppHomepage["header"]["logo"];
  ctaButton?: AppHomepage["header"]["ctaButton"];
}

const emptySubscribe = () => () => {};

const MobileNav = ({ navItems, brandName, logo, ctaButton }: MobileNavProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  // Lock body scroll when mobile navigation drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close menu when Escape key is pressed
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const toggleExpand = (id: string) => {
    setExpandedItem((prev) => (prev === id ? null : id));
  };

  return (
    <>
      {/* Mobile Hamburger Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-50 size-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
        aria-label={isOpen ? "Close menu" : "Open navigation menu"}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <X className="size-6 text-gray-800 transition-transform duration-200 dark:text-gray-100" />
        ) : (
          <Menu className="size-6 text-gray-800 transition-transform duration-200 dark:text-gray-100" />
        )}
      </Button>

      {/* Render Overlay & Sliding Drawer via React Portal */}
      {mounted &&
        createPortal(
          <div
            className={cn(
              "fixed inset-0 z-998 transition-opacity duration-300 ease-in-out",
              isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
            )}
          >
            {/* Dark Overlay / Backdrop */}
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />

            {/* Sliding Navigation Drawer */}
            <aside
              className={cn(
                "fixed top-0 right-0 bottom-0 z-999 flex w-full max-w-xs flex-col justify-between bg-white p-6 shadow-2xl transition-transform duration-300 ease-in-out sm:max-w-sm dark:bg-gray-900",
                isOpen ? "translate-x-0" : "translate-x-full"
              )}
              aria-label="Mobile Navigation"
            >
              <div className="flex-1 overflow-y-auto pr-1">
                {/* Drawer Header */}
                <div className="flex items-center justify-between border-b border-gray-100 pb-5 dark:border-gray-800">
                  <BrandLogo content={brandName} logo={logo} />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="size-9 rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                    aria-label="Close navigation menu"
                  >
                    <X className="size-5" />
                  </Button>
                </div>

                {/* Vertical Links List */}
                <nav className="mt-6 flex flex-col gap-2">
                  {navItems?.map((link) => {
                    const itemId = link.id || link.label;
                    const hasDropdown = Boolean(
                      link.isDropdown &&
                      ((link.groupA?.items && link.groupA.items.length > 0) ||
                        (link.groupB?.items && link.groupB.items.length > 0))
                    );
                    const isExpanded = expandedItem === itemId;

                    if (hasDropdown) {
                      return (
                        <div key={itemId} className="flex flex-col">
                          <button
                            type="button"
                            onClick={() => toggleExpand(itemId)}
                            className="group flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-base font-semibold text-gray-700 transition-all hover:bg-emerald-50 hover:text-emerald-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-emerald-400"
                          >
                            <span>{link.label}</span>
                            <ChevronDown
                              className={cn(
                                "size-5 text-gray-400 transition-transform duration-200",
                                isExpanded && "rotate-180 text-emerald-600 dark:text-emerald-400"
                              )}
                            />
                          </button>

                          {/* Sub-items accordion */}
                          {isExpanded && (
                            <div className="mt-1 ml-4 flex flex-col gap-3 border-l-2 border-emerald-100 pl-3 dark:border-gray-800">
                              {/* Group A */}
                              {link.groupA?.items && link.groupA.items.length > 0 && (
                                <div className="space-y-1">
                                  {link.groupA.title && (
                                    <p className="px-2 text-xs font-bold text-emerald-600 uppercase dark:text-emerald-400">
                                      {link.groupA.title}
                                    </p>
                                  )}
                                  {link.groupA.items.map((subItem) => (
                                    <Link
                                      key={subItem.id || subItem.label}
                                      href={subItem.href || "#"}
                                      onClick={() => setIsOpen(false)}
                                      className="flex items-center justify-between rounded-lg px-2 py-2 text-sm font-medium text-gray-600 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400"
                                    >
                                      <span>{subItem.label}</span>
                                      <ArrowRight className="size-3.5 opacity-50" />
                                    </Link>
                                  ))}
                                </div>
                              )}

                              {/* Group B */}
                              {link.groupB?.items && link.groupB.items.length > 0 && (
                                <div className="space-y-1">
                                  {link.groupB.title && (
                                    <p className="px-2 text-xs font-bold text-emerald-600 uppercase dark:text-emerald-400">
                                      {link.groupB.title}
                                    </p>
                                  )}
                                  {link.groupB.items.map((subItem) => (
                                    <Link
                                      key={subItem.id || subItem.label}
                                      href={subItem.href || "#"}
                                      onClick={() => setIsOpen(false)}
                                      className="flex items-center justify-between rounded-lg px-2 py-2 text-sm font-medium text-gray-600 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400"
                                    >
                                      <span>{subItem.label}</span>
                                      <ArrowRight className="size-3.5 opacity-50" />
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    }

                    return (
                      <Link
                        key={itemId}
                        href={link?.href || "#"}
                        onClick={() => setIsOpen(false)}
                        className="group flex items-center justify-between rounded-xl px-4 py-3 text-base font-semibold text-gray-700 transition-all hover:bg-emerald-50 hover:text-emerald-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-emerald-400"
                      >
                        <span>{link?.label}</span>
                        <ArrowRight className="size-4 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* Drawer Footer CTA */}
              <div className="mt-8 border-t border-gray-100 pt-6 dark:border-gray-800">
                <Link href={ctaButton?.href || "#"} onClick={() => setIsOpen(false)}>
                  <Button
                    className={cn(
                      buttonVariants({ variant: "accent", size: "lg" }),
                      "flex h-12 w-full items-center justify-center gap-2 text-base font-semibold shadow-md",
                      ctaButton?.className
                    )}
                  >
                    <Heart className="size-5 fill-white/20 text-white" />
                    <span>{ctaButton?.label || "Donate Now"}</span>
                  </Button>
                </Link>
              </div>
            </aside>
          </div>,
          document.body
        )}
    </>
  );
};

export default MobileNav;
