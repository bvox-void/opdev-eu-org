import styles from "./glow.module.css";

/**
 * Background light: a wide, low-saturation green-teal wash with a cool blue
 * spot on the right. Static, no animation, no client JS.
 */
export default function Glow() {
  return <div className={styles.glow} aria-hidden="true" />;
}