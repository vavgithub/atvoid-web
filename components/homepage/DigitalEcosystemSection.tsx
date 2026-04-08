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
  const imageFitClass = hasDims ? "object-cover object-center" : "object-contain object-center";

  return (
    <section className="@container relative mt-[100px] w-full max-w-[1280px] mx-auto">
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: `${aspectW} / ${aspectH}` }}
      >
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

        {/* No horizontal padding here — % positions match the image edge-to-edge */}
        <div className="absolute inset-0 z-10">
            {digitalEcosystem.mainHeading && (
              <h2 className="absolute left-1/2 top-[7%] w-[min(580px,calc(100%-40px))] -translate-x-1/2 text-center font-pp-neue-corp-extended text-[40px] font-medium leading-[1.2] tracking-[0.8px] uppercase text-[#F5FAF8] md:top-[10%]">
                {digitalEcosystem.mainHeading}
              </h2>
            )}

            {(digitalEcosystem.subheading?.line1 || digitalEcosystem.subheading?.line2) && (
              <div className="absolute left-1/2 top-[20%] w-[260px] max-w-[calc(100%-70px)] -translate-x-1/2 rounded-md bg-black/40 px-4 py-3 text-center backdrop-blur-sm md:top-[30%]">
                {digitalEcosystem.subheading?.line1 && (
                  <div className="font-pp-neue-corp-extended text-[#F5FAF8] text-xl font-medium leading-[120%] tracking-[0.4px] uppercase">
                    {digitalEcosystem.subheading.line1}
                  </div>
                )}
                {digitalEcosystem.subheading?.line2 && (
                  <div className="mt-1 font-pp-neue-corp text-[#FFF] text-base font-light leading-[120%] tracking-[0.32px]">
                    {digitalEcosystem.subheading.line2}
                  </div>
                )}
              </div>
            )}

            {digitalEcosystem.services && digitalEcosystem.services.length > 0 && (
              <>
                {digitalEcosystem.services[0]?.name && (
                  <div className="absolute bottom-[34%] left-[21%] max-w-[110px] text-center">
                    <span className="font-pp-neue-corp text-base font-medium text-[#F45584]">
                      {digitalEcosystem.services[0].name}
                    </span>
                  </div>
                )}
                {digitalEcosystem.services[1]?.name && (
                  <div className="absolute top-[35%] right-[26.5%] max-w-[110px] text-center">
                    <span className="font-pp-neue-corp text-base font-medium text-[#F95D79]">
                      {digitalEcosystem.services[1].name}
                    </span>
                  </div>
                )}
                {digitalEcosystem.services[2]?.name && (
                  <div className="absolute bottom-[34.5%] right-[17.5%] max-w-[110px] text-center">
                    <span className="font-pp-neue-corp text-base font-medium text-[#EF4E8E]">
                      {digitalEcosystem.services[2].name}
                    </span>
                  </div>
                )}
                {digitalEcosystem.categories?.[0]?.title && (
                  <div className="absolute bottom-[18%] left-[16.5%]">
                    <span className="font-pp-neue-corp-extended text-[20px] font-medium leading-[120%] tracking-[0.4px] uppercase text-[#F5FAF8]/[0.07]">
                      {digitalEcosystem.categories[0].title}
                    </span>
                  </div>
                )}
                {digitalEcosystem.categories?.[1]?.title && (
                  <div className="absolute bottom-[15%] right-[22%]">
                    <span className="font-pp-neue-corp-extended text-[20px] font-medium leading-[120%] tracking-[0.4px] uppercase text-[#F5FAF8]/[0.07]">
                      {digitalEcosystem.categories[1].title}
                    </span>
                  </div>
                )}
              </>
            )}
          </div>
      </div>
    </section>
  );
}
