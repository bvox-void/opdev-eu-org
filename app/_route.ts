/**
 * POST /api/brief
 *
 * Receives the Brief form payload, validates it on the server and forwards it
 * as a plain-text message to a Telegram chat. Port of the old site's brief.js.
 *
 * NOT CONNECTED YET: the form talks to this route only after BRIEF_LIVE is
 * set to true in lib/brief-submit.ts. To go live:
 *   1. add TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID to the Vercel project
 *      (Settings -> Environment Variables), then redeploy;
 *   2. set BRIEF_LIVE = true in lib/brief-submit.ts.
 */

import { BUDGETS, MAX_LEN, NEEDS, TIMELINES } from "@/lib/brief";

const NEED_IDS: ReadonlySet<string> = new Set(NEEDS.map((n) => n.id));
const BUDGET_SET: ReadonlySet<string> = new Set(BUDGETS);
const TIMELINE_SET: ReadonlySet<string> = new Set(TIMELINES);

const MAX_BODY_BYTES = 10_000; // the largest legal payload is ~2.3 KB
const TELEGRAM_TIMEOUT_MS = 8_000;

/*
 * Crude in-memory rate limit, per IP. On Vercel every serverless instance has
 * its own memory and it resets on a cold start, so this only stops a bored
 * script, not a determined one. Fine for a low-traffic contact form; use
 * Vercel Firewall rate limiting or a KV store if it ever gets abused.
 */
const WINDOW_MS = 60_000;
const MAX_HITS = 5;
const hits = new Map<string, { count: number; start: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();

  // keep the map from growing forever on a long-lived instance
  if (hits.size > 1000) {
    for (const [key, e] of hits) {
      if (now - e.start > WINDOW_MS) hits.delete(key);
    }
  }

  const entry = hits.get(ip);
  if (!entry || now - entry.start > WINDOW_MS) {
    hits.set(ip, { count: 1, start: now });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_HITS;
}

function clientIp(req: Request): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

/** Plain text only (no parse_mode): trim, drop control chars, cap the length. */
function clean(value: string, max = 4000): string {
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .trim()
    .slice(0, max);
}

type Brief = {
  needs: string[];
  description: string;
  reference: string;
  budget: string;
  timeline: string;
  name: string;
  contact: string;
};

/** Returns the clean brief, "spam" for a filled honeypot, or an error string. */
function parse(body: unknown): Brief | "spam" | { error: string } {
  if (!body || typeof body !== "object") return { error: "Invalid payload" };
  const b = body as Record<string, unknown>;

  // honeypot: real people never fill this hidden field
  if (b.website) return "spam";

  const { needs, description, reference, budget, timeline, name, contact } = b;

  if (!Array.isArray(needs) || needs.length === 0 || needs.length > NEEDS.length) {
    return { error: "Needs required" };
  }
  if (!needs.every((n) => typeof n === "string" && NEED_IDS.has(n))) {
    return { error: "Invalid need id" };
  }

  if (typeof description !== "string" || description.length > MAX_LEN.description) {
    return { error: "Invalid description" };
  }
  if (
    reference != null &&
    (typeof reference !== "string" || reference.length > MAX_LEN.reference)
  ) {
    return { error: "Invalid reference" };
  }
  if (budget != null && (typeof budget !== "string" || !BUDGET_SET.has(budget))) {
    return { error: "Invalid budget" };
  }
  if (
    timeline != null &&
    (typeof timeline !== "string" || !TIMELINE_SET.has(timeline))
  ) {
    return { error: "Invalid timeline" };
  }

  if (typeof name !== "string" || !name.trim() || name.length > MAX_LEN.name) {
    return { error: "Name required" };
  }
  if (
    typeof contact !== "string" ||
    !contact.trim() ||
    contact.length > MAX_LEN.contact
  ) {
    return { error: "Contact required" };
  }

  return {
    needs: [...new Set(needs as string[])],
    description: clean(description),
    reference: typeof reference === "string" ? clean(reference) : "",
    budget: typeof budget === "string" ? budget : "",
    timeline: typeof timeline === "string" ? timeline : "",
    name: clean(name),
    contact: clean(contact),
  };
}

function json(body: Record<string, unknown>, status = 200, headers?: HeadersInit) {
  return Response.json(body, { status, headers });
}

export async function POST(req: Request) {
  if (rateLimited(clientIp(req))) {
    return json({ error: "Too many requests, try again later" }, 429, {
      "Retry-After": String(WINDOW_MS / 1000),
    });
  }

  const length = Number(req.headers.get("content-length") ?? 0);
  if (length > MAX_BODY_BYTES) return json({ error: "Payload too large" }, 413);

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid payload" }, 400);
  }

  const brief = parse(body);
  // a bot gets the same "ok" as a person, so it learns nothing
  if (brief === "spam") return json({ ok: true });
  if ("error" in brief) return json({ error: brief.error }, 400);

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!botToken || !chatId) {
    console.error("Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID env vars");
    return json({ error: "Server misconfigured" }, 500);
  }

  const labels = brief.needs.map(
    (id) => NEEDS.find((n) => n.id === id)?.label ?? id,
  );

  const text = [
    "🆕 New brief from opdev.eu.org",
    "",
    `Needs: ${labels.join(", ")}`,
    `Budget: ${brief.budget || "—"}`,
    `Timeline: ${brief.timeline || "—"}`,
    "",
    `Description: ${brief.description || "—"}`,
    brief.reference ? `Reference: ${brief.reference}` : null,
    "",
    `Name: ${brief.name}`,
    `Contact: ${brief.contact}`,
  ]
    .filter((line) => line !== null)
    .join("\n")
    .slice(0, 4096); // Telegram's message limit

  try {
    const tg = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // no parse_mode -> sent as plain text, nothing in `text` is interpreted
      body: JSON.stringify({ chat_id: chatId, text }),
      signal: AbortSignal.timeout(TELEGRAM_TIMEOUT_MS),
    });

    if (!tg.ok) {
      console.error("Telegram API error:", tg.status, await tg.text());
      return json({ error: "Failed to deliver message" }, 502);
    }

    return json({ ok: true });
  } catch (err) {
    console.error("Brief submit error:", err);
    return json({ error: "Unexpected server error" }, 500);
  }
}
