import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{ts,tsx,mdx}", "../../packages/ui/src/**/*.{ts,tsx}"],
  prefix: "ui-",
  darkMode: ["selector", '[data-theme="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular"],
      },
    },
  },
} satisfies Config;
