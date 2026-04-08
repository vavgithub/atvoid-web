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
    heroSection.trustedBy?.logos?.filter((logo) => logo.image?.asset?.url) ?? [];

  return (
    <section className="w-full">
      <div className="relative left-1/2 right-1/2 w-screen -translate-x-1/2">
        <Image
          src="/images/Group.png"
          alt=""
          fill
          priority
          aria-hidden
          className="object-cover object-center"
        />
        <div className="relative z-10 min-h-screen flex flex-col px-5 pt-4 md:min-h-[813px] md:px-10 md:pt-0 lg:px-20">
          <div className="flex items-center justify-between pt-1 md:pt-20">
          <div className="pointer-events-auto hidden md:block">
            <Link href="/" className="relative block h-[32px] w-[110px] md:h-[43px] md:w-[190px]">
              <motion.div
                className="absolute left-0 top-0 z-10"
                onHoverStart={() => setIsLogoHovered(true)}
                onHoverEnd={() => setIsLogoHovered(false)}
              >
                <Image
                  src="/images/Logo.svg"
                  alt="Value at Void logo"
                  width={125}
                  height={44}
                  className="h-[32px] w-auto md:h-[43px]"
                  priority
                />
              </motion.div>
              <motion.div
                className="absolute left-[22px] top-[7px] md:left-[48px] md:top-0"
                initial={false}
                animate={{ opacity: isLogoHovered ? 1 : 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                <Image
                  src="/images/VAV.svg"
                  alt="Value at Void"
                  width={891}
                  height={486}
                  className="h-[18px] w-auto md:h-[43px]"
                  priority
                />
              </motion.div>
            </Link>
          </div>

        </div>

          <div className="mt-auto flex flex-col justify-between gap-6 md:flex-row md:items-end md:gap-10">
            <div className="md:max-w-[550px]">
              {heroSection.experienceBadge && (
                <div className="mt-8 flex items-start gap-3 md:mt-16 md:items-center">
                  <div>
                    {heroSection.experienceBadge.icon?.asset?.url ? (
                      <div className="relative w-12 h-12">
                        <Image
                          src={urlFor(heroSection.experienceBadge.icon).url()}
                          alt="Experience badge"
                          fill
                          className="object-contain"
                          sizes="48px"
                        />
                      </div>
                    ) : (
                      <div className="rounded-full border flex items-center justify-center">
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
                  <h2 className="text-[28px] md:text-[40px] leading-[120%] font-medium uppercase text-white font-pp-neue-corp-wide">
                    {heroSection.intro.heading}
                  </h2>
                </div>
              )}
            </div>

            {heroSection.intro?.description && (
              <div className="w-full md:self-end md:flex md:justify-end">
                <div className="max-w-full text-left text-white font-pp-neue-corp text-base font-medium leading-[145%] tracking-[0.32px] md:max-w-[226px] md:text-right">
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
              <h3 className="max-w-[280px] font-pp-neue-corp text-[#FFFDEB] text-[18px] md:text-[24px] font-medium leading-[120%] tracking-[0.32px] uppercase">
                {heroSection.trustedBy.heading}
              </h3>
            )}
            {trustedLogos.length > 0 && (
              <div className="relative left-1/2 right-1/2 w-screen min-w-0 -translate-x-1/2 overflow-hidden md:left-auto md:right-auto md:-mr-10 md:w-[calc(100%+2.5rem)] md:flex-1 md:translate-x-0 lg:-mr-20 lg:w-[calc(100%+5rem)]">
                <motion.div
                  className="flex w-max will-change-transform"
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{ duration: 10, ease: "linear", repeat: Infinity }}
                >
                  {[...trustedLogos, ...trustedLogos].map((logo, i) => (
                    <div className="relative mr-5 h-[30px] w-[110px] shrink-0 md:mr-10 md:h-[36px] md:w-[139px]" key={i}>
                      <Image
                        src={urlFor(logo.image).url()}
                        alt={logo.altText || `Brand logo ${i + 1}`}
                        fill
                        className="object-contain object-bottom"
                        sizes="(max-width: 768px) 80px, 96px"
                      />
                    </div>
                  ))}
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

