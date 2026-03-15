"use client";

import HoverTilt, { type HoverTiltOptions } from "@/lib/HoverTilt/HoverTilt";
import styles from "./TiltableCard.module.css";

type TiltableCardProps = {
  src: string;
  tilt?: HoverTiltOptions;
};

const TiltableCard = ({
  src,
  tilt = { tiltFactor: 1.2, scaleFactor: 1.05, shadow: true },
}: TiltableCardProps) => {
  const image = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={"Illustration"}
      className={styles.cardImage}
      loading="lazy"
    />
  );

  return (
    <HoverTilt {...tilt} className={styles.cardMedia}>
      {image}
    </HoverTilt>
  );
};

export default TiltableCard;
