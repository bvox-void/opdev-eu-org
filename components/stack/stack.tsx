import { BRAND_ICONS } from "@/lib/brand-icons";
import { STACK, type StackSectionIcon, type Tech } from "@/lib/stack";
import {
  CartIcon,
  CodeIcon,
  GlobeIcon,
  PlugIcon,
} from "@/components/ui/icons";
import styles from "./stack.module.css";

const ICONS: Record<StackSectionIcon, () => React.JSX.Element> = {
  code: CodeIcon,
  cart: CartIcon,
  plug: PlugIcon,
  globe: GlobeIcon,
};

/** One technology: brand glyph (or monogram) + name. Primary ones are highlighted. */
function Chip({ tech }: { tech: Tech }) {
  const brand = tech.icon ? BRAND_ICONS[tech.icon] : null;
  return (
    <li
      className={`${styles.chip} ${tech.primary ? styles.primary : ""}`}
      style={brand ? ({ "--brand": brand.hex } as React.CSSProperties) : undefined}
    >
      {brand ? (
        <svg
          className={styles.glyph}
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d={brand.path} />
        </svg>
      ) : (
        <span className={styles.mono} aria-hidden="true">
          {tech.mono}
        </span>
      )}
      {tech.name}
      {tech.primary && <span className={styles.sr}> (primary)</span>}
    </li>
  );
}

/**
 * Content of sheet 02. Server component: all text is in the initial HTML
 * (no JS needed), with real headings and lists so crawlers and AI agents
 * can read the structure. The page frame (padding, title block) is <Sheet>.
 */
export default function Stack() {
  return (
    <div className={styles.inner}>
      <header className={styles.head}>
        <span className={styles.eyebrow}>stack</span>
        <h1 className={styles.title}>
          The stack behind every <span>store</span>
        </h1>
        <p className={styles.lead}>
          React, Next.js and Vercel at the core, plus the platforms, payments
          and channels a store needs to sell and be found by people and AI
          agents.
        </p>
      </header>

      <ul className={styles.grid}>
        {STACK.map((g, i) => {
          const Icon = ICONS[g.icon];
          return (
            <li
              key={g.id}
              className={styles.item}
              style={{ "--i": i } as React.CSSProperties}
            >
              <section className={styles.card} aria-labelledby={`stack-${g.id}`}>
                <div className={styles.top}>
                  <span className={styles.icon}>
                    <Icon />
                  </span>
                  <h2 id={`stack-${g.id}`} className={styles.name}>
                    {g.title}
                  </h2>
                  <span className={styles.num} aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <p className={styles.text}>{g.text}</p>

                <ul className={styles.chips} aria-label={g.title}>
                  {g.items.map((t) => (
                    <Chip key={t.name} tech={t} />
                  ))}
                </ul>
              </section>
            </li>
          );
        })}
      </ul>

      <p className={styles.legend}>
        <span>
          <i data-on /> Primary stack
        </span>
        <span>
          <i /> Also work with
        </span>
      </p>
    </div>
  );
}