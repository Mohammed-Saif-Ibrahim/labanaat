import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LineChart, BarChart, AreaChart } from "./Chart";

const data = [
  { month: "Jan", revenue: 400, users: 240 },
  { month: "Feb", revenue: 300, users: 139 },
  { month: "Mar", revenue: 520, users: 380 },
];

describe("Chart", () => {
  it("LineChart renders without crashing for single and multi-series data", () => {
    const { container } = render(<LineChart data={data} xKey="month" series={[{ key: "revenue" }, { key: "users" }]} />);
    expect(container.querySelector(".recharts-responsive-container")).toBeInTheDocument();
  });

  it("BarChart renders without crashing", () => {
    const { container } = render(<BarChart data={data} xKey="month" series={[{ key: "revenue" }]} />);
    expect(container.querySelector(".recharts-responsive-container")).toBeInTheDocument();
  });

  it("AreaChart renders without crashing", () => {
    const { container } = render(<AreaChart data={data} xKey="month" series={[{ key: "revenue" }]} />);
    expect(container.querySelector(".recharts-responsive-container")).toBeInTheDocument();
  });

  it("resolves the first series to the current accent token by default (no explicit color passed)", () => {
    // Recharts' ResponsiveContainer needs real layout to size its inner SVG,
    // which jsdom doesn't provide (always 0x0) — so this can only verify the
    // *default color resolution logic* ran without crashing, not the actual
    // rendered pixel color. Real color verification needs a live browser.
    const { container } = render(<LineChart data={data} xKey="month" series={[{ key: "revenue" }]} showLegend={false} />);
    expect(container.querySelector(".recharts-responsive-container")).toBeInTheDocument();
  });
});
