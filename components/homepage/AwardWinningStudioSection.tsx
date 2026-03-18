import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/lib/sanity.image";
import type { HomePage } from "@/lib/sanity.types";

interface AwardWinningStudioSectionProps {
  awardWinningStudio: HomePage["awardWinningStudio"];
}

export default function AwardWinningStudioSection({
  awardWinningStudio,
}: AwardWinningStudioSectionProps) {
  if (!awardWinningStudio) return null;

  return (
    <section className="w-full mt-[100px] md:mt-[215px]">
      {/* Experience Badge */}
      {awardWinningStudio.experienceBadge && (
        <div className="flex items-center mt-8 md:mt-16 gap-3">
          <div>
            {awardWinningStudio.experienceBadge.icon?.asset?.url ? (
              <div className="relative w-12 h-12">
                <Image
                  src={urlFor(awardWinningStudio.experienceBadge.icon).url()}
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
          {awardWinningStudio.experienceBadge.description && (
            <div className="md:max-w-[344px] text-sm md:text-base font-pp-neue-corp font-medium leading-[120%]">
              <p>{awardWinningStudio.experienceBadge.description}</p>
            </div>
          )}
        </div>
      )}

      {/* Intro Section - Two Columns */}
      {awardWinningStudio.intro && (
        <div className="flex flex-col md:flex-row justify-between mt-5 md:mt-9">
          {/* Left Column - Heading */}
          <div className="md:max-w-[550px]">
            {awardWinningStudio.intro.heading && (
              <h2 className="text-[32px] md:text-[40px] leading-none font-medium uppercase text-[#FFFDEB] font-pp-neue-corp-wide">
                {awardWinningStudio.intro.heading}
              </h2>
            )}
          </div>

          {/* Right Column - Description */}
          <div>
            {awardWinningStudio.intro.description && (
              <div className="md:max-w-[330px] [&>p]:font-pp-neue-corp [&>p]:text-white [&>p]:text-[16px] [&>p]:font-medium [&>p]:leading-[120%] [&>p]:tracking-[0.32px] [&>p]:mb-6 [&>p:last-child]:mb-0">
                <PortableText value={awardWinningStudio.intro.description} />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Trusted By Section */}
      {awardWinningStudio.trustedBy && (
        <div className="mt-8 md:mt-15 flex flex-row items-center justify-start gap-5 md:gap-10">
          {awardWinningStudio.trustedBy.heading && (
            <h3 className="md:max-w-[280px] font-pp-neue-corp text-[#FFFDEB] text-[18px] md:text-[24px] font-medium leading-[120%] tracking-[0.32px] uppercase">
              {awardWinningStudio.trustedBy.heading}
            </h3>
          )}
          {awardWinningStudio.trustedBy.logos &&
            awardWinningStudio.trustedBy.logos.length > 0 && (
              <div className="flex items-center justify-start gap-5 md:gap-10 overflow-hidden">
                {awardWinningStudio.trustedBy.logos.map((logo, i) =>
                  logo.image?.asset?.url ? (
                    <div className="flex-shrink-0 relative w-[139px] h-[36px]" key={i}>
                      <Image
                        src={urlFor(logo.image).url()}
                        alt={logo.altText || `Brand logo ${i + 1}`}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 80px, 96px"
                      />
                    </div>
                  ) : null
                )}
              </div>
            )}
        </div>
      )}

      {/* Message Section - Two Columns */}
      {awardWinningStudio.messageSection && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0">
          {/* Left Column - Complex Text Layout */}
          {awardWinningStudio.messageSection.textContent && (
            <div className="relative w-full lg:aspect-[4/3]">
              {/* 1. Large Faded Background Text Image */}
              {awardWinningStudio.messageSection.textContent.backgroundText
                ?.asset?.url && (
                <div className="absolute inset-0 z-0 select-none hidden lg:block">
                  <Image
                    src={urlFor(
                      awardWinningStudio.messageSection.textContent.backgroundText
                    ).url()}
                    alt="Background text"
                    fill
                    className="object-contain object-left"
                    sizes="(min-width: 1024px) 50vw, 0px"
                  />
                </div>
              )}

              {/* 2. Overlaying Content */}
              <div className="relative z-10 flex flex-col gap-8 lg:block lg:w-full lg:h-full pt-10 lg:pt-0">
                {/* Top Text -> Positioned Absolute Top-Right */}
                {awardWinningStudio.messageSection.textContent.paragraph1 && (
                  <div className="lg:absolute lg:top-[23%] lg:right-[-5%] lg:w-[66%]">
                    <p className="font-pp-neue-corp text-white font-medium leading-[120%] tracking-[0.32px] 
                            text-[16px] lg:text-[clamp(12px,1.1vw,16px)] 
                           ">
                      {awardWinningStudio.messageSection.textContent.paragraph1}
                    </p>
                  </div>
                )}

                {/* Middle Text -> Positioned Absolute Middle-Right */}
                {awardWinningStudio.messageSection.textContent.paragraph2 && (
                  <div className="lg:absolute lg:top-[47%] lg:right-[-5%] lg:w-[66%]">
                    <p className="font-pp-neue-corp text-white font-medium leading-[120%] tracking-[0.32px] 
                             text-[16px] lg:text-[clamp(12px,1.1vw,16px)] 
                             ">
                      {awardWinningStudio.messageSection.textContent.paragraph2}
                    </p>
                  </div>
                )}

                {/* Bottom Text -> Positioned Absolute Bottom-Left */}
                {awardWinningStudio.messageSection.textContent
                  .concludingStatement && (
                  <div className="lg:absolute lg:bottom-[29%] lg:left-0 lg:w-[40%]">
                    <p className="font-pp-neue-corp text-white font-medium leading-[120%] tracking-[0.32px] 
                             text-[16px] lg:text-[clamp(12px,1.1vw,16px)] 
                             max-w-md lg:max-w-[90%]">
                      {
                        awardWinningStudio.messageSection.textContent
                          .concludingStatement
                      }
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Right Column - Image */}
          {awardWinningStudio.messageSection.image?.asset?.url && (
            <div className="relative w-full h-[300px] lg:h-auto lg:aspect-[4/3]">
              <Image
                src={urlFor(awardWinningStudio.messageSection.image).url()}
                alt="Abstract 3D graphic"
                fill
                className="object-cover lg:object-contain"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          )}
        </div>
      )}
    </section>
  );
}

