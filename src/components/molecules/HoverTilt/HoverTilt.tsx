"use client";

import { useEffect, useRef, type PropsWithChildren } from "react";
import type { HoverTiltProps } from "hover-tilt/types";

/**
 * React wrapper for the <hover-tilt> Svelte web component.
 *
 * React passes props as camelCase attributes, but the web component
 * expects kebab-case HTML attributes. This wrapper bridges the gap
 * by manually setting attributes on the DOM element via a ref.
 */

// Singleton loader for the hover-tilt web component
let hoverTiltLoadPromise: Promise<unknown> | null = null;
const ensureHoverTiltWebComponent = () => {
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

export type HoverTiltComponentProps = PropsWithChildren<
  HoverTiltProps & { className?: string }
>;

// camelCase → kebab-case (e.g. "scaleFactor" → "scale-factor")
const toKebab = (str: string) =>
  str.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);

// Set a single attribute, handling booleans, objects, and removal
const setAttr = (el: HTMLElement, attr: string, value: unknown) => {
  if (value === false || value == null) return el.removeAttribute(attr);
  if (value === true) return el.setAttribute(attr, "");
  if (typeof value === "object")
    return el.setAttribute(attr, JSON.stringify(value));
  el.setAttribute(attr, String(value));
};

// Props handled natively by React, skip manual setAttribute
const REACT_HANDLED_PROPS = new Set(["className", "children"]);

const HoverTilt = ({ children, ...props }: HoverTiltComponentProps) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    void ensureHoverTiltWebComponent();
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    for (const [key, value] of Object.entries(props)) {
      if (REACT_HANDLED_PROPS.has(key)) continue;
      setAttr(el, toKebab(key), value);
    }
  }, [props]);

  return (
    <hover-tilt ref={ref} className={props.className}>
      {children}
    </hover-tilt>
  );
};

export default HoverTilt;
