/**
 * Two-tone illustrations for the "At a glance" strip on /about.
 * Different from the 22px outline icons in components/ui/icons.tsx on purpose:
 * bigger (48px grid), a translucent fill under the stroke, and the colour comes
 * from `color` (each fact sets its own --tone), not from the green accent.
 */

function Art({ children }: { children: React.ReactNode }) {
    return (
      <svg
        width="44"
        height="44"
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {children}
      </svg>
    );
  }
  
  /** Three layers: a stack. */
  export function StackArt() {
    return (
      <Art>
        <path d="M24 7 41 16 24 25 7 16Z" fill="currentColor" fillOpacity="0.26" />
        <path d="M7 23.5 24 32.5 41 23.5" />
        <path d="M7 31 24 40 41 31" strokeOpacity="0.6" />
      </Art>
    );
  }
  
  /** A shop front with an awning: platforms and marketplaces. */
  export function ShopArt() {
    return (
      <Art>
        <path d="M9 8H39L42 18H6Z" fill="currentColor" fillOpacity="0.26" />
        <path d="M6 18c0 3.3 2.7 6 6 6s6-2.7 6-6c0 3.3 2.7 6 6 6s6-2.7 6-6c0 3.3 2.7 6 6 6s6-2.7 6-6" />
        <path d="M10 25v15h28V25" strokeOpacity="0.6" />
        <rect x="20" y="29" width="8" height="11" rx="1.5" fill="currentColor" fillOpacity="0.26" />
      </Art>
    );
  }
  
  /** A checkerboard of tiles: a catalogue of services. */
  export function TilesArt() {
    return (
      <Art>
        <rect x="8" y="8" width="14" height="14" rx="3.5" fill="currentColor" fillOpacity="0.26" />
        <rect x="26" y="8" width="14" height="14" rx="3.5" />
        <rect x="8" y="26" width="14" height="14" rx="3.5" strokeOpacity="0.6" />
        <rect x="26" y="26" width="14" height="14" rx="3.5" fill="currentColor" fillOpacity="0.26" />
      </Art>
    );
  }
  
  /** A paper plane: send the brief. */
  export function PlaneArt() {
    return (
      <Art>
        <path d="M42 6 5 21l14 7 7 14Z" fill="currentColor" fillOpacity="0.26" />
        <path d="M19 28 42 6" />
        <path d="m19 28 1.5 9 5.5-6" strokeOpacity="0.6" />
      </Art>
    );
  }