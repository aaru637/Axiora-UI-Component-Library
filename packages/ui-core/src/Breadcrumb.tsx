import type {
  AnchorHTMLAttributes,
  HTMLAttributes,
  LiHTMLAttributes,
} from "react";
import { spacing, typography } from "@axiora-ui/ui-tokens";
import { ChevronRightIcon } from "./icons";
import { themeVars } from "./styles/themeVars";
import { mergeStyles } from "./utils/mergeStyles";

export function Breadcrumb(props: HTMLAttributes<HTMLElement>) {
  return <nav aria-label="Breadcrumb" {...props} />;
}

export function BreadcrumbList({
  style,
  ...props
}: HTMLAttributes<HTMLOListElement>) {
  return (
    <ol
      style={mergeStyles(
        {
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: spacing[1],
          listStyle: "none",
          margin: 0,
          padding: 0,
          fontFamily: themeVars.fontFamily,
          fontSize: typography.fontSize.sm,
          color: themeVars.color.secondary,
        },
        style,
      )}
      {...props}
    />
  );
}

export function BreadcrumbItem(props: LiHTMLAttributes<HTMLLIElement>) {
  return (
    <li
      style={{ display: "inline-flex", alignItems: "center", gap: spacing[1] }}
      {...props}
    />
  );
}

export function BreadcrumbLink({
  style,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      style={mergeStyles(
        {
          color: themeVars.color.secondary,
          textDecoration: "none",
          transition: "color 0.15s ease",
        },
        style,
      )}
      {...props}
    />
  );
}

export function BreadcrumbPage({
  style,
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      aria-current="page"
      style={mergeStyles(
        { color: themeVars.color.foreground, fontWeight: 500 },
        style,
      )}
      {...props}
    />
  );
}

export function BreadcrumbSeparator(props: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span role="presentation" aria-hidden="true" {...props}>
      <ChevronRightIcon style={{ opacity: 0.5 }} />
    </span>
  );
}
