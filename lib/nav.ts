/**
 * Single source of truth for the site's sheets (pages).
 * NavBar, Sidebar, the footer pager and the placeholder pages all read this.
 *
 * Sheet 01 is the cover (the hero): the logo links to it, so it is not in the
 * NavBar. Rename labels / titles / hrefs here when the real pages are decided.
 */

export type SheetInfo = {
  number: string;
  /** shown in the title block: "SHEET 02 / SERVICES" */
  title: string;
  /** shown in the NavBar / Sidebar */
  label: string;
  href: string;
};

export const SHEETS: readonly SheetInfo[] = [
  { number: "01", title: "hero", label: "Home", href: "/" },
  { number: "02", title: "services", label: "Services", href: "/services" },
  { number: "03", title: "cases", label: "Cases", href: "/cases" },
  { number: "04", title: "stack", label: "Stack", href: "/stack" },
  { number: "05", title: "about", label: "About", href: "/about" },
  { number: "06", title: "contact", label: "Contact", href: "/contact" },
];

/** Sheets that get a link in the NavBar (everything except the cover). */
export const NAV_ITEMS = SHEETS.slice(1);

/** Index of the sheet for a pathname, or -1 (404, unknown routes). */
export function sheetIndex(pathname: string): number {
  return SHEETS.findIndex((s) => s.href === pathname);
}
