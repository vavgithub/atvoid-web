import Image from "next/image";
import { urlFor } from "@/lib/sanity.image";
import type { HomePage } from "@/lib/sanity.types";

/** Design canvas — label % positions match this aspect box. */
const ARTBOARD_W = 1280;
const ARTBOARD_H = 832;

interface DigitalEcosystemSectionProps {
  digitalEcosystem: HomePage["digitalEcosystem"];
}

export default function DigitalEcosystemSection({
  digitalEcosystem,
}: DigitalEcosystemSectionProps) {
  if (!digitalEcosystem) return null;

  const dims = digitalEcosystem.backgroundImage?.asset?.metadata?.dimensions;
  const dw = dims?.width;
  const dh = dims?.height;
  const hasDims =
    typeof dw === "number" && typeof dh === "number" && dw > 0 && dh > 0;
  // Match the frame to the bitmap so object-cover does not crop (fixed 1280×832 was shorter than the art).
  const aspectW = hasDims ? dw : ARTBOARD_W;
  const aspectH = hasDims ? dh : ARTBOARD_H;
  const imageFitClass = hasDims
    ? "object-cover object-center"
    : "object-contain object-center";

  return (
    <section className="relative mt-20 md:mt-[100px] w-full max-w-[1280px] mx-auto overflow-hidden rounded-[24px] md:rounded-none">
      <style>{`
        @media (min-width: 768px) {
          .ecosystem-canvas {
            aspect-ratio: ${aspectW} / ${aspectH};
          }
        }
      `}</style>
      <div className="ecosystem-canvas relative w-full flex flex-col items-center justify-center px-4 py-16 md:block md:p-0 md:bg-transparent bg-[#070708] min-h-[600px] md:min-h-0">
        {digitalEcosystem.backgroundImage?.asset?.url && (
          <div className="absolute inset-0 z-0 bg-[#070708]">
            <Image
              src={urlFor(digitalEcosystem.backgroundImage).url()}
              alt=""
              fill
              className={imageFitClass}
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
          </div>
        )}

        <div className="relative z-10 flex w-full flex-col items-center gap-10 md:static md:block md:w-auto">
          {digitalEcosystem.mainHeading && (
            <h2 className="w-full text-center font-pp-neue-corp-extended text-[28px] font-medium leading-[1.2] tracking-[0.8px] uppercase text-[#F5FAF8] md:absolute md:left-1/2 md:top-[10%] md:w-[min(580px,calc(100%-40px))] md:-translate-x-1/2 md:text-[40px]">
              {digitalEcosystem.mainHeading}
            </h2>
          )}

          {(digitalEcosystem.subheading?.line1 ||
            digitalEcosystem.subheading?.line2) && (
            <div className="w-full max-w-[280px] rounded-md bg-black/40 px-4 py-4 text-center backdrop-blur-sm md:absolute md:left-1/2 md:top-[30%] md:w-[260px] md:-translate-x-1/2">
              {digitalEcosystem.subheading?.line1 && (
                <div className="font-pp-neue-corp-extended text-[#F5FAF8] text-[18px] md:text-xl font-medium leading-[120%] tracking-[0.4px] uppercase">
                  {digitalEcosystem.subheading.line1}
                </div>
              )}
              {digitalEcosystem.subheading?.line2 && (
                <div className="mt-2 font-pp-neue-corp text-[#FFF] text-[14px] md:text-base font-light leading-[145%] tracking-[0.32px]">
                  {digitalEcosystem.subheading.line2}
                </div>
              )}
            </div>
          )}

          {digitalEcosystem.services && digitalEcosystem.services.length > 0 && (
            <div className="mt-12 grid w-full grid-cols-2 gap-y-8 px-4 text-center md:static md:mt-0 md:block md:w-auto md:px-0 md:text-left">
              {digitalEcosystem.services[0]?.name && (
                <div className="flex flex-col items-center md:absolute md:bottom-[34%] md:left-[21%] md:block md:max-w-[110px]">
                  <span className="font-pp-neue-corp text-[15px] md:text-base font-medium text-[#F45584]">
                    {digitalEcosystem.services[0].name}
                  </span>
                </div>
              )}
              {digitalEcosystem.services[1]?.name && (
                <div className="flex flex-col items-center md:absolute md:top-[35%] md:right-[26.5%] md:block md:max-w-[110px]">
                  <span className="font-pp-neue-corp text-[15px] md:text-base font-medium text-[#F95D79]">
                    {digitalEcosystem.services[1].name}
                  </span>
                </div>
              )}
              {digitalEcosystem.services[2]?.name && (
                <div className="col-span-2 flex flex-col items-center md:col-span-1 md:absolute md:bottom-[34.5%] md:right-[17.5%] md:block md:max-w-[110px]">
                  <span className="font-pp-neue-corp text-[15px] md:text-base font-medium text-[#EF4E8E]">
                    {digitalEcosystem.services[2].name}
                  </span>
                </div>
              )}
              
              <div className="col-span-2 mt-4 grid w-full grid-cols-2 gap-x-4 gap-y-6 md:static md:mt-0 md:block">
                {digitalEcosystem.categories?.[0]?.title && (
                  <div className="flex flex-col items-center justify-center md:absolute md:bottom-[18%] md:left-[16.5%] md:block md:justify-start">
                    <span className="font-pp-neue-corp-extended text-[14px] md:text-[20px] font-medium leading-[120%] tracking-[0.4px] uppercase text-[#F5FAF8] md:text-[#F5FAF8]/[0.07]">
                      {digitalEcosystem.categories[0].title}
                    </span>
                  </div>
                )}
                {digitalEcosystem.categories?.[1]?.title && (
                  <div className="flex flex-col items-center justify-center md:absolute md:bottom-[15%] md:right-[22%] md:block md:justify-start">
                    <span className="font-pp-neue-corp-extended text-[14px] md:text-[20px] font-medium leading-[120%] tracking-[0.4px] uppercase text-[#F5FAF8] md:text-[#F5FAF8]/[0.07]">
                      {digitalEcosystem.categories[1].title}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}