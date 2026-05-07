import Link from "next/link";
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
      <div className="flex flex-col md:h-[305px] md:flex-row md:items-end">
        <div className="max-w-[380px] md:self-start md:text-left">
          {finalCta.heading && (
            <h2 className="text-[#F6F6F6] font-pp-neue-corp-wide text-[24px] md:text-[40px] font-medium leading-[120%] tracking-[-0.8px] uppercase">
              {finalCta.heading}
            </h2>
          )}
        </div>

        <div className="max-w-[380px] text-left md:pb-4">
          {finalCta.subheading && (
            <h3 className="text-[#F6F6F6] font-pp-neue-corp text-[18px] md:text-[24px] font-medium leading-[120%] tracking-[-0.8px] uppercase">
              {finalCta.subheading}
            </h3>
          )}
          {finalCta.description && (
            <p className="mt-6 max-w-[315px] text-[#F6F6F6] font-pp-neue-corp text-[16px] font-medium not-italic leading-[145%] tracking-[0.32px]">
              {finalCta.description}
            </p>
          )}
        </div>

        <div className="mt-8 flex md:ml-auto md:mt-0 md:shrink-0 md:justify-end md:pb-4">
          <Link
            href={DEFAULT_DISCOVERY_CALL_HREF}
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
          </Link>
        </div>
      </div>
    </section>
  );
}


