/**
 * Typed access to the design-token system defined in `styles/index.css`.
 * These are *contracts*, not values — actual values live in CSS so runtime
 * theming (e.g. `data-theme="dark"`, user-injected theme classes) works
 * without a JS re-render.
 */

export const colorRoles = [
  "bg", "bg-subtle", "bg-muted", "fg", "fg-muted", "fg-on-primary",
  "border", "border-strong", "ring", "primary", "primary-hover",
  "primary-active", "danger", "danger-hover", "success", "warning",
] as const;
export type ColorRole = (typeof colorRoles)[number];

export const spacingScale = [0, 1, 2, 3, 4, 5, 6, 8, 10, 12] as const;
export type SpacingToken = (typeof spacingScale)[number];

export const radiusScale = ["sm", "md", "lg", "xl", "full"] as const;
export type RadiusToken = (typeof radiusScale)[number];

export const fontSizeScale = ["xs", "sm", "base", "lg", "xl", "2xl", "3xl"] as const;
export type FontSizeToken = (typeof fontSizeScale)[number];

export const shadowScale = ["sm", "md", "lg", "xl"] as const;
export type ShadowToken = (typeof shadowScale)[number];

export const cssVar = {
  color: (role: ColorRole) => `var(--ui-${role})`,
  space: (token: SpacingToken) => `var(--ui-space-${token})`,
  radius: (token: RadiusToken) => `var(--ui-radius-${token})`,
  fontSize: (token: FontSizeToken) => `var(--ui-text-${token})`,
  shadow: (token: ShadowToken) => `var(--ui-shadow-${token})`,
};

export type Theme = "light" | "dark" | "system";

export function applyTheme(theme: Theme, root: HTMLElement = document.documentElement) {
  if (theme === "system") {
    root.removeAttribute("data-theme");
  } else {
    root.setAttribute("data-theme", theme);
  }
}

export type TokenOverrides = Partial<Record<`--ui-${string}`, string>>;

export function applyTokenOverrides(overrides: TokenOverrides, root: HTMLElement = document.documentElement) {
  for (const [key, value] of Object.entries(overrides)) {
    if (value != null) root.style.setProperty(key, value);
  }
}
