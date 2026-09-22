import * as React from "react";
import * as RadixSlider from "@radix-ui/react-slider";
import { cn } from "../../utils/cn";
import { useUiId } from "../../hooks";
import { useControllableState } from "../../hooks";

export interface SliderProps extends Omit<React.ComponentPropsWithoutRef<typeof RadixSlider.Root>, "asChild"> {
  label?: string;
  /** Formats the value shown next to the label, e.g. (v) => `${v}%`. */
  formatValue?: (value: number) => string;
}

/** Single or multi-thumb slider (supports range selection via a two-value `value`/`defaultValue` array). */
export const Slider = React.forwardRef<React.ElementRef<typeof RadixSlider.Root>, SliderProps>(
  ({ className, label, formatValue, value, defaultValue, onValueChange, min = 0, max = 100, ...props }, ref) => {
    const id = useUiId("slider");
    // Tracked in React state (not just read from props) so the label text
    // and thumb aria-labels update live while dragging — Radix moves the
    // thumb visually on its own either way, but without this the printed
    // value stays frozen at the initial defaultValue for the whole drag.
    const [current, setCurrent] = useControllableState<number[]>({
      value,
      defaultValue: defaultValue ?? [min],
      onChange: onValueChange,
    });
    return (
      <div className="ui-flex ui-flex-col ui-gap-2">
        {label && (
          <div className="ui-flex ui-items-center ui-justify-between">
            <label htmlFor={id} className="ui-text-[var(--ui-text-sm)] ui-font-medium ui-text-[var(--ui-fg)]">{label}</label>
            <span className="ui-text-[var(--ui-text-sm)] ui-text-[var(--ui-fg-muted)]">
              {current.map((v) => (formatValue ? formatValue(v) : v)).join(" – ")}
            </span>
          </div>
        )}
        <RadixSlider.Root
          ref={ref}
          id={id}
          value={current}
          onValueChange={setCurrent}
          min={min}
          max={max}
          className={cn("ui-relative ui-flex ui-w-full ui-touch-none ui-select-none ui-items-center", className)}
          {...props}
        >
          <RadixSlider.Track className="ui-relative ui-h-1.5 ui-w-full ui-grow ui-overflow-hidden ui-rounded-[var(--ui-radius-full)] ui-bg-[var(--ui-bg-muted)]">
            <RadixSlider.Range className="ui-absolute ui-h-full ui-bg-[var(--ui-primary)]" />
          </RadixSlider.Track>
          {current.map((_, i) => (
            <RadixSlider.Thumb
              key={i}
              aria-label={label ? (current.length > 1 ? `${label} (${i === 0 ? "min" : "max"})` : label) : `Slider thumb ${i + 1}`}
              className="ui-block ui-h-4 ui-w-4 ui-rounded-[var(--ui-radius-full)] ui-border-2 ui-border-[var(--ui-primary)] ui-bg-[var(--ui-bg)] ui-shadow-[var(--ui-shadow-sm)] focus-visible:ui-outline-none focus-visible:ui-shadow-[var(--ui-focus-ring)]"
            />
          ))}
        </RadixSlider.Root>
      </div>
    );
  }
);
Slider.displayName = "Slider";
