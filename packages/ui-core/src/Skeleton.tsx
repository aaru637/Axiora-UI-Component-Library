import type { CSSProperties, HTMLAttributes } from "react";
import { mergeStyles } from "./utils/mergeStyles";

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
}

export function Skeleton({
  className,
  style,
  width,
  height,
  ...props
}: SkeletonProps) {
  return (
    <div
      className={["ax-skeleton", className].filter(Boolean).join(" ")}
      style={mergeStyles({ width, height }, style)}
      {...props}
    />
  );
}
