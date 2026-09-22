import * as React from "react";
import { cn } from "../../utils/cn";
import { useUiContent } from "../../content";
import { useUiId } from "../../hooks";

export interface FileUploadProps {
  label?: string;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  files: File[];
  onFilesChange: (files: File[]) => void;
  /** Max size per file in bytes; oversized files are rejected and omitted. */
  maxSizeBytes?: number;
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * FileUpload — drag-and-drop zone plus a browse button (always present, so
 * drag-and-drop is never the *only* way to select files). Files are fully
 * controlled: the component reports changes via `onFilesChange` rather than
 * owning selection state itself, so consumers can validate/upload freely.
 */
export function FileUpload({ label, accept, multiple, disabled, files, onFilesChange, maxSizeBytes }: FileUploadProps) {
  const content = useUiContent();
  const inputId = useUiId("file-upload");
  const [isDragging, setIsDragging] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  function addFiles(list: FileList | null) {
    if (!list) return;
    const incoming = Array.from(list).filter((f) => !maxSizeBytes || f.size <= maxSizeBytes);
    onFilesChange(multiple ? [...files, ...incoming] : incoming.slice(0, 1));
  }

  function removeFile(index: number) {
    onFilesChange(files.filter((_, i) => i !== index));
  }

  return (
    <div className="ui-flex ui-flex-col ui-gap-2">
      {label && <span className="ui-text-[var(--ui-text-sm)] ui-font-medium ui-text-[var(--ui-fg)]">{label}</span>}
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          if (!disabled) addFiles(e.dataTransfer.files);
        }}
        className={cn(
          "ui-flex ui-cursor-pointer ui-flex-col ui-items-center ui-gap-1 ui-rounded-[var(--ui-radius-lg)] ui-border-2 ui-border-dashed ui-border-[var(--ui-border-strong)] ui-p-8 ui-text-center ui-transition-colors",
          "focus-visible:ui-outline-none focus-visible:ui-shadow-[var(--ui-focus-ring)]",
          isDragging && "ui-border-[var(--ui-primary)] ui-bg-[var(--ui-bg-subtle)]",
          disabled && "ui-cursor-not-allowed ui-opacity-50"
        )}
      >
        <p className="ui-text-[var(--ui-text-sm)] ui-text-[var(--ui-fg-muted)]">
          {content.fileUpload.dragPrompt}{" "}
          <span className="ui-font-medium ui-text-[var(--ui-primary)]">{content.fileUpload.browse}</span>
        </p>
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={(e) => addFiles(e.target.files)}
          className="ui-visually-hidden"
        />
      </div>
      {files.length > 0 && (
        <ul className="ui-flex ui-flex-col ui-gap-1.5">
          {files.map((file, i) => (
            <li
              key={`${file.name}-${i}`}
              className="ui-flex ui-items-center ui-justify-between ui-gap-2 ui-rounded-[var(--ui-radius-md)] ui-border ui-border-[var(--ui-border)] ui-px-3 ui-py-2 ui-text-[var(--ui-text-sm)]"
            >
              <span className="ui-truncate ui-text-[var(--ui-fg)]">{file.name}</span>
              <span className="ui-shrink-0 ui-text-[var(--ui-text-xs)] ui-text-[var(--ui-fg-muted)]">{formatBytes(file.size)}</span>
              <button
                type="button"
                onClick={() => removeFile(i)}
                aria-label={`${content.fileUpload.remove}: ${file.name}`}
                className="ui-shrink-0 ui-rounded-[var(--ui-radius-sm)] ui-p-1 ui-text-[var(--ui-fg-muted)] hover:ui-bg-[var(--ui-bg-subtle)] focus-visible:ui-outline-none focus-visible:ui-shadow-[var(--ui-focus-ring)]"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M3 3L9 9M9 3L3 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
