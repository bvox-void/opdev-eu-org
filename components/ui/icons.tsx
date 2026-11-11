export function ArrowIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
      <path
        d="M2 6h8M7 3l3 3-3 3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TelegramIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M9.04 15.32 8.9 19.1c.4 0 .58-.17.8-.38l1.92-1.84 3.98 2.92c.73.4 1.25.19 1.45-.67l2.63-12.38c.24-1.1-.4-1.53-1.12-1.26L3.4 10.02c-1.07.42-1.05 1.02-.18 1.29l4.3 1.34 9.98-6.3c.47-.28.9-.13.55.18"
      />
    </svg>
  );
}

export function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M14.7 10.3 22.4 2h-1.8l-6.7 7.2L8.6 2H2.2l8.1 11.5L2.2 22h1.8l7.1-7.6L15.4 22h6.4zm-2.5 2.7-.8-1.1L4.6 3.3h2.8l5.3 7.4.8 1.1 6.9 9.6h-2.8z"
      />
    </svg>
  );
}

export function MailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2m0 4-8 5L4 8V6l8 5 8-5z"
      />
    </svg>
  );
}

/* ---- service icons: 24px, 1.6 stroke, inherit currentColor ---- */

function Stroke({ children }: { children: React.ReactNode }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function CartIcon() {
  return (
    <Stroke>
      <circle cx="9" cy="20" r="1.4" />
      <circle cx="18" cy="20" r="1.4" />
      <path d="M2.5 3.5h3L8 14.2a1 1 0 0 0 1 .8h8.8a1 1 0 0 0 1-.75L21 7H6.2" />
    </Stroke>
  );
}

export function CodeIcon() {
  return (
    <Stroke>
      <path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" />
    </Stroke>
  );
}

export function CardIcon() {
  return (
    <Stroke>
      <rect x="2.5" y="5" width="19" height="14" rx="2" />
      <path d="M2.5 10h19M6 15h4" />
    </Stroke>
  );
}

export function PlugIcon() {
  return (
    <Stroke>
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="18" cy="18" r="2.5" />
      <path d="M8.5 6H14a3 3 0 0 1 3 3v6.5M6 8.5V12a3 3 0 0 0 3 3h6.5" />
    </Stroke>
  );
}

export function BotIcon() {
  return (
    <Stroke>
      <rect x="4" y="8" width="16" height="12" rx="3" />
      <path d="M12 4v4M9 13v1.5M15 13v1.5M2 13v3M22 13v3" />
    </Stroke>
  );
}

export function DocIcon() {
  return (
    <Stroke>
      <path d="M5 3.5h9l5 5V20.5H5z" />
      <path d="M14 3.5v5h5M8.5 13h7M8.5 16.5h5" />
    </Stroke>
  );
}

export function GaugeIcon() {
  return (
    <Stroke>
      <path d="M3.5 17a9 9 0 1 1 17 0" />
      <path d="m12 14 4-5" />
      <circle cx="12" cy="14" r="1.2" />
    </Stroke>
  );
}

export function PaletteIcon() {
  return (
    <Stroke>
      <path d="M12 3a9 9 0 1 0 0 18c1.4 0 2-.9 2-1.8 0-1.3-1-1.6-1-2.7 0-1 .8-1.5 1.8-1.5H17a4 4 0 0 0 4-4C21 6.8 17 3 12 3z" />
      <circle cx="7.5" cy="11" r="1" />
      <circle cx="10" cy="7" r="1" />
      <circle cx="14.5" cy="7" r="1" />
    </Stroke>
  );
}

export function CheckIcon() {
  return (
    <Stroke>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </Stroke>
  );
}
