"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { applyTheme, applyTokenOverrides, type Theme } from "@labanaat/ui/tokens";

export type AccentName = "indigo" | "blue" | "cyan" | "teal" | "emerald" | "lime" | "amber" | "orange" | "rose" | "pink" | "violet" | "fuchsia";

export const ACCENTS: Record<AccentName, { label: string; swatch: string; light: [string, string, string]; dark: [string, string, string] }> = {
  indigo: { label: "Indigo", swatch: "#4F46E5", light: ["#4F46E5", "#4338CA", "#3730A3"], dark: ["#6366F1", "#818CF8", "#A5B4FC"] },
  blue: { label: "Blue", swatch: "#2563EB", light: ["#2563EB", "#1D4ED8", "#1E40AF"], dark: ["#3B82F6", "#60A5FA", "#93C5FD"] },
  cyan: { label: "Cyan", swatch: "#0891B2", light: ["#0891B2", "#0E7490", "#155E75"], dark: ["#06B6D4", "#22D3EE", "#67E8F9"] },
  teal: { label: "Teal", swatch: "#0D9488", light: ["#0D9488", "#0F766E", "#115E59"], dark: ["#14B8A6", "#2DD4BF", "#5EEAD4"] },
  emerald: { label: "Emerald", swatch: "#059669", light: ["#059669", "#047857", "#065F46"], dark: ["#10B981", "#34D399", "#6EE7B7"] },
  lime: { label: "Lime", swatch: "#65A30D", light: ["#65A30D", "#4D7C0F", "#3F6212"], dark: ["#84CC16", "#A3E635", "#BEF264"] },
  amber: { label: "Amber", swatch: "#D97706", light: ["#D97706", "#B45309", "#92400E"], dark: ["#F59E0B", "#FBBF24", "#FCD34D"] },
  orange: { label: "Orange", swatch: "#EA580C", light: ["#EA580C", "#C2410C", "#9A3412"], dark: ["#F97316", "#FB923C", "#FDBA74"] },
  rose: { label: "Rose", swatch: "#E11D48", light: ["#E11D48", "#BE123C", "#9F1239"], dark: ["#F43F5E", "#FB7185", "#FDA4AF"] },
  pink: { label: "Pink", swatch: "#DB2777", light: ["#DB2777", "#BE185D", "#9D174D"], dark: ["#EC4899", "#F472B6", "#F9A8D4"] },
  violet: { label: "Violet", swatch: "#7C3AED", light: ["#7C3AED", "#6D28D9", "#5B21B6"], dark: ["#8B5CF6", "#A78BFA", "#C4B5FD"] },
  fuchsia: { label: "Fuchsia", swatch: "#C026D3", light: ["#C026D3", "#A21CAF", "#86198F"], dark: ["#D946EF", "#E879F9", "#F0ABFC"] },
};

const MODE_KEY = "labanaat-theme";
const ACCENT_KEY = "labanaat-accent";

/** Regenerates the favicon on a canvas to match the current accent color — a
 * static favicon.ico can't respond to a runtime color change, so this swaps
 * the <link rel="icon"> to a generated data URL matching the header logo. */
function regenerateFavicon(color: string) {
  if (typeof document === "undefined") return;
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const r = 14;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(r, 0);
  ctx.arcTo(64, 0, 64, 64, r);
  ctx.arcTo(64, 64, 0, 64, r);
  ctx.arcTo(0, 64, 0, 0, r);
  ctx.arcTo(0, 0, 64, 0, r);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#ffffff";
  ctx.font = "700 36px system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("L", 32, 35);

  let link = document.querySelector<HTMLLinkElement>("link[rel='icon']");
  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    document.head.appendChild(link);
  }
  link.type = "image/png";
  link.href = canvas.toDataURL("image/png");
}

function applyAll(mode: Theme, accent: AccentName) {
  const resolved = mode === "dark" ? "dark" : "light";
  applyTheme(resolved);
  const [primary, hover, active] = ACCENTS[accent][resolved];
  applyTokenOverrides({
    "--ui-primary": primary,
    "--ui-primary-hover": hover,
    "--ui-primary-active": active,
    "--ui-ring": primary,
  });
  regenerateFavicon(primary);
}

interface ThemeContextValue {
  mode: Theme;
  accent: AccentName;
  setMode: (m: Theme) => void;
  setAccent: (a: AccentName) => void;
}

const ThemeContext = React.createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = React.useState<Theme>("light");
  const [accent, setAccentState] = React.useState<AccentName>("indigo");
  const pathname = usePathname();

  React.useEffect(() => {
    const storedMode = (localStorage.getItem(MODE_KEY) as Theme | null) ?? "light";
    const storedAccent = (localStorage.getItem(ACCENT_KEY) as AccentName | null) ?? "indigo";
    setModeState(storedMode);
    setAccentState(storedAccent);
    applyAll(storedMode, storedAccent);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Next.js reconciles <head> metadata on every client-side route change,
  // which was re-asserting a *static* favicon.ico link and stomping the
  // canvas-generated one — re-applying it here on every pathname change
  // is a belt-and-suspenders fix on top of removing that static file
  // entirely, so the accent-colored favicon survives navigation either way.
  React.useEffect(() => {
    regenerateFavicon(ACCENTS[accent][mode === "dark" ? "dark" : "light"][0]);
  }, [pathname, accent, mode]);

  const setMode = React.useCallback(
    (m: Theme) => {
      setModeState(m);
      localStorage.setItem(MODE_KEY, m);
      applyAll(m, accent);
    },
    [accent]
  );

  const setAccent = React.useCallback(
    (a: AccentName) => {
      setAccentState(a);
      localStorage.setItem(ACCENT_KEY, a);
      applyAll(mode, a);
    },
    [mode]
  );

  return <ThemeContext.Provider value={{ mode, accent, setMode, setAccent }}>{children}</ThemeContext.Provider>;
}

export function useThemeContext() {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) throw new Error("useThemeContext must be used within <ThemeProvider>");
  return ctx;
}
