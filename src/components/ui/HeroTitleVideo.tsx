"use client";

import { useEffect, useRef } from "react";

type HeroTitleVideoProps = {
  id?: string;
  src: string;
  poster: string;
  label: string;
  width: number;
  height: number;
  className?: string;
};

/** Looping title animation (replaces a large animated GIF that crashed mobile tabs). */
export function HeroTitleVideo({
  id,
  src,
  poster,
  label,
  width,
  height,
  className = "",
}: HeroTitleVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // React does not always render `muted` as an attribute; iOS requires it for autoplay.
    video.muted = true;
    void video.play().catch(() => {});
  }, []);

  return (
    <video
      ref={ref}
      id={id}
      role="img"
      aria-label={label}
      width={width}
      height={height}
      poster={poster}
      className={className}
      muted
      loop
      playsInline
      preload="auto"
      disablePictureInPicture
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
