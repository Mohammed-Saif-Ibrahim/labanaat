import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Metric, MetricLabel, MetricValue, MetricDelta, MetricDescription } from "./Metric";

describe("Metric", () => {
  it("renders label, value, delta, and description", () => {
    render(
      <Metric>
        <MetricLabel>Monthly recurring revenue</MetricLabel>
        <MetricValue>$4,820</MetricValue>
        <MetricDelta direction="up">+12%</MetricDelta>
        <MetricDescription>vs. last month</MetricDescription>
      </Metric>
    );
    expect(screen.getByText("Monthly recurring revenue")).toBeInTheDocument();
    expect(screen.getByText("$4,820")).toBeInTheDocument();
    expect(screen.getByText("+12%")).toBeInTheDocument();
    expect(screen.getByText("vs. last month")).toBeInTheDocument();
  });

  it("applies distinct styling per delta direction without hardcoding meaning", () => {
    const { rerender, container } = render(<MetricDelta direction="up">+3</MetricDelta>);
    const up = container.querySelector("span")!.className;
    rerender(<MetricDelta direction="down">-3</MetricDelta>);
    const down = container.querySelector("span")!.className;
    expect(up).not.toBe(down);
  });
});
