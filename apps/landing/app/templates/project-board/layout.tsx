import type { ReactNode } from "react";
import { TemplateShell } from "../_shared/template-shell";
import { readTemplateSource } from "../_shared/read-source";

export const metadata = {
  title: "Project Board Template",
  description:
    "A Trello/Linear-style project workspace template built entirely from Labanaat UI — a real drag-and-drop Kanban board, a guided new-project flow, and a team activity log.",
};

const icons = {
  board: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="12" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.3" /><path d="M6 2v12M10 2v12" stroke="currentColor" strokeWidth="1.3" /></svg>
  ),
  activity: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 8h3l1.5-4 3 8 1.5-4H14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  new: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
  ),
};

export default function ProjectBoardLayout({ children }: { children: ReactNode }) {
  const sourceFiles = readTemplateSource("project-board", [
    "layout.tsx",
    "page.tsx",
    "new/page.tsx",
    "activity/page.tsx",
  ]);

  return (
    <TemplateShell
      productName="Waypoint"
      productLetter="W"
      accent={["#059669", "#047857", "#065F46"]}
      userName="Alan Turing"
      sourceFiles={sourceFiles}
      navGroups={[
        {
          label: "Project",
          items: [
            { href: "/templates/project-board", label: "Board", icon: icons.board },
            { href: "/templates/project-board/activity", label: "Activity", icon: icons.activity },
          ],
        },
        {
          label: "Workspace",
          items: [
            { href: "/templates/project-board/new", label: "New project", icon: icons.new },
          ],
        },
      ]}
    >
      {children}
    </TemplateShell>
  );
}
