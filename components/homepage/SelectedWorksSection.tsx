"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { urlFor } from "@/lib/sanity.image";
import type { HomePage } from "@/lib/sanity.types";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

interface SelectedWorksSectionProps {
  selectedWorks: HomePage["selectedWorks"];
}

export default function SelectedWorksSection({
  selectedWorks,
}: SelectedWorksSectionProps) {
  if (!selectedWorks) return null;

  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedNarratives, setExpandedNarratives] = useState<Set<number>>(new Set());
  const programmaticRef = useRef(false);
  const programmaticTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const swipeTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const totalCards = selectedWorks?.cards?.length ?? 0;
  const canScrollLeft = activeIndex > 0;
  const canScrollRight = activeIndex < totalCards - 1;

  const toggleNarrative = (idx: number) => {
    setExpandedNarratives(prev => {
      const next = new Set(prev);
      next.has(idx) ? next.delete(idx) : next.add(idx);
      return next;
    });
  };

  const scrollToIndex = (index: number) => {
    const el = scrollRef.current;
    if (!el || index < 0 || index >= totalCards) return;
    const cards = Array.from(el.querySelectorAll<HTMLElement>("[data-card]"));
    const card = cards[index];
    if (!card) return;
    const elRect = el.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const cardLeft = el.scrollLeft + cardRect.left - elRect.left;
    const targetLeft = cardLeft - (el.clientWidth - cardRect.width) / 2;
    programmaticRef.current = true;
    clearTimeout(programmaticTimerRef.current);
    programmaticTimerRef.current = setTimeout(() => { programmaticRef.current = false; }, 600);
    el.scrollTo({ left: Math.max(0, targetLeft), behavior: "smooth" });
    setActiveIndex(index);
  };

  const scroll = (dir: "left" | "right") => {
    scrollToIndex(dir === "right" ? activeIndex + 1 : activeIndex - 1);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      if (programmaticRef.current) return;
      clearTimeout(swipeTimerRef.current);
      swipeTimerRef.current = setTimeout(() => {
        const elRect = el.getBoundingClientRect();
        const viewCenter = el.clientWidth / 2;
        const cards = Array.from(el.querySelectorAll<HTMLElement>("[data-card]"));
        let minDist = Infinity;
        let closestIdx = 0;
        cards.forEach((card, i) => {
          const cardRect = card.getBoundingClientRect();
          const cardCenter = cardRect.left - elRect.left + cardRect.width / 2;
          const dist = Math.abs(cardCenter - viewCenter);
          if (dist < minDist) { minDist = dist; closestIdx = i; }
        });
        setActiveIndex(closestIdx);
      }, 100);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      clearTimeout(swipeTimerRef.current);
      clearTimeout(programmaticTimerRef.current);
    };
  }, []);

  return (
    <section className="relative z-10 -mr-5 mt-[100px] w-full md:-mr-10 md:mt-[282px] lg:-mr-20">

      {/* Heading — aligned with page content */}
      <div>
        {selectedWorks.heading && (
          <h2 className="text-[#F6F6F6] font-pp-neue-corp-extended text-[32px] md:text-[60px] font-medium leading-[1.2] md:leading-[0.9] uppercase">
            {selectedWorks.heading}
          </h2>
        )}
      </div>

      {/* Scroll container + edge chevrons */}
      {selectedWorks.cards && selectedWorks.cards.length > 0 && (
        <div className="relative mt-[44px]">
          {/* Left chevron */}
          <button
            type="button"
            onClick={() => scroll("left")}
            aria-label="Previous"
            disabled={!canScrollLeft}
            className="absolute left-2 top-[235px] md:top-[160px] z-20 -translate-y-1/2 flex items-center justify-center w-10 h-10 md:w-14 md:h-14 rounded-full border border-black/10 bg-white/85 text-[#070708] opacity-85 shadow-sm transition-all duration-200 cursor-pointer enabled:hover:opacity-100 enabled:hover:bg-white enabled:hover:shadow-md enabled:hover:border-black/15 disabled:opacity-25 disabled:cursor-default disabled:hover:bg-white/85 disabled:hover:opacity-25 disabled:hover:shadow-sm"
          >
            <ChevronLeft className="w-5 h-5 md:w-8 md:h-8" />
          </button>

          {/* Right chevron */}
          <button
            type="button"
            onClick={() => scroll("right")}
            aria-label="Next"
            disabled={!canScrollRight}
            className="absolute right-2 top-[235px] md:top-[160px] z-20 -translate-y-1/2 flex items-center justify-center w-10 h-10 md:w-14 md:h-14 rounded-full border border-black/10 bg-white/85 text-[#070708] opacity-85 shadow-sm transition-all duration-200 cursor-pointer enabled:hover:opacity-100 enabled:hover:bg-white enabled:hover:shadow-md enabled:hover:border-black/15 disabled:opacity-25 disabled:cursor-default disabled:hover:bg-white/85 disabled:hover:opacity-25 disabled:hover:shadow-sm"
          >
            <ChevronRight className="w-5 h-5 md:w-8 md:h-8" />
          </button>

          <div
            ref={scrollRef}
            className="w-screen max-w-[100vw] ml-[calc(50%-50vw)] overflow-x-auto overscroll-x-contain scrollbar-hide snap-x snap-mandatory scroll-smooth px-5 md:pl-10 md:pr-5 lg:pl-20 lg:pr-8"
          >
            <div className="flex w-max flex-row gap-10">
              {selectedWorks.cards.map((card, idx) => {
                const desktopSrc = card.image?.asset?.url
                  ? urlFor(card.image).url()
                  : undefined;
                const mobileSrc = card.mobileImage?.asset?.url
                  ? urlFor(card.mobileImage).width(688).url()
                  : desktopSrc;

                const cardContent = (
                  <>
                    {desktopSrc ? (
                      <div className="w-full overflow-hidden mb-[26px] aspect-[688/940] md:aspect-[799/488] md:mb-[16px]">
                        {card.mobileImage?.asset?.url && mobileSrc ? (
                          <>
                            <Image
                              src={mobileSrc}
                              alt={card.title || ""}
                              width={688}
                              height={940}
                              className="w-full h-full object-contain md:hidden"
                              sizes="344px"
                            />
                            <Image
                              src={desktopSrc}
                              alt={card.title || ""}
                              width={799}
                              height={488}
                              className="hidden md:block w-full h-full object-contain"
                              sizes="799px"
                            />
                          </>
                        ) : (
                          <Image
                            src={desktopSrc}
                            alt={card.title || ""}
                            width={799}
                            height={488}
                            className="w-full h-full object-contain"
                            sizes="(max-width: 767px) 344px, 799px"
                          />
                        )}
                      </div>
                    ) : (
                      <div className="h-[470px] max-h-[470px] w-[344px] max-w-[344px] border border-white/10 bg-white/5 mb-[26px] md:mb-[26px] md:h-[380px] md:max-h-none md:w-full md:max-w-full" />
                    )}

                    <div className="flex items-center justify-between -mt-6">
                      {card.title && (
                        <h3 className="text-[#F6F6F6] font-pp-neue-corp-wide text-[32px] font-medium leading-[1.2] tracking-[0.6px]">
                          {card.title}
                        </h3>
                      )}
                      <ArrowUpRight
                        className="size-16 shrink-0 md:size-28 text-[#F6F6F6] hover:text-[#73F8C3] opacity-0"
                        strokeWidth={0.7}
                        aria-hidden
                      />
                    </div>

                    <div className="flex flex-col gap-4 mt-4 md:mt-0">
                      <div className="flex flex-col gap-4">
                        {card.client && (
                          <div>
                            <p className="text-[#757575] font-pp-neue-corp text-[12px] font-medium leading-[145%] tracking-[0.24px]">
                              Client:
                            </p>
                            <p className="text-[#F6F6F6] font-pp-neue-corp text-[16px] font-medium leading-[145%] tracking-[0.32px] mt-0.5">
                              {card.client}
                            </p>
                          </div>
                        )}

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
                                  style={{ backgroundColor: tag.color || "rgba(255,255,255,0.2)" }}
                                >
                                  {tag.name}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {(card.narrative || card.index) && (
                        <div className="mt-5">
                          <p className="text-[#757575] font-pp-neue-corp text-[12px] font-medium leading-[145%] tracking-[0.24px]">
                            Narrative:
                          </p>
                          <div className="flex flex-row items-baseline justify-between gap-2 mt-0.5">
                            {card.narrative && (
                              <div>
                                <p className={`text-[#F6F6F6] font-pp-neue-corp text-[16px] font-medium leading-[145%] tracking-[0.32px] ${expandedNarratives.has(idx) ? "" : "line-clamp-3"} lg:line-clamp-none`}>
                                  {card.narrative}
                                </p>
                                <button
                                  type="button"
                                  onClick={(e) => { e.preventDefault(); toggleNarrative(idx); }}
                                  className="mt-1 text-[#757575] font-pp-neue-corp text-[12px] font-medium leading-[145%] tracking-[0.24px] lg:hidden"
                                >
                                  {expandedNarratives.has(idx) ? "Read less" : "Read more"}
                                </button>
                              </div>
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
                    data-card
                    className="flex w-[calc(100vw-2.5rem)] max-w-[344px] shrink-0 flex-col snap-center md:w-[560px] md:max-w-none"
                  >
                    {cardContent}
                  </Link>
                ) : (
                  <div
                    key={idx}
                    data-card
                    className="flex w-[calc(100vw-2.5rem)] max-w-[344px] shrink-0 flex-col snap-center md:w-[560px] md:max-w-none"
                  >
                    {cardContent}
                  </div>
                );
              })}
              <div
                className="pointer-events-none shrink-0 select-none"
                style={{ flex: "0 0 clamp(0.75rem, 2.5vw, 1.5rem)" }}
                aria-hidden
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
