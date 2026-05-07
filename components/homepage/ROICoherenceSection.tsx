import Image from "next/image";
import { urlFor } from "@/lib/sanity.image";
import type { HomePage } from "@/lib/sanity.types";

interface ROICoherenceSectionProps {
  roiOfCoherence: HomePage["roiOfCoherence"];
}

export default function ROICoherenceSection({
  roiOfCoherence,
}: ROICoherenceSectionProps) {
  if (!roiOfCoherence) return null;

  return (
    <section className="w-screen ml-[calc(50%-50vw)] min-h-[600px] md:min-h-[1048px] relative overflow-hidden rounded-3xl md:px-10 lg:px-20 md:pt-[100px] lg:pt-[220px] pb-[133px] md:pb-0">
      {roiOfCoherence.backgroundImage?.asset?.url && (
        <>
          {/* Desktop/tablet: full-bleed bg */}
          <div className="absolute inset-0 z-0 hidden md:block">
            <Image
              src={urlFor(roiOfCoherence.backgroundImage).url()}
              alt=""
              fill
              className="object-cover object-center scale-125 md:scale-100"
              sizes="100vw"
            />
          </div>

          {/* Mobile: fixed-size bg, truly centered even if larger than viewport */}
          <div className="absolute left-1/2 top-[-2%] -translate-x-1/2 z-0 w-[520px] h-[520px] md:hidden pointer-events-none">
            <Image
              src={urlFor(roiOfCoherence.backgroundImage).url()}
              alt=""
              fill
              className="object-cover object-center scale-125"
              sizes="520px"
            />
          </div>
        </>
      )}
      <div className="relative z-10 min-h-[600px] md:min-h-[1048px] flex flex-col justify-start pt-12 md:pt-10 lg:pt-52">
        {roiOfCoherence.heading && (
          <h2 className="py-[140px] md:py-0 px-5 md:px-0 text-[#F6F6F6] font-pp-neue-corp-wide text-[32px] sm:text-[34px] md:text-[40px] font-medium leading-[1.1] md:leading-[1.2] tracking-[-0.8px] text-center mb-10 sm:mb-12 md:mb-20 max-w-[240px] mx-auto sm:max-w-full">
            {roiOfCoherence.heading}
          </h2>
        )}
        {roiOfCoherence.cards && roiOfCoherence.cards.length > 0 && (
          <div className="flex flex-wrap justify-center md:justify-center xl:flex-nowrap xl:justify-start 2xl:justify-center gap-10 md:gap-14 xl:gap-4 overflow-visible xl:overflow-x-auto xl:overflow-y-visible xl:scrollbar-hide pt-[40px] px-5 md:px-0">
            {roiOfCoherence.cards.map((card, idx) => (
              <div
                key={idx}
                className="flex flex-col shrink-0 rounded-2xl bg-[#141414] p-6 w-[270px] h-[280px] overflow-visible"
              >
                {card.image?.asset?.url && (
                  <div className="w-full mb-3 mt-[-100px] overflow-visible">
                    <div className="relative w-[180px] h-[200px] mx-auto">
                      <Image
                        src={urlFor(card.image).url()}
                        alt={card.heading || ""}
                        fill
                        className="object-contain"
                        sizes="140px"
                      />
                    </div>
                  </div>
                )}
                {card.heading && (
                  <h3 className="text-[#FFF] font-pp-neue-corp-wide text-base font-light leading-[1.2] tracking-[0.6px] uppercase mb-2">
                    {card.heading}
                  </h3>
                )}
                {card.description && (
                  <p className="font-pp-neue-corp text-white/90 font-extralight text-base leading-[145%]">
                    {card.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
