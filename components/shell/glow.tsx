"use client";

import { useState } from "react";
import styles from "./glow.module.css";

/**
 * Background light: a soft phosphor glow plus a dark vignette, like a lit
 * CRT screen. Static, no animation.
 *
 * Variants (try them with the switcher in dev mode):
 *   off      - nothing, the plain dark background
 *   spot     - compact glow behind the text block
 *   terminal - big centre glow + dark vignette (closest to a lit screen)
 *   wash     - wide, low-saturation green-teal wash
 *   crt      - terminal + faint static scanlines
 *
 * When you pick one: set DEFAULT_VARIANT, delete the switcher block and the
 * unused variant classes in glow.module.css.
 */

type Variant = "off" | "spot" | "terminal" | "wash" | "crt";

const DEFAULT_VARIANT: Variant = "terminal";
const VARIANTS: Variant[] = ["off", "spot", "terminal", "wash", "crt"];

export default function Glow() {
  const [variant, setVariant] = useState<Variant>(DEFAULT_VARIANT);
  const showSwitcher = process.env.NODE_ENV !== "production";

  return (
    <>
      <div className={`${styles.glow} ${styles[variant]}`} aria-hidden="true" />

      {showSwitcher && (
        <div
          className={styles.switcher}
          role="group"
          aria-label="Glow variant (dev only)"
        >
          {VARIANTS.map((v) => (
            <button
              key={v}
              type="button"
              className={v === variant ? styles.active : undefined}
              onClick={() => setVariant(v)}
            >
              {v}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
