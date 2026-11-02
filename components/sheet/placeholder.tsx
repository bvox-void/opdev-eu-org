import styles from "./placeholder.module.css";

/** Temporary content for sheets that are not designed yet. */
export default function Placeholder({
  number,
  label,
}: {
  number: string;
  label: string;
}) {
  return (
    <div className={styles.box}>
      <span className={styles.number}>{number}</span>
      <h1 className={styles.label}>{label}</h1>
      <p className={styles.note}>sheet in progress</p>
    </div>
  );
}
