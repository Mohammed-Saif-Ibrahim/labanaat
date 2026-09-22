import { createContext, useContext, type ReactNode } from "react";

/**
 * Centralized, overridable UI text.
 * Components never hardcode user-facing strings — they read from this
 * registry via `useUiContent()`. This is what makes localization and
 * custom terminology possible without touching component internals:
 * wrap the tree in <UiContentProvider content={{ ...partialOverrides }}>.
 */
export interface UiContent {
  dialog: { close: string };
  drawer: { close: string };
  select: { placeholder: string; noResults: string };
  combobox: { placeholder: string; noResults: string; loading: string };
  toast: { close: string; dismiss: string };
  pagination: {
    previous: string;
    next: string;
    pageLabel: (page: number, total: number) => string;
  };
  fileUpload: { dragPrompt: string; browse: string; remove: string };
  loading: { label: string };
  emptyState: { defaultTitle: string };
  copyButton: { copy: string; copied: string };
  passwordField: { show: string; hide: string };
  table: { sortAscending: string; sortDescending: string };
}

export const defaultContent: UiContent = {
  dialog: { close: "Close dialog" },
  drawer: { close: "Close panel" },
  select: { placeholder: "Select an option", noResults: "No results found" },
  combobox: { placeholder: "Search…", noResults: "No matches found", loading: "Loading…" },
  toast: { close: "Close notification", dismiss: "Dismiss" },
  pagination: {
    previous: "Previous page",
    next: "Next page",
    pageLabel: (page, total) => `Page ${page} of ${total}`,
  },
  fileUpload: { dragPrompt: "Drag files here, or", browse: "browse", remove: "Remove file" },
  loading: { label: "Loading" },
  emptyState: { defaultTitle: "Nothing here yet" },
  copyButton: { copy: "Copy to clipboard", copied: "Copied!" },
  passwordField: { show: "Show password", hide: "Hide password" },
  table: { sortAscending: "▲", sortDescending: "▼" },
};

function deepMerge<T>(base: T, overrides: Partial<T>): T {
  // Internal accumulator only — a genuinely type-safe generic deep merge
  // (uniformly indexable whether `base` is an array or a plain object) needs
  // conditional types disproportionate to the payoff for a non-exported
  // helper; the public signature above (`T` in, `T` out) stays fully typed.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const out: any = Array.isArray(base) ? [...base] : { ...base };
  for (const key in overrides) {
    const value = overrides[key];
    if (value && typeof value === "object" && !Array.isArray(value) && typeof out[key] === "object") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      out[key] = deepMerge(out[key], value as any);
    } else if (value !== undefined) {
      out[key] = value;
    }
  }
  return out as T;
}

const UiContentContext = createContext<UiContent>(defaultContent);

export function UiContentProvider({
  content,
  children,
}: {
  content?: DeepPartial<UiContent>;
  children: ReactNode;
}) {
  const merged = content ? deepMerge(defaultContent, content as Partial<UiContent>) : defaultContent;
  return <UiContentContext.Provider value={merged}>{children}</UiContentContext.Provider>;
}

export function useUiContent(): UiContent {
  return useContext(UiContentContext);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- standard TypeScript idiom for detecting function types in a conditional type; `unknown` here would break the structural check due to parameter variance rules.
type DeepPartial<T> = T extends (...args: any[]) => any
  ? T
  : T extends object
    ? { [K in keyof T]?: DeepPartial<T[K]> }
    : T;
