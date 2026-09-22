import * as React from "react";
import { cn } from "../../utils/cn";

type StepStatus = "complete" | "current" | "upcoming" | "error";

interface StepperContextValue {
  currentStep: number;
  orientation: "horizontal" | "vertical";
}
const StepperContext = React.createContext<StepperContextValue>({ currentStep: 0, orientation: "horizontal" });

export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 0-indexed current step, used to auto-derive each StepperItem's status unless it sets its own `status`. */
  currentStep: number;
  orientation?: "horizontal" | "vertical";
}

/**
 * Stepper — onboarding / checkout / multi-step form progress. The parent
 * app owns `currentStep` (there's no internal uncontrolled mode — a
 * stepper always reflects state that lives in your form/wizard logic, so
 * making it "controllable" the way Dialog is would just add an unused
 * escape hatch). Each StepperItem derives its visual status from
 * `currentStep` automatically, or accepts an explicit `status` override
 * for cases like marking a step as `"error"`.
 */
export const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  ({ className, currentStep, orientation = "horizontal", children, ...props }, ref) => (
    <StepperContext.Provider value={{ currentStep, orientation }}>
      <div
        ref={ref}
        role="group"
        aria-label="Progress"
        className={cn(
          "ui-flex",
          orientation === "horizontal" ? "ui-w-full ui-items-start" : "ui-flex-col",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </StepperContext.Provider>
  )
);
Stepper.displayName = "Stepper";

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M2 6L4.5 8.5L10 3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ErrorIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M3 3L9 9M9 3L3 9" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
  </svg>
);

export interface StepperItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  index: number;
  title: React.ReactNode;
  description?: React.ReactNode;
  status?: StepStatus;
  /** Hides the connecting line after this step — set automatically-ish by using it only on the last StepperItem. */
  isLast?: boolean;
}

export const StepperItem = React.forwardRef<HTMLDivElement, StepperItemProps>(
  ({ className, index, title, description, status, isLast, ...props }, ref) => {
    const { currentStep, orientation } = React.useContext(StepperContext);
    const resolvedStatus: StepStatus = status ?? (index < currentStep ? "complete" : index === currentStep ? "current" : "upcoming");

    const circleClasses = cn(
      "ui-flex ui-h-8 ui-w-8 ui-shrink-0 ui-items-center ui-justify-center ui-rounded-[var(--ui-radius-full)] ui-border-2 ui-text-[var(--ui-text-sm)] ui-font-medium ui-transition-colors",
      resolvedStatus === "complete" && "ui-border-[var(--ui-primary)] ui-bg-[var(--ui-primary)] ui-text-white",
      resolvedStatus === "current" && "ui-border-[var(--ui-primary)] ui-text-[var(--ui-primary)]",
      resolvedStatus === "upcoming" && "ui-border-[var(--ui-border-strong)] ui-text-[var(--ui-fg-muted)]",
      resolvedStatus === "error" && "ui-border-[var(--ui-danger)] ui-bg-[var(--ui-danger)] ui-text-white"
    );

    const connectorClasses = cn(
      resolvedStatus === "complete" ? "ui-bg-[var(--ui-primary)]" : "ui-bg-[var(--ui-border)]",
      orientation === "horizontal" ? "ui-h-0.5 ui-flex-1 ui-mt-4 ui-mx-2" : "ui-w-0.5 ui-flex-1 ui-ml-4 ui-my-1"
    );

    return (
      <div
        ref={ref}
        aria-current={resolvedStatus === "current" ? "step" : undefined}
        className={cn(
          "ui-flex ui-gap-3",
          orientation === "horizontal" ? "ui-flex-1 ui-flex-col ui-items-center ui-text-center" : "ui-flex-row ui-items-start",
          className
        )}
        {...props}
      >
        <div className={cn("ui-flex ui-items-center", orientation === "horizontal" ? "ui-w-full" : "ui-flex-col ui-self-stretch")}>
          <span className={circleClasses}>
            {resolvedStatus === "complete" ? <CheckIcon /> : resolvedStatus === "error" ? <ErrorIcon /> : index + 1}
          </span>
          {!isLast && <div className={connectorClasses} aria-hidden="true" />}
        </div>
        <div className={cn(orientation === "horizontal" ? "ui-mt-2" : "ui-pb-8")}>
          <div className={cn("ui-text-[var(--ui-text-sm)] ui-font-medium", resolvedStatus === "upcoming" ? "ui-text-[var(--ui-fg-muted)]" : "ui-text-[var(--ui-fg)]")}>
            {title}
          </div>
          {description && <div className="ui-text-[var(--ui-text-xs)] ui-text-[var(--ui-fg-muted)]">{description}</div>}
        </div>
      </div>
    );
  }
);
StepperItem.displayName = "StepperItem";
