import * as React from "react";
import { cn } from "../../utils/cn";

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  src?: string;
  /** Person's name — used to derive fallback initials and, if no separate alt is given, the image's alt text. */
  name: string;
  size?: "sm" | "md" | "lg";
}

const sizeMap = { sm: "ui-h-8 ui-w-8 ui-text-[var(--ui-text-xs)]", md: "ui-h-10 ui-w-10 ui-text-[var(--ui-text-sm)]", lg: "ui-h-14 ui-w-14 ui-text-[var(--ui-text-lg)]" };

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts.length > 1 ? parts[parts.length - 1]?.[0] ?? "" : "")).toUpperCase();
}

/** Avatar with automatic initials fallback when no image is provided or the image fails to load. */
export const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  ({ className, src, name, size = "md", ...props }, ref) => {
    const [errored, setErrored] = React.useState(false);
    const showImage = src && !errored;
    return (
      <span
        ref={ref}
        className={cn(
          "ui-relative ui-inline-flex ui-shrink-0 ui-items-center ui-justify-center ui-overflow-hidden ui-rounded-[var(--ui-radius-full)] ui-bg-[var(--ui-bg-muted)] ui-font-medium ui-text-[var(--ui-fg-muted)]",
          sizeMap[size],
          className
        )}
        {...props}
      >
        {showImage ? (
          <img src={src} alt={name} className="ui-h-full ui-w-full ui-object-cover" onError={() => setErrored(true)} />
        ) : (
          <span aria-hidden="true">{initials(name)}</span>
        )}
        {!showImage && <span className="ui-visually-hidden">{name}</span>}
      </span>
    );
  }
);
Avatar.displayName = "Avatar";
