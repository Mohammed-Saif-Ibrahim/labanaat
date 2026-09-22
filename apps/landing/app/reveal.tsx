"use client";

import * as React from "react";

/**
 * Fades + slides a section in the first time it scrolls into view.
 * Plain IntersectionObserver — no animation library dependency, so it
 * costs nothing extra in the bundle. Respects prefers-reduced-motion by
 * skipping the transform/opacity animation entirely (renders visible
 * immediately) for anyone who's asked for less motion.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -80px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 700ms cubic-bezier(0.2,0,0,1) ${delay}ms, transform 700ms cubic-bezier(0.2,0,0,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
