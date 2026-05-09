"use client";

import { useEffect, useMemo, useState } from "react";

type MediaLoadingOverlayProps = {
  timeoutMs?: number;
};

function isHTMLImageElement(el: Element): el is HTMLImageElement {
  return el.tagName.toLowerCase() === "img";
}

function isHTMLVideoElement(el: Element): el is HTMLVideoElement {
  return el.tagName.toLowerCase() === "video";
}

function waitForImage(img: HTMLImageElement) {
  if (img.complete && img.naturalWidth > 0) return Promise.resolve();

  return new Promise<void>((resolve) => {
    const done = () => {
      img.removeEventListener("load", done);
      img.removeEventListener("error", done);
      resolve();
    };
    img.addEventListener("load", done, { once: true });
    img.addEventListener("error", done, { once: true });
  });
}

function waitForVideo(video: HTMLVideoElement) {
  // HAVE_CURRENT_DATA (2) is enough to render a first frame.
  if (video.readyState >= 2) return Promise.resolve();

  return new Promise<void>((resolve) => {
    const done = () => {
      video.removeEventListener("loadeddata", done);
      video.removeEventListener("error", done);
      resolve();
    };
    video.addEventListener("loadeddata", done, { once: true });
    video.addEventListener("error", done, { once: true });
  });
}

export function MediaLoadingOverlay({ timeoutMs = 8000 }: MediaLoadingOverlayProps) {
  const [isReady, setIsReady] = useState(false);

  const timeoutSignal = useMemo(() => {
    return { timeoutMs };
  }, [timeoutMs]);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      const mediaEls = Array.from(document.querySelectorAll("img, video"));
      const tasks = mediaEls.map((el) => {
        if (isHTMLImageElement(el)) return waitForImage(el);
        if (isHTMLVideoElement(el)) return waitForVideo(el);
        return Promise.resolve();
      });

      await Promise.race([
        Promise.allSettled(tasks),
        new Promise<void>((resolve) => window.setTimeout(resolve, timeoutSignal.timeoutMs)),
      ]);

      if (!cancelled) setIsReady(true);
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [timeoutSignal]);

  return (
    <div
      aria-hidden={isReady}
      className={[
        "fixed inset-0 z-9999 grid place-items-center bg-background transition-opacity duration-300",
        isReady ? "pointer-events-none opacity-0" : "opacity-100",
      ].join(" ")}
    >
      <div className="flex items-center gap-3 text-sm font-medium text-foreground/80">
        <span
          className="h-4 w-4 animate-spin rounded-full border-2 border-foreground/25 border-t-foreground/80"
          aria-hidden="true"
        />
        <span>Loading…</span>
      </div>
    </div>
  );
}

