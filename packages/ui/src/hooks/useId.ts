import { useId as useReactId } from "react";

/** Prefixed id generator built on React 19's built-in useId for SSR-safe, stable ids. */
export function useUiId(prefix: string) {
  const id = useReactId();
  return `ui-${prefix}-${id}`;
}
