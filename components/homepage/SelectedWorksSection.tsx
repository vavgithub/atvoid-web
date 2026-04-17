import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/lib/sanity.image";
import type { HomePage } from "@/lib/sanity.types";
import { ArrowUpRight } from "lucide-react";

interface SelectedWorksSectionProps {
  selectedWorks: HomePage["selectedWorks"];
}

export default function SelectedWorksSection({
  selectedWorks,
}: SelectedWorksSectionProps) {
  if (!selectedWorks) return null;

  return (
    <section className="relative z-10 -mr-5 mt-[100px] w-full md:-mr-10 md:mt-[282px] lg:-mr-20">
      {/* Header: Heading + CTA - Aligned with Container */}
      <div className="w-full mx-auto max-w-[1280px]">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
          {selectedWorks.heading && (
            <h2 className="text-[#F6F6F6] font-pp-neue-corp-wide text-[30px] md:text-[60px] font-medium md:leading-[0.9] uppercase">
              {selectedWorks.heading}
            </h2>
          )}
        </div>
      </div>

      {/* Cards: 1 col mobile, 3 cols desktop - Full Width to Right Edge */}
      {selectedWorks.cards && selectedWorks.cards.length > 0 && (
        <div className="relative z-10 mt-8 w-screen max-w-[100vw] ml-[calc(50%-50vw)] overflow-x-auto overscroll-x-contain scrollbar-hide pl-5 pr-3 md:mt-12 md:pl-10 md:pr-5 lg:pl-20 lg:pr-8">
          <div className="flex w-max flex-row gap-10">
            {selectedWorks.cards.map((card, idx) => {
              const cardContent = (
                <>
                  {/* Card image */}
                  {card.image?.asset?.url ? (
                    <div className="relative h-[280px] w-full max-w-full overflow-hidden rounded-[24px] md:h-[488px]">
                      <Image
                        src={urlFor(card.image).url()}
                        alt={card.title || ""}
                        fill
                        className="object-contain rounded-[24px]"
                        sizes="(max-width: 767px) calc(100vw - 3rem), 799px"
                      />
                    </div>
                  ) : (
                    <div className="h-[280px] w-full rounded-[24px] border border-white/10 bg-white/5 md:h-[488px]" />
                  )}

                  {/* Title + Arrow */}
                  <div className="flex items-center justify-between -mt-6">
                    {card.title && (
                      <h3 className="text-[#F6F6F6] font-pp-neue-corp-wide text-[32px] font-medium leading-[1.2] tracking-[0.6px]">
                        {card.title}
                      </h3>
                    )}
                    <ArrowUpRight
                      className="size-16 shrink-0 md:size-28 text-[#F6F6F6] hover:text-[#73F8C3]"
                      strokeWidth={0.7}
                      aria-hidden
                    />
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
                                className="text-[#070708] text-center font-pp-neue-corp text-[12px] font-medium leading-[1.2] tracking-[0.24px] px-2 py-0.5 rounded-full uppercase"
                                style={{
                                  backgroundColor:
                                    tag.color || "rgba(255,255,255,0.2)",
                                }}
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
                  className="flex w-[min(799px,calc(100vw-3rem))] shrink-0 flex-col md:w-[799px]"
                >
                  {cardContent}
                </Link>
              ) : (
                <div
                  key={idx}
                  className="flex w-[min(799px,calc(100vw-3rem))] shrink-0 flex-col md:w-[799px]"
                >
                  {cardContent}
                </div>
              );
            })}
            {/* Scroll tail: widens scrollWidth so the last card can sit off the viewport edge; not part of any card */}
            <div
              className="pointer-events-none shrink-0 select-none"
              style={{ flex: "0 0 clamp(0.75rem, 2.5vw, 1.5rem)" }}
              aria-hidden
            />
          </div>
        </div>
      )}
    </section>
  );
}
