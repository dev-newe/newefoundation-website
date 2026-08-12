"use client";

import { ReactLenis } from "lenis/react";

type ScrollProviderProps = {
  children: React.ReactNode;
};

export default function ScrollProvider({ children }: ScrollProviderProps) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.15,
        duration: 1.2,
        smoothWheel: true,
        syncTouch: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
