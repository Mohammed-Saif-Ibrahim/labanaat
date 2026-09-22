import * as React from "react";
import { cn } from "../../utils/cn";
import { useUiId } from "../../hooks";
import { useUiContent } from "../../content";

export interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface ComboboxProps {
  options: ComboboxOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  label?: string;
  placeholder?: string;
  isLoading?: boolean;
  disabled?: boolean;
}

/**
 * Combobox — searchable single-select, implemented directly against the
 * WAI-ARIA 1.2 combobox pattern (no Radix combobox primitive exists yet)
 * using `role="combobox"` on the input, `role="listbox"` on the popup, and
 * `aria-activedescendant` for virtual focus as arrow keys move the
 * highlighted option, so screen readers announce each option without
 * moving DOM focus off the input.
 */
export function Combobox({ options, value, defaultValue, onValueChange, label, placeholder, isLoading, disabled }: ComboboxProps) {
  const content = useUiContent();
  const id = useUiId("combobox");
  const listId = `${id}-listbox`;
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [activeIndex, setActiveIndex] = React.useState(-1);
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? "");
  const selected = value ?? internalValue;
  const inputRef = React.useRef<HTMLInputElement>(null);
  const listRef = React.useRef<HTMLUListElement>(null);

  const selectedOption = options.find((o) => o.value === selected);
  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter((o) => o.label.toLowerCase().includes(q));
  }, [options, query]);

  function commit(option: ComboboxOption) {
    if (option.disabled) return;
    if (value === undefined) setInternalValue(option.value);
    onValueChange?.(option.value);
    setQuery("");
    setOpen(false);
    setActiveIndex(-1);
    inputRef.current?.focus();
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!open) setOpen(true);
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (open && activeIndex >= 0 && filtered[activeIndex]) commit(filtered[activeIndex]);
    } else if (e.key === "Escape") {
      setOpen(false);
      setActiveIndex(-1);
    }
  }

  const displayValue = open ? query : (selectedOption?.label ?? "");

  return (
    <div className="ui-relative ui-flex ui-flex-col ui-gap-1.5">
      {label && (
        <label htmlFor={id} className="ui-text-[var(--ui-text-sm)] ui-font-medium ui-text-[var(--ui-fg)]">
          {label}
        </label>
      )}
      <input
        ref={inputRef}
        id={id}
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={activeIndex >= 0 ? `${listId}-opt-${activeIndex}` : undefined}
        disabled={disabled}
        placeholder={placeholder ?? content.combobox.placeholder}
        value={displayValue}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
          setActiveIndex(0);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 100)}
        onKeyDown={onKeyDown}
        className={cn(
          "ui-h-10 ui-w-full ui-rounded-[var(--ui-radius-md)] ui-border ui-border-[var(--ui-border-strong)] ui-bg-[var(--ui-bg)] ui-px-3 ui-text-[var(--ui-text-base)] ui-text-[var(--ui-fg)]",
          "focus-visible:ui-outline-none focus-visible:ui-shadow-[var(--ui-focus-ring)] disabled:ui-opacity-50 disabled:ui-cursor-not-allowed"
        )}
      />
      {open && (
        <ul
          ref={listRef}
          id={listId}
          role="listbox"
          aria-label={label ?? content.combobox.placeholder}
          className="ui-absolute ui-top-full ui-z-50 ui-mt-1 ui-max-h-60 ui-w-full ui-overflow-auto ui-rounded-[var(--ui-radius-md)] ui-border ui-border-[var(--ui-border)] ui-bg-[var(--ui-bg)] ui-p-1 ui-shadow-[var(--ui-shadow-lg)]"
        >
          {isLoading && <li className="ui-px-2 ui-py-1.5 ui-text-[var(--ui-text-sm)] ui-text-[var(--ui-fg-muted)]">{content.combobox.loading}</li>}
          {!isLoading && filtered.length === 0 && (
            <li className="ui-px-2 ui-py-1.5 ui-text-[var(--ui-text-sm)] ui-text-[var(--ui-fg-muted)]">{content.combobox.noResults}</li>
          )}
          {!isLoading &&
            filtered.map((option, i) => (
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events -- correct WAI-ARIA 1.2 combobox pattern: options are never independently focusable, all keyboard interaction (arrows, Enter) is handled on the input above via aria-activedescendant.
              <li
                key={option.value}
                id={`${listId}-opt-${i}`}
                role="option"
                aria-selected={option.value === selected}
                aria-disabled={option.disabled}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => commit(option)}
                className={cn(
                  "ui-cursor-pointer ui-select-none ui-rounded-[var(--ui-radius-sm)] ui-px-2 ui-py-1.5 ui-text-[var(--ui-text-sm)] ui-text-[var(--ui-fg)]",
                  i === activeIndex && "ui-bg-[var(--ui-bg-subtle)]",
                  option.disabled && "ui-opacity-50 ui-cursor-not-allowed"
                )}
              >
                {option.label}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
