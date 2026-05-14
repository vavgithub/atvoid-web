"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { urlFor } from "@/lib/sanity.image";
import type { HomePage } from "@/lib/sanity.types";
import AwardWinningRiveAnimation from "./AwardWinningRiveAnimation";

gsap.registerPlugin(ScrollTrigger);

interface AwardWinningStudioSectionProps {
  awardWinningStudio: HomePage["awardWinningStudio"];
}

/** Space above fixed MorphingForm pill (fixed px; tune if the CTA overlaps). */
const FLOATING_CTA_SAFE_BOTTOM = "pb-[100px]";

export default function AwardWinningStudioSection({
  awardWinningStudio,
}: AwardWinningStudioSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const textBlockRef = useRef<HTMLDivElement>(null);
  const riveWrapperRef = useRef<HTMLDivElement>(null);
  const mobileScaleRef = useRef<HTMLDivElement>(null);
  /** 1 once the section has intersected the viewport (either direction); avoids remount/restart when scrolling back up. */
  const [riveVisitKey, setRiveVisitKey] = useState(0);

  useEffect(() => {
    const inner = mobileScaleRef.current;
    if (!inner) return;
    const outer = inner.parentElement;
    if (!outer) return;
    const apply = () => { inner.style.transform = `scale(${outer.offsetWidth / 820})`; };
    apply();
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, []);

  /** All breakpoints: pin, text center → bottom, Rive fades in, then tail scroll. */
  useGSAP(
    () => {
      const el = sectionRef.current;
      const textBlock = textBlockRef.current;
      const riveWrapper = riveWrapperRef.current;
      if (!el || !textBlock || !riveWrapper || !awardWinningStudio?.messageSection) return;

      const topFraction = 0.5;

      /** Vertical offset (px) from initial top position to resting position. */
      const getCenterToBottomY = () => {
        const H = el.offsetHeight;
        const h = textBlock.offsetHeight;
        if (window.innerWidth >= 768) {
          // Mirror AwardWinningRiveAnimation's CSS: md:h-[min(55svh,600px)].
          // Avoids riveWrapper.offsetHeight timing issue (it's 0 before Rive mounts).
          const riveH = Math.min(H * 0.55, 600);
          return Math.round(riveH - H * topFraction + h / 2);
        }
        if (window.innerWidth < 768) {
          const safeBottom = 100;
          const riveBottom = 0.15 * H + 1.1 * 0.5625 * el.offsetWidth;
          // Constraint 1: text top must be >= animation bottom + 16px gap.
          const byAnimation = riveBottom + 16 - (H * topFraction - h / 2);
          // Constraint 2: text bottom must be >= safeBottom from section bottom.
          const byBottom = H * (1 - topFraction) - safeBottom - h / 2;
          return Math.round(Math.max(byAnimation, byBottom));
        }
        const pad = parseFloat(getComputedStyle(textBlock).paddingBottom) || 0;
        return Math.round(H * (1 - topFraction) - pad - h / 2);
      };

      gsap.set(riveWrapper, { opacity: 0 });
      gsap.set(textBlock, { top: `${topFraction * 100}%`, bottom: "auto", yPercent: -50, y: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "+=2100",
          pin: true,
          scrub: 0.65,
          invalidateOnRefresh: true,
        },
      });

      tl.to(textBlock, {
        y: () => getCenterToBottomY(),
        duration: 0.65,
        ease: "power2.inOut",
      });
      tl.to(riveWrapper, { opacity: 1, duration: 0.6, ease: "power2.inOut" }, 0.45);
      tl.to(riveWrapper, { opacity: 1, duration: 0.85, ease: "none" });

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
        gsap.set(textBlock, { clearProps: "transform,top,bottom,yPercent" });
        gsap.set(riveWrapper, { clearProps: "opacity" });
      };
    },
    {
      scope: sectionRef,
      dependencies: [awardWinningStudio?.messageSection],
    },
  );

  /** Mount Rive as soon as the section overlaps the viewport so it's ready behind the fade. */
  useGSAP(
    () => {
      const el = sectionRef.current;
      if (!el || !awardWinningStudio?.messageSection) return;

      const visitSt = ScrollTrigger.create({
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        invalidateOnRefresh: true,
        id: "award-winning-rive-visit-gate",
        onEnter: () => setRiveVisitKey((k) => k + 1),
        onEnterBack: () => setRiveVisitKey((k) => k + 1),
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
      className="@container relative flex h-svh w-full flex-col items-center overflow-hidden md:h-svh"
    >
      {awardWinningStudio.messageSection && (
        <>
          {/* Rive wrapper: always in DOM for GSAP opacity; Rive mounts once section first intersects (no remount on scroll-back). */}
          <div ref={riveWrapperRef} className="rive-mobile-fade absolute top-[15svh] w-screen origin-top scale-[1.1] md:static md:top-auto md:w-full md:scale-100 md:mt-0">
            {riveVisitKey > 0 ? (
              <AwardWinningRiveAnimation key={riveVisitKey} />
            ) : null}
          </div>

          {textContent && (
            <>
              {/* Fills space under Rive so bottom content sits low; does not wrap Rive or change its layout. */}
              <div className="min-h-0 w-full flex-1" aria-hidden="true" />

              {/* Same scroll-driven motion on all breakpoints (GSAP). Headline only on small screens — not in desktop SVG artboard. */}
              <div
                ref={textBlockRef}
                className={`pointer-events-none absolute inset-x-0 top-1/2 z-10 w-full -translate-y-1/2 px-4 ${FLOATING_CTA_SAFE_BOTTOM} md:px-10 md:pb-25 lg:pb-0`}
              >
                {textContent.headline?.trim() ? (
                  <div className="pointer-events-auto mx-auto mb-4 max-w-[520px] text-left hidden">
                    <h2 className="font-pp-neue-corp-extended m-0 whitespace-pre-line text-[20px] font-medium uppercase leading-[120%] tracking-[0.4px] text-[#333333]">
                      {textContent.headline}
                    </h2>
                  </div>
                ) : null}
                {/* Mobile only — JS scale replicates SVG transform, bypasses iOS min-font-size */}
                <div className="relative mx-auto w-full overflow-hidden md:hidden" style={{ aspectRatio: "820 / 356" }}>
                  <div ref={mobileScaleRef} style={{ position: "absolute", top: 0, left: 0, width: "820px", height: "356px", transformOrigin: "top left" }}>
                    {textContent.backgroundText?.asset?.url && (
                      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
                        <Image
                          src={urlFor(textContent.backgroundText).url()}
                          alt="Background text"
                          fill
                          className="object-contain object-left"
                          sizes="820px"
                          priority
                        />
                      </div>
                    )}
                    <div style={{ position: "absolute", inset: 0, zIndex: 10, pointerEvents: "none" }}>
                      {textContent.paragraph1 && (
                        <div style={{ position: "absolute", left: "352px", top: "22px", width: "362px", pointerEvents: "auto" }}>
                          <p className="font-pp-neue-corp m-0 text-[16px] font-medium leading-[145%] tracking-[0.32px] text-white">{textContent.paragraph1}</p>
                        </div>
                      )}
                      {textContent.paragraph2 && (
                        <div style={{ position: "absolute", left: "352px", top: "171px", width: "362px", pointerEvents: "auto" }}>
                          <p className="font-pp-neue-corp m-0 text-[16px] font-medium leading-[145%] tracking-[0.32px] text-white">{textContent.paragraph2}</p>
                        </div>
                      )}
                      {textContent.concludingStatement && (
                        <div style={{ position: "absolute", left: "10px", top: "250px", width: "280px", pointerEvents: "auto" }}>
                          <p className="font-pp-neue-corp m-0 text-[22px] font-medium leading-[145%] tracking-[0.32px] text-white">{textContent.concludingStatement}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Tab / Desktop — original SVG + foreignObject, untouched */}
                <div className="relative mx-auto w-full max-w-[820px] hidden md:block">
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
