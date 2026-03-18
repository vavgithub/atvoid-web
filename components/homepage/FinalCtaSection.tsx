import Link from "next/link";
import type { HomePage } from "@/lib/sanity.types";

interface FinalCtaSectionProps {
  finalCta: HomePage["finalCta"];
}

export default function FinalCtaSection({ finalCta }: FinalCtaSectionProps) {
  if (!finalCta) return null;

  return (
    <section className="w-full mt-[100px] md:mt-[215px]">
      <div className="">
        {/* Left: Heading */}
        <div className="max-w-[380px]">
          {finalCta.heading && (
            <h2 className="text-[#F6F6F6] font-pp-neue-corp-wide text-[24px] md:text-[40px] font-medium leading-[120%] tracking-[-0.8px] uppercase">
              {finalCta.heading}
            </h2>
          )}
        </div>

        {/* Middle: Subheading + description + button (button aligned to bottom) */}
        <div className="flex items-end justify-end gap-10 mt-10 md:mt-[-100px]">
          <div className="max-w-[380px]">
            {finalCta.subheading && (
              <h3 className="text-[#F6F6F6] font-pp-neue-corp text-[18px] md:text-[24px] font-medium leading-[120%] tracking-[-0.8px] uppercase">
                {finalCta.subheading}
              </h3>
            )}
            {finalCta.description && (
              <p className="mt-4 text-[#F6F6F6] font-pp-neue-corp text-[16px] font-medium leading-[120%] tracking-[0.32px]">
                {finalCta.description}
              </p>
            )}
          </div>

          {/* Push CTA to bottom on desktop */}
          <div className="mt-8 lg:mt-auto flex lg:justify-end">
            {finalCta.discoveryCall?.href ? (
              <Link
                href={finalCta.discoveryCall.href}
                className="group relative flex h-32 w-32 md:h-[260px] md:w-[260px] shrink-0 items-center justify-center rounded-full border border-white/10 bg-black transition-transform hover:scale-105"
              >
                {/* Center arrow */}
                <span className="text-4xl md:text-7xl text-white transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
                  ↗
                </span>

                {/* Rotating circular text */}
                <div className="absolute inset-0">
                  <svg viewBox="0 0 100 100" className="h-full w-full">
                    <defs>
                      <path
                        id="finalCtaCirclePath"
                        d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                      />
                    </defs>
                    <text>
                      <textPath
                        xlinkHref="#finalCtaCirclePath"
                        className="fill-[rgb(118,255,200)] text-[11.8px] font-bold uppercase tracking-widest"
                      >
                        {finalCta.discoveryCall.label && (
                          <>
                            {finalCta.discoveryCall.label}
                            <tspan className="fill-white text-[20px]"> •</tspan>
                          </>
                        )}
                      </textPath>
                    </text>
                  </svg>
                </div>
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}


