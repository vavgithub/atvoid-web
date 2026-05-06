import Image from "next/image";
import { urlFor } from "@/lib/sanity.image";
import type { HomePage } from "@/lib/sanity.types";

interface AwardWinningStudioSectionProps {
  awardWinningStudio: HomePage["awardWinningStudio"];
}

const MOBILE_BODY =
  "font-pp-neue-corp m-0 font-medium leading-[145%] tracking-[0.32px] text-white";

export default function AwardWinningStudioSection({
  awardWinningStudio,
}: AwardWinningStudioSectionProps) {
  if (!awardWinningStudio) return null;

  const textContent = awardWinningStudio.messageSection?.textContent;

  return (
    <section className="@container w-full mt-6 md:mt-5">
      {awardWinningStudio.messageSection && (
        <>
          {awardWinningStudio.messageSection.image?.asset?.url && (
            <div className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 overflow-visible -mt-[calc(min(1120px,100cqw)*0.5625*0.48)] lg:max-[1200px]:-mt-[calc(min(1120px,100cqw)*0.5625*0.44)]">
              <div className="mx-auto w-full max-w-[1280px]">
                <div className="flex w-full justify-end md:translate-x-6 lg:translate-x-12 xl:translate-x-35">
                  <div className="relative aspect-[897.52/586.59] w-screen md:w-[92vw] lg:w-[min(1280px,100cqw)] xl:w-[1280px]">
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

          {textContent && (
            <>
              {/* Mobile: simple left-aligned stack (< md) */}
              <div className="relative mt-8 w-full px-4 md:hidden">
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
              <div className="relative mt-10 hidden w-full lg:-mt-26 md:block md:px-10">
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
