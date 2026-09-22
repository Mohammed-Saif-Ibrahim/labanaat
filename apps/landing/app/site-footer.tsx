import Link from "next/link";
import { Github } from "lucide-react";
import type { ReactNode } from "react";

const footerLinks = [
  { href: "/docs/components", label: "Components" },
  { href: "/templates", label: "Templates" },
  { href: "/docs/introduction", label: "Docs" },
];

/**
 * Tap target is the padded pill, not just the text — px-4/py-3 keeps every
 * link comfortably above the ~44px minimum on mobile, then tightens up on
 * sm+ where a mouse cursor (not a thumb) is doing the clicking.
 */
function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="ui-inline-flex ui-items-center ui-rounded-[var(--ui-radius-md)] ui-px-4 ui-py-3 ui-text-[var(--ui-text-sm)] ui-text-[var(--ui-fg-muted)] ui-transition-colors hover:ui-bg-[var(--ui-bg-muted)] hover:ui-text-[var(--ui-fg)] sm:ui-px-3 sm:ui-py-1.5"
    >
      {children}
    </Link>
  );
}

export function SiteFooter() {
  return (
    <footer className="ui-border-t ui-border-[var(--ui-border)] ui-bg-[var(--ui-bg-subtle)]">
      <div className="ui-mx-auto ui-flex ui-w-full ui-max-w-5xl ui-flex-col ui-items-center ui-gap-8 ui-px-4 ui-py-12 sm:ui-flex-row sm:ui-items-center sm:ui-justify-between sm:ui-gap-4 sm:ui-px-6 sm:ui-py-6">
        {/* Brand block — centered and given room to breathe on mobile,
            left-aligned and compact once there's a row to sit in. */}
        <div className="ui-flex ui-flex-col ui-items-center ui-gap-3 ui-text-center sm:ui-items-start sm:ui-gap-2 sm:ui-text-left">
          <Link href="/" className="ui-flex ui-items-center ui-gap-2">
            <span className="ui-flex ui-h-7 ui-w-7 ui-shrink-0 ui-items-center ui-justify-center ui-rounded-[var(--ui-radius-md)] ui-bg-[var(--ui-primary)] ui-font-mono ui-text-[13px] ui-font-semibold ui-text-white">
              L
            </span>
            <span className="ui-font-semibold ui-text-[var(--ui-fg)]">Labanaat UI</span>
          </Link>
          <p className="ui-text-[var(--ui-text-sm)] ui-text-[var(--ui-fg-muted)]">
            <span className="ui-font-mono">@labanaat/ui</span>
            <span className="ui-mx-2" aria-hidden="true">·</span>
            MIT licensed
          </p>
        </div>

        {/* Divider — the "clearer visual separation" only needs to exist
            on mobile, where the two blocks are stacked; the sm+ row
            already separates them with justify-between + whitespace. */}
        <div
          aria-hidden="true"
          className="ui-h-px ui-w-full ui-max-w-[240px] ui-bg-[var(--ui-border)] sm:ui-hidden"
        />

        <nav
          aria-label="Footer"
          className="ui-flex ui-flex-wrap ui-items-center ui-justify-center ui-gap-1 sm:ui-justify-end sm:ui-gap-1"
        >
          {footerLinks.map((link) => (
            <FooterLink key={link.href} href={link.href}>
              {link.label}
            </FooterLink>
          ))}
          <a
            href="https://github.com/labanaat/labanaat-ui"
            className="ui-inline-flex ui-items-center ui-gap-1.5 ui-rounded-[var(--ui-radius-md)] ui-px-4 ui-py-3 ui-text-[var(--ui-text-sm)] ui-text-[var(--ui-fg-muted)] ui-transition-colors hover:ui-bg-[var(--ui-bg-muted)] hover:ui-text-[var(--ui-fg)] sm:ui-px-3 sm:ui-py-1.5"
          >
            <Github size={14} />
            GitHub
          </a>
        </nav>
      </div>
    </footer>
  );
}
