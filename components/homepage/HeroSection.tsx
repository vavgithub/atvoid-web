"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { motion } from "framer-motion";
import { urlFor } from "@/lib/sanity.image";
import type { HeroSectionContent } from "@/lib/sanity.types";

interface HeroSectionProps {
  heroSection?: HeroSectionContent;
}

export default function HeroSection({ heroSection }: HeroSectionProps) {
  if (!heroSection) return null;

  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const trustedLogos =
    heroSection.trustedBy?.logos?.filter((logo) => logo.image?.asset?.url) ??
    [];

  const hasHeroVideo = Boolean(heroSection.backgroundVideoUrl);

  return (
    <section className="w-full">
      <div className="relative left-1/2 right-1/2 flex min-h-screen w-screen -translate-x-1/2 flex-col overflow-hidden">
        {/* Background — stretches to full section height (grows with content) */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <Image
            src="/images/Group.png"
            alt=""
            fill
            priority
            aria-hidden
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>

        <div
          className={`relative z-10 flex flex-1 flex-col px-5 pt-4 md:px-10 md:pt-0 lg:px-20 ${
            hasHeroVideo ? "pb-6 md:pb-10" : "md:min-h-[813px]"
          }`}
        >
          <div className="flex items-center justify-between pt-1 md:pt-20">
            <div className="pointer-events-auto hidden md:block">
              {/* Logo Link code... */}
            </div>
          </div>

          {/* Video positioned absolutely in the background of the flex container */}
          {hasHeroVideo && (
            <div
              className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden"
              aria-hidden
            >
              <div
                className="relative mt-[-50%] h-[320px] w-[320px] overflow-hidden rounded-2xl sm:h-[400px] sm:w-[400px] md:mt-[-140px] md:h-[480px] md:w-[480px] lg:h-[580px] lg:w-[580px]"
                style={{
                  boxShadow:
                    "0 0 120px 80px rgba(0, 0, 0, 0.18), 0 0 48px 24px rgba(0, 0, 0, 0.12), inset 0 0 100px 45px rgba(0, 0, 0, 0.14), inset 0 0 28px 8px rgba(0, 0, 0, 0.08)",
                }}
              >
                <video
                  src={heroSection.backgroundVideoUrl}
                  className="h-full w-full scale-110 object-cover object-center rotate-90"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
                <div
                  className="pointer-events-none absolute inset-0 rounded-2xl"
                  style={{
                    mixBlendMode: "multiply",
                    background: [
                      "radial-gradient(ellipse 92% 92% at 50% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 42%, rgba(0,0,0,0.10) 56%, rgba(0,0,0,0.28) 70%, rgba(0,0,0,0.55) 84%, rgba(0,0,0,0.82) 96%, rgba(0,0,0,0.90) 100%)",
                      "radial-gradient(ellipse 118% 118% at 50% 50%, rgba(0,0,0,0) 58%, rgba(0,0,0,0.18) 86%, rgba(0,0,0,0.46) 100%)",
                    ].join(", "),
                  }}
                />
              </div>
            </div>
          )}

          <div
            className={`relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-end md:gap-10 shrink-0 mt-auto pb-10`}
          >
            <div className="md:max-w-[550px]">
              {heroSection.experienceBadge && (
                <div
                  className={`flex items-start gap-3 md:items-center ${
                    hasHeroVideo ? "mt-0" : "mt-8 md:mt-16"
                  }`}
                >
                  <div>
                    {heroSection.experienceBadge.icon?.asset?.url ? (
                      <div className="relative h-12 w-12">
                        <Image
                          src={urlFor(heroSection.experienceBadge.icon).url()}
                          alt="Experience badge"
                          fill
                          className="object-contain"
                          sizes="48px"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center rounded-full border">
                        <span>20</span>
                      </div>
                    )}
                  </div>
                  {heroSection.experienceBadge.description && (
                    <div className="md:max-w-[305px] text-sm md:text-base not-italic font-pp-neue-corp font-medium leading-[120%] text-white">
                      <p>{heroSection.experienceBadge.description}</p>
                    </div>
                  )}
                </div>
              )}

              {heroSection.intro?.heading && (
                <div className="mt-5 md:mt-8">
                  <h2 className="font-pp-neue-corp-wide text-[28px] font-medium uppercase leading-[120%] text-white md:text-[40px]">
                    {heroSection.intro.heading}
                  </h2>
                </div>
              )}
            </div>

            {heroSection.intro?.description && (
              <div className="w-full md:flex md:justify-end md:self-end">
                <div className="max-w-full text-left font-pp-neue-corp text-base font-medium leading-[145%] tracking-[0.32px] text-white md:max-w-[226px] md:text-right">
                  <PortableText value={heroSection.intro.description} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {heroSection.trustedBy && (
        <div className="relative left-1/2 right-1/2 mt-8 w-screen -translate-x-1/2 px-5 md:mt-8 md:px-10 lg:px-20">
          <div className="flex w-full flex-col gap-4 md:flex-row md:items-end md:justify-start md:gap-10">
            {heroSection.trustedBy.heading && (
              <h3 className="max-w-[280px] font-pp-neue-corp text-[18px] font-medium uppercase leading-[120%] tracking-[0.32px] text-[#FFFDEB] md:text-[24px]">
                {heroSection.trustedBy.heading}
              </h3>
            )}
            {trustedLogos.length > 0 && (
              <div className=" relative left-1/2 right-1/2 w-screen min-w-0 -translate-x-1/2 overflow-hidden md:left-auto md:right-auto md:-mr-10 md:w-[calc(100%+2.5rem)] md:flex-1 md:translate-x-0 lg:-mr-20 lg:w-[calc(100%+5rem)]">
                <motion.div
                  className="flex w-max items-center will-change-transform"
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{
                    duration: 10,
                    ease: "linear",
                    repeat: Infinity,
                  }}
                >
                  {[...trustedLogos, ...trustedLogos].map((logo, i) => {
                    const dims = logo.image?.asset?.metadata?.dimensions;
                    const natW = dims?.width ?? 200;
                    const natH = dims?.height ?? 36;
                    return (
                      <div
                        className="mr-5 flex h-[36px] shrink-0 items-center md:mr-10"
                        key={i}
                      >
                        <Image
                          src={urlFor(logo.image).url()}
                          alt={logo.altText || `Brand logo ${i + 1}`}
                          width={natW}
                          height={natH}
                          className="h-[36px] w-auto max-h-[36px] object-contain object-center"
                          sizes="200px"
                        />
                      </div>
                    );
                  })}
                </motion.div>
                <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-linear-to-r from-black via-black/85 to-transparent md:w-16" />
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
