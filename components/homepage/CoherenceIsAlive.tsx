import Image from "next/image";
import { urlFor } from "@/lib/sanity.image";
import type { HomePage } from "@/lib/sanity.types";

interface CoherenceIsAliveProps {
  coherenceIsAlive: HomePage["coherenceIsAlive"];
}

const marqueeStyle = `
  @keyframes coherence-marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
`;

/**
 * Label centers derived from Figma node 2354:2400 (inset → center %).
 * Order matches the arc left→right; pair CMS items index with slot index.
 */
const BASE_ITEM_SLOTS: { left: number; top: number; color: string }[] = [
  { left: 15.93, top: 51.0, color: "#f95d79" }, // Strategy & Positioning
  { left: 18.91, top: 37, color: "#f45584" }, // Visual Identity Systems
  { left: 25.97, top: 24.0, color: "#ef4e8e" }, // Marketing Collateral
  { left: 36.93, top: 18.5, color: "#6459eb" }, // UI/UX Design
  { left: 50.0, top: 15.5, color: "#6079e4" }, // 3D & Motion Graphics
  { left: 63.07, top: 18.5, color: "#5c9ade" }, // Prototyping
  { left: 74.1, top: 24.0, color: "#96eeb8" }, // Full-Stack Dev
  { left: 81.45, top: 37.0, color: "#b9e4ae" }, // Mobile Apps
  { left: 83.6, top: 51.0, color: "#fed198" }, // AI & LLM Integration
];

/**
 * Increase spacing by scaling points away from a pivot.
 * Tweak `GAP_SCALE` to adjust how “spread out” the semicircle is.
 */
const GAP_PIVOT = { x: 50, y: 34 };
// Oval spacing control: scale Y more than X to avoid a perfect semicircle.
// Higher X = wider horizontal spread between icons along the arc.
const GAP_SCALE_X = 1.22;
const GAP_SCALE_Y = 1.6;

const ITEM_SLOTS: { left: string; top: string; color: string }[] =
  BASE_ITEM_SLOTS.map((s) => {
    const left = GAP_PIVOT.x + (s.left - GAP_PIVOT.x) * GAP_SCALE_X;
    const top = GAP_PIVOT.y + (s.top - GAP_PIVOT.y) * GAP_SCALE_Y;
    return {
      left: `${left.toFixed(2)}%`,
      top: `${top.toFixed(2)}%`,
      color: s.color,
    };
  });

