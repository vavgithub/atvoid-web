import * as React from "react"
import { Squircle } from "corner-smoothing"

interface SquircleBoxProps {
  cornerRadius?: number
  cornerSmoothing?: number
  className?: string
  style?: React.CSSProperties
  children?: React.ReactNode
}

export default function SquircleBox({
  cornerRadius = 12,
  cornerSmoothing = 1,
  className,
  style,
  children,
}: SquircleBoxProps) {
  return (
    <Squircle
      cornerRadius={cornerRadius}
      cornerSmoothing={cornerSmoothing}
      className={className}
      style={{ overflow: "hidden", ...style }}
    >
      {children}
    </Squircle>
  )
}
