"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { SiteHeader } from "./site-header";

/**
 * Templates are meant to feel like standalone products, not pages of the
 * marketing/docs site — so the shared SiteHeader (with its Docs/Components
 * nav) is skipped for anything under /templates. Each template supplies its
 * own minimal app shell instead. ThemeProvider still wraps everything
 * (token system stays consistent), just not this specific chrome.
 */
export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isTemplate = pathname?.startsWith("/templates/") && pathname !== "/templates";

  if (isTemplate) {
    return <>{children}</>;
  }

  return (
    <>
      <SiteHeader />
      {/* pt-16 offsets the fixed (not sticky) header, which doesn't occupy flow space. */}
      <div className="ui-flex-1 ui-pt-16">{children}</div>
    </>
  );
}
