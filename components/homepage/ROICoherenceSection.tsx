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
    <section className="w-full  min-h-[600px] md:min-h-[1048px] mt-[100px] md:mt-[215px] relative overflow-hidden rounded-3xl">
      {roiOfCoherence.backgroundImage?.asset?.url && (
        <div className="absolute inset-0 z-0">
          <Image
            src={urlFor(roiOfCoherence.backgroundImage).url()}
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
      )}
      <div className="relative z-10 min-h-[600px] md:min-h-[1048px] px-6 py-12 sm:px-10 md:px-16 lg:px-20 flex flex-col justify-center pt-[100px]">
        {roiOfCoherence.heading && (
          <h2 className="text-[#F6F6F6] font-pp-neue-corp-wide text-[40px] font-medium leading-[1.2] tracking-[-0.8px] text-center mb-28 md:mb-34">
            {roiOfCoherence.heading}
          </h2>
        )}
        {roiOfCoherence.cards && roiOfCoherence.cards.length > 0 && (
          <div className="flex flex-row xl:justify-center gap-4 overflow-x-scroll overflow-y-visible scrollbar-hide pt-[100px] -mt-[100px]">
            {roiOfCoherence.cards.map((card, idx) => (
              <div
                key={idx}
                className="flex flex-col shrink-0 rounded-2xl bg-[#141414] p-6 w-[260px] h-[280px] overflow-visible"
              >
                {card.image?.asset?.url && (
                  <div className="w-full mb-10 mt-[-64px] overflow-visible">
                    <div className="relative w-[140px] h-[150px] mx-auto">
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
                  <h3 className="text-[#FFF] font-pp-neue-corp-wide text-[16px] font-medium leading-[1.5] uppercase mb-2">
                    {card.heading}
                  </h3>
                )}
                {card.description && (
                  <p className="font-pp-neue-corp text-white/90 text-[14px] leading-[120%]">
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

