"use client";

import { Sun, Moon } from "lucide-react";
import { useThemeContext } from "./theme-provider";

export function ThemeToggle() {
  const { mode, setMode } = useThemeContext();

  return (
    <button
      onClick={() => setMode(mode === "light" ? "dark" : "light")}
      aria-label={mode === "light" ? "Switch to dark theme" : "Switch to light theme"}
      className="ui-inline-flex ui-h-9 ui-w-9 ui-items-center ui-justify-center ui-rounded-[var(--ui-radius-md)] ui-border ui-border-[var(--ui-border)] ui-text-[var(--ui-fg-muted)] ui-transition-colors hover:ui-bg-[var(--ui-bg-subtle)] hover:ui-text-[var(--ui-fg)] focus-visible:ui-outline-none focus-visible:ui-shadow-[var(--ui-focus-ring)]"
    >
      {mode === "light" ? <Moon size={16} /> : <Sun size={16} />}
    </button>
  );
}
