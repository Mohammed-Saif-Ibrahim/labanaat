import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./Card";

describe("Card", () => {
  it("renders all subcomponents composed together", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Plan</CardTitle>
          <CardDescription>Your current subscription</CardDescription>
        </CardHeader>
        <CardContent>7 of 10 seats used</CardContent>
        <CardFooter>Upgrade</CardFooter>
      </Card>
    );
    expect(screen.getByRole("heading", { name: "Plan", level: 3 })).toBeInTheDocument();
    expect(screen.getByText("Your current subscription")).toBeInTheDocument();
    expect(screen.getByText("7 of 10 seats used")).toBeInTheDocument();
    expect(screen.getByText("Upgrade")).toBeInTheDocument();
  });

  it("exposes the compound-component pattern (Card.Header === CardHeader, etc.)", () => {
    expect((Card as typeof Card & { Header: unknown }).Header).toBe(CardHeader);
    expect((Card as typeof Card & { Title: unknown }).Title).toBe(CardTitle);
    expect((Card as typeof Card & { Content: unknown }).Content).toBe(CardContent);
  });

  it("merges a custom className rather than overwriting the base classes", () => {
    const { container } = render(<Card className="ui-mt-4" />);
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain("ui-mt-4");
    expect(card.className).toContain("ui-rounded-[var(--ui-radius-lg)]");
  });

  it("forwards a ref to the underlying DOM element", () => {
    let ref: HTMLDivElement | null = null;
    render(<Card ref={(el) => { ref = el; }} data-testid="card" />);
    expect(ref).toBe(screen.getByTestId("card"));
  });
});
