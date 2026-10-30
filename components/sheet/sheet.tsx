import TitleBlock from "./title-block";
import styles from "./sheet.module.css";

/**
 * One page of the site = one drawing sheet. Wrap the content of every page
 * in <Sheet>. It gives the page the standard viewport-high area and its own
 * title block ("SHEET 01 / HERO"). The permanent frame is <Shell> in layout.
 */
export default function Sheet({
  number,
  title,
  rev,
  children,
}: {
  number: string;
  title: string;
  rev?: string;
  children: React.ReactNode;
}) {
  return (
    <main className={styles.sheet}>
      {children}
      <TitleBlock number={number} title={title} rev={rev} />
    </main>
  );
}
