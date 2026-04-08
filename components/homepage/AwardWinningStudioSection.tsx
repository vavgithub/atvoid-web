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
            <div className="relative mt-10 w-full lg:-mt-26">
              <div className="relative mx-auto w-full max-w-[980px] px-4 sm:px-6 md:px-10 lg:px-0">
                {awardWinningStudio.messageSection.textContent.backgroundText
                  ?.asset?.url && (
                  <div className="absolute left-1/2 top-0 z-0 h-[150px] w-[88vw] max-w-[360px] -translate-x-1/2 select-none sm:h-[240px] sm:max-w-[560px] lg:h-[356px] lg:w-[820px] lg:max-w-none">
                    <Image
                      src={urlFor(
                        awardWinningStudio.messageSection.textContent.backgroundText
                      ).url()}
                      alt="Background text"
                      fill
                      className="object-contain object-left"
                      sizes="(min-width: 1024px) 820px, (min-width: 640px) 560px, 88vw"
                    />
                  </div>
                )}

                <div className="relative z-10 flex flex-col gap-8 pt-40 sm:pt-36 lg:h-[390px] lg:pt-0">
                  {awardWinningStudio.messageSection.textContent.paragraph1 && (
                    <div className="w-full max-w-[362px] sm:ml-auto lg:absolute lg:left-[43%] lg:top-[22px] lg:ml-0">
                      <p className="font-pp-neue-corp text-[16px] font-medium leading-[145%] tracking-[0.32px] text-white lg:text-base">
                        {awardWinningStudio.messageSection.textContent.paragraph1}
                      </p>
                    </div>
                  )}

                  {awardWinningStudio.messageSection.textContent.paragraph2 && (
                    <div className="w-full max-w-[362px] sm:ml-auto lg:absolute lg:left-[43%] lg:top-[171px] lg:ml-0">
                      <p className="font-pp-neue-corp text-[16px] font-medium leading-[145%] tracking-[0.32px] text-white lg:text-base">
                        {awardWinningStudio.messageSection.textContent.paragraph2}
                      </p>
                    </div>
                  )}

                  {awardWinningStudio.messageSection.textContent
                    .concludingStatement && (
                    <div className="w-full max-w-[280px] lg:absolute lg:left-[8%] lg:top-[250px]">
                      <p className="font-pp-neue-corp text-[26px] font-medium leading-[145%] tracking-[0.32px] text-white lg:text-[22px]">
                        {
                          awardWinningStudio.messageSection.textContent
                            .concludingStatement
                        }
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
}

