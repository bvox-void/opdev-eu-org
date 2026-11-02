"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SHEETS, sheetIndex } from "@/lib/nav";
import styles from "./footer.module.css";

/**
 * Sheet pager: "<-  02 / 06  ->". Steps to the previous / next sheet in
 * lib/nav.ts. Unknown routes (404) show "-- / 06" with both arrows off.
 * Later this is where the horizontal "rewind" between sheets plugs in.
 */
export default function Pager() {
  const pathname = usePathname();
  const i = sheetIndex(pathname);
  const total = SHEETS.length;

  const prev = i > 0 ? SHEETS[i - 1] : null;
  const next = i >= 0 && i < total - 1 ? SHEETS[i + 1] : null;

  return (
    <nav className={styles.pager} aria-label="Sheets">
      {prev ? (
        <Link
          href={prev.href}
          className={styles.step}
          aria-label={`Previous sheet: ${prev.label}`}
          title={prev.label}
        >
          ←
        </Link>
      ) : (
        <span className={styles.step} aria-hidden="true" data-off>
          ←
        </span>
      )}

      <span className={styles.count} aria-live="polite">
        <b>{i >= 0 ? SHEETS[i].number : "--"}</b> / {String(total).padStart(2, "0")}
      </span>

      {next ? (
        <Link
          href={next.href}
          className={styles.step}
          aria-label={`Next sheet: ${next.label}`}
          title={next.label}
        >
          →
        </Link>
      ) : (
        <span className={styles.step} aria-hidden="true" data-off>
          →
        </span>
      )}
    </nav>
  );
}
