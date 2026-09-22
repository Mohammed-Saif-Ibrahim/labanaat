import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, CarouselDots } from "./Carousel";

function Example() {
  return (
    <Carousel>
      <CarouselContent>
        <CarouselItem>Slide 1</CarouselItem>
        <CarouselItem>Slide 2</CarouselItem>
        <CarouselItem>Slide 3</CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
      <CarouselDots />
    </Carousel>
  );
}

describe("Carousel", () => {
  it("renders all slides and navigation controls", () => {
    render(<Example />);
    expect(screen.getByText("Slide 1")).toBeInTheDocument();
    expect(screen.getByText("Slide 2")).toBeInTheDocument();
    expect(screen.getByText("Slide 3")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Previous slide" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Next slide" })).toBeInTheDocument();
  });

  it("exposes carousel/slide ARIA roles", () => {
    render(<Example />);
    expect(screen.getByRole("region", { name: "Carousel" })).toHaveAttribute("aria-roledescription", "carousel");
    const groups = screen.getAllByRole("group");
    expect(groups.length).toBe(3);
    groups.forEach((g) => expect(g).toHaveAttribute("aria-roledescription", "slide"));
  });

  it("Previous is disabled at the start when not looping", () => {
    render(<Example />);
    expect(screen.getByRole("button", { name: "Previous slide" })).toBeDisabled();
  });

  it("throws a clear error when subcomponents are used outside Carousel", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<CarouselNext />)).toThrow(/must be used within <Carousel>/);
    spy.mockRestore();
  });
});
