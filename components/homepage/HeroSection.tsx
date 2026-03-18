import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/lib/sanity.image";
import type { HomePage } from "@/lib/sanity.types";

interface HeroSectionProps {
  hero: HomePage["hero"];
}

export default function HeroSection({ hero }: HeroSectionProps) {
  if (!hero) return null;

  return (
    <section className="w-full">
      {/* Main Heading and CTAs */}
      <div className="flex flex-col md:flex-row items-start justify-between gap-6">
        {hero.mainHeading && (
          <h1 className="text-white font-pp-neue-corp-wide text-[20px] md:text-[40px] font-medium uppercase leading-none tracking-tight md:max-w-[308px] lg:max-w-[408px]">
            {hero.mainHeading}
          </h1>
        )}

        <div className="flex flex-row items-center justify-between gap-6 w-full md:w-auto">
          {hero.discoveryCall && (
            <>
              {hero.discoveryCall.href ? (
                <Link
                  href={hero.discoveryCall.href}
                  className="group relative flex h-32 w-32 shrink-0 items-center justify-center rounded-full border border-white/10 bg-black transition-transform hover:scale-105"
                >
                  {/* 1. The Center Arrow */}
                  <span className="text-4xl text-white transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
                    ↗
                  </span>

                  {/* 2. The Rotating Circular Text */}
                  <div className="absolute inset-0">
                    <svg viewBox="0 0 100 100" className="h-full w-full">
                      <defs>
                        {/* Define the path for the text to follow (a circle) */}
                        <path
                          id="circlePath"
                          d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                        />
                      </defs>
                      <text>
                        <textPath
                          xlinkHref="#circlePath"
                          className="fill-[rgb(118,255,200)] text-[11.8px] font-bold uppercase tracking-widest"
                        >
                          {hero.discoveryCall.label && (
                            <>
                              {hero.discoveryCall.label}
                              <tspan className="fill-white text-[20px]"> •</tspan>
                            </>
                          )}
                        </textPath>
                      </text>
                    </svg>
                  </div>
                </Link>
              ) : null}
            </>
          )}

          {hero.primaryCta && (
            <>
              {hero.primaryCta.href ? (
                <div className="btn-gradient py-2 px-6 rounded-[32px] shrink-0">
                  <Link
                    href={hero.primaryCta.href}
                    className=" text-[#0A0A0A] font-pp-neue-corp text-[14px] md:text-base font-medium leading-none capitalize "
                  >
                    {hero.primaryCta.label && hero.primaryCta.label}
                  </Link>
                </div>
              ) : null}
            </>
          )}
        </div>
      </div>

      {/* Showreel Card */}
      {hero.showreelCard && (
        <div className="mt-10 md:mt-[100px]">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5">
            {hero.showreelCard.backgroundImage?.asset?.url && (
              <Image
                src={urlFor(hero.showreelCard.backgroundImage).url()}
                alt=""
                fill
                className="object-cover opacity-80"
                sizes="100vw"
              />
            )}
            <div className="absolute inset-0 bg-black/35" />

            <div className="relative px-6 py-10 sm:px-10 sm:py-14 md:px-16 md:py-18">
              {/* Logo and Year Label */}
              <div className="flex flex-col items-center text-center gap-3">
                {hero.showreelCard.logo?.asset?.url ? (
                  <div className="relative h-10 w-10">
                    <Image
                      src={urlFor(hero.showreelCard.logo).url()}
                      alt="Logo"
                      fill
                      className="object-contain"
                      sizes="40px"
                    />
                  </div>
                ) : null}
                {hero.showreelCard.yearLabel && (
                  <div className="font-pp-neue-corp text-white text-center text-[24px] font-medium leading-[100%] capitalize">
                    {hero.showreelCard.yearLabel}
                  </div>
                )}
              </div>

              {/* Heading and Subheading */}
              <div className="mt-10 md:mt-[100px] text-center">
                {hero.showreelCard.heading && (
                  <div className="text-white text-center font-pp-neue-corp-narrow text-[50px] sm:text-[80px] md:text-[100px] lg:text-[140px] xl:text-[180px] font-bold leading-[100%] md:tracking-[-2.055px] capitalize">
                    {hero.showreelCard.heading}
                  </div>
                )}
                {hero.showreelCard.subheading && (
                  <div className="mt-3 font-pp-neue-corp text-xs sm:text-sm tracking-[0.18em] text-white/80 uppercase">
                    {hero.showreelCard.subheading}
                  </div>
                )}
              </div>

              {/* Location and Reach Text */}
              <div className="font-pp-neue-corp mt-20 md:mt-[120px] xl:mt-[170px] flex items-end justify-between text-xs sm:text-sm tracking-wide uppercase text-white/80">
                {hero.showreelCard.locationText && (
                  <div>{hero.showreelCard.locationText}</div>
                )}
                {hero.showreelCard.reachText && (
                  <div>{hero.showreelCard.reachText}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

