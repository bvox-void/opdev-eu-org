/**
 * Single source of truth for the About sheet (sheet 05).
 * The page UI AND its JSON-LD are both generated from here (plus lib/stack.ts
 * and lib/services.ts for the facts), so humans and AI agents read the same
 * statements.
 * No JSX here: `icon` is a key that components/about maps to an SVG.
 */

export type AboutIconKey = "gauge" | "globe" | "doc" | "check";

export type Principle = {
  id: string;
  icon: AboutIconKey;
  title: string;
  text: string;
};

/** Lead paragraph under the page title (also used as the meta description base). */
export const ABOUT_LEAD =
  "Opdev is an independent e-commerce development practice. I build custom stores on React and Next.js and make them easy to understand for shoppers and for the AI assistants that increasingly recommend them.";

export const PRINCIPLES: readonly Principle[] = [
  {
    id: "speed",
    icon: "gauge",
    title: "Fast by default",
    text: "Server-rendered pages, light JavaScript and optimised assets. Speed is part of every build, not an extra.",
  },
  {
    id: "everywhere",
    icon: "globe",
    title: "Works everywhere",
    text: "Responsive on any screen and tested across browsers, including older ones where your customers still use them.",
  },
  {
    id: "readable",
    icon: "doc",
    title: "Readable by AI",
    text: "Real headings, structured data and clear product facts, so search engines and AI agents understand what you sell.",
  },
  {
    id: "outcomes",
    icon: "check",
    title: "Clear outcomes",
    text: "A written scope, an honest estimate and a result you can measure: a store that takes real orders.",
  },
];

export const CTA = {
  title: "Have a project in mind?",
  text: "Send a short brief and get a plan with a rough estimate within 24 hours. No account and no call needed.",
  label: "Build with me",
} as const;