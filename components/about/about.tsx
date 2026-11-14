import Link from "next/link";
import {
  ABOUT_LEAD,
  CTA,
  PRINCIPLES,
  type AboutIconKey,
} from "@/lib/about";
import { BRIEF_HREF } from "@/lib/nav";
import { SERVICES } from "@/lib/services";
import { STACK } from "@/lib/stack";
import {
  ArrowIcon,
  CheckIcon,
  DocIcon,
  GaugeIcon,
  GlobeIcon,
} from "@/components/ui/icons";
import { PlaneArt, ShopArt, StackArt, TilesArt } from "./glance-icons";
import styles from "./about.module.css";

const ICONS: Record<AboutIconKey, () => React.JSX.Element> = {
  gauge: GaugeIcon,
  globe: GlobeIcon,
  doc: DocIcon,
  check: CheckIcon,
};

/** Primary technologies of the groups that describe how a store is built. */
const CORE_STACK = STACK.filter((g) => g.id !== "discovery")
  .flatMap((g) => g.items.filter((t) => t.primary).map((t) => t.name))
  .join(", ");

const PLATFORMS = (STACK.find((g) => g.id === "platforms")?.items ?? [])
  .map((t) => t.name)
  .join(", ");

type Fact = {
  label: string;
  value: string;
  href?: string;
  art: () => React.JSX.Element;
  /** "r, g, b" of this fact's colour (feeds rgba(var(--tone), a) in the CSS) */
  tone: string;
};

/**
 * "At a glance": the page in key-value form, easy for agents to quote.
 * Every fact has its own colour on purpose (the rest of the site is green).
 */
const FACTS: readonly Fact[] = [
  { label: "Core stack", value: CORE_STACK, href: "/stack", art: StackArt, tone: "var(--blue-rgb)" },
  { label: "Platforms", value: PLATFORMS, href: "/stack", art: ShopArt, tone: "245, 183, 74" },
  {
    label: "Services",
    value: `${SERVICES.length} services, from custom stores to AI automation`,
    href: "/services",
    art: TilesArt,
    tone: "167, 139, 250",
  },
  {
    label: "Start a project",
    value: "Project brief, plan and estimate within 24 hours",
    href: BRIEF_HREF,
    art: PlaneArt,
    tone: "255, 122, 138",
  },
];

/**
 * Content of sheet 05. Server component: all text is in the initial HTML
 * (no JS needed), with real headings and lists so crawlers and AI agents can
 * read the structure. The page frame (padding, title block) is <Sheet>.
 */
export default function About() {
  return (
    <div className={styles.inner}>
      <header className={styles.head}>
        <span className={styles.eyebrow}>about</span>
        <h1 className={styles.title}>
          Built for people and AI <span>agents</span>
        </h1>
        <p className={styles.lead}>{ABOUT_LEAD}</p>
      </header>

      <section className={styles.glance} aria-labelledby="about-glance">
        <h2 id="about-glance" className={styles.h2}>
          At a glance
        </h2>
        <dl className={styles.facts}>
          {FACTS.map((f) => (
            <div
              key={f.label}
              className={styles.fact}
              style={{ "--tone": f.tone } as React.CSSProperties}
            >
              <dt>
                <span className={styles.glyph} aria-hidden="true">
                  <f.art />
                </span>
                {f.label}
              </dt>
              <dd>
                {f.href ? (
                  <Link href={f.href} className={styles.link}>
                    {f.value}
                  </Link>
                ) : (
                  f.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className={styles.principles} aria-labelledby="about-principles">
        <h2 id="about-principles" className={styles.h2}>
          How I build
        </h2>
        <ul className={styles.grid}>
          {PRINCIPLES.map((p, i) => {
            const Icon = ICONS[p.icon];
            return (
              <li
                key={p.id}
                className={styles.item}
                style={{ "--i": i } as React.CSSProperties}
              >
                <article className={styles.card} aria-labelledby={`pr-${p.id}`}>
                  <div className={styles.top}>
                    <span className={styles.icon}>
                      <Icon />
                    </span>
                    <h3 id={`pr-${p.id}`} className={styles.name}>
                      {p.title}
                    </h3>
                    <span className={styles.num} aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className={styles.cardText}>{p.text}</p>
                </article>
              </li>
            );
          })}
        </ul>
      </section>

      <section className={styles.cta} aria-labelledby="about-cta">
        <div className={styles.ctaCopy}>
          <h2 id="about-cta" className={styles.ctaTitle}>
            {CTA.title}
          </h2>
          <p className={styles.ctaText}>{CTA.text}</p>
        </div>
        <Link href={BRIEF_HREF} className={styles.button}>
          {CTA.label}
          <ArrowIcon />
        </Link>
      </section>
    </div>
  );
}