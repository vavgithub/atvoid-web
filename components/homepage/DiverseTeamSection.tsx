import { Fragment, type CSSProperties } from "react";
import Image from "next/image";
import { urlFor } from "@/lib/sanity.image";
import type { HomePage } from "@/lib/sanity.types";

// Floating animation keyframes
const floatStyle = `
  @keyframes float {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-8px);
    }
  }
`;

interface DiverseTeamSectionProps {
  diverseTeam:
    | (HomePage["diverseTeam"] & {
        arrowTarget?: { x?: number; y?: number };
      })
    | undefined;
}

function isHexColor(value: string | undefined): value is string {
  return !!value && /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(value);
}

/** SVG default points down-right; subtract 45° so 0° aligns with +X. */
const CURSOR_ROTATION_OFFSET = 45;

/** Angle (deg) from (x, y) toward a target point (percent coords). */
function angleTowardTargetPercent(
  x: number,
  y: number,
  targetX: number,
  targetY: number,
): number {
  return (Math.atan2(targetY - y, targetX - x) * 180) / Math.PI;
}

function TeamCursorArrow({
  fill,
  rotationDeg,
  className,
  style,
}: {
  fill: string;
  rotationDeg: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      className={className}
      style={{
        ...style,
        transform: `rotate(${rotationDeg}deg)`,
        transformOrigin: "50% 50%",
      }}
    >
      <path
        d="M21.1504 23.2842C20.8414 23.495 20.4773 23.6114 20.1033 23.6185C19.7293 23.6255 19.3609 23.5235 19.0442 23.3245L19.042 23.3228L5.89773 15.2171C5.6139 15.0422 5.39112 14.7838 5.25995 14.4773C5.12874 14.1707 5.09518 13.8307 5.16469 13.5046C5.23421 13.1785 5.40377 12.8822 5.64854 12.6558C5.89332 12.4294 6.2019 12.2835 6.53242 12.2396L10.7703 11.6528C11.442 11.56 12.083 11.3131 12.6431 10.931C13.2033 10.5489 13.6683 10.0423 13.9998 9.45069L16.0848 5.71927C16.2474 5.42813 16.4952 5.19348 16.7953 5.04808C17.0956 4.90262 17.4341 4.85309 17.7635 4.90612C18.0929 4.95918 18.3982 5.11275 18.6377 5.34506C18.8472 5.54843 18.9978 5.80389 19.0742 6.08415L19.1019 6.20553L21.9555 21.338L21.9556 21.339C22.0253 21.7064 21.9857 22.0866 21.8428 22.4322C21.6998 22.7775 21.4591 23.0735 21.1504 23.2842Z"
        fill={fill}
        stroke="#070708"
        strokeWidth="0.75"
      />
    </svg>
  );
}

