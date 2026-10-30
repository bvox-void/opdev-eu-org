import styles from "./blueprint.module.css";

/**
 * Static "engineering drawing" layer: grid, rulers along the top and left
 * edges, crop marks in the corners. Nothing here animates.
 *
 * Page-specific drawing details (title block, dimension lines) do NOT live
 * here: the title block belongs to <Sheet>, dimension lines to the element
 * they measure (see hero/browser-window.tsx).
 */
export default function Blueprint() {
  return (
    <div className={styles.blueprint} aria-hidden="true">
      <div className={styles.grid} />

      <div className={`${styles.ruler} ${styles.rulerTop}`} />
      <div className={`${styles.ruler} ${styles.rulerLeft}`} />

      <i className={`${styles.mark} ${styles.tl}`} />
      <i className={`${styles.mark} ${styles.tr}`} />
      <i className={`${styles.mark} ${styles.bl}`} />
      <i className={`${styles.mark} ${styles.br}`} />
    </div>
  );
}
