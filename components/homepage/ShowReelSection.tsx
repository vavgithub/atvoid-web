"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { urlFor } from "@/lib/sanity.image";
import type { HomePage } from "@/lib/sanity.types";

interface ShowReelSectionProps {
  showReelsSection: HomePage["showReelsSection"];
}

const INTERSECTION_THRESHOLD = 0.35;
const AUTOPLAY_DELAY_MS = 400;

const MOBILE_MQ = "(max-width: 767px)";

function subscribeMobileMq(onStoreChange: () => void) {
  const mq = window.matchMedia(MOBILE_MQ);
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

function getMobileMqSnapshot() {
  return window.matchMedia(MOBILE_MQ).matches;
}

function getMobileMqServerSnapshot() {
  return false;
}

/** Mobile shell aspect ratio: match uploaded poster so the box isn’t taller than the image. */
const DEFAULT_MOBILE_SHELL_ASPECT = "320 / 675";

function mobileShowreelShellAspect(
  section: NonNullable<HomePage["showReelsSection"]>,
): string {
  const m = section.mobileThumbnail?.asset?.metadata?.dimensions;
  if (m?.width && m?.height) return `${m.width} / ${m.height}`;
  const d = section.image?.asset?.metadata?.dimensions;
  if (d?.width && d?.height) return `${d.width} / ${d.height}`;
  return DEFAULT_MOBILE_SHELL_ASPECT;
}

export default function ShowReelSection({
  showReelsSection,
}: ShowReelSectionProps) {
  if (!showReelsSection) return null;

  const videoUrl = showReelsSection.video?.asset?.url;
  const imageAsset = showReelsSection.image;
  const desktopImageUrl = imageAsset?.asset?.url
    ? urlFor(imageAsset).url()
    : undefined;

  const mobileAsset = showReelsSection.mobileThumbnail;
  // Request larger than design 320×675 so full-width mobile stays sharp (container max 1120px).
  const mobileImageUrl = mobileAsset?.asset?.url
    ? urlFor(mobileAsset).width(1120).url()
    : undefined;

  const hasVisual = Boolean(
    videoUrl || desktopImageUrl || mobileImageUrl,
  );
  if (!hasVisual) return null;

  const mobileShellAspectCss = mobileShowreelShellAspect(showReelsSection);

  return (
    <ShowReelMedia
      videoUrl={videoUrl}
      desktopPosterUrl={desktopImageUrl}
      mobilePosterUrl={mobileImageUrl}
      mobileShellAspectCss={mobileShellAspectCss}
    />
  );
}

function ShowReelMedia({
  videoUrl,
  desktopPosterUrl,
  mobilePosterUrl,
  mobileShellAspectCss,
}: {
  videoUrl: string | undefined;
  desktopPosterUrl: string | undefined;
  mobilePosterUrl: string | undefined;
  mobileShellAspectCss: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const playTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const soundUnlockedWithGestureRef = useRef(false);
  const [loadVideo, setLoadVideo] = useState(false);
  const [muted, setMuted] = useState(true);
  /** When false, show poster overlay (native `poster` only applies before first play). */
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const isMobile = useSyncExternalStore(
    subscribeMobileMq,
    getMobileMqSnapshot,
    getMobileMqServerSnapshot,
  );

  const posterUrl =
    (isMobile && mobilePosterUrl) || desktopPosterUrl || mobilePosterUrl;

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

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoUrl) return;
    const sync = () => setIsVideoPlaying(!video.paused);
    video.addEventListener("play", sync);
    video.addEventListener("pause", sync);
    sync();
    return () => {
      video.removeEventListener("play", sync);
      video.removeEventListener("pause", sync);
    };
  }, [videoUrl, loadVideo]);

  const shellClassName =
    "relative z-20 mt-8 md:mt-[120px] mx-auto w-full max-w-[1120px] overflow-hidden rounded-[24px] md:rounded-[56px] bg-[#5E5E5E] " +
    "max-md:aspect-[var(--showreel-mobile-ar)] md:aspect-video";

  const shellStyle = {
    "--showreel-mobile-ar": mobileShellAspectCss,
  } as CSSProperties;

  return (
    <section ref={sectionRef} className="w-full" aria-label="Showreel">
      <div className={shellClassName} style={shellStyle}>
        {videoUrl ? (
          <>
            <video
              ref={videoRef}
              className="absolute inset-0 z-0 block h-full w-full object-contain sm:object-cover"
              src={loadVideo ? videoUrl : undefined}
              poster={posterUrl}
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
            {posterUrl && !isVideoPlaying ? (
              <div
                className="pointer-events-none absolute inset-0 z-[1]"
                aria-hidden
              >
                <Image
                  src={posterUrl}
                  alt=""
                  fill
                  className="object-contain sm:object-cover"
                  sizes="(max-width: 767px) 100vw, (max-width: 1120px) 100vw, 1120px"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ) : null}
          </>
        ) : (
          (desktopPosterUrl || mobilePosterUrl) && (
            <Image
              src={(isMobile && mobilePosterUrl) || desktopPosterUrl || mobilePosterUrl!}
              alt=""
              fill
              className="object-contain sm:object-cover"
              sizes="(max-width: 767px) 100vw, (max-width: 1120px) 100vw, 1120px"
              loading="lazy"
              decoding="async"
            />
          )
        )}
      </div>
    </section>
  );
}
