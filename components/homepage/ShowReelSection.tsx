"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { urlFor } from "@/lib/sanity.image";
import type { HomePage } from "@/lib/sanity.types";

interface ShowReelSectionProps {
  showReelsSection: HomePage["showReelsSection"];
}

const INTERSECTION_THRESHOLD = 0.35;
const AUTOPLAY_DELAY_MS = 400;

export default function ShowReelSection({
  showReelsSection,
}: ShowReelSectionProps) {
  if (!showReelsSection) return null;

  const videoUrl = showReelsSection.video?.asset?.url;
  const imageAsset = showReelsSection.image;
  const imageUrl = imageAsset?.asset?.url
    ? urlFor(imageAsset).url()
    : undefined;

  if (!videoUrl && !imageUrl) return null;

  return <ShowReelMedia videoUrl={videoUrl} imageUrl={imageUrl} />;
}

function ShowReelMedia({
  videoUrl,
  imageUrl,
}: {
  videoUrl: string | undefined;
  imageUrl: string | undefined;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const playTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const soundUnlockedWithGestureRef = useRef(false);
  const [loadVideo, setLoadVideo] = useState(false);
  const [muted, setMuted] = useState(true);

  const playWithSoundAfterUserGesture = () => {
    soundUnlockedWithGestureRef.current = true;
    setLoadVideo(true);
    setMuted(false);

    const apply = () => {
      const video = videoRef.current;
      if (!video) return;
      video.muted = false;
      void video.play().catch(() => {
        /* ignore */
      });
    };

    apply();
    queueMicrotask(apply);
  };

  useEffect(() => {
    if (!videoUrl) return;

    const section = sectionRef.current;
    if (!section) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion) {
      setLoadVideo(true);
      return;
    }

    const clearPlayTimer = () => {
      if (playTimeoutRef.current) {
        clearTimeout(playTimeoutRef.current);
        playTimeoutRef.current = null;
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        const video = videoRef.current;
        if (!video) return;

        if (entry?.isIntersecting) {
          setLoadVideo(true);
          clearPlayTimer();
          playTimeoutRef.current = setTimeout(() => {
            playTimeoutRef.current = null;
            const preferSound = soundUnlockedWithGestureRef.current;
            // Autoplay without a prior gesture only works reliably when muted.
            video.muted = !preferSound;
            setMuted(!preferSound);
            void video.play().catch(() => {
              /* ignore */
            });
          }, AUTOPLAY_DELAY_MS);
        } else {
          clearPlayTimer();
          video.pause();
        }
      },
      {
        threshold: INTERSECTION_THRESHOLD,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    observer.observe(section);
    return () => {
      clearPlayTimer();
      observer.disconnect();
    };
  }, [videoUrl]);

  return (
    <section ref={sectionRef} className="w-full" aria-label="Showreel">
      <div className="relative z-20 mt-8 md:mt-[120px] mx-auto aspect-video w-full max-w-[1120px] overflow-hidden rounded-[24px] md:rounded-[56px] bg-[#5E5E5E]">
        {videoUrl ? (
          <video
            ref={videoRef}
            className="absolute inset-0 block h-full w-full object-cover"
            src={loadVideo ? videoUrl : undefined}
            poster={imageUrl}
            controls
            muted={muted}
            onPointerDown={playWithSoundAfterUserGesture}
            onVolumeChange={() => {
              const video = videoRef.current;
              if (!video) return;
              setMuted(video.muted);
            }}
            playsInline
            loop
            preload={loadVideo ? "auto" : "none"}
          />
        ) : (
          imageUrl && (
            <Image
              src={imageUrl}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 1120px) 100vw, 1120px"
              loading="lazy"
              decoding="async"
            />
          )
        )}
      </div>
    </section>
  );
}
