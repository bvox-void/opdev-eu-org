"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CONTACTS } from "@/lib/site";
import {
  ArrowIcon,
  MailIcon,
  TelegramIcon,
  XIcon,
} from "@/components/ui/icons";
import BrowserWindow from "./browser-window";
import styles from "./hero.module.css";

const WORDS = ["sell", "scale", "grow", "convert"];
const TECH = ["React", "Next.js", "Shopify", "API integrations", "SI automation"];

/** Content of sheet 01. The page frame (padding, title block) is <Sheet>. */
export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % WORDS.length);
    }, 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={styles.inner}>
      <div className={styles.copy}>
        <span className={styles.eyebrow}>e-commerce development</span>

        <h1 className={styles.title}>
          Custom stores,
          <br />
          built to{" "}
          <span key={WORDS[wordIndex]} className={styles.word}>
            {WORDS[wordIndex]}
          </span>
        </h1>

        <p className={styles.text}>
          Full-cycle development on React, Next.js & Shopify - from storefront
          design to API integrations and SI automation.
        </p>

        <div className={styles.tech}>
          {TECH.map((item) => (
            <span key={item} className={styles.pill}>
              {item}
            </span>
          ))}
        </div>

        <div className={styles.cta}>
          <Link href="/start" className={styles.primary}>
            Build with me
            <ArrowIcon />
          </Link>

          <div className={styles.contacts}>
            <a
              className={styles.contact}
              href={CONTACTS.telegram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contact via Telegram"
            >
              <TelegramIcon />
            </a>
            <a
              className={styles.contact}
              href={CONTACTS.x}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contact via X"
            >
              <XIcon />
            </a>
            <a
              className={styles.contact}
              href={`mailto:${CONTACTS.email}`}
              aria-label="Contact via Email"
            >
              <MailIcon />
            </a>
          </div>
        </div>
      </div>

      <BrowserWindow
        url="northline.shop"
        dimTop="storefront · Next.js"
        dimLeft="16 : 10"
      />
    </div>
  );
}
