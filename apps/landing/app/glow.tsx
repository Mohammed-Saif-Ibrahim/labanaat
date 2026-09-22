/**
 * Decorative accent-tinted background glow, reused across sections at
 * different positions for visual rhythm. Always absolutely positioned
 * behind content (z-0, pointer-events-none) — the blur only ever touches
 * this decorative gradient, never readable text sitting on top of it.
 */
export function Glow({ position = "top" }: { position?: "top" | "top-right" | "bottom-left" | "center" }) {
  const placement: Record<string, string> = {
    top: "ui--top-32 ui-left-1/2 ui--translate-x-1/2",
    "top-right": "ui--top-20 ui-right-[-10rem]",
    "bottom-left": "ui-bottom-[-10rem] ui-left-[-10rem]",
    center: "ui-top-1/2 ui-left-1/2 ui--translate-x-1/2 ui--translate-y-1/2",
  };
  return (
    <div aria-hidden="true" className="ui-pointer-events-none ui-absolute ui-inset-0 ui-z-0 ui-overflow-hidden">
      <div
        className={`ui-absolute ui-h-[32rem] ui-w-[48rem] ui-rounded-full ui-opacity-[0.12] ui-blur-3xl ${placement[position]}`}
        style={{ background: "radial-gradient(ellipse at center, var(--ui-primary), transparent 70%)" }}
      />
    </div>
  );
}
