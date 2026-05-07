"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

/** Outer rim of the inner globe SVG (viewBox `0 0 339 339`) — matches `outerCirclePath` ellipse. */
const GLOBE_VIEW = 339;
const GLOBE_CX = 169.5;
const GLOBE_CY = 169.5;
const GLOBE_R = 163.65;

function globeRimPct(deg: number) {
  const rad = (deg * Math.PI) / 180;
  const xPct = ((GLOBE_CX + GLOBE_R * Math.cos(rad)) / GLOBE_VIEW) * 100;
  const yPct = ((GLOBE_CY + GLOBE_R * Math.sin(rad)) / GLOBE_VIEW) * 100;
  return { left: `${xPct}%`, top: `${yPct}%` } as const;
}

export default function EcosystemSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const outerRingRef = useRef<HTMLDivElement | null>(null);
  const fixedRingRef = useRef<HTMLDivElement | null>(null);
  const innerGlobeRef = useRef<HTMLDivElement | null>(null);
  /** Same size/position as inner globe; dots live here so they paint above `outerRingRef` (z-20). */
  const globeMarkersRef = useRef<HTMLDivElement | null>(null);
  /** Mobile-only: centered BRAND/PRODUCT/ENGINEERING list before animation starts. */
  const mobilePhaseListRef = useRef<HTMLDivElement | null>(null);
  const orbTextureRef = useRef<HTMLDivElement | null>(null);

  const bgBrandRef = useRef<HTMLDivElement | null>(null);
  const bgProductRef = useRef<HTMLDivElement | null>(null);
  const bgEngineeringRef = useRef<HTMLDivElement | null>(null);

  // Mobile-only icon bars (phase-synced)
  const brandMobileBarRef = useRef<HTMLDivElement | null>(null);
  const productMobileBarRef = useRef<HTMLDivElement | null>(null);
  const engMobileBarRef = useRef<HTMLDivElement | null>(null);

  // ========================================================
  // REFS
  // ========================================================
  const outerCirclePath = useRef<SVGPathElement | null>(null);
  const vertOvalWidePath = useRef<SVGPathElement | null>(null);
  const vertOvalMedPath = useRef<SVGPathElement | null>(null);
  const horizOvalWidePath = useRef<SVGPathElement | null>(null);
  const vertLinePath = useRef<SVGPathElement | null>(null);
  const baseGridRef = useRef<SVGGElement | null>(null);

  const brandGroup = useRef<HTMLDivElement | null>(null);
  const productGroup = useRef<HTMLDivElement | null>(null);
  const engGroup = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const brandEl = brandGroup.current;
      const productEl = productGroup.current;
      const engEl = engGroup.current;

      if (!brandEl || !productEl || !engEl) return;
      if (!sectionRef.current || !outerRingRef.current || !innerGlobeRef.current)
        return;

      const isMobileGlobeOverlay =
        typeof window !== "undefined" &&
        window.matchMedia("(max-width: 767px)").matches;

      const mobileGlobeDotBrand =
        isMobileGlobeOverlay && globeMarkersRef.current
          ? globeMarkersRef.current.querySelector('[data-globe-circle="brand"]')
          : null;
      const mobileGlobeDotProduct =
        isMobileGlobeOverlay && globeMarkersRef.current
          ? globeMarkersRef.current.querySelector(
              '[data-globe-circle="product"]',
            )
          : null;
      const mobileGlobeDotEng =
        isMobileGlobeOverlay && globeMarkersRef.current
          ? globeMarkersRef.current.querySelector(
              '[data-globe-circle="engineering"]',
            )
          : null;

      const brandBg = bgBrandRef.current;
      const productBg = bgProductRef.current;
      const engineeringBg = bgEngineeringRef.current;
      if (!brandBg || !productBg || !engineeringBg) return;

      if (
        !baseGridRef.current ||
        !outerCirclePath.current ||
        !vertOvalWidePath.current ||
        !vertOvalMedPath.current ||
        !horizOvalWidePath.current ||
        !vertLinePath.current
      )
        return;

      const brandIcons = brandEl.querySelectorAll(".icon-group");
      const productIcons = productEl.querySelectorAll(".icon-group");
      const engIcons = engEl.querySelectorAll(".icon-group");

      const brandTextContainer = brandEl.querySelector(".text-container");
      const productTextContainer = productEl.querySelector(".text-container");
      const engTextContainer = engEl.querySelector(".text-container");

      const brandHeading = brandEl.querySelector(".phase-heading");
      const productHeading = productEl.querySelector(".phase-heading");
      const engHeading = engEl.querySelector(".phase-heading");

      const brandDesc = brandEl.querySelector(".main-desc");
      const productDesc = productEl.querySelector(".main-desc");
      const engDesc = engEl.querySelector(".main-desc");

      if (
        !brandHeading ||
        !productHeading ||
        !engHeading ||
        !brandDesc ||
        !productDesc ||
        !engDesc
      )
        return;

      // INITIAL STATES
      gsap.set(fixedRingRef.current, { autoAlpha: 1 }); // Force it visible for debugging
      gsap.set([brandBg, productBg, engineeringBg], { autoAlpha: 0 });
      gsap.set(orbTextureRef.current, { autoAlpha: 1 });
      if (isMobileGlobeOverlay) {
        gsap.set(outerRingRef.current, { autoAlpha: 0 });
        gsap.set(mobilePhaseListRef.current, { autoAlpha: 1 });
      } else {
        gsap.set(mobilePhaseListRef.current, { autoAlpha: 0 });
      }
      gsap.set([brandIcons, productIcons, engIcons], {
        autoAlpha: 0,
        scale: 0.5,
      });
      gsap.set(
        [
          brandMobileBarRef.current,
          productMobileBarRef.current,
          engMobileBarRef.current,
        ],
        { autoAlpha: 0, scale: 0.9 },
      );
      if (mobileGlobeDotBrand && mobileGlobeDotProduct && mobileGlobeDotEng) {
        gsap.set(
          [mobileGlobeDotBrand, mobileGlobeDotProduct, mobileGlobeDotEng],
          {
            autoAlpha: 0,
            scale: 0.5,
          },
        );
      }
      gsap.set([brandDesc, productDesc, engDesc], { autoAlpha: 0, y: 15 });

      // Headings: start all-white on entry; phases control active/inactive
      gsap.set([brandHeading, productHeading, engHeading], {
        color: "#F5FAF8",
        opacity: 1,
      });

      // Initial state: push Product and Engineering outward (they start at the bottom)
      gsap.set([productTextContainer, engTextContainer], { y: 15 });
      gsap.set(brandTextContainer, { y: 20 }); // Start a bit lower initially

      // Set clockwise layout
      gsap.set(brandEl, { rotation: 0 });
      gsap.set(productEl, { rotation: 240 });
      gsap.set(engEl, { rotation: 120 });

      // Counter-rotate elements to keep text upright
      gsap.set(brandEl.querySelectorAll(".counter-rotate"), {
        rotation: 0,
      });
      gsap.set(productEl.querySelectorAll(".counter-rotate"), {
        rotation: -240,
      });
      gsap.set(engEl.querySelectorAll(".counter-rotate"), {
        rotation: -120,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=4500",
          pin: true,
          scrub: 1,
        },
      });

      // Continuous globe rotation (mobile overlay duplicates transform only < md)
      tl.to(
        innerGlobeRef.current,
        { rotation: 360, ease: "none", duration: 8 },
        0,
      );
      if (
        isMobileGlobeOverlay &&
        globeMarkersRef.current &&
        globeMarkersRef.current.isConnected
      ) {
        tl.to(
          globeMarkersRef.current,
          { rotation: 360, ease: "none", duration: 8 },
          0,
        );
      }
      tl.to({}, { duration: 0.5 }, 0); // Intro pause
      // Fade orb texture away as the system "activates"
      tl.to(
        orbTextureRef.current,
        { autoAlpha: 0, duration: 0.8, ease: "power2.out" },
        0.2,
      );

      // ==========================================
      // PHASE 1: BRAND
      // ==========================================
      tl.add("phase1", 0.5)
        .to(
          mobilePhaseListRef.current,
          { autoAlpha: 0, duration: 0.6, ease: "power2.inOut" },
          "phase1",
        )
        .to(
          outerRingRef.current,
          { autoAlpha: 1, duration: 0.6, ease: "power2.inOut" },
          "phase1+=0.05",
        )
        // Dim the base globe grid + reset all strokes before highlighting
        .to(
          baseGridRef.current,
          { stroke: "rgba(255,255,255,0.18)", duration: 0.6 },
          "phase1",
        )
        .to(
          [
            outerCirclePath.current,
            vertOvalWidePath.current,
            vertOvalMedPath.current,
            horizOvalWidePath.current,
            vertLinePath.current,
          ],
          { stroke: "rgba(255,255,255,0.18)", duration: 0.6 },
          "phase1",
        )
        .to(
          brandBg,
          { autoAlpha: 1, duration: 1, ease: "power2.out" },
          "phase1",
        )
        // Show the special ring as animation starts
        .to(fixedRingRef.current, { autoAlpha: 1, duration: 0.6 }, "phase1")
        // Headings: brand active, others inactive
        .to(brandHeading, { opacity: 1, duration: 0.4 }, "phase1")
        .to(
          [productHeading, engHeading],
          { opacity: 0.35, duration: 0.4 },
          "phase1",
        )
        // Center SVG
        .to(
          [vertOvalWidePath.current, vertOvalMedPath.current],
          { stroke: "#ff4d79", duration: 1 },
          "phase1",
        )
        // Content IN
        .to(brandTextContainer, { y: 0, duration: 0.4 }, "phase1")
        .to(
          [productTextContainer, engTextContainer],
          { y: 15, duration: 0.4 },
          "phase1",
        )
        .to(brandDesc, { autoAlpha: 1, y: 0, duration: 0.8 }, "phase1")
        .to(
          brandIcons,
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "back.out(1.5)",
          },
          "phase1+=0.2",
        )
        // Mobile bottom bar IN
        .to(
          brandMobileBarRef.current,
          { autoAlpha: 1, scale: 1, duration: 0.5, ease: "power2.out" },
          "phase1+=0.2",
        );

      if (mobileGlobeDotBrand) {
        tl.to(
          mobileGlobeDotBrand,
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.5)",
          },
          "phase1+=0.2",
        );
      }

      // ==========================================
      // PHASE 2: PRODUCT
      // ==========================================
      tl.add("phase2", 2.5)
        .to(
          outerRingRef.current,
          { rotation: "+=120", ease: "power2.inOut", duration: 1.5 },
          "phase2",
        )
        .to(
          ".counter-rotate",
          { rotation: "-=120", ease: "power2.inOut", duration: 1.5 },
          "phase2",
        )

        .to(
          brandBg,
          { autoAlpha: 0, duration: 1, ease: "power2.inOut" },
          "phase2",
        )
        .to(
          productBg,
          { autoAlpha: 1, duration: 1, ease: "power2.out" },
          "phase2+=0.35",
        )
        // Headings: product active, others inactive
        .to(productHeading, { opacity: 1, duration: 0.4 }, "phase2")
        .to(
          [brandHeading, engHeading],
          { opacity: 0.35, duration: 0.4 },
          "phase2",
        )

        // SVG Swap
        .to(
          [
            outerCirclePath.current,
            vertOvalWidePath.current,
            vertOvalMedPath.current,
            horizOvalWidePath.current,
            vertLinePath.current,
          ],
          { stroke: "rgba(255,255,255,0.18)", duration: 0.5 },
          "phase2",
        )
        .to(
          [vertOvalWidePath.current, vertOvalMedPath.current],
          { stroke: "rgba(255,255,255,0.2)", duration: 0.5 },
          "phase2",
        )
        .to(
          [vertOvalWidePath.current, horizOvalWidePath.current],
          { stroke: "#5b5bff", duration: 1 },
          "phase2+=0.5",
        )

        // Content Swap
        .to(productTextContainer, { y: 0, duration: 0.4 }, "phase2")
        .to(
          [brandTextContainer, engTextContainer],
          { y: 15, duration: 0.4 },
          "phase2",
        )
        .to(
          brandIcons,
          {
            autoAlpha: 0,
            scale: 0.5,
            duration: 0.6,
            stagger: { each: 0.15, from: "end" },
          },
          "phase2",
        )
        .to(
          brandMobileBarRef.current,
          { autoAlpha: 0, scale: 0.95, duration: 0.35, ease: "power2.inOut" },
          "phase2",
        )
        .to(brandDesc, { autoAlpha: 0, y: -15, duration: 0.5 }, "phase2")
        .to(productDesc, { autoAlpha: 1, y: 0, duration: 0.8 }, "phase2+=0.8")
        .to(
          productIcons,
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "back.out(1.5)",
          },
          "phase2+=1.0",
        )
        // Mobile bottom bar IN
        .to(
          productMobileBarRef.current,
          { autoAlpha: 1, scale: 1, duration: 0.5, ease: "power2.out" },
          "phase2+=0.2",
        );

      if (mobileGlobeDotBrand) {
        tl.to(
          mobileGlobeDotBrand,
          { autoAlpha: 0, scale: 0.5, duration: 0.6 },
          "phase2",
        );
      }
      if (mobileGlobeDotProduct) {
        tl.to(
          mobileGlobeDotProduct,
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.5)",
          },
          "phase2+=1.0",
        );
      }

      // ==========================================
      // PHASE 3: ENGINEERING
      // ==========================================
      tl.add("phase3", 5.0)
        .to(
          outerRingRef.current,
          { rotation: "+=120", ease: "power2.inOut", duration: 1.5 },
          "phase3",
        )
        .to(
          ".counter-rotate",
          { rotation: "-=120", ease: "power2.inOut", duration: 1.5 },
          "phase3",
        )

        .to(
          productBg,
          { autoAlpha: 0, duration: 1, ease: "power2.inOut" },
          "phase3",
        )
        .to(
          engineeringBg,
          { autoAlpha: 1, duration: 1, ease: "power2.out" },
          "phase3+=0.35",
        )
        // Headings: engineering active, others inactive
        .to(engHeading, { opacity: 1, duration: 0.4 }, "phase3")
        .to(
          [brandHeading, productHeading],
          { opacity: 0.35, duration: 0.4 },
          "phase3",
        )

        // SVG Swap
        .to(
          [
            outerCirclePath.current,
            vertOvalWidePath.current,
            vertOvalMedPath.current,
            horizOvalWidePath.current,
            vertLinePath.current,
          ],
          { stroke: "rgba(255,255,255,0.18)", duration: 0.5 },
          "phase3",
        )
        .to(
          [vertOvalWidePath.current, horizOvalWidePath.current],
          { stroke: "rgba(255,255,255,0.2)", duration: 0.5 },
          "phase3",
        )
        .to(
          [outerCirclePath.current, vertLinePath.current],
          { stroke: "#4dff88", duration: 1 },
          "phase3+=0.5",
        )

        // Content Swap
        .to(engTextContainer, { y: 0, duration: 0.4 }, "phase3")
        .to(
          [brandTextContainer, productTextContainer],
          { y: 15, duration: 0.4 },
          "phase3",
        )
        .to(
          productIcons,
          {
            autoAlpha: 0,
            scale: 0.5,
            duration: 0.6,
            stagger: { each: 0.15, from: "end" },
          },
          "phase3",
        )
        .to(
          productMobileBarRef.current,
          { autoAlpha: 0, scale: 0.95, duration: 0.35, ease: "power2.inOut" },
          "phase3",
        )
        .to(productDesc, { autoAlpha: 0, y: -15, duration: 0.5 }, "phase3")
        .to(engDesc, { autoAlpha: 1, y: 0, duration: 0.8 }, "phase3+=0.8")
        .to(
          engIcons,
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "back.out(1.5)",
          },
          "phase3+=1.0",
        )
        // Mobile bottom bar IN
        .to(
          engMobileBarRef.current,
          { autoAlpha: 1, scale: 1, duration: 0.5, ease: "power2.out" },
          "phase3+=0.2",
        );

      if (mobileGlobeDotProduct) {
        tl.to(
          mobileGlobeDotProduct,
          { autoAlpha: 0, scale: 0.5, duration: 0.6 },
          "phase3",
        );
      }
      if (mobileGlobeDotEng) {
        tl.to(
          mobileGlobeDotEng,
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.5)",
          },
          "phase3+=1.0",
        );
      }
    },
    { scope: sectionRef },
  );

  return (
    // Changed to standard flex column to prevent header overlaps
    <section
      ref={sectionRef}
      className="relative w-full h-screen min-h-[850px] rounded-[56px] bg-[#0a0a0a] text-white overflow-hidden flex flex-col items-center justify-center font-sans py-12"
    >
      {/* 1. Phase backgrounds (design assets) — crossfaded via GSAP */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 rounded-[56px]">
        <div ref={bgBrandRef} className="absolute inset-0" aria-hidden>
          <Image
            src="/images/brand.svg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center md:hidden"
            priority
          />
          <Image
            src="/images/Brand.png"
            alt=""
            fill
            sizes="100vw"
            className="hidden md:block object-cover object-center"
            priority
          />
        </div>
        <div ref={bgProductRef} className="absolute inset-0" aria-hidden>
          <Image
            src="/images/product.svg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center md:hidden"
          />
          <Image
            src="/images/Product.png"
            alt=""
            fill
            sizes="100vw"
            className="hidden md:block object-cover object-center"
          />
        </div>
        <div ref={bgEngineeringRef} className="absolute inset-0" aria-hidden>
          <Image
            src="/images/engine.svg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center md:hidden"
          />
          <Image
            src="/images/Engineering.png"
            alt=""
            fill
            sizes="100vw"
            className="hidden md:block object-cover object-center"
          />
        </div>
      </div>

      {/* 2. STATIC HEADER (In standard document flow with bottom margin) */}
      <div className="w-full text-center z-50 mb-12 lg:mb-30 pointer-events-none">
        <h2 className="text-[#F5FAF8] text-center font-pp-neue-corp-extended text-[20px] md:text-[40px] font-medium leading-[120%] tracking-[0.8px] uppercase">
          A COMPLETE <br /> DIGITAL <br className=" md:hidden" /> ECOSYSTEM
        </h2>
      </div>

      {/* 3. RESPONSIVE MAIN STAGE (Scales down so it never cuts off) */}
      <div className="relative w-[515px] h-[515px] flex items-center justify-center z-20 transform scale-[0.5] sm:scale-75 md:scale-90 lg:scale-100">
        {/* Mobile-only: 3 icons with text at bottom per phase */}
        <div className="absolute inset-0 z-[30] md:hidden pointer-events-none">
          <div
            ref={brandMobileBarRef}
            className="absolute inset-x-0 bottom-[-2%] flex translate-y-[50px] justify-center gap-10"
          >
            <div className="flex w-[92px] flex-col items-center">
              <Image
                src="/icons/visual-identity-brand.svg"
                alt="Visual Identity Systems"
                width={48}
                height={48}
                className="h-12 w-12"
              />
              <p className="mt-2 text-center font-pp-neue-corp text-[12px] font-medium leading-[1.15] tracking-[0.24px] text-[#EF4E8E]">
                Visual Identity
                <br />
                Systems
              </p>
            </div>
            <div className="flex w-[92px] flex-col items-center">
              <Image
                src="/icons/marketing-brand.svg"
                alt="Marketing Collateral"
                width={48}
                height={48}
                className="h-12 w-12"
              />
              <p className="mt-2 text-center font-pp-neue-corp text-[12px] font-medium leading-[1.15] tracking-[0.24px] text-[#EF4E8E]">
                Marketing
                <br />
                Collateral
              </p>
            </div>
            <div className="flex w-[92px] flex-col items-center">
              <Image
                src="/icons/strategy-brand.svg"
                alt="Strategy & Positioning"
                width={48}
                height={48}
                className="h-12 w-12"
              />
              <p className="mt-2 text-center font-pp-neue-corp text-[12px] font-medium leading-[1.15] tracking-[0.24px] text-[#EF4E8E]">
                Strategy &<br />
                Positioning
              </p>
            </div>
          </div>

          <div
            ref={productMobileBarRef}
            className="absolute inset-x-0 bottom-[-2%] flex translate-y-[50px] justify-center gap-10"
          >
            <div className="flex w-[92px] flex-col items-center">
              <Image
                src="/icons/ui-ux-product.svg"
                alt="UI/UX Design"
                width={48}
                height={48}
                className="h-12 w-12"
              />
              <p className="mt-2 text-center font-pp-neue-corp text-[12px] font-medium leading-[1.15] tracking-[0.24px] text-[#6459EB]">
                UI/UX
                <br />
                Design
              </p>
            </div>
            <div className="flex w-[92px] flex-col items-center">
              <Image
                src="/icons/3d-motion-product.svg"
                alt="3D & Motion Graphics"
                width={48}
                height={48}
                className="h-12 w-12"
              />
              <p className="mt-2 text-center font-pp-neue-corp text-[12px] font-medium leading-[1.15] tracking-[0.24px] text-[#6459EB]">
                3D & Motion
                <br />
                Graphics
              </p>
            </div>
            <div className="flex w-[92px] flex-col items-center">
              <Image
                src="/icons/prototyping-product.svg"
                alt="Prototyping"
                width={48}
                height={48}
                className="h-12 w-12"
              />
              <p className="mt-2 text-center font-pp-neue-corp text-[12px] font-medium leading-[1.15] tracking-[0.24px] text-[#6459EB]">
                Prototyping
              </p>
            </div>
          </div>

          <div
            ref={engMobileBarRef}
            className="absolute inset-x-0 bottom-[-2%] flex translate-y-[50px] justify-center gap-10"
          >
            <div className="flex w-[92px] flex-col items-center">
              <Image
                src="/icons/full-stack-engineering.svg"
                alt="Full-Stack Dev"
                width={48}
                height={48}
                className="h-12 w-12"
              />
              <p className="mt-2 text-center font-pp-neue-corp text-[12px] font-medium leading-[1.15] tracking-[0.24px] text-[#B9E4AE]">
                Full-Stack
                <br />
                Dev
              </p>
            </div>
            <div className="flex w-[92px] flex-col items-center">
              <Image
                src="/icons/mobile-apps-engineering.svg"
                alt="Mobile Apps"
                width={48}
                height={48}
                className="h-12 w-12"
              />
              <p className="mt-2 text-center font-pp-neue-corp text-[12px] font-medium leading-[1.15] tracking-[0.24px] text-[#B9E4AE]">
                Mobile
                <br />
                Apps
              </p>
            </div>
            <div className="flex w-[92px] flex-col items-center">
              <Image
                src="/icons/ai-llm-engineering.svg"
                alt="AI & LLM Integration"
                width={48}
                height={48}
                className="h-12 w-12"
              />
              <p className="mt-2 text-center font-pp-neue-corp text-[12px] font-medium leading-[1.15] tracking-[0.24px] text-[#FED198]">
                AI & LLM
                <br />
                Integration
              </p>
            </div>
          </div>
        </div>

        {/* INNER SVG GLOBE */}
        <div
          ref={innerGlobeRef}
          className="absolute w-[339px] h-[339px] z-10 pointer-events-none top-[7%]"
        >
          {/* Orb texture sits behind the globe on entry, then fades out */}
          <div
            ref={orbTextureRef}
            className="z-[-1] absolute inset-0 rounded-full overflow-hidden scale-[1.08] opacity-50"
          >
            <Image
              src="/images/coherence-is-alive/orb-texture.png"
              alt=""
              fill
              priority
              sizes="330px"
              className="object-cover brightness-95 contrast-95 saturate-90"
            />
          </div>
          <svg
            viewBox="0 0 339 339"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g
              ref={baseGridRef}
              stroke="rgba(255,255,255,1)"
              strokeMiterlimit="10"
            >
              <path d="M169.482 333.276C190.876 333.276 208.219 259.948 208.219 169.493C208.219 79.0379 190.876 5.70972 169.482 5.70972C148.088 5.70972 130.745 79.0379 130.745 169.493C130.745 259.948 148.088 333.276 169.482 333.276Z" />
              <path d="M169.476 226.369C259.93 226.369 333.259 200.905 333.259 169.493C333.259 138.081 259.93 112.617 169.476 112.617C79.0206 112.617 5.69238 138.081 5.69238 169.493C5.69238 200.905 79.0206 226.369 169.476 226.369Z" />
              <path d="M5.69238 169.493H333.272" />
            </g>
            <path
              ref={outerCirclePath}
              className="hidden md:block"
              d="M169.476 333.276C259.93 333.276 333.259 259.948 333.259 169.493C333.259 79.0379 259.93 5.70972 169.476 5.70972C79.0206 5.70972 5.69238 79.0379 5.69238 169.493C5.69238 259.948 79.0206 333.276 169.476 333.276Z"
              stroke="rgba(255,255,255,1)"
              strokeWidth="1.5"
              strokeMiterlimit="10"
            />
            <path
              ref={vertOvalWidePath}
              d="M169.477 333.276C239.838 333.276 296.878 259.948 296.878 169.493C296.878 79.0379 239.838 5.70972 169.477 5.70972C99.1154 5.70972 42.0762 79.0379 42.0762 169.493C42.0762 259.948 99.1154 333.276 169.477 333.276Z"
              stroke="rgba(255,255,255,1)"
              strokeWidth="1.5"
              strokeMiterlimit="10"
            />
            <path
              ref={vertOvalMedPath}
              d="M169.481 333.276C215.075 333.276 252.037 259.948 252.037 169.493C252.037 79.0379 215.075 5.70972 169.481 5.70972C123.886 5.70972 86.9248 79.0379 86.9248 169.493C86.9248 259.948 123.886 333.276 169.481 333.276Z"
              stroke="rgba(255,255,255,1)"
              strokeWidth="1.5"
              strokeMiterlimit="10"
            />
            <path
              ref={horizOvalWidePath}
              d="M169.476 294.444C259.93 294.444 333.259 238.501 333.259 169.493C333.259 100.485 259.93 44.5425 169.476 44.5425C79.0206 44.5425 5.69238 100.485 5.69238 169.493C5.69238 238.501 79.0206 294.444 169.476 294.444Z"
              stroke="rgba(255,255,255,1)"
              strokeWidth="1.5"
              strokeMiterlimit="10"
            />
            <path
              ref={vertLinePath}
              d="M169.482 5.70972V333.289"
              stroke="rgba(255,255,255,1)"
              strokeWidth="1.5"
              strokeMiterlimit="10"
            />
          </svg>
        </div>

        {/* Mobile-only: centered labels before scroll animation starts */}
        <div
          ref={mobilePhaseListRef}
          className="absolute left-1/2 top-[calc(72%+100px)] z-[22] -translate-x-1/2 -translate-y-1/2 text-center md:hidden pointer-events-none"
          aria-hidden
        >
          <div className="flex flex-col items-center">
            <p className="font-pp-neue-corp-extended text-[#F5FAF8] text-center text-[16px] font-medium leading-[120%] tracking-[0.32px] uppercase pb-[20px]">
              BRAND
            </p>
            <p className="font-pp-neue-corp-extended text-[#F5FAF8] text-center text-[16px] font-medium leading-[120%] tracking-[0.32px] uppercase pb-[20px]">
              PRODUCT
            </p>
            <p className="font-pp-neue-corp-extended text-[#F5FAF8] text-center text-[16px] font-medium leading-[120%] tracking-[0.32px] uppercase pb-[20px]">
              ENGINEERING
            </p>
          </div>
        </div>

        {/* Incomplete ring — stays fixed; only phase groups rotate (clockwise) */}
        <div
          ref={fixedRingRef}
          className="pointer-events-none absolute inset-0 z-[15] top-[-14%] hidden md:block"
          aria-hidden
        >
          <svg
            className="absolute left-0 top-0 size-full"
            width="515"
            height="477"
            viewBox="0 0 515 477"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M121.71 2.92066C122.379 2.92066 122.921 2.37878 122.921 1.71033C122.921 1.04188 122.379 0.5 121.71 0.5C121.042 0.5 120.5 1.04188 120.5 1.71033C120.5 2.37878 121.042 2.92066 121.71 2.92066Z"
              fill="white"
              fillOpacity="0.2"
              stroke="white"
              strokeOpacity="0.2"
              strokeMiterlimit={10}
            />
            <path
              d="M392.71 2.92066C393.379 2.92066 393.921 2.37878 393.921 1.71033C393.921 1.04188 393.379 0.5 392.71 0.5C392.042 0.5 391.5 1.04188 391.5 1.71033C391.5 2.37878 392.042 2.92066 392.71 2.92066Z"
              fill="white"
              fillOpacity="0.2"
              stroke="white"
              strokeOpacity="0.2"
              strokeMiterlimit={10}
            />
            <path
              d="M26.7103 332.921C27.3788 332.921 27.9207 332.379 27.9207 331.71C27.9207 331.042 27.3788 330.5 26.7103 330.5C26.0419 330.5 25.5 331.042 25.5 331.71C25.5 332.379 26.0419 332.921 26.7103 332.921Z"
              fill="white"
              fillOpacity="0.2"
              stroke="white"
              strokeOpacity="0.2"
              strokeMiterlimit={10}
            />
            <path
              d="M51.7103 373.921C52.3788 373.921 52.9207 373.379 52.9207 372.71C52.9207 372.042 52.3788 371.5 51.7103 371.5C51.0419 371.5 50.5 372.042 50.5 372.71C50.5 373.379 51.0419 373.921 51.7103 373.921Z"
              fill="white"
              fillOpacity="0.2"
              stroke="white"
              strokeOpacity="0.2"
              strokeMiterlimit={10}
            />
            <path
              d="M476.105 352.759C476.44 353.337 477.18 353.536 477.759 353.202C478.338 352.867 478.536 352.127 478.202 351.548C477.868 350.969 477.127 350.771 476.549 351.105C475.97 351.439 475.771 352.18 476.105 352.759Z"
              fill="white"
              fillOpacity="0.2"
              stroke="white"
              strokeOpacity="0.2"
              strokeMiterlimit={10}
            />
            <path
              d="M442.105 397.759C442.44 398.337 443.18 398.536 443.759 398.202C444.338 397.867 444.536 397.127 444.202 396.548C443.868 395.969 443.127 395.771 442.549 396.105C441.97 396.439 441.771 397.18 442.105 397.759Z"
              fill="white"
              fillOpacity="0.2"
              stroke="white"
              strokeOpacity="0.2"
              strokeMiterlimit={10}
            />
            <path
              d="M26.1233 331.5C9.70641 297.647 0.5 259.649 0.5 219.5C0.5 127.715 48.6158 47.1676 121 1.70592M51.3572 373C98.2114 435.82 173.105 476.5 257.5 476.5C330.669 476.5 396.695 445.923 443.5 396.85M477.5 352.423C500.983 313.639 514.5 268.148 514.5 219.5C514.5 127.293 465.941 46.4271 393 1.08105"
              stroke="white"
              strokeOpacity="0.2"
            />
          </svg>
        </div>

        {/* CLOCKWORK SYSTEM — three phases + icons rotate with scroll */}
        <div
          ref={outerRingRef}
          className="pointer-events-none absolute z-20 size-full"
        >
          {/* ================= GROUP 1: BRAND ================= */}
          <div ref={brandGroup} className="absolute inset-0 w-full h-full">
            <div className="text-container absolute top-[-70px] left-1/2 -translate-x-1/2 flex flex-col items-center w-[300px] counter-rotate">
              <h3 className="phase-heading text-[#F5FAF8] text-center font-pp-neue-corp-extended text-[20px] font-medium leading-[120%] tracking-[0.4px] uppercase">
                BRAND
              </h3>
              <p className="main-desc mt-2 text-white text-center font-pp-neue-corp text-[16px] font-medium leading-[145%] tracking-[0.32px]">
                We excavate your narrative
                <br />
                to build identities that scale
              </p>
            </div>

            {/* Desktop: phase dot on outer ring (mobile: globe overlay only) */}
            <div className="icon-group absolute top-[0px] left-[-40px] hidden md:flex flex-col items-center justify-center text-center w-[120px] counter-rotate">
              <Image
                src="/icons/circle-brand.svg"
                alt="Brand"
                width={56}
                height={56}
                className="w-14 h-14"
              />
            </div>

            {/* Top Right Icon */}
            <div className="icon-group absolute top-[0px] right-[-40px] hidden md:flex flex-col items-center justify-center text-center w-[120px] counter-rotate">
              <Image
                src="/icons/strategy-brand.svg"
                alt="Strategy & Positioning"
                width={56}
                height={56}
                className="w-14 h-14"
              />
              <p className="mt-2 text-center font-pp-neue-corp text-[16px] font-medium leading-[145%] tracking-[0.32px] text-[#EF4E8E]">
                Strategy &<br />
                Positioning
              </p>
            </div>

            {/* Bottom Left Icon (Moved higher and wider) */}
            <div className="icon-group absolute top-[220px] left-[-90px] hidden md:flex flex-col items-center justify-center text-center w-[120px] counter-rotate">
              <Image
                src="/icons/visual-identity-brand.svg"
                alt="Visual Identity Systems"
                width={48}
                height={48}
                className="w-12 h-12"
              />
              <p className="mt-2 text-center font-pp-neue-corp text-[16px] font-medium leading-[145%] tracking-[0.32px] text-[#EF4E8E]">
                Visual Identity
                <br />
                Systems
              </p>
            </div>

            {/* Bottom Right Icon (Moved higher and wider) */}
            <div className="icon-group absolute top-[220px] right-[-90px] hidden md:flex flex-col items-center justify-center text-center w-[120px] counter-rotate">
              <Image
                src="/icons/marketing-brand.svg"
                alt="Marketing Collateral"
                width={48}
                height={48}
                className="w-12 h-12"
              />
              <p className="mt-2 text-center font-pp-neue-corp text-[16px] font-medium leading-[145%] tracking-[0.32px] text-[#EF4E8E]">
                Marketing
                <br />
                Collateral
              </p>
            </div>
          </div>

          {/* ================= GROUP 2: PRODUCT ================= */}
          <div ref={productGroup} className="absolute inset-0 w-full h-full">
            <div className="text-container absolute top-[-70px] left-1/2 -translate-x-1/2 flex flex-col items-center w-[300px] counter-rotate">
              <h3 className="phase-heading text-[#F5FAF8] text-center font-pp-neue-corp-extended text-[20px] font-medium leading-[120%] tracking-[0.4px] uppercase">
                PRODUCT
              </h3>
              <p className="main-desc mt-2 text-white text-center font-pp-neue-corp text-[16px] font-medium leading-[145%] tracking-[0.32px]">
                We craft high-fidelity interfaces that
                <br />
                guide and delight users
              </p>
            </div>

            {/* Top Left Icon */}
            <div className="icon-group absolute top-[0px] left-[-40px] hidden md:flex flex-col items-center justify-center text-center w-[120px] counter-rotate">
              <Image
                src="/icons/3d-motion-product.svg"
                alt="3D & Motion Graphics"
                width={56}
                height={56}
                className="w-14 h-14"
              />
              <p className="mt-2 text-center font-pp-neue-corp text-[16px] font-medium leading-[145%] tracking-[0.32px] text-[#6459EB]">
                3D & Motion
                <br />
                Graphics
              </p>
            </div>

            {/* Desktop: phase dot on outer ring (mobile: globe overlay only) */}
            <div className="icon-group absolute top-[0px] right-[-40px] hidden md:flex flex-col items-center justify-center text-center w-[120px] counter-rotate">
              <Image
                src="/icons/circle-product.svg"
                alt="Product"
                width={56}
                height={56}
                className="w-14 h-14"
              />
            </div>

            {/* Bottom Left Icon (Moved higher and wider) */}
            <div className="icon-group absolute top-[220px] left-[-90px] hidden md:flex flex-col items-center justify-center text-center w-[120px] counter-rotate">
              <Image
                src="/icons/ui-ux-product.svg"
                alt="UI/UX Design"
                width={48}
                height={48}
                className="w-12 h-12"
              />
              <p className="mt-2 text-center font-pp-neue-corp text-[16px] font-medium leading-[145%] tracking-[0.32px] text-[#6459EB]">
                UI/UX
                <br />
                Design
              </p>
            </div>

            {/* Bottom Right Icon (Moved higher and wider) */}
            <div className="icon-group absolute top-[220px] right-[-90px] hidden md:flex flex-col items-center justify-center text-center w-[120px] counter-rotate">
              <Image
                src="/icons/prototyping-product.svg"
                alt="Prototyping"
                width={56}
                height={56}
                className="w-14 h-14"
              />
              <p className="mt-2 text-center font-pp-neue-corp text-[16px] font-medium leading-[145%] tracking-[0.32px] text-[#6459EB]">
                Prototyping
              </p>
            </div>
          </div>

          {/* ================= GROUP 3: ENGINEERING ================= */}
          <div ref={engGroup} className="absolute inset-0 w-full h-full">
            <div className="text-container absolute top-[-70px] left-1/2 -translate-x-1/2 flex flex-col items-center w-[300px] counter-rotate">
              <h3 className="phase-heading text-[#F5FAF8] text-center font-pp-neue-corp-extended text-[20px] font-medium leading-[120%] tracking-[0.4px] uppercase">
                ENGINEERING
              </h3>
              <p className="main-desc mt-2 text-white text-center font-pp-neue-corp text-[16px] font-medium leading-[145%] tracking-[0.32px]">
                We don't outsource the code. We build
                <br />
                scalable, pixel-perfect products.
              </p>
            </div>

            {/* Desktop: phase dot on outer ring (mobile: globe overlay only) */}
            <div className="icon-group absolute top-[0px] left-[-40px] hidden md:flex flex-col items-center justify-center text-center w-[120px] counter-rotate">
              <Image
                src="/icons/circle-engineering.svg"
                alt="Engineering"
                width={56}
                height={56}
                className="w-14 h-14"
              />
            </div>

            {/* Top Right Icon */}
            <div className="icon-group absolute top-[0px] right-[-40px] hidden md:flex flex-col items-center justify-center text-center w-[120px] counter-rotate">
              <Image
                src="/icons/mobile-apps-engineering.svg"
                alt="Mobile Apps"
                width={56}
                height={56}
                className="w-14 h-14"
              />
              <p className="mt-2 text-center font-pp-neue-corp text-[16px] font-medium leading-[145%] tracking-[0.32px] text-[#B9E4AE]">
                Mobile
                <br />
                Apps
              </p>
            </div>

            {/* Bottom Left Icon (Moved higher and wider) */}
            <div className="icon-group absolute top-[220px] left-[-90px] hidden md:flex flex-col items-center justify-center text-center w-[120px] counter-rotate">
              <Image
                src="/icons/full-stack-engineering.svg"
                alt="Full-Stack Dev"
                width={48}
                height={48}
                className="w-12 h-12"
              />
              <p className="mt-2 text-center font-pp-neue-corp text-[16px] font-medium leading-[145%] tracking-[0.32px] text-[#B9E4AE]">
                Full-Stack
                <br />
                Dev
              </p>
            </div>

            {/* Bottom Right Icon (Moved higher and wider) */}
            <div className="icon-group absolute top-[220px] right-[-90px] hidden md:flex flex-col items-center justify-center text-center w-[120px] counter-rotate">
              <Image
                src="/icons/ai-llm-engineering.svg"
                alt="AI & LLM Integration"
                width={48}
                height={48}
                className="w-12 h-12"
              />
              <p className="mt-2 text-center font-pp-neue-corp text-[16px] font-medium leading-[145%] tracking-[0.32px] text-[#FED198]">
                AI & LLM
                <br />
                Integration
              </p>
            </div>
          </div>
        </div>

        {/*
          Mobile only: rim dots above outerRingRef (z-20) so they aren’t covered; rotation
          synced with innerGlobeRef in the timeline when viewport is < md.
        */}
        <div
          ref={globeMarkersRef}
          className="absolute top-[7%] z-[25] h-[339px] w-[339px] pointer-events-none md:hidden"
          aria-hidden
        >
          <div className="absolute inset-0">
            <div
              className="absolute h-14 w-14 -translate-x-1/2 -translate-y-1/2"
              style={globeRimPct(-150)}
            >
              <div
                data-globe-circle="brand"
                className="flex h-full w-full items-center justify-center"
              >
                <Image
                  src="/icons/circle-brand.svg"
                  alt=""
                  width={56}
                  height={56}
                  className="h-14 w-14"
                />
              </div>
            </div>
            <div
              className="absolute h-14 w-14 -translate-x-1/2 -translate-y-1/2"
              style={globeRimPct(-30)}
            >
              <div
                data-globe-circle="product"
                className="flex h-full w-full items-center justify-center"
              >
                <Image
                  src="/icons/circle-product.svg"
                  alt=""
                  width={56}
                  height={56}
                  className="h-14 w-14"
                />
              </div>
            </div>
            <div
              className="absolute h-14 w-14 -translate-x-1/2 -translate-y-1/2"
              style={globeRimPct(150)}
            >
              <div
                data-globe-circle="engineering"
                className="flex h-full w-full items-center justify-center"
              >
                <Image
                  src="/icons/circle-engineering.svg"
                  alt=""
                  width={56}
                  height={56}
                  className="h-14 w-14"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
