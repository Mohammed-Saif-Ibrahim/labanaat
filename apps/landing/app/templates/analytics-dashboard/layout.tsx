import type { ReactNode } from "react";
import { TemplateShell } from "../_shared/template-shell";
import { readTemplateSource } from "../_shared/read-source";

export const metadata = {
  title: "Analytics Dashboard Template",
  description:
    "A metrics-first SaaS dashboard template built entirely from Labanaat UI — charts, a sortable data table, and top-line KPIs. Live and fully working.",
};

const icons = {
  overview: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="9" width="3" height="5" rx="0.5" stroke="currentColor" strokeWidth="1.3" /><rect x="6.5" y="5" width="3" height="9" rx="0.5" stroke="currentColor" strokeWidth="1.3" /><rect x="11" y="2" width="3" height="12" rx="0.5" stroke="currentColor" strokeWidth="1.3" /></svg>
  ),
  reports: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 2h6l3 3v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.3" /><path d="M5.5 8.5h5M5.5 11h3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
  ),
  settings: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.3" /><path d="M8 1.5v2M8 12.5v2M14.5 8h-2M3.5 8h-2M12.5 3.5l-1.4 1.4M4.9 11.1l-1.4 1.4M12.5 12.5l-1.4-1.4M4.9 4.9L3.5 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
  ),
};

export default function AnalyticsDashboardLayout({ children }: { children: ReactNode }) {
  const sourceFiles = readTemplateSource("analytics-dashboard", [
    "layout.tsx",
    "page.tsx",
    "reports/page.tsx",
    "settings/page.tsx",
  ]);

  return (
    <TemplateShell
      productName="Pulse"
      productLetter="P"
      accent={["#4F46E5", "#4338CA", "#3730A3"]}
      userName="Ada Lovelace"
      sourceFiles={sourceFiles}
      navGroups={[
        {
          label: "Analytics",
          items: [
            { href: "/templates/analytics-dashboard", label: "Overview", icon: icons.overview },
            { href: "/templates/analytics-dashboard/reports", label: "Reports", icon: icons.reports },
          ],
        },
        {
          label: "Workspace",
          items: [
            { href: "/templates/analytics-dashboard/settings", label: "Settings", icon: icons.settings },
          ],
        },
      ]}
    >
      {children}
    </TemplateShell>
  );
}
