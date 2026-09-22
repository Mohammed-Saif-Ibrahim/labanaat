import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ActivityFeed, ActivityItem, ActivityAvatar, ActivityContent, ActivityText, ActivityTime } from "./ActivityFeed";
import { Avatar } from "../avatar/Avatar";

describe("ActivityFeed", () => {
  it("renders as a feed landmark with article items", () => {
    render(
      <ActivityFeed>
        <ActivityItem>
          <ActivityAvatar><Avatar name="Ada Lovelace" size="sm" /></ActivityAvatar>
          <ActivityContent>
            <ActivityText>Ada Lovelace invited Grace Hopper</ActivityText>
            <ActivityTime>2 hours ago</ActivityTime>
          </ActivityContent>
        </ActivityItem>
      </ActivityFeed>
    );
    expect(screen.getByRole("feed")).toBeInTheDocument();
    expect(screen.getByRole("article")).toBeInTheDocument();
    expect(screen.getByText("Ada Lovelace invited Grace Hopper")).toBeInTheDocument();
    expect(screen.getByText("2 hours ago")).toBeInTheDocument();
  });

  it("renders multiple items independently", () => {
    render(
      <ActivityFeed>
        <ActivityItem><ActivityContent><ActivityText>Event one</ActivityText></ActivityContent></ActivityItem>
        <ActivityItem><ActivityContent><ActivityText>Event two</ActivityText></ActivityContent></ActivityItem>
      </ActivityFeed>
    );
    expect(screen.getAllByRole("article")).toHaveLength(2);
  });
});
