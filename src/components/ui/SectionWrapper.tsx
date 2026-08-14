import { cn } from "@/lib/utils";
import React from "react";

type SectionWrapperProps = {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  as?: React.ElementType;
  size?: "default" | "narrow" | "wide" | "full";
  id?: string;
  ariaLabelledby?: string;
};

const SectionWrapper = ({
  children,
  className,
  containerClassName,
  as: Component = "section",
  size = "default",
  id,
  ariaLabelledby,
}: SectionWrapperProps) => {
  const containerSizeClasses = {
    default: "max-w-(--container-wide)", // 1920px
    narrow: "max-w-(--container-narrow)", // 672px
    wide: "max-w-(--container-max)", // 1152px
    full: "max-w-none w-full",
  };

  return (
    <Component id={id} aria-labelledby={ariaLabelledby} className={cn("px-page w-full", className)}>
      <div
        className={cn("py-section mx-auto w-full", containerSizeClasses[size], containerClassName)}
      >
        {children}
      </div>
    </Component>
  );
};

export default SectionWrapper;
