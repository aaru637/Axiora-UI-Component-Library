import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type HTMLAttributes,
} from "react";
import { mergeStyles } from "./utils/mergeStyles";

export const AlertDialog = AlertDialogPrimitive.Root;
export const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
export const AlertDialogPortal = AlertDialogPrimitive.Portal;

export const AlertDialogOverlay = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    ref={ref}
    className={["ax-overlay", className].filter(Boolean).join(" ")}
    {...props}
  />
));
AlertDialogOverlay.displayName = "AlertDialogOverlay";

export const AlertDialogContent = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, style, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      className={["ax-dialog-content", className].filter(Boolean).join(" ")}
      style={style}
      {...props}
    />
  </AlertDialogPortal>
));
AlertDialogContent.displayName = "AlertDialogContent";

export function AlertDialogHeader({
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

export function AlertDialogFooter({
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

export const AlertDialogTitle = forwardRef<
  HTMLHeadingElement,
  ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={["ax-dialog-title", className].filter(Boolean).join(" ")}
    {...props}
  />
));
AlertDialogTitle.displayName = "AlertDialogTitle";

export const AlertDialogDescription = forwardRef<
  HTMLParagraphElement,
  ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={["ax-dialog-description", className].filter(Boolean).join(" ")}
    {...props}
  />
));
AlertDialogDescription.displayName = "AlertDialogDescription";

export type AlertDialogActionVariant = "primary" | "danger";

export const AlertDialogAction = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action> & {
    variant?: AlertDialogActionVariant;
  }
>(({ className, variant = "primary", ...props }, ref) => (
  <AlertDialogPrimitive.Action
    ref={ref}
    className={[
      "ax-button",
      variant === "danger" ? "ax-button-danger" : "ax-button-primary",
      className,
    ]
      .filter(Boolean)
      .join(" ")}
    {...props}
  />
));
AlertDialogAction.displayName = "AlertDialogAction";

export const AlertDialogCancel = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={["ax-button", "ax-button-secondary", className]
      .filter(Boolean)
      .join(" ")}
    {...props}
  />
));
AlertDialogCancel.displayName = "AlertDialogCancel";
