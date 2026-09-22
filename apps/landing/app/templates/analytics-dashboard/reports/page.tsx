"use client";

import { DataGrid, type DataGridColumn } from "@labanaat/ui/data-grid";
import { Badge } from "@labanaat/ui/badge";

interface CustomerRow {
  id: string;
  customer: string;
  plan: string;
  mrr: number;
  status: string;
}

const rows: CustomerRow[] = [
  { id: "1", customer: "Grace Hopper", plan: "Enterprise", mrr: 1240, status: "Active" },
  { id: "2", customer: "Alan Turing", plan: "Growth", mrr: 680, status: "Active" },
  { id: "3", customer: "Katherine Johnson", plan: "Enterprise", mrr: 1240, status: "Active" },
  { id: "4", customer: "Margaret Hamilton", plan: "Growth", mrr: 680, status: "Past due" },
  { id: "5", customer: "Ada Lovelace", plan: "Starter", mrr: 120, status: "Active" },
  { id: "6", customer: "Charles Babbage", plan: "Growth", mrr: 680, status: "Canceled" },
];

const columns: DataGridColumn<CustomerRow>[] = [
  { accessorKey: "customer", header: "Customer" },
  { accessorKey: "plan", header: "Plan" },
  {
    accessorKey: "mrr",
    header: "MRR",
    cell: (info) => `$${info.getValue<number>()}`,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (info) => {
      const status = info.getValue<string>();
      const variant = status === "Active" ? "success" : status === "Past due" ? "warning" : "neutral";
      return <Badge variant={variant}>{status}</Badge>;
    },
  },
];

export default function ReportsPage() {
  return (
    <div className="ui-flex ui-min-w-0 ui-flex-col ui-gap-6">
      <div>
        <h1 className="ui-text-2xl ui-font-semibold ui-text-[var(--ui-fg)]">Reports</h1>
        <p className="ui-mt-1 ui-text-[var(--ui-text-sm)] ui-text-[var(--ui-fg-muted)]">
          Customer-level billing detail. Drag a column edge to resize.
        </p>
      </div>
      <DataGrid columns={columns} data={rows} />
    </div>
  );
}
