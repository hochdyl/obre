"use client";

import { memo, useMemo } from "react";
import HoverTilt from "@/lib/HoverTilt/HoverTilt";
import styles from "./TiltableCard.module.css";

import holoStyles from "./effects/holo.module.css";
import cosmosStyles from "./effects/cosmos.module.css";
import rainbowStyles from "./effects/rainbow.module.css";
import reverseStyles from "./effects/reverse.module.css";
import shinyStyles from "./effects/shiny.module.css";

export type HoloEffectType =
  | "holo"
  | "cosmos"
  | "rainbow"
  | "reverse"
  | "shiny";

export type MaskConfig = {
  src: string;
  effect: HoloEffectType;
  zIndex?: number;
};

export type TiltableCardProps = {
  src: string;
  masks?: MaskConfig | MaskConfig[];
  className?: string;
  tiltFactor?: number;
  tiltFactorY?: number;
  scaleFactor?: number;
  shadow?: boolean;
  shadowBlur?: number;
  glareIntensity?: number;
  glareHue?: number;
};

const effectStylesMap: Record<
  HoloEffectType,
  { readonly shine: string; readonly glare: string }
> = {
  holo: { shine: holoStyles.shine, glare: holoStyles.glare },
  cosmos: { shine: cosmosStyles.shine, glare: cosmosStyles.glare },
  rainbow: { shine: rainbowStyles.shine, glare: rainbowStyles.glare },
  reverse: { shine: reverseStyles.shine, glare: reverseStyles.glare },
  shiny: { shine: shinyStyles.shine, glare: shinyStyles.glare },
};

function normalizeMasks(
  masks: MaskConfig | MaskConfig[] | undefined
): MaskConfig[] {
  if (!masks) return [];
  if (!Array.isArray(masks)) {
    return [{ ...masks, zIndex: masks.zIndex ?? 0 }];
  }
  return masks
    .map((mask, index) => ({ ...mask, zIndex: mask.zIndex ?? index }))
    .sort((a, b) => a.zIndex! - b.zIndex!);
}

const EffectLayer = memo(function EffectLayer({
  mask,
  index,
}: {
  mask: MaskConfig;
  index: number;
}) {
  const effectStyle = effectStylesMap[mask.effect];
  const layerZIndex = 1 + (mask.zIndex ?? index) * 2;

  const shineStyle = useMemo(
    () =>
      ({
        "--mask-image": `url(${mask.src})`,
        zIndex: layerZIndex,
      }) as React.CSSProperties,
    [mask.src, layerZIndex]
  );

  const glareStyle = useMemo(
    () => ({ zIndex: layerZIndex + 1 }),
    [layerZIndex]
  );

  return (
    <>
      <div
        className={`${styles.shineBase} ${effectStyle.shine}`}
        style={shineStyle}
      />
      <div
        className={`${styles.glareBase} ${effectStyle.glare}`}
        style={glareStyle}
      />
    </>
  );
});

const TiltableCard = memo(function TiltableCard({
  src,
  masks,
  className,
  tiltFactor = 1.2,
  tiltFactorY,
  scaleFactor = 1.05,
  shadow = true,
  shadowBlur,
  glareIntensity = 0,
  glareHue,
}: TiltableCardProps) {
  const normalizedMasks = useMemo(() => normalizeMasks(masks), [masks]);

  const cardClassName = className ? `${styles.card} ${className}` : styles.card;

  return (
    <HoverTilt
      className={cardClassName}
      tiltFactor={tiltFactor}
      tiltFactorY={tiltFactorY}
      scaleFactor={scaleFactor}
      shadow={shadow}
      shadowBlur={shadowBlur}
      glareIntensity={glareIntensity}
      glareHue={glareHue}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt="Card"
        className={styles.cardImage}
        loading="lazy"
        decoding="async"
      />

      {normalizedMasks.map((mask, index) => (
        <EffectLayer
          key={`${mask.src}-${mask.effect}-${mask.zIndex ?? index}`}
          mask={mask}
          index={index}
        />
      ))}
    </HoverTilt>
  );
});

export default TiltableCard;
