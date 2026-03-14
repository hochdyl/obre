import type { CardEffect } from "../molecules/HoverTilt/effects/types";
import styles from "./Card.module.css";

type CardProps = {
  title: string;
  src: string;
  effects?: CardEffect[];
};

const Card = ({ title, src, effects = [] }: CardProps) => {
  const image = (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={title} className={styles.cardImage} loading="lazy" />
  );

  const content = effects.reduceRight<React.ReactNode>(
    (acc, Effect) => <Effect>{acc}</Effect>,
    image
  );

  return (
    <div className={styles.cardWrapper}>
      <div className={styles.cardMedia}>{content}</div>
      <h3 className={styles.cardTitle}>{title}</h3>
    </div>
  );
};

export default Card;
