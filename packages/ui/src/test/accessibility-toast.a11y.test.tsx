import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { ToastProvider, ToastRegistry, ToastViewport, ToastItem } from "../components/toast";

/**
 * Split out of accessibility.a11y.test.tsx along with the other three
 * Radix Popper-positioned/portaled a11y checks (DropdownMenu, Popover,
 * Tooltip — see their own files) — see accessibility.a11y.test.tsx's
 * file-level comment for why: whichever of the four is slowest on a given
 * machine can leave axe-core's "already running" lock set for whatever
 * ran after it in the same file, and file-level isolation is what stops
 * that from happening. If this one test times out, it now only ever
 * fails itself.
 */
describe("accessibility (axe) — Toast", () => {
  it("Toast has no violations (rendered open)", async () => {
    const { container } = render(
      <ToastProvider>
        <ToastRegistry>
          <ToastItem open title="Saved" description="Your changes were saved." />
        </ToastRegistry>
        <ToastViewport />
      </ToastProvider>
    );
    expect(await axe(container)).toHaveNoViolations();
  }, 45000);
});
