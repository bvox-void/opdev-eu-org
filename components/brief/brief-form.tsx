"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowIcon,
  BotIcon,
  CartIcon,
  CheckIcon,
  PaletteIcon,
  PlugIcon,
} from "@/components/ui/icons";
import {
  BUDGETS,
  INITIAL_BRIEF,
  MAX_LEN,
  NEEDS,
  NEXT_STEPS,
  STEPS,
  TIMELINES,
  type BriefPayload,
  type NeedIconKey,
} from "@/lib/brief";
import { sendBrief } from "@/lib/brief-submit";
import { CONTACTS } from "@/lib/site";
import styles from "./brief.module.css";

const ICONS: Record<NeedIconKey, () => React.JSX.Element> = {
  cart: CartIcon,
  palette: PaletteIcon,
  plug: PlugIcon,
  bot: BotIcon,
};

const LAST = STEPS.length - 1;

/**
 * Content of sheet 03: 4-step brief form (left) + live spec sheet and the
 * "what happens next" list (right). Rendered on the server too, so all copy
 * is in the initial HTML. The page frame (padding, title block) is <Sheet>.
 */
export default function BriefForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<BriefPayload>(INITIAL_BRIEF);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const stepRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);

  // move focus to the step heading after Next / Back (keyboard + screen readers)
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    stepRef.current?.focus();
  }, [step, status]);

  const set = <K extends keyof BriefPayload>(key: K, value: BriefPayload[K]) =>
    setData((prev) => ({ ...prev, [key]: value }));

  const toggleNeed = (id: string) =>
    setData((prev) => ({
      ...prev,
      needs: prev.needs.includes(id)
        ? prev.needs.filter((n) => n !== id)
        : [...prev.needs, id],
    }));

  const canGoNext =
    step === 0
      ? data.needs.length > 0
      : step === LAST
        ? data.name.trim() !== "" && data.contact.trim() !== ""
        : true;

  async function submit() {
    setStatus("sending");
    try {
      await sendBrief(data);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canGoNext || status === "sending") return;
    if (step < LAST) setStep(step + 1);
    else void submit();
  }

  const needLabels = data.needs
    .map((id) => NEEDS.find((n) => n.id === id)?.label)
    .filter(Boolean)
    .join(", ");

  const specs: { label: string; value: string | null }[] = [
    { label: "Need", value: needLabels || null },
    { label: "Budget", value: data.budget },
    { label: "Timeline", value: data.timeline },
  ];

  return (
    <div className={styles.inner}>
      <header className={styles.head}>
        <span className={styles.eyebrow}>project brief</span>
        <h1 className={styles.title}>
          Let&apos;s build <span>something</span>
        </h1>
        <p className={styles.lead}>
          Answer a few quick questions. I&apos;ll come back within 24 hours with
          a plan and a rough estimate.
        </p>
      </header>

      <div className={styles.grid}>
        {status === "sent" ? (
          <section className={`${styles.card} ${styles.done}`} aria-live="polite">
            <span className={styles.doneIcon}>
              <CheckIcon />
            </span>
            <h2 ref={stepRef} tabIndex={-1} className={styles.doneTitle}>
              Got it, thanks!
            </h2>
            <p className={styles.doneText}>
              I&apos;ll go through the brief and get back to you within 24 hours.
              In a hurry? Write directly on{" "}
              <a href={CONTACTS.telegram} target="_blank" rel="noopener noreferrer">
                Telegram
              </a>{" "}
              or by{" "}
              <a href={`mailto:${CONTACTS.email}`}>email</a>.
            </p>
            <Link href="/" className={styles.ghost}>
              Back to home
            </Link>
          </section>
        ) : (
          <form className={styles.card} onSubmit={onSubmit} noValidate>
            <p className={styles.stepLabel}>
              Step {step + 1} of {STEPS.length}
            </p>
            <div className={styles.bar} aria-hidden="true">
              {STEPS.map((s, i) => (
                <i key={s.id} data-on={i <= step ? "" : undefined} />
              ))}
            </div>

            <h2 ref={stepRef} tabIndex={-1} className={styles.stepTitle}>
              {STEPS[step].title}
            </h2>

            <div key={step} className={styles.panel}>
              {step === 0 && (
                <fieldset className={styles.fieldset}>
                  <legend className={styles.legend}>
                    Pick everything that applies
                  </legend>
                  <div className={styles.needs}>
                    {NEEDS.map((n) => {
                      const Icon = ICONS[n.icon];
                      return (
                        <label key={n.id} className={styles.need}>
                          <input
                            type="checkbox"
                            checked={data.needs.includes(n.id)}
                            onChange={() => toggleNeed(n.id)}
                          />
                          <span className={styles.needIcon}>
                            <Icon />
                          </span>
                          <span className={styles.needText}>
                            <b>{n.label}</b>
                            <small>{n.hint}</small>
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>
              )}

              {step === 1 && (
                <>
                  <label className={styles.label} htmlFor="brief-description">
                    Describe the idea
                  </label>
                  <textarea
                    id="brief-description"
                    className={styles.textarea}
                    placeholder="What are you trying to build or fix?"
                    maxLength={MAX_LEN.description}
                    value={data.description}
                    onChange={(e) => set("description", e.target.value)}
                  />
                  <label className={styles.label} htmlFor="brief-reference">
                    Reference or current site <em>(optional)</em>
                  </label>
                  <input
                    id="brief-reference"
                    className={styles.input}
                    type="url"
                    inputMode="url"
                    placeholder="https://..."
                    maxLength={MAX_LEN.reference}
                    value={data.reference}
                    onChange={(e) => set("reference", e.target.value)}
                  />
                  {/* honeypot: hidden from people, bots tend to fill every field */}
                  <input
                    className={styles.trap}
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    value={data.website}
                    onChange={(e) => set("website", e.target.value)}
                  />
                </>
              )}

              {step === 2 && (
                <>
                  <fieldset className={styles.fieldset}>
                    <legend className={styles.label}>Budget</legend>
                    <div className={styles.pills}>
                      {BUDGETS.map((b) => (
                        <label key={b} className={styles.pill}>
                          <input
                            type="radio"
                            name="budget"
                            checked={data.budget === b}
                            onChange={() => set("budget", b)}
                          />
                          <span>{b}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                  <fieldset className={styles.fieldset}>
                    <legend className={styles.label}>Timeline</legend>
                    <div className={styles.pills}>
                      {TIMELINES.map((t) => (
                        <label key={t} className={styles.pill}>
                          <input
                            type="radio"
                            name="timeline"
                            checked={data.timeline === t}
                            onChange={() => set("timeline", t)}
                          />
                          <span>{t}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                </>
              )}

              {step === 3 && (
                <>
                  <label className={styles.label} htmlFor="brief-name">
                    Name
                  </label>
                  <input
                    id="brief-name"
                    className={styles.input}
                    type="text"
                    autoComplete="name"
                    placeholder="Your name"
                    maxLength={MAX_LEN.name}
                    value={data.name}
                    onChange={(e) => set("name", e.target.value)}
                  />
                  <label className={styles.label} htmlFor="brief-contact">
                    Email or Telegram
                  </label>
                  <input
                    id="brief-contact"
                    className={styles.input}
                    type="text"
                    autoComplete="email"
                    placeholder="you@company.com or @username"
                    maxLength={MAX_LEN.contact}
                    value={data.contact}
                    onChange={(e) => set("contact", e.target.value)}
                  />
                </>
              )}
            </div>

            <div className={styles.nav}>
              {step > 0 && (
                <button
                  type="button"
                  className={styles.ghost}
                  disabled={status === "sending"}
                  onClick={() => setStep(step - 1)}
                >
                  Back
                </button>
              )}
              <button
                type="submit"
                className={styles.primary}
                disabled={!canGoNext || status === "sending"}
              >
                {step < LAST
                  ? "Next"
                  : status === "sending"
                    ? "Sending…"
                    : "Send brief"}
                {step < LAST && <ArrowIcon />}
              </button>
            </div>

            {status === "error" && (
              <p className={styles.error} role="alert">
                Failed to send. Please try again or write directly on{" "}
                <a href={CONTACTS.telegram} target="_blank" rel="noopener noreferrer">
                  Telegram
                </a>
                .
              </p>
            )}
          </form>
        )}

        <aside className={styles.side} aria-label="Brief summary and next steps">
          <section className={styles.spec}>
            <h2 className={styles.specTitle}>Your brief so far</h2>
            <dl className={styles.specList}>
              {specs.map((s) => (
                <div key={s.label} className={styles.specRow}>
                  <dt>{s.label}</dt>
                  <dd data-empty={s.value ? undefined : ""}>
                    {s.value ?? "not selected"}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section className={styles.next}>
            <h2 className={styles.specTitle}>What happens next</h2>
            <ol className={styles.nextList}>
              {NEXT_STEPS.map((n, i) => (
                <li key={n.title}>
                  <span className={styles.nextNum}>{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <b>{n.title}</b>
                    <p>{n.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </aside>
      </div>
    </div>
  );
}
