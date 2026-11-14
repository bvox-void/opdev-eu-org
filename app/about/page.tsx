import type { Metadata } from "next";
import About from "@/components/about/about";
import Sheet from "@/components/sheet/sheet";
import { ABOUT_LEAD, PRINCIPLES } from "@/lib/about";
import { CONTACTS, SITE, SITE_URL } from "@/lib/site";
import { STACK } from "@/lib/stack";

const TITLE = "About | Independent e-commerce developer on React & Next.js";
const DESCRIPTION =
  "Opdev is an independent e-commerce developer: fast custom stores on React and Next.js that shoppers and AI assistants can both read.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/about" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/about",
    type: "website",
  },
};

/** schema.org: an AboutPage describing the business; same texts the page renders (lib/about.ts). */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": `${SITE_URL}/about#page`,
      url: `${SITE_URL}/about`,
      name: TITLE,
      description: DESCRIPTION,
      about: { "@id": `${SITE_URL}/#business` },
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#business`,
      name: SITE.name,
      url: SITE_URL,
      description: ABOUT_LEAD,
      slogan: PRINCIPLES.map((p) => p.title).join(". ") + ".",
      email: CONTACTS.email,
      sameAs: [CONTACTS.telegram, CONTACTS.x],
      knowsAbout: STACK.flatMap((g) => g.items.map((t) => t.name)),
    },
  ],
};

export default function AboutPage() {
  return (
    <Sheet number="05" title="About">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <About />
    </Sheet>
  );
}