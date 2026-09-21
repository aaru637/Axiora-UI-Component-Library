import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type HTMLAttributes,
} from "react";
import { XIcon } from "./icons";
import { mergeStyles } from "./utils/mergeStyles";

export type DrawerSide = "top" | "right" | "bottom" | "left";

export const Drawer = DialogPrimitive.Root;
export const DrawerTrigger = DialogPrimitive.Trigger;
export const DrawerPortal = DialogPrimitive.Portal;
export const DrawerClose = DialogPrimitive.Close;

export const DrawerOverlay = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={["ax-overlay", className].filter(Boolean).join(" ")}
    {...props}
  />
));
DrawerOverlay.displayName = "DrawerOverlay";

export const DrawerContent = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    style?: CSSProperties;
    side?: DrawerSide;
    showClose?: boolean;
  }
>(
  (
    { className, style, children, side = "right", showClose = true, ...props },
    ref,
  ) => (
    <DrawerPortal>
      <DrawerOverlay />
      <DialogPrimitive.Content
        ref={ref}
        data-side={side}
        className={["ax-drawer-content", className].filter(Boolean).join(" ")}
        style={style}
        {...props}
      >
        {children}
        {showClose && (
          <DrawerClose className="ax-drawer-close" aria-label="Close">
            <XIcon />
          </DrawerClose>
        )}
      </DialogPrimitive.Content>
    </DrawerPortal>
  ),
);
DrawerContent.displayName = "DrawerContent";

export function DrawerHeader({
  style,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className="ax-drawer-header"
      style={mergeStyles(undefined, style)}
      {...props}
    />
  );
}

export function DrawerFooter({
  style,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className="ax-drawer-footer"
      style={mergeStyles(undefined, style)}
      {...props}
    />
  );
}

export const DrawerTitle = forwardRef<
  HTMLHeadingElement,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={["ax-drawer-title", className].filter(Boolean).join(" ")}
    {...props}
  />
));
DrawerTitle.displayName = "DrawerTitle";

export const DrawerDescription = forwardRef<
  HTMLParagraphElement,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={["ax-drawer-description", className].filter(Boolean).join(" ")}
    {...props}
  />
));
DrawerDescription.displayName = "DrawerDescription";
