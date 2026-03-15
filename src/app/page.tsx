import TiltableCard from "@/components/atoms/TiltableCard/TiltableCard";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <h1 className={styles.title}>Obreatlas</h1>
      </header>

      <section className={styles.grid}>
        <TiltableCard
          src="/illustrations/balloon.jpg"
          tilt={{ tiltFactor: 1.2, scaleFactor: 1.05, shadow: true }}
        />
        <TiltableCard src="/illustrations/balloon.jpg" />
      </section>
    </main>
  );
}
