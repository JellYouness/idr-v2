"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

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

const LOADING_GIF = "/videos/logo.gif";

type PortfolioPreviewVideoProps = {
  src: string;
  title: string;
};

export function PortfolioPreviewVideo({ src, title }: PortfolioPreviewVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [showLoader, setShowLoader] = useState(false);

  const hideLoaderIfReady = useCallback((video: HTMLVideoElement) => {
    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      setShowLoader(false);
    }
  }, []);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const onBuffering = () => setShowLoader(true);
    const onReadyEnough = () => hideLoaderIfReady(video);

    video.addEventListener("loadstart", onBuffering);
    video.addEventListener("waiting", onBuffering);
    video.addEventListener("stalled", onBuffering);
    video.addEventListener("loadeddata", onReadyEnough);
    video.addEventListener("canplay", onReadyEnough);
    video.addEventListener("playing", onReadyEnough);
    const onError = () => setShowLoader(false);
    video.addEventListener("error", onError);

    return () => {
      video.removeEventListener("loadstart", onBuffering);
      video.removeEventListener("waiting", onBuffering);
      video.removeEventListener("stalled", onBuffering);
      video.removeEventListener("loadeddata", onReadyEnough);
      video.removeEventListener("canplay", onReadyEnough);
      video.removeEventListener("playing", onReadyEnough);
      video.removeEventListener("error", onError);
    };
  }, [src, hideLoaderIfReady]);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (!e) return;
        if (e.isIntersecting && e.intersectionRatio >= 0.2) {
          setShowLoader(true);
          video.preload = "metadata";
          claimPlayback(video);
          if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
            setShowLoader(false);
          }
          void video.play().catch(() => {
            setShowLoader(false);
          });
        } else {
          setShowLoader(false);
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
    <div className="relative h-full min-h-48 w-full">
      <video
        ref={ref}
        className="absolute inset-0 h-full w-full object-cover"
        muted
        playsInline
        loop
        preload="none"
        aria-label={`${title} preview`}
      >
        <source src={src} type="video/mp4" />
      </video>

      {showLoader ? (
        <div
          className="absolute inset-0 z-10 grid place-items-center bg-white border border-border"
          aria-busy="true"
          aria-live="polite"
        >
          <div className="">
            <Image
              src={LOADING_GIF}
              alt=""
              width={120}
              height={120}
              unoptimized
              className="size-16 object-contain opacity-95 sm:size-28"
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
