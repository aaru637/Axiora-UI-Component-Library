import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type CSSProperties,
} from "react";
import { CheckIcon, ChevronRightIcon, CircleIcon } from "./icons";
import { mergeStyles } from "./utils/mergeStyles";

// AI-ASSISTED: Cursor
// PROMPT: Add ContextMenu component (shadcn-style)
// ACCEPTED-BY: dhinesh

export const ContextMenu = ContextMenuPrimitive.Root;
export const ContextMenuTrigger = ContextMenuPrimitive.Trigger;
export const ContextMenuGroup = ContextMenuPrimitive.Group;
export const ContextMenuPortal = ContextMenuPrimitive.Portal;
export const ContextMenuSub = ContextMenuPrimitive.Sub;
export const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup;

export const ContextMenuSubTrigger = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger> & {
    inset?: boolean;
    style?: CSSProperties;
  }
>(({ className, inset, style, children, ...props }, ref) => (
  <ContextMenuPrimitive.SubTrigger
    ref={ref}
    className={["ax-item", className].filter(Boolean).join(" ")}
    style={mergeStyles(inset ? { paddingLeft: 32 } : undefined, style)}
    {...props}
  >
    {children}
    <ChevronRightIcon style={{ marginLeft: "auto" }} />
  </ContextMenuPrimitive.SubTrigger>
));
ContextMenuSubTrigger.displayName = "ContextMenuSubTrigger";

export const ContextMenuSubContent = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent> & {
    style?: CSSProperties;
  }
>(({ className, style, ...props }, ref) => (
  <ContextMenuPrimitive.SubContent
    ref={ref}
    className={["ax-content", className].filter(Boolean).join(" ")}
    style={style}
    {...props}
  />
));
ContextMenuSubContent.displayName = "ContextMenuSubContent";

export const ContextMenuContent = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content> & {
    style?: CSSProperties;
  }
>(({ className, style, ...props }, ref) => (
  <ContextMenuPrimitive.Portal>
    <ContextMenuPrimitive.Content
      ref={ref}
      className={["ax-content", className].filter(Boolean).join(" ")}
      style={mergeStyles({ padding: 4, minWidth: 180 }, style)}
      {...props}
    />
  </ContextMenuPrimitive.Portal>
));
ContextMenuContent.displayName = "ContextMenuContent";

export const ContextMenuItem = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> & {
    inset?: boolean;
    style?: CSSProperties;
  }
>(({ className, inset, style, ...props }, ref) => (
  <ContextMenuPrimitive.Item
    ref={ref}
    className={["ax-item", className].filter(Boolean).join(" ")}
    style={mergeStyles(inset ? { paddingLeft: 32 } : undefined, style)}
    {...props}
  />
));
ContextMenuItem.displayName = "ContextMenuItem";

export const ContextMenuCheckboxItem = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem>
>(({ className, style, children, checked, ...props }, ref) => (
  <ContextMenuPrimitive.CheckboxItem
    ref={ref}
    className={["ax-item", className].filter(Boolean).join(" ")}
    style={style}
    checked={checked}
    {...props}
  >
    <span className="ax-item-indicator">
      <ContextMenuPrimitive.ItemIndicator>
        <CheckIcon />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.CheckboxItem>
));
ContextMenuCheckboxItem.displayName = "ContextMenuCheckboxItem";

export const ContextMenuRadioItem = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem>
>(({ className, style, children, ...props }, ref) => (
  <ContextMenuPrimitive.RadioItem
    ref={ref}
    className={["ax-item", className].filter(Boolean).join(" ")}
    style={style}
    {...props}
  >
    <span className="ax-item-indicator">
      <ContextMenuPrimitive.ItemIndicator>
        <CircleIcon style={{ width: 8, height: 8, fill: "currentColor" }} />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.RadioItem>
));
ContextMenuRadioItem.displayName = "ContextMenuRadioItem";

export const ContextMenuLabel = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, style, ...props }, ref) => (
  <ContextMenuPrimitive.Label
    ref={ref}
    className={["ax-label", className].filter(Boolean).join(" ")}
    style={mergeStyles(inset ? { paddingLeft: 32 } : undefined, style)}
    {...props}
  />
));
ContextMenuLabel.displayName = "ContextMenuLabel";

export const ContextMenuSeparator = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Separator
    ref={ref}
    className={["ax-separator", className].filter(Boolean).join(" ")}
    {...props}
  />
));
ContextMenuSeparator.displayName = "ContextMenuSeparator";
