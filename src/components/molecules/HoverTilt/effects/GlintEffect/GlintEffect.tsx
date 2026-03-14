import type { PropsWithChildren } from "react";
import type { CardEffect } from "../types";
import styles from "./GlintEffect.module.css";

export type GlintProps = {
  /** Animation duration in seconds (default: 0.6) */
  duration?: number;
  /** Glint angle in degrees (default: 105) */
  angle?: number;
};

export const withGlint = (props: GlintProps = {}): CardEffect => {
  const { duration = 0.6, angle = 105 } = props;

  const GlintEffect = ({ children }: PropsWithChildren) => (
    <div
      className={styles.glint}
      style={
        {
          "--glint-duration": `${duration}s`,
          "--glint-angle": `${angle}deg`,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
  GlintEffect.displayName = "GlintEffect";
  return GlintEffect;
};
