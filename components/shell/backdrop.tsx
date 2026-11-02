import styles from "./backdrop.module.css";

/**
 * Event layer: log-style tags that fade in and out in the corners, and
 * (optionally) thin lines falling through the screen, each one a store event
 * on its way to the storefront.
 *
 * The falling lines are OFF by default (`lines` prop). Turn them on with
 * <Backdrop lines /> in shell.tsx. They are never shown below 993px.
 *
 * Positions come from a seeded integer PRNG, so the markup is identical on
 * every render (no hydration mismatch, no Math.random).
 */

const DROPS = 16;

const EVENTS = [
  // All tags live in the TOP band (y <= ~20%), under the NavBar. The bottom
  // of the screen belongs to the title block, footer and dev switcher.
  { label: "order.created", x: "4%", y: "20%", delay: "0s" },
  { label: "stock.sync", x: "21%", y: "12%", delay: "-6s" },
  { label: "payment.captured", x: "47%", y: "17%", delay: "-3s" },
  { label: "shopify → erp", x: "68%", y: "12%", delay: "-5s" },
  { label: "webhook 200", x: "88%", y: "20%", delay: "-2s" },
];

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = mulberry32(2026);

const drops = Array.from({ length: DROPS }, (_, i) => {
  const duration = 7 + rand() * 8; // 7-15s
  return {
    id: i,
    x: `${(((i + 0.2 + rand() * 0.6) / DROPS) * 100).toFixed(2)}%`,
    height: Math.round(70 + rand() * 130),
    duration: `${duration.toFixed(2)}s`,
    delay: `${(-rand() * duration).toFixed(2)}s`,
    opacity: (0.25 + rand() * 0.5).toFixed(2),
    blue: rand() > 0.7,
  };
});

export default function Backdrop({ lines = false }: { lines?: boolean }) {
  return (
    <div className={styles.backdrop} aria-hidden="true">
      {lines &&
        drops.map((d) => (
          <span
            key={d.id}
            className={`${styles.drop} ${d.blue ? styles.blue : ""}`}
            style={
              {
                "--x": d.x,
                "--h": `${d.height}px`,
                "--t": d.duration,
                "--d": d.delay,
                "--o": d.opacity,
              } as React.CSSProperties
            }
          />
        ))}

      {EVENTS.map((e) => (
        <span
          key={e.label}
          className={styles.tag}
          style={
            { "--x": e.x, "--y": e.y, "--d": e.delay } as React.CSSProperties
          }
        >
          {e.label}
        </span>
      ))}
    </div>
  );
}
