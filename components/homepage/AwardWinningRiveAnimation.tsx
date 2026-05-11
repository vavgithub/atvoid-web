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
    <div className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 overflow-visible -mt-4 mb-[-clamp(20px,5vw,56px)] pt-0 md:mt-0 md:mb-[-clamp(28px,6vw,72px)] lg:mb-[-clamp(32px,7vw,88px)] lg:max-[1200px]:-mt-[calc(min(1120px,100cqw)*0.5625*0.44)] lg:mt-0">
      <div className="mx-auto w-full max-w-[1280px]">
        <div className="flex w-full justify-start translate-x-16 md:translate-x-24 lg:translate-x-20 lg:justify-center xl:translate-x-28">
          {/* padding-bottom drives height so the canvas has a concrete size before paint */}
          <div className="relative w-[86vw] max-w-[420px] pb-[65.36%] md:max-w-none md:pb-0 md:h-[min(40svh,380px)] md:w-auto md:aspect-1280/836 lg:h-[min(62svh,640px)]">
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
      </div>
    </div>
  );
}
