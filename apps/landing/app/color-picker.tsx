"use client";

import { Check, Palette } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@labanaat/ui/popover";
import { ACCENTS, useThemeContext, type AccentName } from "./theme-provider";

/**
 * Live accent-color switcher — a direct, interactive demonstration of the
 * library's own token system: picking a swatch calls the same
 * applyTokenOverrides() a consuming app would call, and every component
 * on the page (including this popover) repaints immediately because
 * nothing reads a hardcoded color.
 */
export function ColorPicker() {
  const { accent, setAccent } = useThemeContext();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          aria-label="Change accent color"
          className="ui-inline-flex ui-h-9 ui-w-9 ui-items-center ui-justify-center ui-rounded-[var(--ui-radius-md)] ui-border ui-border-[var(--ui-border)] ui-text-[var(--ui-fg-muted)] ui-transition-colors hover:ui-bg-[var(--ui-bg-subtle)] hover:ui-text-[var(--ui-fg)] focus-visible:ui-outline-none focus-visible:ui-shadow-[var(--ui-focus-ring)]"
        >
          <Palette size={16} />
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="ui-w-72">
        <p className="ui-mb-3 ui-text-[var(--ui-text-xs)] ui-font-medium ui-uppercase ui-tracking-wide ui-text-[var(--ui-fg-muted)]">
          Accent color
        </p>
        <div className="ui-grid ui-grid-cols-4 ui-gap-2">
          {(Object.keys(ACCENTS) as AccentName[]).map((name) => {
            const isActive = accent === name;
            return (
              <button
                key={name}
                onClick={() => setAccent(name)}
                aria-label={ACCENTS[name].label}
                aria-pressed={isActive}
                className="ui-flex ui-flex-col ui-items-center ui-gap-1.5 ui-rounded-[var(--ui-radius-md)] ui-p-2 hover:ui-bg-[var(--ui-bg-subtle)] focus-visible:ui-outline-none focus-visible:ui-shadow-[var(--ui-focus-ring)]"
              >
                <span
                  className="ui-flex ui-h-8 ui-w-8 ui-items-center ui-justify-center ui-rounded-[var(--ui-radius-full)] ui-shadow-[var(--ui-shadow-sm)]"
                  style={{ backgroundColor: ACCENTS[name].swatch }}
                >
                  {isActive && <Check size={14} className="ui-text-white" />}
                </span>
                <span className="ui-text-[11px] ui-text-[var(--ui-fg-muted)]">{ACCENTS[name].label}</span>
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
