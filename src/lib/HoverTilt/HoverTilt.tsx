"use client";

import { memo, useEffect, useRef, type ReactNode } from "react";
import type { HoverTiltProps } from "hover-tilt/types";
import styles from "./HoverTilt.module.css";

let hoverTiltLoadPromise: Promise<unknown> | null = null;
const loadHoverTilt = () => {
  if (
    typeof window === "undefined" ||
    typeof globalThis.customElements === "undefined"
  )
    return Promise.resolve();
  if (customElements.get("hover-tilt")) return Promise.resolve();
  if (!hoverTiltLoadPromise)
    hoverTiltLoadPromise = import("hover-tilt/web-component");
  return hoverTiltLoadPromise;
};

export type HoverTiltOptions = Pick<
  HoverTiltProps,
  | "tiltFactor"
  | "tiltFactorY"
  | "scaleFactor"
  | "springOptions"
  | "tiltSpringOptions"
  | "enterDelay"
  | "exitDelay"
  | "shadow"
  | "shadowBlur"
  | "blendMode"
  | "glareIntensity"
  | "glareHue"
  | "glareMask"
  | "glareMaskMode"
  | "glareMaskComposite"
> & { className?: string };
export type HoverTiltComponentProps = HoverTiltOptions & {
  children?: ReactNode;
};

const HoverTilt = memo(function HoverTilt({
  children,
  className,
  tiltFactor,
  tiltFactorY,
  scaleFactor,
  springOptions,
  tiltSpringOptions,
  enterDelay,
  exitDelay,
  shadow,
  shadowBlur,
  blendMode,
  glareIntensity,
  glareHue,
  glareMask,
  glareMaskMode,
  glareMaskComposite,
}: HoverTiltComponentProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    void loadHoverTilt();
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const attrs: [string, unknown][] = [
      ["tilt-factor", tiltFactor],
      ["tilt-factor-y", tiltFactorY],
      ["scale-factor", scaleFactor],
      ["spring-options", springOptions],
      ["tilt-spring-options", tiltSpringOptions],
      ["enter-delay", enterDelay],
      ["exit-delay", exitDelay],
      ["shadow", shadow],
      ["shadow-blur", shadowBlur],
      ["blend-mode", blendMode],
      ["glare-intensity", glareIntensity],
      ["glare-hue", glareHue],
      ["glare-mask", glareMask],
      ["glare-mask-mode", glareMaskMode],
      ["glare-mask-composite", glareMaskComposite],
    ];

    for (const [attr, value] of attrs) {
      if (value === false || value == null) {
        el.removeAttribute(attr);
        continue;
      }
      el.setAttribute(
        attr,
        typeof value === "object" ? JSON.stringify(value) : String(value)
      );
    }
  }, [
    tiltFactor,
    tiltFactorY,
    scaleFactor,
    springOptions,
    tiltSpringOptions,
    enterDelay,
    exitDelay,
    shadow,
    shadowBlur,
    blendMode,
    glareIntensity,
    glareHue,
    glareMask,
    glareMaskMode,
    glareMaskComposite,
  ]);

  return (
    <hover-tilt
      ref={ref}
      className={className ? `${styles.root} ${className}` : styles.root}
    >
      {children}
    </hover-tilt>
  );
});

export default HoverTilt;
