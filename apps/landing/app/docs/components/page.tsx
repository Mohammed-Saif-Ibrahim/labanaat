import Link from "next/link";

const categories: { name: string; components: string[] }[] = [
  { name: "Foundational", components: ["button", "badge", "avatar", "spinner", "card", "alert", "skeleton", "separator"] },
  { name: "Form", components: ["input", "textarea", "checkbox", "switch", "radio-group", "select", "combobox", "date-picker", "slider", "file-upload"] },
  { name: "Navigation", components: ["tabs", "pagination", "breadcrumbs", "accordion"] },
  { name: "Overlay", components: ["dialog", "drawer", "popover", "tooltip", "dropdown-menu"] },
  { name: "Feedback & data", components: ["toast", "progress-bar", "empty-state", "table"] },
  { name: "Application", components: ["sidebar", "navbar", "navigation-menu", "stepper", "timeline", "command-palette", "data-table", "carousel", "calendar", "metric"] },
  { name: "Advanced", components: ["kanban", "filter-builder", "activity-feed", "file-manager", "data-grid", "chart"] },
];

function label(slug: string) {
  return slug.split("-").map((w) => (w[0] ?? "").toUpperCase() + w.slice(1)).join("");
}

export default function ComponentsDocsIndex() {
  const total = categories.reduce((n, c) => n + c.components.length, 0);
  return (
    <div>
      <h1 className="ui-mb-3 ui-text-3xl ui-font-semibold ui-tracking-tight ui-text-[var(--ui-fg)]">Components</h1>
      <p className="ui-mb-10 ui-max-w-xl ui-leading-relaxed ui-text-[var(--ui-fg-muted)]">
        {total} components, each with a live preview, source, and full props reference.
      </p>
      {categories.map((cat) => (
        <div key={cat.name} className="ui-mb-10">
          <h2 className="ui-mb-3 ui-text-[var(--ui-text-xs)] ui-font-medium ui-uppercase ui-tracking-wide ui-text-[var(--ui-fg-muted)]">
            {cat.name}
          </h2>
          <div className="ui-grid ui-grid-cols-2 ui-gap-2 sm:ui-grid-cols-3">
            {cat.components.map((slug) => (
              <Link
                key={slug}
                href={`/docs/components/${slug}`}
                className="ui-rounded-[var(--ui-radius-md)] ui-border ui-border-[var(--ui-border)] ui-px-3 ui-py-2.5 ui-text-[var(--ui-text-sm)] ui-text-[var(--ui-fg)] ui-transition-colors hover:ui-border-[var(--ui-primary)] hover:ui-bg-[var(--ui-bg-subtle)]"
              >
                {label(slug)}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
