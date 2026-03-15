"use client";

import { useEffect, useRef, type ReactNode } from "react";
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

export type HoverTiltOptions = HoverTiltProps & { className?: string };
export type HoverTiltComponentProps = HoverTiltOptions & {
  children?: ReactNode;
};

const toKebab = (s: string) =>
  s.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);

const HoverTilt = ({ children, ...props }: HoverTiltComponentProps) => {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    void loadHoverTilt();
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    for (const [k, v] of Object.entries(props)) {
      // Skip children and className as they are not attributes of the web component
      if (k === "children" || k === "className") continue;
      const attr = toKebab(k);
      if (v === false || v == null) el.removeAttribute(attr);
      else
        el.setAttribute(
          attr,
          typeof v === "object" ? JSON.stringify(v) : String(v)
        );
    }
  }, [props]);

  return (
    <hover-tilt
      ref={ref}
      className={`${styles.root} ${props.className ?? ""}`.trim()}
    >
      {children}
    </hover-tilt>
  );
};

export default HoverTilt;
