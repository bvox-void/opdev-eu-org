"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/sidebar/sidebar";
import { ArrowIcon } from "@/components/ui/icons";
import { BRIEF_HREF, SHEETS } from "@/lib/nav";
import { SITE } from "@/lib/site";
import styles from "./navbar.module.css";

/**
 * Top bar. Desktop: logo | sheet index (all sheets, 01 Home first) | CTA.
 * Mobile: logo | burger, which opens the <Sidebar> drawer.
 * The numbers match the sheet numbers in the title block and the footer pager.
 */
export default function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className={styles.bar}>
        <Link href="/" className={styles.logo} aria-label={`${SITE.name} - home`}>
          <i />
          {SITE.name}
        </Link>

        <nav className={styles.nav} aria-label="Main">
          {SHEETS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={styles.link}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              <span className={styles.num}>{item.number}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href={BRIEF_HREF} className={styles.cta}>
          Build with me
          <ArrowIcon />
        </Link>

        <button
          type="button"
          className={styles.burger}
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="sidebar"
          onClick={() => setOpen(true)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      <Sidebar open={open} onClose={() => setOpen(false)} />
    </>
  );
}
