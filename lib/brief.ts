/**
 * Single source of truth for the Brief sheet (sheet 03): the options of the
 * form, the field limits and the "what happens next" steps. The page UI and
 * its JSON-LD are both generated from here.
 * No JSX: `icon` is a key that components/brief maps to an SVG.
 */

export type NeedIconKey = "cart" | "palette" | "plug" | "bot";

export type Need = {
  /** ids are the contract with the future /api/brief route - do not rename */
  id: "store" | "redesign" | "integrations" | "ai";
  icon: NeedIconKey;
  label: string;
  hint: string;
};

export const NEEDS: readonly Need[] = [
  { id: "store", icon: "cart", label: "New store", hint: "From scratch, to first order" },
  { id: "redesign", icon: "palette", label: "Redesign", hint: "Faster, cleaner, converts better" },
  { id: "integrations", icon: "plug", label: "API / integrations", hint: "Connect the tools you already use" },
  { id: "ai", icon: "bot", label: "AI feature", hint: "Chatbots and automation" },
];

export const BUDGETS = ["Up to $1k", "$1k – $5k", "$5k – $15k", "$15k+"] as const;

export const TIMELINES = ["ASAP", "Within a month", "Flexible"] as const;

export const MAX_LEN = {
  description: 1500,
  reference: 300,
  name: 100,
  contact: 150,
} as const;

export const STEPS = [
  { id: "need", title: "What do you need" },
  { id: "idea", title: "Tell me more" },
  { id: "scope", title: "Budget & timeline" },
  { id: "contact", title: "Contacts" },
] as const;

/** Shown beside the form and in the JSON-LD HowTo. */
export const NEXT_STEPS = [
  {
    title: "You send the brief",
    text: "Four short steps, about two minutes. No account, no call needed.",
  },
  {
    title: "Plan and estimate",
    text: "Within 24 hours you get a reply with an approach, scope and a rough estimate.",
  },
  {
    title: "Kick-off",
    text: "If it fits, we agree the details and start building.",
  },
] as const;

export type BriefPayload = {
  needs: string[];
  description: string;
  reference: string;
  budget: string | null;
  timeline: string | null;
  name: string;
  contact: string;
  /** honeypot - must stay empty */
  website: string;
};

export const INITIAL_BRIEF: BriefPayload = {
  needs: [],
  description: "",
  reference: "",
  budget: null,
  timeline: null,
  name: "",
  contact: "",
  website: "",
};
