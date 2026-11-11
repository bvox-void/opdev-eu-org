import { notFound } from "next/navigation";
import Placeholder from "@/components/sheet/placeholder";
import Sheet from "@/components/sheet/sheet";
import { NAV_ITEMS } from "@/lib/nav";

/**
 * Temporary: one route that renders a placeholder sheet for every NavBar
 * item in lib/nav.ts. Replace it with real folders (app/services/page.tsx,
 * ...) one by one as the pages get designed; a real folder wins over [slug].
 */

export const dynamicParams = false; // any other slug (e.g. /contact) -> 404

export function generateStaticParams() {
  return NAV_ITEMS.map((s) => ({ slug: s.href.slice(1) }));
}

export default async function SheetPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const sheet = NAV_ITEMS.find((s) => s.href === `/${slug}`);
  if (!sheet) notFound();

  return (
    <Sheet number={sheet.number} title={sheet.title}>
      <Placeholder number={sheet.number} label={sheet.label} />
    </Sheet>
  );
}
