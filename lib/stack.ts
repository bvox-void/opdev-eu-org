/**
 * Single source of truth for the Stack sheet (sheet 02).
 * The page UI AND the JSON-LD (schema.org knowsAbout) are both generated from
 * these lists, so humans and AI agents always read the same facts.
 * No JSX here: `icon` is a key into lib/brand-icons.ts, `section` is a key
 * that components/stack maps to an SVG.
 *
 * DRAFT: the lists are intentionally broad for now. Trim / reorder later.
 * `primary: true` = the core stack (shown highlighted); the rest are
 * "also work with".
 */

import type { BrandKey } from "@/lib/brand-icons";

export type StackSectionIcon = "code" | "cart" | "plug" | "globe";

export type Tech = {
  name: string;
  /** brand glyph; if omitted a short monogram is shown instead */
  icon?: BrandKey;
  /** 1-3 characters for the monogram when there is no brand glyph */
  mono?: string;
  /** core technology: highlighted on the page */
  primary?: boolean;
};

export type StackGroup = {
  id: string;
  icon: StackSectionIcon;
  title: string;
  /** one line under the title */
  text: string;
  items: readonly Tech[];
};

export const STACK: readonly StackGroup[] = [
  {
    id: "languages",
    icon: "code",
    title: "Languages & frameworks",
    text: "What storefronts and tools are written in.",
    items: [
      { name: "JavaScript", icon: "javascript", primary: true },
      { name: "TypeScript", icon: "typescript", primary: true },
      { name: "React", icon: "react", primary: true },
      { name: "Next.js", icon: "nextjs", primary: true },
      { name: "Node.js", icon: "nodejs", primary: true },
      { name: "PHP", icon: "php", primary: true },
      { name: "HTML5", icon: "html5" },
      { name: "CSS", mono: "CSS" },
      { name: "GraphQL", icon: "graphql" },
    ],
  },
  {
    id: "platforms",
    icon: "cart",
    title: "Platforms & marketplaces",
    text: "Where stores are built, run and sold.",
    items: [
      { name: "Shopify", icon: "shopify", primary: true },
      { name: "OpenCart", mono: "OC", primary: true },
      { name: "PrestaShop", icon: "prestashop" },
      { name: "WooCommerce", icon: "woocommerce" },
      { name: "WordPress", icon: "wordpress" },      
    ],
  },
  {
    id: "infrastructure",
    icon: "plug",
    title: "Infrastructure, payments & agents",
    text: "Hosting, payments and the layer AI agents read.",
    items: [
      { name: "Vercel", icon: "vercel", primary: true },
      { name: "GitHub", icon: "github" },
      { name: "Stripe", icon: "stripe", primary: true },
      { name: "PayPal", icon: "paypal" },
      { name: "Cloudflare", icon: "cloudflare" },
      { name: "MCP", icon: "mcp", primary: true },
      { name: "Claude", icon: "claude" },
      { name: "REST APIs", mono: "API" },      
      { name: "llms.txt", mono: "TXT" },
      { name: "Schema.org", mono: "S" },
    ],
  },
  {
    id: "discovery",
    icon: "globe",
    title: "Search, social & AI discovery",
    text: "Where customers and agents find the store.",
    items: [
      { name: "Google", icon: "google", primary: true },
      { name: "Bing", mono: "B" },
      { name: "X", icon: "x", primary: true },      
      { name: "Perplexity", icon: "perplexity" },
      { name: "ChatGPT", mono: "AI" },      
      { name: "Telegram", icon: "telegram", primary: true },
      { name: "Instagram", icon: "instagram" },
      { name: "Facebook", icon: "facebook" },      
    ],
  },
];