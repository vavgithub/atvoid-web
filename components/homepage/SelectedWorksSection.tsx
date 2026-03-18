import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/lib/sanity.image";
import type { HomePage } from "@/lib/sanity.types";

interface SelectedWorksSectionProps {
  selectedWorks: HomePage["selectedWorks"];
}

export default function SelectedWorksSection({
  selectedWorks,
}: SelectedWorksSectionProps) {
  if (!selectedWorks) return null;

  return (
    <section className="relative w-full mt-[100px] md:mt-[215px] -mr-5 md:-mr-10 lg:-mr-20 z-10">
      {/* Header: Heading + CTA - Aligned with Container */}
      <div className="w-full mx-auto max-w-[1280px]">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
          {selectedWorks.heading && (
            <h2 className="text-[#F6F6F6] font-pp-neue-corp-wide text-[30px] md:text-[60px] font-medium md:leading-[0.9] uppercase">
              {selectedWorks.heading}
            </h2>
          )}
          {selectedWorks.cta?.href && (
            <div className="btn-gradient py-3 px-5 sm:py-2 sm:px-6 rounded-[32px] shrink-0 inline-block w-fit">
              <Link
                href={selectedWorks.cta.href}
                className="text-[#0A0A0A] font-pp-neue-corp text-[14px] md:text-base font-medium leading-none capitalize "
              >
                {selectedWorks.cta.label || "View Our Portfolio"}
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Cards: 1 col mobile, 3 cols desktop - Full Width to Right Edge */}
      {selectedWorks.cards && selectedWorks.cards.length > 0 && (
        <div className="relative mt-8 md:mt-12 w-screen overflow-x-auto scrollbar-hide z-10 -ml-5 md:-ml-10 lg:-ml-20 pl-6 md:pl-10 xl:pl-20 2xl:pl-0">
          <div className="w-full px-5 max-w-[1280px]">
            <div className="flex gap-10 flex-row pr-5 md:pr-10 lg:pr-20" style={{ paddingRight: 'max(1.25rem, calc((100vw - 1280px) / 2 + 5rem))' }}>
            {selectedWorks.cards.map((card, idx) => {
            const cardContent = (
              <>
                {/* Card image */}
                {card.image?.asset?.url ? (
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-white/5">
                    <Image
                      src={urlFor(card.image).url()}
                      alt={card.title || ""}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 544px"
                    />
                  </div>
                ) : (
                  <div className="w-full aspect-[4/3] rounded-2xl border border-white/10 bg-white/5" />
                )}

                {/* Title + Arrow */}
                <div className="mt-4 flex items-center justify-between mt-8">
                  {card.title && (
                    <h3 className="text-[#F6F6F6] font-pp-neue-corp-wide text-[32px] font-medium leading-[1.2] tracking-[0.6px]">
                      {card.title}
                    </h3>
                  )}
                  <div className="relative w-16 h-16 md:w-28 md:h-28 shrink-0">
                    <Image
                      src="/images/arrow.svg"
                      alt=""
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 64px, 112px"
                      aria-hidden
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  {/* Top row: Client (left) + Scope (right) */}
                  <div className="flex flex-row flex-wrap items-start justify-between gap-6">
                    {/* Client */}
                    {card.client && (
                      <div>
                        <p className="text-[#757575] font-pp-neue-corp text-[12px] font-medium leading-[1.2] tracking-[0.24px]">
                          Client:
                        </p>
                        <p className="text-[#F6F6F6] font-pp-neue-corp text-[16px] font-medium leading-[1.2] tracking-[0.32px] mt-0.5">
                          {card.client}
                        </p>
                      </div>
                    )}

                    {/* Scope + Tags */}
                    {card.scopeTags && card.scopeTags.length > 0 && (
                      <div>
                        <p className="text-[#757575] font-pp-neue-corp text-[12px] font-medium leading-[1.2] tracking-[0.24px]">
                          Scope:
                        </p>
                        <div className="flex flex-wrap items-center gap-2 mt-0.5">
                          {card.scopeTags.map((tag, ti) => (
                            <span
                              key={ti}
                              className={`text-[#070708] text-center font-pp-neue-corp text-[12px] font-medium leading-[1.2] tracking-[0.24px] px-2 py-0.5 rounded-full capitalize ${
                                tag.color === "blue"
                                  ? "bg-[#58BAD7]"
                                  : tag.color === "green"
                                    ? "bg-[#73F8C3] text-[#0A0A0A]"
                                    : tag.color === "red"
                                      ? "bg-[#FE646F]"
                                      : "bg-white/20"
                              }`}
                            >
                              {tag.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Narrative: full width below, index on same line right */}
                  {(card.narrative || card.index) && (
                    <div className="mt-5">
                      <p className="text-[#757575] font-pp-neue-corp text-[12px] font-medium leading-[1.2] tracking-[0.24px]">
                        Narrative:
                      </p>
                      <div className="flex flex-row items-baseline justify-between gap-2 mt-0.5">
                        {card.narrative && (
                          <p className="text-[#F6F6F6] font-pp-neue-corp text-[16px] font-medium leading-[1.2] tracking-[0.32px]">
                            {card.narrative}
                          </p>
                        )}
                        {card.index && (
                          <span className="text-[#F6F6F6] font-pp-neue-corp text-[16px] font-medium leading-[1.2] tracking-[0.32px] shrink-0">
                            {card.index}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </>
            );
            return card.href ? (
              <Link
                key={idx}
                href={card.href}
                className="flex flex-col shrink-0 w-full md:w-[544px]"
              >
                {cardContent}
              </Link>
            ) : (
              <div
                key={idx}
                className="flex flex-col shrink-0 w-full md:w-[544px]"
              >
                {cardContent}
              </div>
            );
          })}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

