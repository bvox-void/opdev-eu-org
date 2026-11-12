/**
 * Single source of truth for the Services sheet (sheet 03).
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
    text: "Catalog, cart, checkout, payments and admin built as one system, not a pile of plugins. Published as semantic HTML with schema.org data so AI assistants can read and recommend your products.",
    outcome: "A live store that takes real orders and that AI search can read.",
    tags: ["Next.js", "Stripe", "Schema.org", "AI search", "MCP"],   // Custom online stores
  },
  {
    id: "storefronts",
    icon: "code",
    title: "Storefronts on React & Next.js",
    text: "Responsive, accessible interfaces with server-rendered pages that load fast and work the same on any device, including older browsers.",
    outcome: "A storefront that is fast on every device.",
    tags: ["React", "Next.js", "Responsive"],
  },
  {
    id: "checkout-payments",
    icon: "card",
    title: "Checkout & payments",
    text: "Checkout cut down to the steps that matter, with Stripe and other providers: cards, wallets, refunds, webhooks.",
    outcome: "A checkout that converts and reconciles cleanly.",
    tags: ["Stripe", "Payments"],
  },
  {
    id: "integrations",
    icon: "plug",
    title: "Integrations & data sync",
    text: "API connections between the store and your tools: inventory, orders, shipping, CRM, accounting.",
    outcome: "Less manual work, one source of truth.",
    tags: ["API", "Webhooks", "MCP"], // Integrations & data sync
  },
  {
    id: "ai-automation",
    icon: "bot",
    title: "AI features & automation",
    text: "AI chatbots and automations for support and routine operations, connected to real store data.",
    outcome: "Support that scales without extra headcount.",
    tags: ["AI", "Chatbots", "Automation"],
  },
];