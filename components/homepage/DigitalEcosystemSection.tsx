import Image from "next/image";
import { urlFor } from "@/lib/sanity.image";
import type { HomePage } from "@/lib/sanity.types";

interface DigitalEcosystemSectionProps {
  digitalEcosystem: HomePage["digitalEcosystem"];
}

export default function DigitalEcosystemSection({
  digitalEcosystem,
}: DigitalEcosystemSectionProps) {
  if (!digitalEcosystem) return null;

  return (
    <section className="w-full mt-[100px] relative min-h-[600px] md:min-h-[832px] overflow-hidden">
      {digitalEcosystem.backgroundImage?.asset?.url && (
        <div className="absolute inset-0 z-0">
          <Image
            src={urlFor(digitalEcosystem.backgroundImage).url()}
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
      )}
      <div className="relative z-10 mt-[60px] md:mt-[112px] p-5">
        {/* Main Heading */}
        {digitalEcosystem.mainHeading && (
          <h2 className="max-w-[580px] mx-auto font-pp-neue-corp-extended text-[#F5FAF8] text-center text-[40px] font-medium leading-[1.2] tracking-[0.8px] uppercase">
            {digitalEcosystem.mainHeading}
          </h2>
        )}

        {/* Categories Row: BRAND | EXPERIENCE | ENGINEERING */}
        {digitalEcosystem.categories &&
          digitalEcosystem.categories.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 mb-16 md:mb-24 max-w-[900px] mx-auto mt-11">
              {digitalEcosystem.categories.map((cat, i) => (
                <div
                  key={i}
                  className={
                    i === 0
                      ? "text-left"
                      : i === 1
                        ? "text-center"
                        : "text-right"
                  }
                >
                  {cat.title && (
                    <h3
                      className="font-pp-neue-corp-extended text-[20px] font-medium leading-[120%] tracking-[0.4px] uppercase"
                      style={
                        i === 0
                          ? { color: "#F5FAF8" }
                          : { color: "rgba(245, 250, 248, 0.2)" }
                      }
                    >
                      {cat.title}
                    </h3>
                  )}
                  {cat.description && (
                    <p className="mt-5 font-pp-neue-corp text-[#FFF] text-[16px] font-medium leading-[120%] tracking-[0.32px] max-w-[230px]">
                      {cat.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

        {/* Service Labels: positioned lower-left, mid-right, lower-right */}
        {digitalEcosystem.services && digitalEcosystem.services.length > 0 && (
          <div className="relative min-h-[200px] md:min-h-[260px]">
            {digitalEcosystem.services[0]?.name && (
              <div className="absolute left-0 bottom-0 md:left-[8%] md:bottom-[54%]">
                <span className="font-pp-neue-corp text-white text-base md:text-[18px] font-medium">
                  {digitalEcosystem.services[0].name}
                </span>
              </div>
            )}
            {digitalEcosystem.services[1]?.name && (
              <div className="absolute right-0 top-1/2 -translate-y-1/2 md:top-[0%] md:right-[11%]">
                <span className="font-pp-neue-corp text-white text-base md:text-[18px] font-medium">
                  {digitalEcosystem.services[1].name}
                </span>
              </div>
            )}
            {digitalEcosystem.services[2]?.name && (
              <div className="absolute right-0 bottom-0 md:right-[16%] md:bottom-[0%]">
                <span className="font-pp-neue-corp text-white text-base md:text-[18px] font-medium">
                  {digitalEcosystem.services[2].name}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

