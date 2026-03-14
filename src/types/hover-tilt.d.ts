import type { DetailedHTMLProps, HTMLAttributes } from "react";
import type { HoverTiltProps } from "hover-tilt/types";

type HoverTiltElementProps = Omit<
  DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
  "style"
> &
  HoverTiltProps;

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "hover-tilt": HoverTiltElementProps;
    }
  }
}

declare module "react/jsx-runtime" {
  namespace JSX {
    interface IntrinsicElements {
      "hover-tilt": HoverTiltElementProps;
    }
  }
}

export {};
