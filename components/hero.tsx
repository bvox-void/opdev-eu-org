"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./hero.module.css";

const WORDS = ["sell", "scale", "grow", "convert"];
const TECH = ["React", "Next.js", "Shopify", "API integrations", "SI automation"];

const TELEGRAM = "https://t.me/bvox_void";
const X_URL = "https://x.com/opdev_tech";
const EMAIL = "bvox.void@gmail.com";

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % WORDS.length);
    }, 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <section className={styles.hero}>
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
                href={TELEGRAM}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contact via Telegram"
              >
                <TelegramIcon />
              </a>
              <a
                className={styles.contact}
                href={X_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contact via X"
              >
                <XIcon />
              </a>
              <a
                className={styles.contact}
                href={`mailto:${EMAIL}`}
                aria-label="Contact via Email"
              >
                <MailIcon />
              </a>
            </div>
          </div>
        </div>

        <div className={styles.stage} aria-hidden="true">
          <div className={styles.browser}>
            <div className={styles.chrome}>
              <span className={styles.dots}>
                <i />
                <i />
                <i />
              </span>
              <span className={styles.url}>northline.shop</span>
              <span className={styles.live}>live</span>
            </div>
            <div className={styles.viewport} />
          </div>
        </div>
      </div>
    </section>
  );
}

function ArrowIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
      <path
        d="M2 6h8M7 3l3 3-3 3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M9.04 15.32 8.9 19.1c.4 0 .58-.17.8-.38l1.92-1.84 3.98 2.92c.73.4 1.25.19 1.45-.67l2.63-12.38c.24-1.1-.4-1.53-1.12-1.26L3.4 10.02c-1.07.42-1.05 1.02-.18 1.29l4.3 1.34 9.98-6.3c.47-.28.9-.13.55.18"
      />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M14.7 10.3 22.4 2h-1.8l-6.7 7.2L8.6 2H2.2l8.1 11.5L2.2 22h1.8l7.1-7.6L15.4 22h6.4zm-2.5 2.7-.8-1.1L4.6 3.3h2.8l5.3 7.4.8 1.1 6.9 9.6h-2.8z"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2m0 4-8 5L4 8V6l8 5 8-5z"
      />
    </svg>
  );
}