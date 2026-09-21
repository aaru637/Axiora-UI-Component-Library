import type { ButtonHTMLAttributes, HTMLAttributes } from "react";
import { XIcon } from "./icons";
import { mergeStyles } from "./utils/mergeStyles";

export type TagVariant = "default" | "secondary" | "outline";

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: TagVariant;
  /** When set, renders a dismiss button and calls this on click */
  onRemove?: () => void;
  removeLabel?: string;
}

const variantClass: Record<TagVariant, string> = {
  default: "ax-tag-default",
  secondary: "ax-tag-secondary",
  outline: "ax-tag-outline",
};

export function Tag({
  variant = "secondary",
  onRemove,
  removeLabel = "Remove",
  className,
  style,
  children,
  ...props
}: TagProps) {
  return (
    <span
      className={["ax-tag", variantClass[variant], className]
        .filter(Boolean)
        .join(" ")}
      style={mergeStyles(undefined, style)}
      {...props}
    >
      <span className="ax-tag-label">{children}</span>
      {onRemove && (
        <TagRemoveButton
          aria-label={removeLabel}
          onClick={(event) => {
            event.stopPropagation();
            onRemove();
          }}
        />
      )}
    </span>
  );
}

function TagRemoveButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type="button" className="ax-tag-remove" {...props}>
      <XIcon width={12} height={12} />
    </button>
  );
}

/** Alias for filter-chip use cases */
export const Chip = Tag;
export type ChipProps = TagProps;
export type ChipVariant = TagVariant;
