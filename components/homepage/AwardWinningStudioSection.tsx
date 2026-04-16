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
    <section className="w-full mt-6 md:mt-5">
      {awardWinningStudio.messageSection && (
        <>
          {awardWinningStudio.messageSection.image?.asset?.url && (
            <div className="relative -mt-24 left-1/2 w-screen max-w-[100vw] -translate-x-1/2 overflow-visible md:-mt-75">
              <div className="mx-auto w-full max-w-[1280px]">
                <div className="flex w-full justify-end md:translate-x-6 lg:translate-x-35">
                  <div className="relative aspect-[897.52/586.59] w-screen md:w-[92vw] lg:w-[1280px]">
                    <Image
                      src={awardWinningStudio.messageSection.image.asset.url}
                      alt="Abstract 3D graphic"
                      fill
                      className="object-contain object-center rotate-360"
                      sizes="(min-width: 1280px) 1280px, (min-width: 768px) 92vw, 100vw"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {awardWinningStudio.messageSection.textContent && (
            <div className="relative mt-10 w-full lg:-mt-26 px-4 md:px-10">
              <div className="relative mx-auto w-full max-w-[820px]">
                <svg 
                  viewBox="0 0 820 356" 
                  className="w-full h-auto block"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <foreignObject x="0" y="0" width="820" height="356">
                    <div 
                      xmlns="http://www.w3.org/1999/xhtml" 
                      className="relative w-full h-full text-left"
                    >
                      {awardWinningStudio.messageSection.textContent.backgroundText
                        ?.asset?.url && (
                        <div className="absolute inset-0 z-0">
                          <Image
                            src={urlFor(
                              awardWinningStudio.messageSection.textContent.backgroundText
                            ).url()}
                            alt="Background text"
                            fill
                            className="object-contain object-left"
                            sizes="(max-width: 820px) 100vw, 820px"
                            priority
                          />
                        </div>
                      )}

                      <div className="absolute inset-0 z-10 pointer-events-none">
                        {awardWinningStudio.messageSection.textContent.paragraph1 && (
                          <div className="absolute left-[352px] top-[22px] w-[362px] pointer-events-auto">
                            <p className="font-pp-neue-corp text-[16px] font-medium leading-[145%] tracking-[0.32px] text-white m-0">
                              {awardWinningStudio.messageSection.textContent.paragraph1}
                            </p>
                          </div>
                        )}

                        {awardWinningStudio.messageSection.textContent.paragraph2 && (
                          <div className="absolute left-[352px] top-[171px] w-[362px] pointer-events-auto">
                            <p className="font-pp-neue-corp text-[16px] font-medium leading-[145%] tracking-[0.32px] text-white m-0">
                              {awardWinningStudio.messageSection.textContent.paragraph2}
                            </p>
                          </div>
                        )}

                        {awardWinningStudio.messageSection.textContent
                          .concludingStatement && (
                          <div className="absolute left-[10px] top-[250px] w-[280px] pointer-events-auto">
                            <p className="font-pp-neue-corp text-[22px] font-medium leading-[145%] tracking-[0.32px] text-white m-0">
                              {
                                awardWinningStudio.messageSection.textContent
                                  .concludingStatement
                              }
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </foreignObject>
                </svg>
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
}
