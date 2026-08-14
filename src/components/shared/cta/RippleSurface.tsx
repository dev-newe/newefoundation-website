"use client";
import React, { useEffect, useRef } from "react";

type RippleSurfaceProps = {
  className?: string;
  contentClassName?: string;
  children?: React.ReactNode;
};

/**
 * A gentle, contained water-ripple surface with two ripple sources only:
 *  - soft, slow ambient ripples that fire on their own, so the surface
 *    never sits completely still even with zero interaction
 *  - a stronger, deliberate ripple on click/tap — anywhere in the surface,
 *    including on interactive children like buttons (see z-index note below)
 *
 * Usage: wrap your CTA content directly as children. Content is layered
 * above the canvas via z-index, and clicks on it bubble up to trigger the
 * ripple while still firing the child's own onClick/navigation normally —
 * so don't call stopPropagation() in a child's click handler, or the
 * ripple won't fire for that click.
 */
const RippleSurface = ({ className, contentClassName, children }: RippleSurfaceProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) {
      return;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      return;
    } // leave the static background, no sim at all

    // ---- Tunables -----------------------------------------------------
    const minScale = 4; // floor; resize() scales this up for large containers
    const targetCells = 16000; // rough perf budget for the visible grid
    const margin = 16; // absorbing border, in downscaled px
    const dampening = 0.965; // energy loss per frame
    const maxWave = 34; // clamp — keeps amplitude subtle

    const ambientStrength = 30; // soft, ambient auto-ripples
    const ambientRadius = 3;
    const ambientMinDelay = 1400; // ms between ambient ripples (randomized)
    const ambientMaxDelay = 3600;

    const clickStrength = 46; // deliberate, stronger — same for any click, button or not
    const clickRadius = 5;

    // Slows propagation without touching decay: physics only advances
    // once every `frameSkip` rendered frames.
    const frameSkip = 2;

    const styles = window.getComputedStyle(container);
    const shadowVar = styles.getPropertyValue("--ripple-shadow").trim();
    const glintVar = styles.getPropertyValue("--ripple-glint").trim();
    const shadowParts = shadowVar
      ? shadowVar.split(",").map((s) => parseInt(s.trim(), 10))
      : [14, 46, 44];
    const glintParts = glintVar
      ? glintVar.split(",").map((s) => parseInt(s.trim(), 10))
      : [222, 236, 214];

    const shadow = {
      r: isNaN(shadowParts[0] ?? NaN) ? 14 : (shadowParts[0] as number),
      g: isNaN(shadowParts[1] ?? NaN) ? 46 : (shadowParts[1] as number),
      b: isNaN(shadowParts[2] ?? NaN) ? 44 : (shadowParts[2] as number),
    };
    const glint = {
      r: isNaN(glintParts[0] ?? NaN) ? 222 : (glintParts[0] as number),
      g: isNaN(glintParts[1] ?? NaN) ? 236 : (glintParts[1] as number),
      b: isNaN(glintParts[2] ?? NaN) ? 214 : (glintParts[2] as number),
    };

    const glintGradientThreshold = 6;
    const glintAlphaFactor = 0.35;
    const crestAlphaFactor = 0.08;
    const troughAlphaFactor = 0.24;
    // -------------------------------------------------------------------

    let visibleW = 0;
    let visibleH = 0;
    let fullW = 0; // visible + 2*margin
    let fullH = 0;
    let size = 0;
    let buffer1 = new Float32Array(0);
    let buffer2 = new Float32Array(0);
    let edgeFactor = new Float32Array(0);

    let imgData: ImageData;
    let data: Uint8ClampedArray;
    let animationFrameId: number;
    let ambientTimeoutId: number;

    const offscreenCanvas = document.createElement("canvas");
    const offscreenCtx = offscreenCanvas.getContext("2d");

    let isLoopRunning = false;
    let framesToLive = 0;
    let tickAccumulator = 0;
    let isIntersecting = true;
    let isPageVisible = document.visibilityState === "visible";
    let isVisible = isIntersecting && isPageVisible;
    let scale = minScale;

    const wakeUp = () => {
      framesToLive = 500;
      if (!isLoopRunning && isVisible) {
        isLoopRunning = true;
        renderLoop();
      }
    };

    const buildEdgeMask = () => {
      edgeFactor = new Float32Array(fullW * fullH);
      for (let y = 0; y < fullH; y++) {
        for (let x = 0; x < fullW; x++) {
          const dEdge = Math.min(x, y, fullW - 1 - x, fullH - 1 - y);
          const t = Math.max(0, Math.min(1, dEdge / margin));
          const smooth = t * t * (3 - 2 * t);
          edgeFactor[x + y * fullW] = smooth;
        }
      }
    };

    const resize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(rect.width));
      canvas.height = Math.max(1, Math.floor(rect.height));

      const rawCells = (canvas.width * canvas.height) / (minScale * minScale);
      const scaleFactor = Math.sqrt(Math.max(1, rawCells / targetCells));
      scale = Math.max(minScale, Math.round(minScale * scaleFactor));

      visibleW = Math.max(1, Math.floor(canvas.width / scale));
      visibleH = Math.max(1, Math.floor(canvas.height / scale));
      fullW = visibleW + margin * 2;
      fullH = visibleH + margin * 2;
      size = fullW * fullH;

      buffer1 = new Float32Array(size);
      buffer2 = new Float32Array(size);
      buildEdgeMask();

      imgData = ctx.createImageData(visibleW, visibleH);
      data = imgData.data;

      offscreenCanvas.width = visibleW;
      offscreenCanvas.height = visibleH;

      wakeUp();
    };

    const dropWater = (px: number, py: number, radius: number, strength: number) => {
      const cx = Math.floor(px / scale) + margin;
      const cy = Math.floor(py / scale) + margin;

      for (let i = -radius; i < radius; i++) {
        for (let j = -radius; j < radius; j++) {
          if (i * i + j * j >= radius * radius) {
            continue;
          }
          const xx = cx + i;
          const yy = cy + j;
          if (xx < 0 || xx >= fullW || yy < 0 || yy >= fullH) {
            continue;
          }
          buffer1[xx + yy * fullW] += strength;
        }
      }
      wakeUp();
    };

    // Fires on the container AND on any child (buttons included), since
    // pointerdown bubbles up through the DOM. pointerEvents on the canvas
    // and wash layers are "none", so this never blocks the click from
    // also reaching a button's own onClick/navigation.
    const handlePointerDown = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
        return;
      }
      dropWater(x, y, clickRadius, clickStrength);
    };

    const scheduleAmbientRipple = () => {
      const delay = ambientMinDelay + Math.random() * (ambientMaxDelay - ambientMinDelay);
      ambientTimeoutId = window.setTimeout(() => {
        if (isVisible && visibleW > 0 && visibleH > 0) {
          const pad = 0.15; // keep spawn points away from the absorbing edges
          const x = (pad + Math.random() * (1 - 2 * pad)) * canvas.width;
          const y = (pad + Math.random() * (1 - 2 * pad)) * canvas.height;
          dropWater(x, y, ambientRadius, ambientStrength);
        }
        scheduleAmbientRipple();
      }, delay);
    };

    const updateRipples = () => {
      for (let y = 1; y < fullH - 1; y++) {
        for (let x = 1; x < fullW - 1; x++) {
          const i = x + y * fullW;

          // 8-neighbor (axial + diagonal) stencil keeps ripples circular
          // instead of diamond-shaped.
          const axial = buffer1[i - 1] + buffer1[i + 1] + buffer1[i - fullW] + buffer1[i + fullW];
          const diag =
            buffer1[i - fullW - 1] +
            buffer1[i - fullW + 1] +
            buffer1[i + fullW - 1] +
            buffer1[i + fullW + 1];

          let v = (axial + diag) / 4 - buffer2[i];

          v *= dampening;
          v *= edgeFactor[i];

          buffer2[i] = v;
        }
      }

      for (let y = 0; y < visibleH; y++) {
        for (let x = 0; x < visibleW; x++) {
          const srcIdx = x + margin + (y + margin) * fullW;
          let wave = buffer2[srcIdx];

          if (wave > maxWave) {
            wave = maxWave;
          }
          if (wave < -maxWave) {
            wave = -maxWave;
          }

          const left = buffer2[srcIdx - 1];
          const right = buffer2[srcIdx + 1];
          const up = buffer2[srcIdx - fullW];
          const down = buffer2[srcIdx + fullW];
          const gradMag = Math.abs(right - left) + Math.abs(down - up);

          const dstIdx = (x + y * visibleW) * 4;

          if (gradMag > glintGradientThreshold) {
            const glintT = Math.min(1, (gradMag - glintGradientThreshold) / 20);
            data[dstIdx] = glint.r;
            data[dstIdx + 1] = glint.g;
            data[dstIdx + 2] = glint.b;
            data[dstIdx + 3] = Math.min(255, glintT * 255 * glintAlphaFactor);
          } else if (wave < 0) {
            const t = Math.min(1, -wave / maxWave);
            data[dstIdx] = shadow.r;
            data[dstIdx + 1] = shadow.g;
            data[dstIdx + 2] = shadow.b;
            data[dstIdx + 3] = Math.min(255, t * 255 * troughAlphaFactor);
          } else {
            const t = Math.min(1, wave / maxWave);
            data[dstIdx] = glint.r;
            data[dstIdx + 1] = glint.g;
            data[dstIdx + 2] = glint.b;
            data[dstIdx + 3] = Math.min(255, t * 255 * crestAlphaFactor);
          }
        }
      }

      const temp = buffer1;
      buffer1 = buffer2;
      buffer2 = temp;
    };

    const renderLoop = () => {
      if (framesToLive <= 0 || !isVisible) {
        isLoopRunning = false;
        return;
      }
      framesToLive--;

      tickAccumulator++;
      if (tickAccumulator >= frameSkip) {
        tickAccumulator = 0;
        updateRipples();
      }

      if (offscreenCtx) {
        offscreenCtx.putImageData(imgData, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.imageSmoothingEnabled = true;
        ctx.drawImage(offscreenCanvas, 0, 0, canvas.width, canvas.height);
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    const updateVisibility = () => {
      isPageVisible = document.visibilityState === "visible";
      isVisible = isIntersecting && isPageVisible;
      if (isVisible) {
        wakeUp();
      }
    };

    const resizeObserver = new ResizeObserver(() => resize());
    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        isIntersecting = entries[0]?.isIntersecting ?? true;
        updateVisibility();
      },
      { threshold: 0 }
    );
    intersectionObserver.observe(container);

    const handleVisibilityChange = () => {
      updateVisibility();
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    container.addEventListener("pointerdown", handlePointerDown);
    resize();
    wakeUp();
    scheduleAmbientRipple();

    return () => {
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      container.removeEventListener("pointerdown", handlePointerDown);
      cancelAnimationFrame(animationFrameId);
      window.clearTimeout(ambientTimeoutId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      style={
        {
          position: "relative",
          overflow: "hidden",
          backgroundColor: "hsl(var(--primary))",
          isolation: "isolate", // makes this a stacking context so the z-index values below are self-contained
          "--ripple-shadow": "14, 46, 44",
          "--ripple-glint": "222, 236, 214",
        } as React.CSSProperties
      }
    >
      {/* z-index 0: permanent faint wash — sells "water" even at rest */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          background: "rgba(40, 110, 120, 0.06)",
          pointerEvents: "none",
        }}
      />
      {/* z-index 1: the ripple canvas. pointerEvents: none is what lets
          clicks pass straight through to your buttons/content beneath it
          instead of the canvas swallowing them. */}
      <canvas
        ref={canvasRef}
        aria-hidden={true}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      />
      {/* z-index 2: your content. Needs position + z-index here, not just
          later DOM order — positioned siblings (the wash/canvas above)
          paint after normal in-flow content by default regardless of
          source order, so without this your content could end up
          visually under the canvas even though it's written after it. */}
      <div className={contentClassName} style={{ position: "relative", zIndex: 2 }}>
        {children}
      </div>
    </div>
  );
};

export default RippleSurface;
