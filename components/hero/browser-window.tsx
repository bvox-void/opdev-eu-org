import styles from "./browser-window.module.css";

/**
 * Decorative browser window with its own dimension lines (desktop only).
 * The lines are positioned relative to the window itself, so they stay
 * attached to it wherever the window is placed.
 */
export default function BrowserWindow({
  url,
  dimTop,
  dimLeft,
}: {
  url: string;
  dimTop?: string;
  dimLeft?: string;
}) {
  return (
    <div className={styles.stage} aria-hidden="true">
      {dimTop && (
        <span className={styles.dimTop}>
          <b>{dimTop}</b>
        </span>
      )}
      {dimLeft && (
        <span className={styles.dimLeft}>
          <b>{dimLeft}</b>
        </span>
      )}

      <div className={styles.browser}>
        <div className={styles.chrome}>
          <span className={styles.dots}>
            <i />
            <i />
            <i />
          </span>
          <span className={styles.url}>{url}</span>
          <span className={styles.live}>live</span>
        </div>
        <div className={styles.viewport} />
      </div>
    </div>
  );
}
