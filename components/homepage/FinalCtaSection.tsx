"use client";

import Image from "next/image";
import { urlFor } from "@/lib/sanity.image";
import type { HomePage } from "@/lib/sanity.types";

interface FinalCtaSectionProps {
  finalCta: HomePage["finalCta"];
}

const DEFAULT_DISCOVERY_CALL_HREF = "https://www.atvoid.com/enquiry";

export default function FinalCtaSection({ finalCta }: FinalCtaSectionProps) {
  if (!finalCta) return null;

  return (
      <section className="w-full ">
      <div className="flex flex-col lg:h-76.25 lg:flex-row lg:items-end">
        <div className="max-w-[380px] md:max-w-full lg:max-w-95 lg:self-start lg:text-left">
          {finalCta.heading && (
            <h2 className="text-[#F6F6F6] font-pp-neue-corp-wide text-[24px] md:text-[40px] font-medium leading-[120%] tracking-[-0.8px] uppercase">
              {finalCta.heading}
            </h2>
          )}
        </div>

        <div className="max-w-[380px] md:max-w-full lg:max-w-95 text-left lg:pb-4">
          {finalCta.subheading && (
            <h3 className="text-[#F6F6F6] font-pp-neue-corp text-[18px] md:text-[24px] font-medium leading-[120%] tracking-[-0.8px] uppercase">
              {finalCta.subheading}
            </h3>
          )}
          {finalCta.description && (
            <p className="mt-6 max-w-[315px] md:max-w-full lg:max-w-78.75 text-[#F6F6F6] font-pp-neue-corp text-[16px] font-medium not-italic leading-[145%] tracking-[0.32px]">
              {finalCta.description}
            </p>
          )}
        </div>

        <div className="mt-8 flex lg:ml-auto lg:mt-0 lg:shrink-0 lg:justify-end lg:pb-4">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event("open-contact-form"))}
            className="group relative flex h-32 w-32 md:h-[230px] md:w-[230px] shrink-0 items-center justify-center rounded-full bg-black transition-transform hover:scale-105"
          >
            {finalCta.image?.asset?.url ? (
              <div className="pointer-events-none absolute inset-0">
                <Image
                  src={urlFor(finalCta.image).url()}
                  alt=""
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 128px, 230px"
                />
              </div>
            ) : null}
          </button>
        </div>
      </div>
    </section>
  );
}