export default function DiverseTeamSection({
  diverseTeam,
}: DiverseTeamSectionProps) {
  if (!diverseTeam) return null;

  const targetX = diverseTeam.arrowTarget?.x ?? 50;
  const targetY = diverseTeam.arrowTarget?.y ?? 50;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: floatStyle }} />
      <section className="w-full mt-[100px] md:mt-[150px] pb-14 md:pb-0">
        {/* Heading - Above background image */}
        {diverseTeam.heading && (
          <div className="mb-10 px-5 md:px-10 lg:px-20">
            <div className="font-pp-neue-corp w-full max-w-full sm:max-w-[424px] md:max-w-[720px] mx-0 sm:mx-auto">
              {/* Line 1: prefix1 (top-left) */}
              {diverseTeam.heading.prefix1 && (
                <div className="text-left">
                  <span className="text-[#474747] text-[12px] sm:text-[16px] md:text-[20px] font-medium uppercase">
                    {diverseTeam.heading.prefix1}
                  </span>
                </div>
              )}

              {/* Line 2: main1 (left) + prefix2 (right) */}
              <div className="mt-1 flex w-full items-baseline justify-between gap-2">
                <div className="min-w-0">
                  {diverseTeam.heading.main1 && (
                    <h2 className="font-pp-neue-corp-wide text-[#F6F6F6] text-[24px] sm:text-[30px] md:text-[46px] lg:text-[60px] font-medium leading-[0.9] md:leading-[80%] tracking-[-1.2px] uppercase">
                      {diverseTeam.heading.main1}
                    </h2>
                  )}
                </div>
                <div className="min-w-0 text-right hidden sm:block">
                  {diverseTeam.heading.prefix2 && (
                    <span className="text-[#474747] text-[12px] sm:text-[16px] md:text-[20px] font-medium uppercase">
                      {diverseTeam.heading.prefix2}
                    </span>
                  )}
                </div>
              </div>

              {/* Mobile-only: prefix2 on its own line */}
              {diverseTeam.heading.prefix2 && (
                <div className="mt-1 text-left sm:hidden">
                  <span className="text-[#474747] text-[12px] font-medium uppercase">
                    {diverseTeam.heading.prefix2}
                  </span>
                </div>
              )}

              {/* Line 3: main2 (centered under the heading) */}
              {diverseTeam.heading.main2 && (
                <div className="mt-1 text-left sm:text-right">
                  <h2 className="font-pp-neue-corp-wide text-[#F6F6F6] text-[24px] sm:text-[30px] md:text-[46px] lg:text-[60px] font-medium leading-[0.9] md:leading-[80%] tracking-[-1.2px] uppercase">
                    {diverseTeam.heading.main2}
                  </h2>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Background Image Section */}
        <div className="relative min-h-[600px] md:min-h-[800px] overflow-hidden">
          {/* Background Image */}
          {diverseTeam.backgroundImage?.asset?.url && (
            <div className="absolute inset-0 z-0">
              <Image
                src={urlFor(diverseTeam.backgroundImage).url()}
                alt="World map"
                fill
                className="object-cover object-center"
                sizes="100vw"
                priority
              />
            </div>
          )}

          {/* Content */}
          <div className="relative z-10 min-h-[600px] md:min-h-[800px] flex flex-col justify-center items-center px-10 sm:px-14 md:px-20 py-12 md:py-16">
            {/* Team Members positioned on map */}
            {diverseTeam.teamMembers && diverseTeam.teamMembers.length > 0 && (
              <div className="relative w-full h-full min-h-[400px] md:min-h-[500px]">
                {diverseTeam.teamMembers.map((member, idx) => {
                  if (
                    !member.name ||
                    !member.color ||
                    member.positionX === undefined ||
                    member.positionY === undefined
                  ) {
                    return null;
                  }

                  const bgColor = isHexColor(member.color)
                    ? member.color
                    : "#ffffff";
                  const arrowFill = isHexColor(member.arrowColor)
                    ? member.arrowColor
                    : bgColor;
                  const hasMapArrow =
                    member.arrowPositionX !== undefined &&
                    member.arrowPositionY !== undefined;

                  const angleToCenterDeg = angleTowardTargetPercent(
                    member.positionX,
                    member.positionY,
                    targetX,
                    targetY,
                  );

                  const rotationOverrideDeg =
                    typeof member.arrowRotationDeg === "number"
                      ? member.arrowRotationDeg
                      : undefined;

                  const angleArrowToCenterDeg =
                    rotationOverrideDeg !== undefined
                      ? rotationOverrideDeg + CURSOR_ROTATION_OFFSET
                      : hasMapArrow
                        ? angleTowardTargetPercent(
                            member.arrowPositionX!,
                            member.arrowPositionY!,
                            targetX,
                            targetY,
                          )
                        : 0;

                  const floatStyleBlock: CSSProperties = {
                    animationName: "float",
                    animationDuration: `${3 + (idx % 3) * 0.5}s`,
                    animationTimingFunction: "ease-in-out",
                    animationIterationCount: "infinite",
                    animationDelay: `${idx * 0.5}s`,
                  };

                  return (
                    <Fragment key={idx}>
                      <div
                        className="absolute"
                        style={{
                          left: `${member.positionX}%`,
                          top: `${member.positionY}%`,
                          transform: "translate(-50%, 0)",
                        }}
                      >
                        <div
                          className="relative inline-block"
                          style={floatStyleBlock}
                        >
                          <div
                            className="relative rounded shadow-lg"
                            style={{
                              backgroundColor: bgColor,
                              padding: "1px 6px",
                            }}
                          >
                            <span
                              className="font-pp-neue-corp whitespace-nowrap"
                              style={{
                                color: "#070708",
                                fontSize: "12px",
                                fontWeight: 500,
                                lineHeight: "135%",
                              }}
                            >
                              {member.name}
                            </span>
                          </div>

                          {!hasMapArrow && (
                            <TeamCursorArrow
                              fill={arrowFill}
                              rotationDeg={
                                rotationOverrideDeg ??
                                angleToCenterDeg - CURSOR_ROTATION_OFFSET
                              }
                              className="absolute"
                              style={{
                                bottom: "-24px",
                                right: "-18px",
                              }}
                            />
                          )}
                        </div>
                      </div>

                      {hasMapArrow && (
                        <div
                          className="absolute z-1 flex h-[30px] w-[30px] items-center justify-center"
                          style={{
                            left: `${member.arrowPositionX}%`,
                            top: `${member.arrowPositionY}%`,
                            transform: "translate(-50%, -50%)",
                            ...floatStyleBlock,
                          }}
                        >
                          <TeamCursorArrow
                            fill={arrowFill}
                            rotationDeg={
                              angleArrowToCenterDeg - CURSOR_ROTATION_OFFSET
                            }
                          />
                        </div>
                      )}
                    </Fragment>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
