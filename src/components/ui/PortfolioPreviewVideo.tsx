"use client";

import { useEffect, useRef } from "react";

/** Only one portfolio preview decodes at a time — avoids iOS Safari OOM with 3× autoplay MP4s. */
let activePreview: HTMLVideoElement | null = null;

function claimPlayback(video: HTMLVideoElement) {
  if (activePreview && activePreview !== video) {
    activePreview.pause();
  }
  activePreview = video;
}

function releasePlayback(video: HTMLVideoElement) {
  video.pause();
  if (activePreview === video) activePreview = null;
}

type PortfolioPreviewVideoProps = {
  src: string;
  title: string;
};

export function PortfolioPreviewVideo({ src, title }: PortfolioPreviewVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (!e) return;
        if (e.isIntersecting && e.intersectionRatio >= 0.2) {
          video.preload = "metadata";
          claimPlayback(video);
          void video.play().catch(() => {});
        } else {
          releasePlayback(video);
        }
      },
      { threshold: [0, 0.2, 0.45], rootMargin: "0px 0px -5% 0px" },
    );

    io.observe(video);
    return () => {
      io.disconnect();
      releasePlayback(video);
    };
  }, [src]);

  return (
    <video
      ref={ref}
      className="h-full w-full object-cover"
      muted
      playsInline
      loop
      preload="none"
      aria-label={`${title} preview`}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
