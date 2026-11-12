import type { Metadata } from "next";
import Stack from "@/components/stack/stack";
import Sheet from "@/components/sheet/sheet";
import { CONTACTS, SITE, SITE_URL } from "@/lib/site";
import { STACK } from "@/lib/stack";

const TITLE = "Tech stack | React, Next.js & e-commerce platforms";
const DESCRIPTION =
  "The stack behind Opdev stores: React, Next.js, TypeScript and Vercel, e-commerce platforms (Shopify, OpenCart, PrestaShop), payments, MCP and AI-search channels.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/stack" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/stack",
    type: "website",
  },
};

/** schema.org: the page lists what the business knows; same list the page renders (lib/stack.ts). */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${SITE_URL}/stack#page`,
      url: `${SITE_URL}/stack`,
      name: TITLE,
      description: DESCRIPTION,
      about: { "@id": `${SITE_URL}/#business` },
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#business`,
      name: SITE.name,
      url: SITE_URL,
      email: CONTACTS.email,
      sameAs: [CONTACTS.telegram, CONTACTS.x],
      knowsAbout: STACK.flatMap((g) => g.items.map((t) => t.name)),
    },
  ],
};

export default function StackPage() {
  return (
    <Sheet number="02" title="Stack">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Stack />
    </Sheet>
  );
}