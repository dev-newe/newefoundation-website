"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type CarouselImageItem = {
  url: string;
  alt?: string;
};

type DiagonalCarouselProps = {
  primarySrc?: string;
  secondarySrc?: string;
  images?: Array<string | CarouselImageItem>;
  alt?: string;
  className?: string;
};

export default function DiagonalCarousel({
  primarySrc,
  secondarySrc,
  images: extraImages,
  alt = "Navjyoti Foundation community impact",
  className = "",
}: DiagonalCarouselProps) {
  const images = useMemo<CarouselImageItem[]>(() => {
    const list: Array<string | CarouselImageItem | undefined> =
      extraImages && extraImages.length > 0 ? extraImages : [primarySrc, secondarySrc];

    const valid: CarouselImageItem[] = [];
    const seenUrls = new Set<string>();

    for (const item of list) {
      if (!item) {
        continue;
      }
      const url = typeof item === "string" ? item.trim() : item.url?.trim();
      const itemAlt =
        typeof item === "object" && typeof item.alt === "string" && item.alt.trim() !== ""
          ? item.alt.trim()
          : undefined;

      if (url && url !== "" && !seenUrls.has(url)) {
        seenUrls.add(url);
        valid.push({ url, alt: itemAlt });
      }
    }

    return valid.length > 0 ? valid : [{ url: "/placeholder.png", alt: "" }];
  }, [primarySrc, secondarySrc, extraImages]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isPaused, setIsPaused] = useState(false);

  const total = images.length;

  const handleNext = useCallback(() => {
    if (total <= 1) {
      return;
    }
    setDirection(1);
    setCurrentIndex((prev) => {
      return (prev + 1) % total;
    });
  }, [total]);

  const handlePrev = useCallback(() => {
    if (total <= 1) {
      return;
    }
    setDirection(-1);
    setCurrentIndex((prev) => {
      return (prev - 1 + total) % total;
    });
  }, [total]);

  // Auto-play interval
  useEffect(() => {
    if (total <= 1 || isPaused) {
      return;
    }

    const timer = setInterval(() => {
      handleNext();
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, [total, isPaused, handleNext]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      handleNext();
    } else if (e.key === "ArrowLeft") {
      handlePrev();
    }
  };

  // Determine current front and back image indices
  const frontIndex = total > 0 ? currentIndex % total : 0;
  const backIndex = total > 0 ? (currentIndex + 1) % total : 0;

  const frontItem = images[frontIndex];
  const backItem = images[backIndex] || frontItem;

  const frontSrc = frontItem?.url || "/placeholder.png";
  const backSrc = backItem?.url || frontSrc;

  const frontAlt = frontItem?.alt || `${alt} - Front view ${frontIndex + 1}`;
  const backAlt = backItem?.alt || `${alt} - Back view ${backIndex + 1}`;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Mission & Vision Diagonal Rotating Carousel"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => {
        setIsPaused(true);
      }}
      onMouseLeave={() => {
        setIsPaused(false);
      }}
      onFocus={() => {
        setIsPaused(true);
      }}
      onBlur={() => {
        setIsPaused(false);
      }}
      className={`group/carousel focus-visible:ring-accent relative flex w-full max-w-lg flex-col items-end pt-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-4 lg:max-w-none ${className}`}
      style={{ perspective: 1200 }}
    >
      {/* Ambient background glows */}
      <div className="bg-accent/15 dark:bg-accent/25 pointer-events-none absolute top-1/4 -right-4 h-56 w-56 rounded-full blur-3xl transition-opacity duration-700" />
      <div className="bg-primary/10 pointer-events-none absolute bottom-1/4 -left-6 h-56 w-56 rounded-full blur-3xl transition-opacity duration-700 dark:bg-emerald-500/15" />

      {/* Collage container preserving the exact overlapping layout with 3D depth */}
      <div className="relative w-full [transform-style:preserve-3d]">
        {/* ================================================================ */}
        {/* BACK / TOP-RIGHT SLOT (Rotated into depth with perfect rounded borders) */}
        {/* ================================================================ */}
        <div
          className="relative ml-auto aspect-[16/11] w-[86%] cursor-pointer [transform-style:preserve-3d] sm:w-[84%]"
          onClick={handleNext}
          title="Click to bring this image forward"
          style={{ transformOrigin: "left center" }}
        >
          <AnimatePresence mode="popLayout" custom={direction} initial={false}>
            <motion.div
              key={`back-card-${backIndex}-${backSrc}`}
              custom={direction}
              initial={{
                opacity: 0,
                scale: 0.92,
                z: -50,
                rotateY: -10,
                rotateX: 3,
                rotateZ: -2,
                x: direction === 1 ? -30 : 30,
                y: direction === 1 ? 30 : -30,
              }}
              animate={{
                opacity: 1,
                scale: 0.96,
                z: -30,
                rotateY: -7,
                rotateX: 2,
                rotateZ: -1,
                x: 0,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
                z: -70,
                rotateY: -12,
                x: direction === 1 ? -40 : 30,
                y: direction === 1 ? 40 : -20,
              }}
              transition={{
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative isolate h-full w-full overflow-hidden rounded-[24px] border border-white/40 shadow-[0_8px_20px_-6px_rgba(0,0,0,0.18)] transition-all duration-300 hover:brightness-105 sm:rounded-[32px] dark:border-white/10"
            >
              <Image
                src={backSrc}
                alt={backAlt}
                fill
                className="rounded-[24px] object-cover sm:rounded-[32px]"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
              />

              {/* Depth shadow gradient darker on receding right edge */}
              <div className="pointer-events-none absolute inset-0 rounded-[24px] bg-gradient-to-r from-transparent via-black/10 to-black/35 opacity-70 transition-opacity duration-300 hover:opacity-20 sm:rounded-[32px]" />
              <div className="pointer-events-none absolute inset-0 rounded-[24px] bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-60 sm:rounded-[32px]" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ================================================================ */}
        {/* FRONT / BOTTOM-LEFT OVERLAPPING SLOT (Larger Rectangle with crisp border) */}
        {/* ================================================================ */}
        <div className="relative z-20 -mt-28 aspect-[16/11] w-[72%] [transform-style:preserve-3d] sm:-mt-36 sm:w-[68%] md:-mt-44 lg:-mt-48">
          <AnimatePresence mode="popLayout" custom={direction} initial={false}>
            <motion.div
              key={`front-card-${frontIndex}-${frontSrc}`}
              custom={direction}
              initial={{
                opacity: 0,
                scale: 0.96,
                z: 10,
                rotateY: 5,
                x: direction === 1 ? 30 : -30,
                y: direction === 1 ? -30 : 30,
              }}
              animate={{
                opacity: 1,
                scale: 1.02,
                z: 35,
                rotateY: 0,
                rotateX: 0,
                rotateZ: 0,
                x: 0,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.96,
                z: 10,
                rotateY: -6,
                x: direction === 1 ? 30 : -30,
                y: direction === 1 ? -35 : 30,
              }}
              transition={{
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="border-background relative isolate h-full w-full overflow-hidden rounded-[24px] border-2 shadow-[0_12px_28px_-8px_rgba(0,0,0,0.18),0_4px_10px_-4px_rgba(0,0,0,0.08)] sm:rounded-[30px] sm:border-[2.5px] dark:border-stone-900"
            >
              <Image
                src={frontSrc}
                alt={frontAlt}
                fill
                className="rounded-[20px] object-cover transition-transform duration-500 ease-out hover:scale-[1.02] sm:rounded-[26px]"
                sizes="(max-width: 768px) 85vw, (max-width: 1200px) 45vw, 35vw"
                priority
              />

              {/* Foreground lighting gradient overlay */}
              <div className="pointer-events-none absolute inset-0 rounded-[20px] bg-gradient-to-t from-black/20 via-transparent to-black/5 sm:rounded-[26px]" />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ================================================================ */}
      {/* Interactive Controls & Slide Indicator */}
      {/* ================================================================ */}
      <div className="mt-4 flex w-full items-center justify-between px-2 sm:px-4">
        {/* Indicator dots */}
        <div className="flex items-center gap-1.5">
          {images.map((_, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={`dot-${idx}`}
                type="button"
                onClick={() => {
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  isActive
                    ? "bg-accent w-6"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50 w-2"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
                aria-current={isActive ? "true" : undefined}
              />
            );
          })}
        </div>

        {/* Minimalist Previous / Next arrow controls */}
        {total > 1 && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              className="bg-card/80 hover:bg-card text-foreground hover:text-accent border-border/50 flex h-8 w-8 items-center justify-center rounded-full border shadow-sm backdrop-blur-xs transition-all hover:scale-105 active:scale-95"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="bg-card/80 hover:bg-card text-foreground hover:text-accent border-border/50 flex h-8 w-8 items-center justify-center rounded-full border shadow-sm backdrop-blur-xs transition-all hover:scale-105 active:scale-95"
              aria-label="Next slide"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
