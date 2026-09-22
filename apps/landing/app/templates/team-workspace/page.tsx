"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { FileManager, type FileManagerItem } from "@labanaat/ui/file-manager";
import {
  CommandPalette, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandShortcut,
} from "@labanaat/ui/command-palette";
import { Button } from "@labanaat/ui/button";

const fileTree: Record<string, FileManagerItem[]> = {
  Home: [
    { id: "1", name: "Design", type: "folder" },
    { id: "2", name: "Engineering", type: "folder" },
    { id: "3", name: "Onboarding.pdf", type: "file", size: 890000 },
    { id: "4", name: "Q3 roadmap.docx", type: "file", size: 310000 },
  ],
  "Home/Design": [
    { id: "5", name: "Brand guidelines.pdf", type: "file", size: 4200000 },
    { id: "6", name: "Logo exports", type: "folder" },
  ],
  "Home/Engineering": [
    { id: "7", name: "Architecture.pdf", type: "file", size: 1800000 },
    { id: "8", name: "RFCs", type: "folder" },
  ],
};

export default function FilesPage() {
  const router = useRouter();
  const [path, setPath] = React.useState(["Home"]);
  const [paletteOpen, setPaletteOpen] = React.useState(false);
  const key = path.join("/");

  return (
    <div className="ui-flex ui-flex-col ui-gap-6">
      <div className="ui-flex ui-flex-col ui-gap-3 sm:ui-flex-row sm:ui-items-center sm:ui-justify-between">
        <div>
          <h1 className="ui-text-2xl ui-font-semibold ui-text-[var(--ui-fg)]">Files</h1>
          <p className="ui-mt-1 ui-text-[var(--ui-text-sm)] ui-text-[var(--ui-fg-muted)]">Shared across the whole workspace.</p>
        </div>
        <Button variant="outline" onClick={() => setPaletteOpen(true)} className="ui-w-fit">
          Search… <span className="ui-ml-2 ui-text-[var(--ui-fg-muted)]">⌘K</span>
        </Button>
      </div>

      <FileManager items={fileTree[key] ?? []} path={path} onPathChange={setPath} />

      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} shortcut="k" label="Search Harbor">
        <CommandInput placeholder="Jump to a page or file…" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Pages">
            <CommandItem onSelect={() => { setPaletteOpen(false); router.push("/templates/team-workspace"); }}>
              Files
            </CommandItem>
            <CommandItem onSelect={() => { setPaletteOpen(false); router.push("/templates/team-workspace/calendar"); }}>
              Calendar
              <CommandShortcut>Nav</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Files">
            <CommandItem onSelect={() => { setPaletteOpen(false); setPath(["Home"]); }}>Onboarding.pdf</CommandItem>
            <CommandItem onSelect={() => { setPaletteOpen(false); setPath(["Home", "Design"]); }}>Brand guidelines.pdf</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandPalette>
    </div>
  );
}
