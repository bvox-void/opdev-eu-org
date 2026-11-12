import { SERVICES, type ServiceIconKey } from "@/lib/services";
import {
  BotIcon,
  CardIcon,
  CartIcon,
  CodeIcon,
  PlugIcon,
} from "@/components/ui/icons";
import styles from "./services.module.css";

const ICONS: Record<ServiceIconKey, () => React.JSX.Element> = {
  cart: CartIcon,
  code: CodeIcon,
  card: CardIcon,
  plug: PlugIcon,
  bot: BotIcon,
};

/**
 * Content of sheet 02. Server component: all text is in the initial HTML
 * (no JS needed), with real headings and lists so crawlers and AI agents
 * can read the structure. The page frame (padding, title block) is <Sheet>.
 */
export default function Services() {
  return (
    <div className={styles.inner}>
      <header className={styles.head}>
        <span className={styles.eyebrow}>services</span>
        <h1 className={styles.title}>
          Everything a store needs to <span>grow</span>
        </h1>
        <p className={styles.lead}>
          Custom stores, payments, integrations and AI automation on React and
          Next.js. Fast on every device and readable by AI search.
        </p>
      </header>

      <ul className={styles.grid}>
        {SERVICES.map((s, i) => {
          const Icon = ICONS[s.icon];
          return (
            <li
              key={s.id}
              className={`${styles.item} ${s.wide ? styles.wide : ""}`}
              style={{ "--i": i } as React.CSSProperties}
            >
              <article className={styles.card} aria-labelledby={`svc-${s.id}`}>
                <div className={styles.top}>
                  <span className={styles.icon}>
                    <Icon />
                  </span>
                  <h2 id={`svc-${s.id}`} className={styles.name}>
                    {s.title}
                  </h2>
                  <span className={styles.num} aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <p className={styles.text}>{s.text}</p>

                <p className={styles.outcome}>
                  <span>Outcome</span> {s.outcome}
                </p>

                <ul className={styles.tags} aria-label="Technologies">
                  {s.tags.map((t) => (
                    <li key={t} className={styles.pill}>
                      {t}
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          );
        })}
      </ul>

    </div>
  );
}