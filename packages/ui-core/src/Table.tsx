import type { HTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from "react";
import { mergeStyles } from "./utils/mergeStyles";

// AI-ASSISTED: Cursor
// PROMPT: Remove unused CSSProperties import (eslint)
// ACCEPTED-BY: dhinesh

export function Table({
  className,
  style,
  ...props
}: HTMLAttributes<HTMLTableElement>) {
  return (
    <div className="ax-table-wrapper">
      <table
        className={["ax-table", className].filter(Boolean).join(" ")}
        style={mergeStyles(undefined, style)}
        {...props}
      />
    </div>
  );
}

export function TableHeader(props: HTMLAttributes<HTMLTableSectionElement>) {
  return <thead {...props} />;
}

export function TableBody(props: HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody {...props} />;
}

export function TableFooter(props: HTMLAttributes<HTMLTableSectionElement>) {
  return <tfoot {...props} />;
}

export function TableRow({
  style,
  ...props
}: HTMLAttributes<HTMLTableRowElement>) {
  return <tr style={mergeStyles(undefined, style)} {...props} />;
}

export function TableHead({
  style,
  ...props
}: ThHTMLAttributes<HTMLTableCellElement>) {
  return <th style={mergeStyles(undefined, style)} {...props} />;
}

export function TableCell({
  style,
  ...props
}: TdHTMLAttributes<HTMLTableCellElement>) {
  return <td style={mergeStyles(undefined, style)} {...props} />;
}

export function TableCaption({
  style,
  ...props
}: HTMLAttributes<HTMLTableCaptionElement>) {
  return (
    <caption
      style={mergeStyles(
        { marginTop: 16, fontSize: 14, color: "var(--color-secondary)" },
        style,
      )}
      {...props}
    />
  );
}
