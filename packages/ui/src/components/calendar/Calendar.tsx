import * as React from "react";
import { cn } from "../../utils/cn";
import { useControllableState } from "../../hooks";

const WEEKDAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTH_LABELS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}
function addDays(d: Date, n: number) {
  const next = new Date(d);
  next.setDate(next.getDate() + n);
  return next;
}
function addMonths(d: Date, n: number) {
  return new Date(d.getFullYear(), d.getMonth() + n, 1);
}
/** Returns a 6x7 grid of dates spanning the month, including leading/trailing days from adjacent months so every row is full. */
function getMonthGrid(monthDate: Date): Date[] {
  const first = startOfMonth(monthDate);
  const gridStart = addDays(first, -first.getDay());
  return Array.from({ length: 42 }, (_, i) => addDays(gridStart, i));
}

export interface DateRange {
  from: Date;
  to?: Date;
}

export interface CalendarProps {
  mode?: "single" | "range";
  /** Single-date selection (mode="single", the default). */
  selected?: Date;
  defaultSelected?: Date;
  onSelect?: (date: Date) => void;
  /** Range selection (mode="range"). First click sets `from`; second click sets `to` (swapped automatically if it lands before `from`); a third click starts a new range. */
  selectedRange?: DateRange;
  defaultSelectedRange?: DateRange;
  onSelectRange?: (range: DateRange | undefined) => void;
  month?: Date;
  defaultMonth?: Date;
  onMonthChange?: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  /** Return true to disable a specific date beyond the min/max range. */
  isDateDisabled?: (date: Date) => boolean;
  className?: string;
}

/**
 * Calendar — a month-view date grid, implemented directly against the
 * WAI-ARIA grid pattern (roving tabindex, arrow-key navigation between
 * days, Home/End for week bounds, PageUp/PageDown for month navigation)
 * since no Radix primitive exists for this. Deliberately scoped to
 * single-date selection with English month/weekday labels for this
 * release — range selection and localization are natural follow-ups,
 * not implemented here. Foundation for a future, richer `DatePicker`
 * variant; the current `DatePicker` uses the native input by design (see
 * its own docs page) and doesn't depend on this component.
 */
