"use client";

import * as React from "react";
import { LiveProvider, LiveEditor, LiveError, LivePreview, LiveContext } from "react-live";
import { themes } from "prism-react-renderer";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@labanaat/ui/tabs";
import { liveScope } from "./live-scope";
import { CopyButton } from "../copy-button";

/** Reads the current (possibly user-edited) code from react-live's own context, so copying always matches what's in the editor right now, not the original demo source. */
function LiveCopyButton() {
  const { code } = React.useContext(LiveContext);
  return (
    <CopyButton
      getText={() => code}
      className="ui-inline-flex ui-h-7 ui-w-7 ui-items-center ui-justify-center ui-rounded-[var(--ui-radius-sm)] ui-border ui-border-[var(--ui-border)] ui-bg-[var(--ui-bg)] ui-text-[var(--ui-fg-muted)] hover:ui-text-[var(--ui-fg)] focus-visible:ui-outline-none focus-visible:ui-shadow-[var(--ui-focus-ring)]"
    />
  );
}

/**
 * Same Preview/Code tab chrome as before, but the Code tab is now a real,
 * editable react-live editor — type in it and the Preview tab re-renders
 * live, no server round-trip. `noInline` is required for demos that need
 * local state (Slider, FileUpload, Pagination, Toast): their code defines
 * a component and calls render(<Demo />) explicitly rather than being a
 * single bare JSX expression.
 */
export function LiveDemo({
  code,
  noInline = false,
  minHeight = 220,
}: {
  code: string;
  noInline?: boolean;
  minHeight?: number;
}) {
  return (
    <LiveProvider code={code.trim()} scope={liveScope} noInline={noInline} theme={themes.github}>
      <Tabs defaultValue="preview" className="ui-my-6">
        <div className="ui-flex ui-items-center ui-justify-between">
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
          <LiveCopyButton />
        </div>
        {/* forceMount keeps both panels permanently in the DOM (just
            visually hidden via data-state) instead of Radix Tabs' default
            unmount-on-switch — without this, switching to Preview and back
            to Code destroys and recreates the editor, silently discarding
            whatever the user typed. */}
        <TabsContent value="preview" forceMount className="data-[state=inactive]:ui-hidden">
          <div
            className="ui-demo-grid ui-flex ui-items-center ui-justify-center ui-overflow-auto ui-rounded-[var(--ui-radius-lg)] ui-border ui-border-[var(--ui-border)] ui-bg-[var(--ui-bg)] ui-p-10"
            style={{ minHeight }}
          >
            <LivePreview />
          </div>
          <LiveError className="ui-mt-2 ui-whitespace-pre-wrap ui-rounded-[var(--ui-radius-md)] ui-border ui-border-[var(--ui-danger)] ui-bg-[color-mix(in_srgb,var(--ui-danger)_8%,transparent)] ui-p-3 ui-font-mono ui-text-[12px] ui-text-[var(--ui-danger)]" />
        </TabsContent>
        <TabsContent value="code" forceMount className="data-[state=inactive]:ui-hidden [&_pre]:ui-my-0">
          <div className="ui-overflow-hidden ui-rounded-[var(--ui-radius-lg)] ui-border ui-border-[var(--ui-border)]">
            <LiveEditor className="ui-font-mono ui-text-[13px]" />
          </div>
          <p className="ui-mt-2 ui-text-[var(--ui-text-xs)] ui-text-[var(--ui-fg-muted)]">
            Editable — change the code above and the preview updates live.
          </p>
        </TabsContent>
      </Tabs>
    </LiveProvider>
  );
}
