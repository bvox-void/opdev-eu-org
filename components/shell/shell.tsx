import Backdrop from "./backdrop";
import Blueprint from "./blueprint";
import Glow from "./glow";
import styles from "./shell.module.css";

/**
 * Permanent frame of the site. Lives in app/layout.tsx, so it is NOT
 * re-rendered when the route changes; only {children} (the sheets) change.
 *
 * Layers, bottom to top (each one is position: fixed, full viewport):
 *   base      - dark background with two soft colour spots
 *   Glow      - phosphor light + vignette (5 variants, dev switcher inside)
 *   Blueprint - grid, rulers, crop marks (static)
 *   Backdrop  - event tags, falling lines (lines are OFF by default)
 *   content   - the page (a <Sheet>)
 */
export default function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.shell}>
      <div className={styles.base} aria-hidden="true" />
      <Glow />
      <Blueprint />
      <Backdrop lines={false} />
      <div className={styles.content}>{children}</div>
    </div>
  );
}
