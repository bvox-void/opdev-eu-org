import { MailIcon, TelegramIcon, XIcon } from "@/components/ui/icons";
import { CONTACTS, SITE } from "@/lib/site";
import Pager from "./pager";
import styles from "./footer.module.css";

/**
 * Thin footer. Desktop: fixed strip at the bottom (copyright | sheet pager |
 * contacts). Mobile: a normal block at the end of the page, without the pager.
 */
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <span className={styles.copy}>
        © 2022-{new Date().getFullYear()} {SITE.name}
      </span>

      <Pager />

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
    </footer>
  );
}
