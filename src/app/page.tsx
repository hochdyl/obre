import Card from "@/components/atoms/Card";
import {
  withHoverTilt,
  withGlint,
} from "@/components/molecules/HoverTilt/effects";
import styles from "./page.module.css";

const cards = [
  {
    title: "Obre 01",
    src: "/illustrations/test.png",
    effects: [
      withHoverTilt({
        tiltFactor: 1.2,
        scaleFactor: 1.05,
        shadow: true,
        glareIntensity: 1.8,
        glareHue: 270,
        blendMode: "overlay",
      }),
      withGlint(),
    ],
  },
  {
    title: "Obre 02",
    src: "/illustrations/test.png",
    effects: [
      withHoverTilt({
        tiltFactor: 1.2,
        scaleFactor: 1.05,
        shadow: true,
        glareIntensity: 1.8,
        glareHue: 230,
        blendMode: "overlay",
      }),
    ],
  },
  {
    title: "Obre 03",
    src: "/illustrations/test.png",
  },
  {
    title: "Obre 04",
    src: "/illustrations/test2.png",
    effects: [
      withHoverTilt({
        tiltFactor: 1.2,
        scaleFactor: 1.05,
        shadow: true,
        glareIntensity: 1,
        glareHue: 160,
        blendMode: "overlay",
      }),
    ],
  },
  {
    title: "Obre 05",
    src: "/illustrations/test.png",
    effects: [withGlint()],
  },
];

export default function Home() {
  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <h1 className={styles.title}>Obreatlas</h1>
      </header>

      <section className={styles.grid}>
        {cards.map((card) => (
          <Card
            key={card.title}
            title={card.title}
            src={card.src}
            effects={card.effects}
          />
        ))}
      </section>
    </main>
  );
}
