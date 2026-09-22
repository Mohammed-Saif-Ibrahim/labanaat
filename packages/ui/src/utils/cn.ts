import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// tailwind-merge's default config only recognizes UNPREFIXED Tailwind
// class names (e.g. "hidden", "flex") for conflict resolution. Since the
// whole library's Tailwind config uses a custom "ui-" prefix (so consuming
// apps' own Tailwind setup never collides with ours), twMerge needs to be
// told about that prefix explicitly — otherwise it silently fails to
// dedupe conflicting overrides (e.g. a consumer passing `className="ui-flex"`
// to override a component's base `ui-hidden` class): both classes end up
// in the DOM, and the real winner becomes an accident of Tailwind's
// internal stylesheet generation order instead of developer intent.
const twMerge = extendTailwindMerge({ prefix: "ui-" });

/** Merge conditional class names and resolve Tailwind conflicts sanely. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
