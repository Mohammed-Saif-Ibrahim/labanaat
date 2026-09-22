import * as React from "react";
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";
import { cn } from "../../utils/cn";

type EmblaApi = UseEmblaCarouselType[1];

interface CarouselContextValue {
  api: EmblaApi;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  scrollPrev: () => void;
  scrollNext: () => void;
  selectedIndex: number;
  scrollSnaps: number[];
  scrollTo: (index: number) => void;
  orientation: "horizontal" | "vertical";
}

const CarouselContext = React.createContext<CarouselContextValue | null>(null);

function useCarousel() {
  const ctx = React.useContext(CarouselContext);
  if (!ctx) throw new Error("Carousel subcomponents must be used within <Carousel>");
  return ctx;
}

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  loop?: boolean;
  /** Starting slide index. */
  startIndex?: number;
  onSlideChange?: (index: number) => void;
}

/**
 * Carousel — product showcases, testimonials, media galleries. Built on
 * `embla-carousel-react` for the drag/touch/loop mechanics (genuinely hard
 * to get right and accessible from scratch), rendered through Labanaat's
 * own composition API — embla never appears in the public import surface,
 * only `useCarousel()` (a Labanaat hook) is exposed for building custom
 * controls beyond Previous/Next/Dots.
 */
export function Carousel({ className, orientation = "horizontal", loop = false, startIndex = 0, onSlideChange, children, ...props }: CarouselProps) {
  const [emblaRef, api] = useEmblaCarousel({ axis: orientation === "horizontal" ? "x" : "y", loop, startIndex });
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(startIndex);
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);

  const onSelect = React.useCallback(
    (emblaApi: NonNullable<EmblaApi>) => {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
      const index = emblaApi.selectedScrollSnap();
      setSelectedIndex(index);
      onSlideChange?.(index);
    },
    [onSlideChange]
  );

  React.useEffect(() => {
    if (!api) return;
    setScrollSnaps(api.scrollSnapList());
    onSelect(api);
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api, onSelect]);

  const scrollPrev = React.useCallback(() => api?.scrollPrev(), [api]);
  const scrollNext = React.useCallback(() => api?.scrollNext(), [api]);
  const scrollTo = React.useCallback((index: number) => api?.scrollTo(index), [api]);

  const onKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") { e.preventDefault(); scrollPrev(); }
      if (e.key === "ArrowRight") { e.preventDefault(); scrollNext(); }
    },
    [scrollPrev, scrollNext]
  );

  return (
    <CarouselContext.Provider value={{ api, canScrollPrev, canScrollNext, scrollPrev, scrollNext, selectedIndex, scrollSnaps, scrollTo, orientation }}>
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions -- "region" is a landmark role, not a widget role, so the linter can't recognize this as legitimate — but a focusable, arrow-key-operable carousel wrapper (in addition to the always-present Previous/Next buttons, which remain independently keyboard-operable) is a well-established real-world carousel pattern, not a misuse of the role. */}
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label="Carousel"
        tabIndex={0} // eslint-disable-line jsx-a11y/no-noninteractive-tabindex -- see justification above.
        onKeyDown={onKeyDown}
        className={cn("ui-relative focus-visible:ui-outline-none focus-visible:ui-shadow-[var(--ui-focus-ring)]", className)}
        {...props}
      >
        <div ref={emblaRef} className="ui-overflow-hidden">
          {children}
        </div>
      </div>
    </CarouselContext.Provider>
  );
}

export const CarouselContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { orientation } = useCarousel();
    return <div ref={ref} className={cn("ui-flex", orientation === "vertical" && "ui-flex-col", className)} {...props} />;
  }
);
CarouselContent.displayName = "CarouselContent";

export const CarouselItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { orientation } = useCarousel();
    return (
      <div
        ref={ref}
        role="group"
        aria-roledescription="slide"
        className={cn("ui-min-w-0 ui-shrink-0 ui-grow-0 ui-basis-full", orientation === "vertical" ? "ui-pt-0" : "", className)}
        {...props}
      />
    );
  }
);
CarouselItem.displayName = "CarouselItem";

const ArrowIcon = ({ dir }: { dir: "prev" | "next" }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d={dir === "prev" ? "M10 3L5 8L10 13" : "M6 3L11 8L6 13"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const CarouselPrevious = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => {
    const { scrollPrev, canScrollPrev } = useCarousel();
    return (
      <button
        ref={ref}
        type="button"
        aria-label="Previous slide"
        disabled={!canScrollPrev}
        onClick={scrollPrev}
        className={cn(
          "ui-inline-flex ui-h-9 ui-w-9 ui-items-center ui-justify-center ui-rounded-[var(--ui-radius-full)] ui-border ui-border-[var(--ui-border)] ui-bg-[var(--ui-bg)] ui-text-[var(--ui-fg)] ui-shadow-[var(--ui-shadow-sm)] disabled:ui-opacity-40 hover:ui-bg-[var(--ui-bg-subtle)] focus-visible:ui-outline-none focus-visible:ui-shadow-[var(--ui-focus-ring)]",
          className
        )}
        {...props}
      >
        <ArrowIcon dir="prev" />
      </button>
    );
  }
);
CarouselPrevious.displayName = "CarouselPrevious";

export const CarouselNext = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => {
    const { scrollNext, canScrollNext } = useCarousel();
    return (
      <button
        ref={ref}
        type="button"
        aria-label="Next slide"
        disabled={!canScrollNext}
        onClick={scrollNext}
        className={cn(
          "ui-inline-flex ui-h-9 ui-w-9 ui-items-center ui-justify-center ui-rounded-[var(--ui-radius-full)] ui-border ui-border-[var(--ui-border)] ui-bg-[var(--ui-bg)] ui-text-[var(--ui-fg)] ui-shadow-[var(--ui-shadow-sm)] disabled:ui-opacity-40 hover:ui-bg-[var(--ui-bg-subtle)] focus-visible:ui-outline-none focus-visible:ui-shadow-[var(--ui-focus-ring)]",
          className
        )}
        {...props}
      >
        <ArrowIcon dir="next" />
      </button>
    );
  }
);
CarouselNext.displayName = "CarouselNext";

export function CarouselDots({ className }: { className?: string }) {
  const { scrollSnaps, selectedIndex, scrollTo } = useCarousel();
  return (
    <div className={cn("ui-flex ui-items-center ui-justify-center ui-gap-1.5", className)}>
      {scrollSnaps.map((_, i) => (
        <button
          key={i}
          type="button"
          aria-label={`Go to slide ${i + 1}`}
          aria-current={i === selectedIndex}
          onClick={() => scrollTo(i)}
          className={cn(
            "ui-h-1.5 ui-rounded-[var(--ui-radius-full)] ui-transition-all",
            i === selectedIndex ? "ui-w-5 ui-bg-[var(--ui-primary)]" : "ui-w-1.5 ui-bg-[var(--ui-border-strong)]"
          )}
        />
      ))}
    </div>
  );
}

export { useCarousel };
