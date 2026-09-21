import type { HTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from "react";
import { ChevronDownIcon } from "./icons";
import type { SortDirection } from "./hooks/useTableSort";
import { mergeStyles } from "./utils/mergeStyles";

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

export interface TableHeadProps extends ThHTMLAttributes<HTMLTableCellElement> {
  sortable?: boolean;
  sortDirection?: SortDirection | null;
  onSort?: () => void;
}

export function TableHead({
  sortable,
  sortDirection = null,
  onSort,
  style,
  children,
  ...props
}: TableHeadProps) {
  if (!sortable) {
    return (
      <th style={mergeStyles(undefined, style)} {...props}>
        {children}
      </th>
    );
  }

  return (
    <th style={mergeStyles(undefined, style)} {...props}>
      <button
        type="button"
        className="ax-table-sort"
        onClick={onSort}
        aria-sort={
          sortDirection === "asc"
            ? "ascending"
            : sortDirection === "desc"
              ? "descending"
              : "none"
        }
      >
        <span>{children}</span>
        <ChevronDownIcon
          className={[
            "ax-table-sort-icon",
            sortDirection === "asc" && "ax-table-sort-icon-asc",
            sortDirection === "desc" && "ax-table-sort-icon-desc",
          ]
            .filter(Boolean)
            .join(" ")}
        />
      </button>
    </th>
  );
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
      className="ax-table-caption"
      style={mergeStyles(undefined, style)}
      {...props}
    />
  );
}
