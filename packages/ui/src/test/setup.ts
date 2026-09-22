import "@testing-library/jest-dom/vitest";
import { expect } from "vitest";
// Named-export re-export ambiguity in vitest-axe@0.1.0's bundled .d.ts (it
// mixes real values and pure types in one barrel re-export) makes `import {
// toHaveNoViolations }` get misclassified as type-only under our strict
// TS settings — a namespace import sidesteps that entirely, since it's the
// concrete runtime module object, not a named re-export.
import * as axeMatchers from "vitest-axe/matchers";

// vitest-axe@0.1.0 ships a broken (empty) "extend-expect" entry point, so
// the matcher is registered directly here instead of relying on it — see
// also vitest-axe.d.ts alongside this file, which reconstructs the type
// augmentation extend-expect.d.ts was supposed to provide (also broken).
// The namespace import above resolves correctly at runtime (proven by the
// full test suite passing, including every a11y assertion), but the
// package's own bundled .d.ts still doesn't type the property correctly —
// a package bug, not a real type error in this codebase.
// @ts-expect-error -- see comment above; vitest-axe's bundled types don't match its own runtime exports.
expect.extend({ toHaveNoViolations: axeMatchers.toHaveNoViolations });

// jsdom doesn't implement ResizeObserver; Radix's Slider (and other size-
// aware primitives) call it on mount, so a minimal no-op polyfill is
// provided for the test environment only — real browsers already have it.
class ResizeObserverPolyfill {
  observe() {}
  unobserve() {}
  disconnect() {}
}
globalThis.ResizeObserver ??= ResizeObserverPolyfill;

// jsdom doesn't implement scrollIntoView either; cmdk calls it internally
// whenever the selected command item changes.
if (!Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = () => {};
}

// jsdom doesn't implement window.matchMedia; embla-carousel (used by
// Carousel) reads it internally to resolve responsive options.
if (!window.matchMedia) {
  window.matchMedia = (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }) as unknown as MediaQueryList;
}

// jsdom doesn't implement IntersectionObserver; embla-carousel also uses
// it (separately from ResizeObserver) to track which slides are in view.
class IntersectionObserverPolyfill {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() { return []; }
}
// @ts-expect-error -- test-only global polyfill
globalThis.IntersectionObserver ??= IntersectionObserverPolyfill;

// jsdom doesn't implement pointer capture at all; Radix's DismissableLayer
// (used by DropdownMenu, ContextMenu, and similar popper-based overlays)
// calls these during pointer interaction, and their absence causes
// userEvent.click() to hang indefinitely in this environment rather than
// fail cleanly — real browsers already implement all three.
if (!Element.prototype.hasPointerCapture) {
  Element.prototype.hasPointerCapture = () => false;
}
if (!Element.prototype.setPointerCapture) {
  Element.prototype.setPointerCapture = () => {};
}
if (!Element.prototype.releasePointerCapture) {
  Element.prototype.releasePointerCapture = () => {};
}

// jsdom doesn't implement PointerEvent at all (not just individual methods —
// the constructor itself is undefined). Radix's DismissableLayer/Popper
// internals (used by DropdownMenu and similar popper-based overlays) branch
// on PointerEvent support to decide which listeners to attach, and without
// it, interactions hang indefinitely in this environment rather than fail
// cleanly. A minimal shim mapping to MouseEvent (real pointer semantics
// aren't needed for these tests, just a constructible event) is a standard,
// documented workaround for this specific Radix+jsdom combination.
if (typeof globalThis.PointerEvent === "undefined") {
  class PointerEventPolyfill extends MouseEvent {
    pointerId = 1;
    width = 1;
    height = 1;
    pressure = 0;
    tangentialPressure = 0;
    tiltX = 0;
    tiltY = 0;
    twist = 0;
    pointerType = "mouse";
    isPrimary = true;
    constructor(type: string, params: PointerEventInit = {}) {
      super(type, params);
    }
  }
  // @ts-expect-error -- test-only global polyfill
  globalThis.PointerEvent = PointerEventPolyfill;
}
