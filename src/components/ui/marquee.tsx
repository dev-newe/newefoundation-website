import React from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: React.ReactNode;
  speed?: number;
  direction?: "left" | "right";
  className?: string;
}

const Marquee = ({ children, speed = 25, direction = "left", className }: MarqueeProps) => {
  return (
    <div
      className={cn("hover-pause relative flex w-full overflow-hidden py-3 select-none", className)}
    >
      {[...Array(3)].map((_, groupIdx) => (
        <div
          key={groupIdx}
          aria-hidden={groupIdx > 0}
          style={{ "--duration": `${speed}s` } as React.CSSProperties}
          className={cn(
            "animate-marquee flex shrink-0 items-center justify-around gap-4 px-6 sm:gap-16",
            direction === "right" && "direction-reverse"
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
};

export default Marquee;
