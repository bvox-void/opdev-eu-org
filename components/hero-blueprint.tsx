import styles from "./hero-blueprint.module.css";

/**
 * Static "engineering drawing" layer for the hero: grid, rulers, crop marks,
 * dimension lines around the storefront window and a small title block.
 *
 * Nothing here animates. The only moving layer in the hero stays
 * <HeroBackdrop />; this one just gives it a surface to read against.
 *
 * Toggle it by commenting out the <HeroBlueprint /> line in hero.tsx.
 */
export default function HeroBlueprint() {
  return (
    <div className={styles.blueprint} aria-hidden="true">
      <div className={styles.grid} />

      <div className={`${styles.ruler} ${styles.rulerTop}`} />
      <div className={`${styles.ruler} ${styles.rulerLeft}`} />

      <i className={`${styles.mark} ${styles.tl}`} />
      <i className={`${styles.mark} ${styles.tr}`} />
      <i className={`${styles.mark} ${styles.bl}`} />
      <i className={`${styles.mark} ${styles.br}`} />

      {/*
        Ghost of the hero layout (same geometry as .inner in hero.module.css,
        desktop only) so the dimension lines hug the browser window.
        If the hero grid changes, update the numbers in .frameGrid.
      */}
      <div className={styles.frame}>
        <div className={styles.frameGrid}>
          <div className={styles.target}>
            <span className={styles.dimTop}>
              <b>storefront · Next.js</b>
            </span>
            <span className={styles.dimLeft}>
              <b>16 : 10</b>
            </span>
          </div>
        </div>
      </div>

      <div className={styles.titleBlock}>
        <span>opdev</span>
        <span>e-commerce dev</span>
        <span>sheet</span>
        <span>01 / hero</span>
        <span>rev</span>
        <span>
          <i /> A
        </span>
      </div>
    </div>
  );
}
