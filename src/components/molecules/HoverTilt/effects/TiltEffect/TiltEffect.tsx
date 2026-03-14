import type { PropsWithChildren } from "react";
import type { CardEffect } from "../types";
import type { HoverTiltComponentProps } from "../../HoverTilt";
import HoverTilt from "../../HoverTilt";

type HoverTiltEffectProps = Omit<HoverTiltComponentProps, "children">;

export const withHoverTilt = (props: HoverTiltEffectProps = {}): CardEffect => {
  const HoverTiltEffect = ({ children }: PropsWithChildren) => (
    <HoverTilt {...props}>{children}</HoverTilt>
  );
  HoverTiltEffect.displayName = "HoverTiltEffect";
  return HoverTiltEffect;
};
