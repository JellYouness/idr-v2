"use client";

import { useEffect, useState } from "react";

type MediaLoadingOverlayProps = {
  /** Hide splash after this many ms. */
  timeoutMs?: number;
  /** Shorter splash on narrow viewports (less work during first paint on iOS). */
  mobileTimeoutMs?: number;
};

/**
 * Text-only splash on small screens (no image decode). Short timers to avoid
 * stacking heavy work with the rest of the page on low-RAM Safari.
 */
export function MediaLoadingOverlay({
  timeoutMs = 1200,
  mobileTimeoutMs = 500,
}: MediaLoadingOverlayProps) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const narrow =
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 767px)").matches;
    const ms = narrow ? mobileTimeoutMs : timeoutMs;
    const t = window.setTimeout(() => setIsReady(true), ms);
    return () => window.clearTimeout(t);
  }, [timeoutMs, mobileTimeoutMs]);

  return (
    <div
      aria-hidden={isReady}
      className={[
        "fixed inset-0 z-9999 grid place-items-center bg-background transition-opacity duration-300",
        isReady ? "pointer-events-none opacity-0" : "opacity-100",
      ].join(" ")}
    >
      <div className="flex flex-col items-center gap-2 px-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-foreground/70 md:text-sm">
          Loading
        </p>
      </div>
    </div>
  );
}
