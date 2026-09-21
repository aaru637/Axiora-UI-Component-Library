import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type HTMLAttributes,
} from "react";
import { XIcon } from "./icons";
import { mergeStyles } from "./utils/mergeStyles";

// AI-ASSISTED: Cursor
// PROMPT: Add Dialog component (shadcn-style)
// ACCEPTED-BY: dhinesh

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogPortal = DialogPrimitive.Portal;
export const DialogClose = DialogPrimitive.Close;

export const DialogOverlay = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={["ax-overlay", className].filter(Boolean).join(" ")}
    {...props}
  />
));
DialogOverlay.displayName = "DialogOverlay";

export const DialogContent = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    style?: CSSProperties;
    showClose?: boolean;
  }
>(({ className, style, children, showClose = true, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={["ax-dialog-content", className].filter(Boolean).join(" ")}
      style={style}
      {...props}
    >
      {children}
      {showClose && (
        <DialogPrimitive.Close className="ax-dialog-close" aria-label="Close">
          <XIcon />
        </DialogPrimitive.Close>
      )}
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = "DialogContent";

export function DialogHeader({
  style,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className="ax-dialog-header"
      style={mergeStyles(undefined, style)}
      {...props}
    />
  );
}

export function DialogFooter({
  style,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className="ax-dialog-footer"
      style={mergeStyles(undefined, style)}
      {...props}
    />
  );
}

export const DialogTitle = forwardRef<
  HTMLHeadingElement,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={["ax-dialog-title", className].filter(Boolean).join(" ")}
    {...props}
  />
));
DialogTitle.displayName = "DialogTitle";

export const DialogDescription = forwardRef<
  HTMLParagraphElement,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={["ax-dialog-description", className].filter(Boolean).join(" ")}
    {...props}
  />
));
DialogDescription.displayName = "DialogDescription";
