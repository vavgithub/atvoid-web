import Image from "next/image";
import { urlFor } from "@/lib/sanity.image";
import type { HomePage } from "@/lib/sanity.types";

interface ShowReelSectionProps {
  showReelsSection: HomePage["showReelsSection"];
}

export default function ShowReelSection({ showReelsSection }: ShowReelSectionProps) {
  if (!showReelsSection) return null;

  const videoUrl = showReelsSection.video?.asset?.url;
  const imageAsset = showReelsSection.image;
  const imageUrl = imageAsset?.asset?.url
    ? urlFor(imageAsset).url()
    : undefined;

  if (!videoUrl && !imageUrl) return null;

  return (
    <section className="w-full">
      <div className="relative z-20 mt-8 md:mt-[120px] mx-auto aspect-video w-full max-w-[1120px] overflow-hidden rounded-[24px] md:rounded-[56px] bg-[#5E5E5E]">
        {videoUrl ? (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src={videoUrl}
            poster={imageUrl}
            controls
            playsInline
            preload="metadata"
          />
        ) : (
          imageUrl && (
            <Image
              src={imageUrl}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 1120px) 100vw, 1120px"
            />
          )
        )}
      </div>
    </section>
  );
}
