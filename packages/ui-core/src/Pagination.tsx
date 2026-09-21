import type { CSSProperties, HTMLAttributes } from "react";
import { spacing, typography } from "@axiora-ui/ui-tokens";
import { Button } from "./Button";
import { ChevronRightIcon } from "./icons";
import { themeVars } from "./styles/themeVars";
import { mergeStyles } from "./utils/mergeStyles";

export interface PaginationProps extends HTMLAttributes<HTMLElement> {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const navStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: spacing[1],
  listStyle: "none",
  margin: 0,
  padding: 0,
};

const pageButtonStyle = (active: boolean): CSSProperties => ({
  minWidth: spacing[10],
  height: spacing[10],
  padding: `0 ${spacing[3]}`,
  fontFamily: themeVars.fontFamily,
  fontSize: typography.fontSize.sm,
  fontWeight: active
    ? typography.fontWeight.medium
    : typography.fontWeight.regular,
  color: active ? themeVars.color.textOnPrimary : themeVars.color.foreground,
  backgroundColor: active ? themeVars.color.primary : "transparent",
  border: active ? "none" : `1px solid ${themeVars.color.border}`,
  borderRadius: themeVars.radius,
  cursor: active ? "default" : "pointer",
});

export function Pagination({
  page,
  totalPages,
  onPageChange,
  style,
  ...props
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      aria-label="Pagination"
      style={mergeStyles(navStyle, style)}
      {...props}
    >
      <Button
        variant="secondary"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        style={{ minWidth: spacing[10], padding: `0 ${spacing[2]}` }}
        aria-label="Previous page"
      >
        <ChevronRightIcon style={{ transform: "rotate(180deg)" }} />
      </Button>
      {pages.map((p) => (
        <button
          key={p}
          type="button"
          aria-current={p === page ? "page" : undefined}
          onClick={() => onPageChange(p)}
          style={pageButtonStyle(p === page)}
        >
          {p}
        </button>
      ))}
      <Button
        variant="secondary"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        style={{ minWidth: spacing[10], padding: `0 ${spacing[2]}` }}
        aria-label="Next page"
      >
        <ChevronRightIcon />
      </Button>
    </nav>
  );
}
