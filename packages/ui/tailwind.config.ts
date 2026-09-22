import type { Config } from "tailwindcss";

/**
 * Prefixed with `ui-` so consuming apps' own Tailwind setup never collides
 * with the library's utility classes. Design tokens (CSS vars) are the
 * actual source of truth; this config just points Tailwind at them so
 * `ui-bg-[var(--ui-primary)]`-style utilities work with autocomplete.
 */
export default {
  prefix: "ui-",
  content: ["./src/**/*.{ts,tsx}", "../../apps/**/*.{ts,tsx,mdx}"],
  darkMode: ["selector", '[data-theme="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        sans: "var(--ui-font-sans)",
        mono: "var(--ui-font-mono)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down var(--ui-duration-slow) var(--ui-easing-standard)",
        "accordion-up": "accordion-up var(--ui-duration-slow) var(--ui-easing-standard)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
