import { useCallback, useState } from "react";

/**
 * Shared primitive for controlled/uncontrolled component APIs.
 * Mirrors the Radix pattern: pass `value` + `onChange` to control it,
 * or `defaultValue` to let the component own its own state.
 */
export function useControllableState<T>({
  value,
  defaultValue,
  onChange,
}: {
  value?: T;
  defaultValue: T;
  onChange?: (value: T) => void;
}): [T, (next: T) => void] {
  const [uncontrolled, setUncontrolled] = useState(defaultValue);
  const isControlled = value !== undefined;
  const current = isControlled ? (value as T) : uncontrolled;

  const setValue = useCallback(
    (next: T) => {
      if (!isControlled) setUncontrolled(next);
      onChange?.(next);
    },
    [isControlled, onChange]
  );

  return [current, setValue];
}
