/**
 * Single source of truth for the site's sheets (pages).
 * NavBar, Sidebar, the footer pager and the placeholder pages all read this.
 *
 * Sheet 01 is the cover (the hero): the logo links to it, so it is not in the
 * NavBar. Rename labels / titles / hrefs here when the real pages are decided.
 *
 * Sheet 03 is the project brief (the order form). Every "Build with me"
 * button on the site links to BRIEF_HREF.
 */

export type SheetInfo = {
  number: string;
  /** shown in the title block: "SHEET 02 / SERVICES" */
  title: string;
  /** shown in the NavBar / Sidebar */
  label: string;
  href: string;
};

/** Where every "Build with me" button leads. */
export const BRIEF_HREF = "/brief";

export const SHEETS: readonly SheetInfo[] = [
  { number: "01", title: "home", label: "Home", href: "/" },
  { number: "02", title: "stack", label: "Stack", href: "/stack" },
  { number: "03", title: "services", label: "Services", href: "/services" },
  { number: "04", title: "brief", label: "Brief", href: BRIEF_HREF },
  { number: "05", title: "about", label: "About", href: "/about" },
];

/** Sheets that get a link in the NavBar (everything except the cover). */
export const NAV_ITEMS = SHEETS.slice(1);

/** Index of the sheet for a pathname, or -1 (404, unknown routes). */
export function sheetIndex(pathname: string): number {
  return SHEETS.findIndex((s) => s.href === pathname);
}
