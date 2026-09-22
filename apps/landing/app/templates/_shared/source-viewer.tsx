"use client";

import * as React from "react";
import { Highlight, themes } from "prism-react-renderer";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@labanaat/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@labanaat/ui/tabs";
import { Button } from "@labanaat/ui/button";
import { CopyButton } from "../../copy-button";

export interface SourceFile {
  /** Display name, e.g. "layout.tsx" or "reports/page.tsx". */
  name: string;
  content: string;
}

function CodeIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <path d="M5.5 4L2 7.5L5.5 11M9.5 4L13 7.5L9.5 11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * "View source" for a whole template — a real file list (not one demo
 * snippet), since a template is a small multi-file app, not a single
 * component usage. Reads real files (passed in from the server, see
 * read-source.ts) rather than reconstructed/approximated code, so what's
 * shown is guaranteed to match what's actually running.
 */
export function SourceViewer({ files }: { files: SourceFile[] }) {
  const [open, setOpen] = React.useState(false);
  const firstFile = files[0]?.name ?? "";

  return (
    <>
      <Button variant="outline" size="sm" className="ui-px-2 sm:ui-px-3" onClick={() => setOpen(true)}>
        <CodeIcon />
        <span className="ui-ml-1.5 ui-hidden sm:ui-inline">View source</span>
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="ui-max-w-3xl">
          <DialogHeader>
            <DialogTitle>Template source</DialogTitle>
          </DialogHeader>
          <Tabs defaultValue={firstFile}>
            <TabsList className="ui-flex-wrap">
              {files.map((f) => (
                <TabsTrigger key={f.name} value={f.name} className="ui-font-mono ui-text-[12px]">
                  {f.name}
                </TabsTrigger>
              ))}
            </TabsList>
            {files.map((f) => (
              <TabsContent key={f.name} value={f.name}>
                <div className="ui-relative">
                  <CopyButton
                    getText={() => f.content}
                    className="ui-absolute ui-right-3 ui-top-3 ui-z-10 ui-inline-flex ui-h-7 ui-w-7 ui-items-center ui-justify-center ui-rounded-[var(--ui-radius-sm)] ui-border ui-border-[var(--ui-border)] ui-bg-[var(--ui-bg)] ui-text-[var(--ui-fg-muted)] hover:ui-text-[var(--ui-fg)] focus-visible:ui-outline-none focus-visible:ui-shadow-[var(--ui-focus-ring)]"
                  />
                  <Highlight code={f.content.trim()} language="tsx" theme={themes.github}>
                    {({ className, style, tokens, getLineProps, getTokenProps }) => (
                      <pre
                        className={`${className} ui-max-h-[60vh] ui-overflow-auto ui-rounded-[var(--ui-radius-lg)] ui-border ui-border-[var(--ui-border)] ui-p-4 ui-pr-12 ui-text-[12.5px] ui-leading-relaxed`}
                        style={style}
                      >
                        {tokens.map((line, i) => (
                          <div key={i} {...getLineProps({ line })}>
                            {line.map((token, key) => (
                              <span key={key} {...getTokenProps({ token })} />
                            ))}
                          </div>
                        ))}
                      </pre>
                    )}
                  </Highlight>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
}