export default function CoherenceIsAlive({
  coherenceIsAlive,
}: CoherenceIsAliveProps) {
  if (!coherenceIsAlive) return null;

  const hasImage = Boolean(coherenceIsAlive.image?.asset?.url);
  const hasSubline = Boolean(coherenceIsAlive.subline);
  const hasHeadline = Boolean(coherenceIsAlive.headline);
  const hasLine1 = Boolean(coherenceIsAlive.line1);

  const showCenterBlock = hasSubline || hasHeadline || hasLine1;

  const itemsWithLabels = Array.isArray(coherenceIsAlive.items)
    ? coherenceIsAlive.items
        .map((it, idx) => ({ it, idx }))
        .filter(({ it }) => Boolean(it?.label))
    : [];

  return (
    <section className="relative mt-20 lg:mt-[150px] ml-[calc(50%-50vw)] w-screen lg:ml-auto lg:w-full lg:max-w-[1280px] overflow-hidden rounded-[24px] lg:rounded-none">
      <style dangerouslySetInnerHTML={{ __html: marqueeStyle }} />
      <div className="relative flex flex-col items-center px-4 py-16 lg:block lg:h-[852px] lg:w-full lg:p-0">
        {/* Background image from Sanity (disabled for now) */}
        {/* {hasImage && coherenceIsAlive.image && (
          <div className="pointer-events-none absolute inset-0 z-0 select-none">
            <Image
              src={urlFor(coherenceIsAlive.image).url()}
              alt=""
              fill
              className="object-cover object-bottom md:object-[center_58%]"
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
          </div>
        )} */}

        {/* Bottom orbit: show only top half; rotate endlessly */}
        <div
          className="pointer-events-none absolute bottom-0  left-1/2 z-[1] w-[520px] -translate-x-1/2 overflow-hidden h-[260px] lg:w-[920px] lg:h-[460px] select-none"
          aria-hidden
        >
          <div className="relative h-[520px] w-[520px] lg:h-[960px] lg:w-[960px] motion-safe:[animation:spin_70s_linear_infinite] motion-reduce:animate-none">
            <Image
              src="/images/coherence-is-alive/orbit-rays.svg"
              alt=""
              fill
              sizes="(max-width: 768px) 520px, 1040px"
              className="object-contain object-top"
              priority
            />
          </div>
        </div>


        {/* Mobile: auto-looping icon marquee (desktop unchanged) */}
        {itemsWithLabels.length > 0 && (
          <div className="relative z-30 w-screen max-w-[100vw] ml-[calc(50%-50vw)] overflow-hidden pb-[65px] lg:hidden">
            <div
              className="flex w-[200%]"
              style={{
                animation: "coherence-marquee 18s linear infinite",
              }}
            >
              {[...itemsWithLabels, ...itemsWithLabels].map(
                ({ it, idx }, i) => {
                  const slot = ITEM_SLOTS[idx] ?? { color: "#f6f6f6" };
                  const itemImageUrl = it?.image?.asset?.url
                    ? urlFor(it.image).url()
                    : null;

                  return (
                    <div
                      key={`${it?.label ?? "item"}-${idx}-${i}`}
                      className="flex w-[140px] shrink-0 flex-col items-center justify-start gap-2 px-4"
                    >
                      <div className="relative h-12 w-12 shrink-0">
                        {itemImageUrl && it?.image ? (
                          <Image
                            src={itemImageUrl}
                            alt={it.label ?? ""}
                            fill
                            className="object-contain"
                            sizes="48px"
                          />
                        ) : (
                          <span
                            className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full"
                            style={{ backgroundColor: slot.color }}
                            aria-hidden
                          />
                        )}
                      </div>
                      <p
                        className="text-center font-pp-neue-corp text-[13px] font-medium leading-[1.2] tracking-[0.32px]"
                        style={{ color: slot.color }}
                      >
                        {it?.label}
                      </p>
                    </div>
                  );
                },
              )}
            </div>
          </div>
        )}

        {showCenterBlock && (
          <div className="relative z-20 flex w-full flex-col items-center text-center lg:absolute lg:left-1/2 lg:top-[49%] lg:w-[min(100%,520px)] lg:-translate-x-1/2 lg:-translate-y-1/2">
            {hasSubline && (
              <p className="font-pp-neue-corp mb-2 text-[16px] font-medium uppercase leading-normal tracking-normal text-[#43454d] lg:text-[24px]">
                {coherenceIsAlive.subline}
              </p>
            )}
            {hasHeadline && (
              <h2 className="font-pp-neue-corp-wide text-[32px] font-medium uppercase leading-[1.2] tracking-[-0.8px] text-[#f6f6f6] lg:text-[40px]">
                {coherenceIsAlive.headline}
              </h2>
            )}
            {hasLine1 && (
              <p
                className="font-pp-neue-corp mt-5 text-[12px] md:text-[14px] font-medium leading-[145%] tracking-[0.32px] text-white lg:mt-[37px] lg:text-[16px] pb-6 lg:pb-0"
                style={{ letterSpacing: "0.32px" }}
              >
                {coherenceIsAlive.line1}
              </p>
            )}
          </div>
        )}

        {Array.isArray(coherenceIsAlive.items) &&
          coherenceIsAlive.items.some((it) => it?.label) && (
            <div className="relative z-10 mt-16 hidden lg:absolute lg:inset-0 lg:mt-0 lg:block lg:translate-y-[16%]">
              {ITEM_SLOTS.map((slot, idx) => {
                const item = coherenceIsAlive.items?.[idx];
                if (!item?.label) return null;

                const itemImageUrl = item.image?.asset?.url
                  ? urlFor(item.image).url()
                  : null;

                const isLastItem = idx === 8;

                return (
                  <div
                    key={`${item.label}-${idx}`}
                    className={`relative flex flex-col items-center gap-2 lg:absolute lg:-translate-x-1/2 lg:-translate-y-1/2 lg:gap-2.5 lg:left-[var(--md-left)] lg:top-[var(--md-top)] ${
                      isLastItem ? "col-span-2" : ""
                    }`}
                    style={
                      {
                        "--md-left": slot.left,
                        "--md-top": slot.top,
                      } as React.CSSProperties
                    }
                  >
                    <div className="relative h-12 w-12 shrink-0 lg:h-[47px] lg:w-[47px]">
                      {itemImageUrl && item.image ? (
                        <Image
                          src={itemImageUrl}
                          alt={item.label ?? ""}
                          fill
                          className="object-contain"
                          sizes="45px"
                        />
                      ) : (
                        <span
                          className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full lg:h-3 lg:w-3"
                          style={{ backgroundColor: slot.color }}
                          aria-hidden
                        />
                      )}
                    </div>
                    <p
                      className="px-2 text-center font-pp-neue-corp text-[13px] font-medium leading-[1.45] tracking-[0.32px] lg:max-w-[140px] lg:px-0 lg:text-[16px]"
                      style={{ color: slot.color }}
                    >
                      {item.label}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
      </div>
    </section>
  );
}
