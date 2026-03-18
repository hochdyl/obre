import TiltableCard from "@/components/atoms/TiltableCard/TiltableCard";
import { asset } from "@/lib/basePath";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <TiltableCard
          src={asset("/illustrations/1/image.png")}
          masks={{
            src: asset("/illustrations/1/mask.png"),
            effect: "rainbow",
          }}
        />
        <div className={styles.storyContainer}>
          <h1 className={styles.chapterTitle}>Chapitre 1: Le départ</h1>
          <p className={styles.story}>
            Le début d'une aventure épique...
          </p>
        </div>
      </section>
    </main>
  );
}
