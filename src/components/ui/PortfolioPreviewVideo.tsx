"use client";

import { useEffect, useRef } from "react";

type PortfolioPreviewVideoProps = {
  src: string;
  title: string;
};

function playWhenReady(video: HTMLVideoElement) {
  const play = () => {
    void video.play().catch(() => {});
  };

  if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
    play();
    return undefined;
  }

  video.preload = "auto";
  video.load();
  video.addEventListener("canplay", play, { once: true });
  return () => video.removeEventListener("canplay", play);
}

export function PortfolioPreviewVideo({ src, title }: PortfolioPreviewVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    let cancelPlay: (() => void) | undefined;

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        if (entry.isIntersecting) {
          cancelPlay?.();
          cancelPlay = playWhenReady(video);
        } else {
          cancelPlay?.();
          cancelPlay = undefined;
          video.pause();
        }
      },
      { threshold: 0.25 },
    );

    io.observe(video);
    return () => {
      io.disconnect();
      cancelPlay?.();
      video.pause();
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
