import type { BriefPayload } from "./brief";

/**
 * STUB. The brief is NOT delivered anywhere yet - the Telegram bot is not
 * connected to the new site (planned for later).
 *
 * When the time comes: set BRIEF_LIVE to true, add app/api/brief/route.ts
 * (port of the old brief.js: validation + rate limit + Telegram sendMessage)
 * and the env vars TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID in Vercel.
 * The form component does not need to change.
 */
const BRIEF_LIVE = false;

export async function sendBrief(payload: BriefPayload): Promise<void> {
  if (!BRIEF_LIVE) {
    await new Promise((r) => setTimeout(r, 600)); // imitate the network
    return;
  }

  const res = await fetch("/api/brief", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`brief: ${res.status}`);
}
