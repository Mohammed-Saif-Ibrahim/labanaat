import type { ReactNode } from "react";
import { TemplateShell } from "../_shared/template-shell";
import { readTemplateSource } from "../_shared/read-source";

export const metadata = {
  title: "Team Workspace Template",
  description:
    "A files-and-scheduling workspace template built entirely from Labanaat UI — a real file/folder browser, a booking calendar, and instant search via a command palette.",
};

const icons = {
  files: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 4a1 1 0 0 1 1-1h3l1.5 2H13a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4Z" stroke="currentColor" strokeWidth="1.3" /></svg>
  ),
  calendar: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.3" /><path d="M2 6.5h12M5.5 1.5v3M10.5 1.5v3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
  ),
};

export default function TeamWorkspaceLayout({ children }: { children: ReactNode }) {
  const sourceFiles = readTemplateSource("team-workspace", [
    "layout.tsx",
    "page.tsx",
    "calendar/page.tsx",
  ]);

  return (
    <TemplateShell
      productName="Harbor"
      productLetter="H"
      accent={["#D97706", "#B45309", "#92400E"]}
      userName="Katherine Johnson"
      sourceFiles={sourceFiles}
      navGroups={[
        {
          label: "Workspace",
          items: [
            { href: "/templates/team-workspace", label: "Files", icon: icons.files },
            { href: "/templates/team-workspace/calendar", label: "Calendar", icon: icons.calendar },
          ],
        },
      ]}
    >
      {children}
    </TemplateShell>
  );
}
