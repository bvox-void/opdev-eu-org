import type { Metadata } from "next";
import Services from "@/components/services/services";
import Sheet from "@/components/sheet/sheet";
import { CONTACTS, SITE, SITE_URL } from "@/lib/site";
import { SERVICES } from "@/lib/services";

const DESCRIPTION =
  "E-commerce development on React and Next.js: custom stores, checkout and payments, integrations, AI automation and performance.";
  const TITLE = "Services | E-commerce development on React & Next.js";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/services" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/services",
    type: "website",
  },
};

/** schema.org description of the same list the page renders (lib/services.ts). */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#business`,
  name: SITE.name,
  url: SITE_URL,
  description: DESCRIPTION,
  email: CONTACTS.email,
  sameAs: [CONTACTS.telegram, CONTACTS.x],
  knowsAbout: ["E-commerce", "React", "Next.js", "MCP", "Shopify", "Stripe", "AI automation"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "E-commerce development services",
    url: `${SITE_URL}/services`,
    itemListElement: SERVICES.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        "@id": `${SITE_URL}/services#${s.id}`,
        name: s.title,
        description: `${s.text} Outcome: ${s.outcome}`,
        keywords: s.tags.join(", "),
      },
    })),
  },
};

export default function ServicesPage() {
  return (
    <Sheet number="02" title="Services">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Services />
    </Sheet>
  );
}