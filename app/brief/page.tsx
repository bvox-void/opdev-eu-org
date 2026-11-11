import type { Metadata } from "next";
import BriefForm from "@/components/brief/brief-form";
import Sheet from "@/components/sheet/sheet";
import { NEXT_STEPS } from "@/lib/brief";
import { CONTACTS, SITE, SITE_URL } from "@/lib/site";

const TITLE = "Project brief | Start an e-commerce project with Opdev";
const DESCRIPTION =
  "Tell me what you need - a new store, a redesign, API integrations or an AI feature. Get a plan and a rough estimate within 24 hours.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/brief" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/brief",
    type: "website",
  },
};

/** schema.org: the page is a contact page of the business + how the process goes. */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": `${SITE_URL}/brief#page`,
      url: `${SITE_URL}/brief`,
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
    },
    {
      "@type": "HowTo",
      name: "How to start a project with Opdev",
      step: NEXT_STEPS.map((s, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: s.title,
        text: s.text,
      })),
    },
  ],
};

export default function BriefPage() {
  return (
    <Sheet number="03" title="Brief">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <BriefForm />
    </Sheet>
  );
}
