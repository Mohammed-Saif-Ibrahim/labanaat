import * as React from "react";
import * as RadixToast from "@radix-ui/react-toast";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { useUiContent } from "../../content";

/**
 * Toast — transient notification stack built on Radix's Toast primitive
 * (correct `role="status"`/`aria-live` behavior, pause-on-hover/focus,
 * swipe-to-dismiss). Wrap your app once in <ToastProvider>, render
 * <ToastViewport> at the root, then call `useToast().toast(...)` anywhere
 * to push a notification.
 */
export const ToastProvider = RadixToast.Provider;

export const ToastViewport = React.forwardRef<
  React.ElementRef<typeof RadixToast.Viewport>,
  React.ComponentPropsWithoutRef<typeof RadixToast.Viewport>
>(({ className, ...props }, ref) => (
  <RadixToast.Viewport
    ref={ref}
    className={cn(
      "ui-fixed ui-bottom-0 ui-right-0 ui-z-[100] ui-flex ui-max-h-screen ui-w-full ui-flex-col ui-gap-2 ui-p-4 sm:ui-max-w-sm",
      className
    )}
    {...props}
  />
));
ToastViewport.displayName = "ToastViewport";

const toastVariants = cva(
  "ui-relative ui-flex ui-w-full ui-items-start ui-gap-3 ui-rounded-[var(--ui-radius-md)] ui-border ui-p-4 ui-shadow-[var(--ui-shadow-lg)] data-[state=open]:ui-animate-in data-[state=open]:ui-slide-in-from-bottom-2 data-[state=closed]:ui-animate-out data-[state=closed]:ui-fade-out",
  {
    variants: {
      variant: {
        default: "ui-border-[var(--ui-border)] ui-bg-[var(--ui-bg)] ui-text-[var(--ui-fg)]",
        success: "ui-border-transparent ui-bg-[var(--ui-success)] ui-text-white",
        danger: "ui-border-transparent ui-bg-[var(--ui-danger)] ui-text-white",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface ToastComponentProps
  extends Omit<React.ComponentPropsWithoutRef<typeof RadixToast.Root>, "title">,
    VariantProps<typeof toastVariants> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
}

export const ToastItem = React.forwardRef<React.ElementRef<typeof RadixToast.Root>, ToastComponentProps>(
  ({ className, variant, title, description, action, ...props }, ref) => {
    const content = useUiContent();
    return (
      <RadixToast.Root ref={ref} className={cn(toastVariants({ variant }), className)} {...props}>
        <div className="ui-flex-1">
          {title && <RadixToast.Title className="ui-text-[var(--ui-text-sm)] ui-font-semibold">{title}</RadixToast.Title>}
          {description && <RadixToast.Description className="ui-mt-1 ui-text-[var(--ui-text-sm)] ui-opacity-90">{description}</RadixToast.Description>}
        </div>
        {action}
        <RadixToast.Close
          aria-label={content.toast.close}
          className="ui-shrink-0 ui-rounded-[var(--ui-radius-sm)] ui-p-1 ui-opacity-70 hover:ui-opacity-100 focus-visible:ui-outline-none focus-visible:ui-shadow-[var(--ui-focus-ring)]"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M3.5 3.5L10.5 10.5M10.5 3.5L3.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </RadixToast.Close>
      </RadixToast.Root>
    );
  }
);
ToastItem.displayName = "ToastItem";

// ---- Imperative API ----------------------------------------------------

export interface ToastOptions {
  id?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  variant?: VariantProps<typeof toastVariants>["variant"];
  action?: React.ReactNode;
  durationMs?: number;
}

interface ToastState extends ToastOptions {
  id: string;
  open: boolean;
}

const ToastEmitterContext = React.createContext<{
  toasts: ToastState[];
  toast: (options: ToastOptions) => string;
  dismiss: (id: string) => void;
} | null>(null);

let toastCounter = 0;

/** Wrap your app root with this (inside <ToastProvider>) to enable `useToast()` anywhere below it. */
export function ToastRegistry({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastState[]>([]);

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, open: false } : t)));
  }, []);

  const toast = React.useCallback((options: ToastOptions) => {
    const id = options.id ?? `toast-${++toastCounter}`;
    setToasts((prev) => [...prev.filter((t) => t.id !== id), { ...options, id, open: true }]);
    return id;
  }, []);

  return (
    <ToastEmitterContext.Provider value={{ toasts, toast, dismiss }}>
      {children}
      {toasts.map((t) => (
        <ToastItem
          key={t.id}
          variant={t.variant}
          title={t.title}
          description={t.description}
          action={t.action}
          open={t.open}
          duration={t.durationMs ?? 5000}
          onOpenChange={(open) => {
            if (!open) dismiss(t.id);
          }}
        />
      ))}
    </ToastEmitterContext.Provider>
  );
}

/** Access the imperative toast API: `const { toast } = useToast(); toast({ title: "Saved" });` */
export function useToast() {
  const ctx = React.useContext(ToastEmitterContext);
  if (!ctx) throw new Error("useToast must be used within <ToastRegistry>");
  return ctx;
}
