import React from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: React.ReactNode;
  speed?: number;
  direction?: "left" | "right";
  isAccessible?: boolean;
  className?: string;
}

const Marquee = ({
  children,
  speed = 25,
  direction = "left",
  isAccessible = false,
  className,
}: MarqueeProps) => {
  return (
    <div
      className={cn("hover-pause relative flex w-full overflow-hidden py-3 select-none", className)}
    >
      {[...Array(2)].map((_, groupIdx) => {
        const isHidden = !isAccessible || groupIdx > 0;

        return (
          <div
            key={groupIdx}
            aria-hidden={isHidden}
            tabIndex={isHidden ? -1 : undefined}
            style={{ "--duration": `${speed}s` } as React.CSSProperties}
            className={cn(
              "animate-marquee flex min-w-full shrink-0 items-center justify-around gap-4 px-6 sm:gap-16",
              direction === "right" && "direction-reverse"
            )}
          >
            {children}
          </div>
        );
      })}
    </div>
  );
};

export default Marquee;
