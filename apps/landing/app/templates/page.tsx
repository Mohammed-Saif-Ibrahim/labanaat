import Link from "next/link";

const templates = [
  {
    slug: "analytics-dashboard",
    name: "Analytics Dashboard",
    description:
      "A metrics-first SaaS dashboard — revenue and usage charts, a sortable customer table, and top-line KPIs. The template for anything built around reporting on data.",
    components: ["Sidebar", "Navbar", "Metric", "Chart", "DataGrid", "Breadcrumbs"],
    accent: "var(--ui-primary)",
  },
  {
    slug: "project-board",
    name: "Project Board",
    description:
      "A Trello/Linear-style workspace — a real drag-and-drop Kanban board, a guided new-project flow, and a team activity log. The template for anything built around tracking work.",
    components: ["Kanban", "Stepper", "ActivityFeed", "Sidebar", "Navbar"],
    accent: "var(--ui-success)",
  },
  {
    slug: "team-workspace",
    name: "Team Workspace",
    description:
      "A files-and-scheduling hub — a real file/folder browser, a booking calendar, and instant search via a command palette. The template for anything built around organizing shared resources.",
    components: ["FileManager", "Calendar", "CommandPalette", "Sidebar", "Navbar"],
    accent: "var(--ui-warning)",
  },
];

export const metadata = {
  title: "Templates — Labanaat UI",
  description: "Full, real applications built entirely from Labanaat UI components — browse, then open any one as a working app.",
};

export default function TemplatesPage() {
  return (
    <main className="ui-mx-auto ui-max-w-5xl ui-px-6 ui-py-20">
      <div className="ui-max-w-2xl">
        <h1 className="ui-text-4xl ui-font-semibold ui-tracking-tight ui-text-[var(--ui-fg)]">Templates</h1>
        <p className="ui-mt-4 ui-text-[var(--ui-text-lg)] ui-leading-relaxed ui-text-[var(--ui-fg-muted)]">
          Not component demos — full, real applications, each built entirely
          from the library you've been reading about. Every page is live:
          click around, drag things, pick a color.
        </p>
      </div>

      <div className="ui-mt-14 ui-grid ui-grid-cols-1 ui-gap-6 md:ui-grid-cols-3">
        {templates.map((t) => (
          <Link
            key={t.slug}
            href={`/templates/${t.slug}`}
            className="ui-group ui-flex ui-flex-col ui-overflow-hidden ui-rounded-[var(--ui-radius-lg)] ui-border ui-border-[var(--ui-border)] ui-bg-[var(--ui-bg)] ui-transition-shadow hover:ui-shadow-[var(--ui-shadow-lg)]"
          >
            <div
              className="ui-h-32 ui-w-full"
              style={{ background: `linear-gradient(135deg, color-mix(in srgb, ${t.accent} 22%, transparent), color-mix(in srgb, ${t.accent} 6%, transparent))` }}
            />
            <div className="ui-flex ui-flex-1 ui-flex-col ui-p-5">
              <h2 className="ui-text-[var(--ui-text-lg)] ui-font-semibold ui-text-[var(--ui-fg)] group-hover:ui-text-[var(--ui-primary)]">
                {t.name}
              </h2>
              <p className="ui-mt-2 ui-flex-1 ui-text-[var(--ui-text-sm)] ui-leading-relaxed ui-text-[var(--ui-fg-muted)]">
                {t.description}
              </p>
              <div className="ui-mt-4 ui-flex ui-flex-wrap ui-gap-1.5">
                {t.components.map((c) => (
                  <span
                    key={c}
                    className="ui-rounded-[var(--ui-radius-sm)] ui-bg-[var(--ui-bg-muted)] ui-px-2 ui-py-0.5 ui-text-[11px] ui-font-medium ui-text-[var(--ui-fg-muted)]"
                  >
                    {c}
                  </span>
                ))}
              </div>
              <span className="ui-mt-5 ui-text-[var(--ui-text-sm)] ui-font-medium ui-text-[var(--ui-primary)]">
                Open template →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
