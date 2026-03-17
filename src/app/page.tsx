import TiltableCard, {
  type HoloEffectType,
  type MaskConfig,
} from "@/components/atoms/TiltableCard/TiltableCard";
import { asset } from "@/lib/basePath";
import styles from "./page.module.css";

const effects: (HoloEffectType | undefined)[] = [
  undefined,
  "holo",
  "cosmos",
  "rainbow",
  "reverse",
  "shiny",
];

const maskConfigs: Record<HoloEffectType, MaskConfig> = {
  holo: { src: asset("/illustrations/1/mask.png"), effect: "holo" },
  cosmos: { src: asset("/illustrations/1/mask.png"), effect: "cosmos" },
  rainbow: { src: asset("/illustrations/1/mask.png"), effect: "rainbow" },
  reverse: { src: asset("/illustrations/1/mask.png"), effect: "reverse" },
  shiny: { src: asset("/illustrations/1/mask.png"), effect: "shiny" },
};

export default function Home() {
  return (
    <main className={styles.page}>
      <section className={styles.grid}>
        {effects.map((effect) => (
          <div key={effect ?? "none"} className={styles.cardWrapper}>
            <TiltableCard
              src={asset("/illustrations/1/image.png")}
              masks={effect ? maskConfigs[effect] : undefined}
            />
            <span className={styles.effectLabel}>{effect ?? "no effect"}</span>
          </div>
        ))}
      </section>
    </main>
  );
}
