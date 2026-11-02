"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MailIcon, TelegramIcon, XIcon } from "@/components/ui/icons";
import { SHEETS } from "@/lib/nav";
import { CONTACTS } from "@/lib/site";
import styles from "./sidebar.module.css";

/**
 * Mobile menu drawer, opened by the burger in <NavBar>. On desktop it is
 * never shown (the NavBar has the links). Lists ALL sheets, cover included.
 */
export default function Sidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden"; // no scrolling behind the drawer
    closeRef.current?.focus();

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  return (
    <div className={`${styles.root} ${open ? styles.open : ""}`}>
      <div className={styles.overlay} onClick={onClose} aria-hidden="true" />

      <aside
        id="sidebar"
        className={styles.drawer}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!open}
      >
        <div className={styles.head}>
          <span className={styles.title}>sheet index</span>
          <button
            ref={closeRef}
            type="button"
            className={styles.close}
            aria-label="Close menu"
            onClick={onClose}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
              <path
                d="M2 2l10 10M12 2 2 12"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <nav aria-label="Menu">
          <ul className={styles.list}>
            {SHEETS.map((s) => (
              <li key={s.href}>
                <Link
                  href={s.href}
                  className={styles.link}
                  aria-current={pathname === s.href ? "page" : undefined}
                  onClick={onClose}
                >
                  <span className={styles.num}>{s.number}</span>
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.contacts}>
          <a
            href={CONTACTS.telegram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contact via Telegram"
          >
            <TelegramIcon />
          </a>
          <a
            href={CONTACTS.x}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contact via X"
          >
            <XIcon />
          </a>
          <a href={`mailto:${CONTACTS.email}`} aria-label="Contact via Email">
            <MailIcon />
          </a>
        </div>
      </aside>
    </div>
  );
}
