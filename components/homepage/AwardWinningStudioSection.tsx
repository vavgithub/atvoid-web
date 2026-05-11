"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { urlFor } from "@/lib/sanity.image";
import type { HomePage } from "@/lib/sanity.types";
import AwardWinningRiveAnimation from "./AwardWinningRiveAnimation";

gsap.registerPlugin(ScrollTrigger);

/** Minimum wall‑clock time the section stays pinned at the start of the pin range before scroll can advance (Ecosystem‑style pin + dwell). */
const MIN_PIN_MS = 8000;

/** Short tail after dwell so the pin releases with ~one scroll (no long multi‑gesture scrub). */
const PIN_SCROLL_PX = 200;

const SCROLL_KEYS = new Set([
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "PageUp",
  "PageDown",
  "Home",
  "End",
  " ",
]);

function isEditableEventTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  return Boolean(
    target.closest("input, textarea, select, [contenteditable=true]"),
  );
}

interface AwardWinningStudioSectionProps {
  awardWinningStudio: HomePage["awardWinningStudio"];
}

const MOBILE_BODY =
  "font-pp-neue-corp m-0 font-medium leading-[145%] tracking-[0.32px] text-white";

export default function AwardWinningStudioSection({
  awardWinningStudio,
}: AwardWinningStudioSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  /** >0 only after the section overlaps the viewport; increments on each re-entry → remount Rive. */
  const [riveVisitKey, setRiveVisitKey] = useState(0);

  useGSAP(
    () => {
      const el = sectionRef.current;
      if (!el || !awardWinningStudio?.messageSection) return;

      const scrollBlockOpts: AddEventListenerOptions = {
        passive: false,
        capture: true,
      };

      let detachScrollBlock: (() => void) | null = null;
      let dwellTimer: number | null = null;
      let lockedUntil = 0;

      const clearDwell = () => {
        if (dwellTimer !== null) {
          clearTimeout(dwellTimer);
          dwellTimer = null;
        }
        detachScrollBlock?.();
        detachScrollBlock = null;
        lockedUntil = 0;
      };

      const isDwellLocked = () => Date.now() < lockedUntil;

      const blockWheel: EventListener = (e) => {
        if (!isDwellLocked()) return;
        e.preventDefault();
      };

      const blockTouchMove: EventListener = (e) => {
        if (!isDwellLocked()) return;
        e.preventDefault();
      };

      const blockScrollKeys: EventListener = (e) => {
        if (!isDwellLocked()) return;
        if (!(e instanceof KeyboardEvent)) return;
        if (!SCROLL_KEYS.has(e.key)) return;
        if (isEditableEventTarget(e.target)) return;
        e.preventDefault();
      };

      const attachDwellBlockers = () => {
        if (detachScrollBlock) return;
        window.addEventListener("wheel", blockWheel, scrollBlockOpts);
        window.addEventListener("touchmove", blockTouchMove, scrollBlockOpts);
        window.addEventListener("keydown", blockScrollKeys, scrollBlockOpts);
        detachScrollBlock = () => {
          window.removeEventListener("wheel", blockWheel, scrollBlockOpts);
          window.removeEventListener(
            "touchmove",
            blockTouchMove,
            scrollBlockOpts,
          );
          window.removeEventListener(
            "keydown",
            blockScrollKeys,
            scrollBlockOpts,
          );
        };
      };

      const startDwell = () => {
        clearDwell();
        lockedUntil = Date.now() + MIN_PIN_MS;
        attachDwellBlockers();
        dwellTimer = window.setTimeout(() => {
          dwellTimer = null;
          detachScrollBlock?.();
          detachScrollBlock = null;
          lockedUntil = 0;
        }, MIN_PIN_MS);
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: `+=${PIN_SCROLL_PX}`,
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
          id: "award-winning-studio-pin",
          /** Dwell only when crossing `start` forward (flush top). Re‑entering from below hits `end` first — do not lock there. */
          onEnter: startDwell,
          onEnterBack: startDwell,
          onLeave: clearDwell,
          onLeaveBack: clearDwell,
        },
      });

      tl.to({}, { duration: 1 });

      const rafId = requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        requestAnimationFrame(() => ScrollTrigger.refresh());
      });

      return () => {
        cancelAnimationFrame(rafId);
        clearDwell();
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    },
    {
      scope: sectionRef,
      dependencies: [awardWinningStudio?.messageSection],
    },
  );

  useGSAP(
    () => {
      const el = sectionRef.current;
      if (!el || !awardWinningStudio?.messageSection) return;

      let wasInOverlap = false;

      const visitSt = ScrollTrigger.create({
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        invalidateOnRefresh: true,
        id: "award-winning-rive-visit-gate",
        onUpdate(self) {
          const inOverlap = self.isActive;
          if (inOverlap && !wasInOverlap) {
            setRiveVisitKey((k) => k + 1);
          }
          wasInOverlap = inOverlap;
        },
      });

      const rafId = requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });

      return () => {
        cancelAnimationFrame(rafId);
        visitSt.kill();
      };
    },
    {
      scope: sectionRef,
      dependencies: [awardWinningStudio?.messageSection],
    },
  );

  if (!awardWinningStudio) return null;

  const textContent = awardWinningStudio.messageSection?.textContent;

  return (
    <section
      ref={sectionRef}
      className="@container w-full h-svh overflow-hidden flex flex-col items-center justify-start md:h-svh md:overflow-hidden md:flex md:flex-col md:items-center md:justify-start"
    >
      {awardWinningStudio.messageSection && (
        <>
          {riveVisitKey > 0 ? (
            <AwardWinningRiveAnimation key={riveVisitKey} />
          ) : null}

          {textContent && (
            <>
              {/* Mobile: simple left-aligned stack (< md) */}
              <div className="relative w-full px-4 md:hidden">
                <div className="mx-auto w-full max-w-[520px] space-y-5 text-left">
                  {textContent.headline?.trim() ? (
                    <h2 className="font-pp-neue-corp-extended m-0 whitespace-pre-line text-[20px] font-medium uppercase leading-[120%] tracking-[0.4px] text-[#333333] opacity-100 pb-3">
                      {textContent.headline}
                    </h2>
                  ) : null}

                  {textContent.concludingStatement ? (
                    <p className={`${MOBILE_BODY} pb-3 text-[16px]`}>
                      {textContent.concludingStatement}
                    </p>
                  ) : null}
                  {textContent.paragraph1 ? (
                    <p className={`${MOBILE_BODY} pb-3 text-[14px]`}>
                      {textContent.paragraph1}
                    </p>
                  ) : null}
                  {textContent.paragraph2 ? (
                    <p className={`${MOBILE_BODY} pb-3 text-[14px]`}>
                      {textContent.paragraph2}
                    </p>
                  ) : null}
                </div>
              </div>

              {/* Desktop: SVG-positioned overlay (md+) */}
              <div className="relative mt-6 hidden w-full md:-mt-6 lg:-mt-14 md:block md:px-10">
                <div className="relative mx-auto w-full max-w-[820px]">
                  <svg
                    viewBox="0 0 820 356"
                    className="block h-auto w-full"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <foreignObject x="0" y="0" width="820" height="356">
                      <div className="relative h-full w-full text-left">
                        {textContent.backgroundText?.asset?.url && (
                          <div className="absolute inset-0 z-0">
                            <Image
                              src={urlFor(textContent.backgroundText).url()}
                              alt="Background text"
                              fill
                              className="object-contain object-left"
                              sizes="(max-width: 820px) 100vw, 820px"
                              priority
                            />
                          </div>
                        )}

                        <div className="pointer-events-none absolute inset-0 z-10">
                          {textContent.paragraph1 && (
                            <div className="pointer-events-auto absolute left-[352px] top-[22px] w-[362px]">
                              <p className="font-pp-neue-corp m-0 text-[16px] font-medium leading-[145%] tracking-[0.32px] text-white">
                                {textContent.paragraph1}
                              </p>
                            </div>
                          )}

                          {textContent.paragraph2 && (
                            <div className="pointer-events-auto absolute left-[352px] top-[171px] w-[362px]">
                              <p className="font-pp-neue-corp m-0 text-[16px] font-medium leading-[145%] tracking-[0.32px] text-white">
                                {textContent.paragraph2}
                              </p>
                            </div>
                          )}

                          {textContent.concludingStatement && (
                            <div className="pointer-events-auto absolute left-[10px] top-[250px] w-[280px]">
                              <p className="font-pp-neue-corp m-0 text-[22px] font-medium leading-[145%] tracking-[0.32px] text-white">
                                {textContent.concludingStatement}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </foreignObject>
                  </svg>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </section>
  );
}
