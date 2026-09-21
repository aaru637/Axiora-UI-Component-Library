import type { HTMLAttributes } from "react";
import { mergeStyles } from "./utils/mergeStyles";

export function Card({
  className,
  style,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={["ax-card", className].filter(Boolean).join(" ")}
      style={mergeStyles(undefined, style)}
      {...props}
    />
  );
}

export function CardHeader({
  className,
  style,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={["ax-card-header", className].filter(Boolean).join(" ")}
      style={mergeStyles(undefined, style)}
      {...props}
    />
  );
}

export function CardTitle({
  className,
  style,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={["ax-card-title", className].filter(Boolean).join(" ")}
      style={mergeStyles(undefined, style)}
      {...props}
    />
  );
}

export function CardDescription({
  className,
  style,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={["ax-card-description", className].filter(Boolean).join(" ")}
      style={mergeStyles(undefined, style)}
      {...props}
    />
  );
}

export function CardContent({
  className,
  style,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={["ax-card-content", className].filter(Boolean).join(" ")}
      style={mergeStyles(undefined, style)}
      {...props}
    />
  );
}

export function CardFooter({
  className,
  style,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={["ax-card-footer", className].filter(Boolean).join(" ")}
      style={mergeStyles(undefined, style)}
      {...props}
    />
  );
}
