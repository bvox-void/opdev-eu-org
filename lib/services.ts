/**
 * Single source of truth for the Services sheet (sheet 02).
 * The page UI AND the JSON-LD (schema.org OfferCatalog) are both generated
 * from this list, so humans and AI agents always read the same facts.
 * No JSX here: `icon` is a key that components/services maps to an SVG.
 */

export type ServiceIconKey =
  | "cart"
  | "code"
  | "card"
  | "plug"
  | "bot";

export type Service = {
  id: string;
  icon: ServiceIconKey;
  /** spans two columns on desktop */
  wide?: boolean;
  title: string;
  text: string;
  /** one line: what the client gets */
  outcome: string;
  tags: readonly string[];
};

export const SERVICES: readonly Service[] = [
  {
    id: "online-stores",
    icon: "cart",
    wide: true,
    title: "Custom online stores",
    text: "Full-cycle e-commerce development: catalog, cart, checkout, payments and admin, built as one system instead of a pile of plugins. From the first screen to the first paid order, a single point of responsibility. Products and policies are published as clean semantic HTML with schema.org structured data, so search engines and AI assistants can read, cite and recommend the catalog.",
    outcome: "A live store that takes real orders and that AI search can read.",
    tags: ["Next.js", "Stripe", "Schema.org", "AI search", "MCP"],   // Custom online stores
  },
  {
    id: "storefronts",
    icon: "code",
    title: "Storefronts on React & Next.js",
    text: "Responsive, accessible interfaces with clean code and pixel-accurate layouts. Server-rendered pages load fast, rank well and behave the same on phones, tablets, desktops and older browsers.",
    outcome: "A storefront that is fast on every device.",
    tags: ["React", "Next.js", "Responsive"],
  },
  {
    id: "checkout-payments",
    icon: "card",
    title: "Checkout & payments",
    text: "Checkout reduced to the steps that matter, with Stripe and other payment providers integrated end to end: cards, wallets, refunds and webhooks.",
    outcome: "A checkout that converts and reconciles cleanly.",
    tags: ["Stripe", "Payments"],
  },
  {
    id: "integrations",
    icon: "plug",
    title: "Integrations & data sync",
    text: "Custom API connections between the store and the tools a business already runs: inventory, orders, shipping, CRM, accounting. Data flows automatically instead of being retyped.",
    outcome: "Less manual work, one source of truth.",
    tags: ["API", "Webhooks", "MCP"], // Integrations & data sync
  },
  {
    id: "ai-automation",
    icon: "bot",
    title: "AI features & automation",
    text: "AI chatbots and automations for customer support, product questions and routine operations, connected to real store data.",
    outcome: "Support and operations that scale without extra headcount.",
    tags: ["AI", "Chatbots", "Automation"],
  },
];