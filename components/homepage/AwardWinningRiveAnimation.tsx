"use client";

import { useEffect } from "react";
import { useRive, Layout, Fit, Alignment } from "@rive-app/react-canvas";

export default function AwardWinningRiveAnimation() {
  const { RiveComponent, rive } = useRive({
    src: "/animation/vav-landing-page_Latest.riv",
    stateMachines: "State Machine 1",
    autoplay: true,
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.TopCenter,
    }),
  });

  useEffect(() => {
    if (rive) rive.play();
  }, [rive]);

  return (
    <div className="w-full mb-[-clamp(24px,6vw,72px)]">
      <div className="relative w-full pb-[56.25%] md:pb-0 md:h-[min(55svh,600px)]">
        <RiveComponent
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "block",
          }}
        />
      </div>
    </div>
  );
}
