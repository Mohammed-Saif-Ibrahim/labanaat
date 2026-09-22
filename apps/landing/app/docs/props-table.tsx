interface PropRow {
  name: string;
  type: string;
  default?: string;
  description: string;
}

/** Data-driven props reference table — consistent formatting across all 31 component pages without hand-aligning markdown tables. */
export function PropsTable({ rows }: { rows: PropRow[] }) {
  return (
    <div className="ui-mb-5 ui-overflow-x-auto ui-rounded-[var(--ui-radius-lg)] ui-border ui-border-[var(--ui-border)]">
      <table className="ui-w-full ui-border-collapse ui-text-[var(--ui-text-sm)]">
        <thead className="ui-bg-[var(--ui-bg-subtle)]">
          <tr>
            <th className="ui-border-b ui-border-[var(--ui-border)] ui-px-3 ui-py-2 ui-text-left ui-font-medium ui-text-[var(--ui-fg-muted)]">Prop</th>
            <th className="ui-border-b ui-border-[var(--ui-border)] ui-px-3 ui-py-2 ui-text-left ui-font-medium ui-text-[var(--ui-fg-muted)]">Type</th>
            <th className="ui-border-b ui-border-[var(--ui-border)] ui-px-3 ui-py-2 ui-text-left ui-font-medium ui-text-[var(--ui-fg-muted)]">Default</th>
            <th className="ui-border-b ui-border-[var(--ui-border)] ui-px-3 ui-py-2 ui-text-left ui-font-medium ui-text-[var(--ui-fg-muted)]">Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name}>
              <td className="ui-border-b ui-border-[var(--ui-border)] ui-px-3 ui-py-2 ui-align-top ui-font-mono ui-text-[13px] ui-text-[var(--ui-fg)]">{row.name}</td>
              <td className="ui-border-b ui-border-[var(--ui-border)] ui-px-3 ui-py-2 ui-align-top ui-font-mono ui-text-[13px] ui-text-[var(--ui-primary)]">{row.type}</td>
              <td className="ui-border-b ui-border-[var(--ui-border)] ui-px-3 ui-py-2 ui-align-top ui-font-mono ui-text-[13px] ui-text-[var(--ui-fg-muted)]">{row.default ?? "—"}</td>
              <td className="ui-border-b ui-border-[var(--ui-border)] ui-px-3 ui-py-2 ui-align-top ui-text-[var(--ui-fg)]">{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
