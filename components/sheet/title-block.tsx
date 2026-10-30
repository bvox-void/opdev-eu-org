import { SITE } from "@/lib/site";
import styles from "./title-block.module.css";

/** Drawing title block, bottom-left of the sheet (desktop only). */
export default function TitleBlock({
  number,
  title,
  rev = "A",
}: {
  number: string;
  title: string;
  rev?: string;
}) {
  return (
    <div className={styles.block} aria-hidden="true">
      <span>{SITE.name}</span>
      <span>{SITE.tagline}</span>
      <span>sheet</span>
      <span>
        {number} / {title}
      </span>
      <span>rev</span>
      <span>
        <i /> {rev}
      </span>
    </div>
  );
}