export function Calendar({
  mode = "single",
  selected, defaultSelected, onSelect,
  selectedRange, defaultSelectedRange, onSelectRange,
  month, defaultMonth, onMonthChange, minDate, maxDate, isDateDisabled, className,
}: CalendarProps) {
  const [selectedDate, setSelectedDate] = useControllableState<Date | undefined>({
    value: selected, defaultValue: defaultSelected, onChange: (value) => { if (value) onSelect?.(value); },
  });
  const [range, setRange] = useControllableState<DateRange | undefined>({
    value: selectedRange, defaultValue: defaultSelectedRange, onChange: onSelectRange,
  });
  const [visibleMonth, setVisibleMonth] = useControllableState<Date>({
    value: month, defaultValue: defaultMonth ?? selectedDate ?? range?.from ?? new Date(), onChange: onMonthChange,
  });
  const [focusedDate, setFocusedDate] = React.useState<Date>(selectedDate ?? range?.from ?? visibleMonth);
  const dayRefs = React.useRef<Map<string, HTMLButtonElement>>(new Map());
  const gridRef = React.useRef<HTMLDivElement>(null);

  const grid = React.useMemo(() => getMonthGrid(visibleMonth), [visibleMonth]);

  function disabled(date: Date) {
    if (minDate && date < new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate())) return true;
    if (maxDate && date > new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate())) return true;
    return isDateDisabled?.(date) ?? false;
  }

  function commitFocus(date: Date) {
    setFocusedDate(date);
    if (date.getMonth() !== visibleMonth.getMonth() || date.getFullYear() !== visibleMonth.getFullYear()) {
      setVisibleMonth(startOfMonth(date));
    }
  }

  // Runs after the DOM has committed the new focusedDate/visibleMonth —
  // more reliable than requestAnimationFrame, which is browser-scheduled
  // and can lag or be skipped entirely in some environments (including
  // test environments), leaving focus stuck on the previous day. Only
  // moves DOM focus if focus is already inside the grid (i.e. the user is
  // actively keyboard-navigating) — otherwise this would steal focus the
  // moment the calendar mounts, which no component should do unprompted.
  React.useEffect(() => {
    if (gridRef.current?.contains(document.activeElement)) {
      dayRefs.current.get(focusedDate.toDateString())?.focus();
    }
  }, [focusedDate]);

  function selectDate(date: Date) {
    if (disabled(date)) return;
    if (mode === "range") {
      if (!range || (range.from && range.to)) {
        setRange({ from: date, to: undefined });
      } else {
        setRange(date < range.from ? { from: date, to: range.from } : { from: range.from, to: date });
      }
    } else {
      setSelectedDate(date);
    }
    commitFocus(date);
  }

  function onKeyDown(e: React.KeyboardEvent, date: Date) {
    const moves: Record<string, () => Date | null> = {
      ArrowLeft: () => addDays(date, -1),
      ArrowRight: () => addDays(date, 1),
      ArrowUp: () => addDays(date, -7),
      ArrowDown: () => addDays(date, 7),
      Home: () => addDays(date, -date.getDay()),
      End: () => addDays(date, 6 - date.getDay()),
      PageUp: () => addMonths(date, -1),
      PageDown: () => addMonths(date, 1),
    };
    if (e.key in moves) {
      e.preventDefault();
      const next = moves[e.key]!();
      if (next) commitFocus(next);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      selectDate(date);
    }
  }

  return (
    <div className={cn("ui-w-72 ui-select-none", className)}>
      <div className="ui-mb-3 ui-flex ui-items-center ui-justify-between">
        <button
          type="button"
          aria-label="Previous month"
          onClick={() => setVisibleMonth(addMonths(visibleMonth, -1))}
          className="ui-inline-flex ui-h-7 ui-w-7 ui-items-center ui-justify-center ui-rounded-[var(--ui-radius-sm)] ui-text-[var(--ui-fg-muted)] hover:ui-bg-[var(--ui-bg-subtle)] hover:ui-text-[var(--ui-fg)] focus-visible:ui-outline-none focus-visible:ui-shadow-[var(--ui-focus-ring)]"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M9 3L5 7L9 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <div className="ui-text-[var(--ui-text-sm)] ui-font-medium ui-text-[var(--ui-fg)]" aria-live="polite">
          {MONTH_LABELS[visibleMonth.getMonth()]} {visibleMonth.getFullYear()}
        </div>
        <button
          type="button"
          aria-label="Next month"
          onClick={() => setVisibleMonth(addMonths(visibleMonth, 1))}
          className="ui-inline-flex ui-h-7 ui-w-7 ui-items-center ui-justify-center ui-rounded-[var(--ui-radius-sm)] ui-text-[var(--ui-fg-muted)] hover:ui-bg-[var(--ui-bg-subtle)] hover:ui-text-[var(--ui-fg)] focus-visible:ui-outline-none focus-visible:ui-shadow-[var(--ui-focus-ring)]"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M5 3L9 7L5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>

      <div ref={gridRef} role="grid" aria-label={`${MONTH_LABELS[visibleMonth.getMonth()]} ${visibleMonth.getFullYear()}`}>
        <div role="row" className="ui-mb-1 ui-grid ui-grid-cols-7">
          {WEEKDAY_LABELS.map((d) => (
            <div key={d} role="columnheader" className="ui-text-center ui-text-[var(--ui-text-xs)] ui-font-medium ui-text-[var(--ui-fg-muted)]">
              {d}
            </div>
          ))}
        </div>
        {Array.from({ length: 6 }, (_, week) => (
          <div key={week} role="row" className="ui-grid ui-grid-cols-7">
            {grid.slice(week * 7, week * 7 + 7).map((date) => {
              const inMonth = date.getMonth() === visibleMonth.getMonth();
              const isSelected = mode === "single" && selectedDate ? isSameDay(date, selectedDate) : false;
              const isRangeStart = mode === "range" && range?.from ? isSameDay(date, range.from) : false;
              const isRangeEnd = mode === "range" && range?.to ? isSameDay(date, range.to) : false;
              const isInRange =
                mode === "range" && range?.from && range?.to
                  ? date >= new Date(range.from.getFullYear(), range.from.getMonth(), range.from.getDate()) &&
                    date <= new Date(range.to.getFullYear(), range.to.getMonth(), range.to.getDate())
                  : false;
              const isToday = isSameDay(date, new Date());
              const isTabbable = isSameDay(date, focusedDate);
              const isDisabled = disabled(date);
              return (
                <div
                  key={date.toISOString()}
                  role="gridcell"
                  aria-selected={isSelected || isRangeStart || isRangeEnd}
                  className={cn(isInRange && !isRangeStart && !isRangeEnd && "ui-bg-[color-mix(in_srgb,var(--ui-primary)_12%,transparent)]")}
                >
                  <button
                    ref={(el) => {
                      if (el) dayRefs.current.set(date.toDateString(), el);
                      else dayRefs.current.delete(date.toDateString());
                    }}
                    type="button"
                    tabIndex={isTabbable ? 0 : -1}
                    aria-label={date.toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" })}
                    aria-current={isToday ? "date" : undefined}
                    disabled={isDisabled}
                    onClick={() => selectDate(date)}
                    onKeyDown={(e) => onKeyDown(e, date)}
                    onFocus={() => setFocusedDate(date)}
                    className={cn(
                      "ui-flex ui-h-9 ui-w-9 ui-items-center ui-justify-center ui-rounded-[var(--ui-radius-md)] ui-text-[var(--ui-text-sm)] ui-transition-colors",
                      "focus-visible:ui-outline-none focus-visible:ui-shadow-[var(--ui-focus-ring)]",
                      !inMonth && "ui-text-[var(--ui-fg-muted)] ui-opacity-40",
                      inMonth && !isSelected && !isRangeStart && !isRangeEnd && "ui-text-[var(--ui-fg)] hover:ui-bg-[var(--ui-bg-subtle)]",
                      (isSelected || isRangeStart || isRangeEnd) && "ui-bg-[var(--ui-primary)] ui-text-white hover:ui-bg-[var(--ui-primary-hover)]",
                      isToday && !isSelected && !isRangeStart && !isRangeEnd && "ui-font-semibold ui-text-[var(--ui-primary)]",
                      isDisabled && "ui-cursor-not-allowed ui-opacity-30 hover:ui-bg-transparent"
                    )}
                  >
                    {date.getDate()}
                  </button>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
