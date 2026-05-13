"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type MediaLoadingOverlayProps = {
  /** Hide splash after this many ms (avoids waiting on all media — helps low-RAM mobile Safari). */
  timeoutMs?: number;
};

/**
 * Short splash only. Waiting on every img/video + multiple autoplay MP4s was a common trigger for
 * iOS “A problem repeatedly occurred” tab crashes.
 */
export function MediaLoadingOverlay({ timeoutMs = 2500 }: MediaLoadingOverlayProps) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setIsReady(true), timeoutMs);
    return () => window.clearTimeout(t);
  }, [timeoutMs]);

  return (
    <div
      aria-hidden={isReady}
      className={[
        "fixed inset-0 z-9999 grid place-items-center bg-background transition-opacity duration-300",
        isReady ? "pointer-events-none opacity-0" : "opacity-100",
      ].join(" ")}
    >
      <div className="flex flex-col items-center gap-3">
        <Image
          src="/images/logo.png"
          alt=""
          width={160}
          height={160}
          priority
          sizes="144px"
          className="size-28 object-contain brightness-0 invert sm:size-36"
        />
        <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-foreground/50">
          Test — no GIF
        </p>
        <span className="sr-only">Loading</span>
      </div>
    </div>
  );
}
