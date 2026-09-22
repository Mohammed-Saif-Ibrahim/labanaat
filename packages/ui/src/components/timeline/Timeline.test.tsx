import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Timeline, TimelineItem, TimelineIndicator, TimelineContent, TimelineTitle, TimelineDescription } from "./Timeline";

describe("Timeline", () => {
  it("renders as a list with listitem roles", () => {
    render(
      <Timeline>
        <TimelineItem>
          <TimelineIndicator />
          <TimelineContent>
            <TimelineTitle>Deploy completed</TimelineTitle>
            <TimelineDescription>Production deploy finished successfully.</TimelineDescription>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem isLast>
          <TimelineIndicator />
          <TimelineContent>
            <TimelineTitle>Build started</TimelineTitle>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    );
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(screen.getByText("Deploy completed")).toBeInTheDocument();
  });
});
