"use client";

import { useEffect, useRef } from "react";

type PortfolioPreviewVideoProps = {
  src: string;
  poster: string;
  title: string;
};

/** Start loading slightly before the card scrolls in. */
const NEAR_MARGIN = "200px 0px";
/** Beyond this distance the buffer is released, so phones keep ~one decoder alive. */
const FAR_MARGIN = "150% 0px";

export function PortfolioPreviewVideo({ src, poster, title }: PortfolioPreviewVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    video.muted = true;

    const attach = () => {
      if (video.getAttribute("src") !== src) {
        video.src = src;
        video.load();
      }
    };

    const release = () => {
      video.pause();
      if (video.hasAttribute("src")) {
        video.removeAttribute("src");
        video.load();
      }
    };

    const near = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) attach();
      },
      { rootMargin: NEAR_MARGIN },
    );

    const visible = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) {
          attach();
          if (!reduceMotion) void video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 },
    );

    const far = new IntersectionObserver(
      ([entry]) => {
        if (entry && !entry.isIntersecting) release();
      },
      { rootMargin: FAR_MARGIN },
    );

    near.observe(video);
    visible.observe(video);
    far.observe(video);
    return () => {
      near.disconnect();
      visible.disconnect();
      far.disconnect();
      release();
    };
  }, [src]);

  return (
    <video
      ref={ref}
      className="h-full w-full object-cover"
      poster={poster}
      muted
      playsInline
      loop
      preload="none"
      disablePictureInPicture
      aria-label={`${title} preview`}
    />
  );
}
