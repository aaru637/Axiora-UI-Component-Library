import * as ToastPrimitive from "@radix-ui/react-toast";
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ReactElement,
} from "react";
import { XIcon } from "./icons";
import { dismissToast, useToast, type ToastVariant } from "./useToast";

export const ToastProvider = ToastPrimitive.Provider;

export const ToastViewport = forwardRef<
  HTMLOListElement,
  ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Viewport
    ref={ref}
    className={["ax-toast-viewport", className].filter(Boolean).join(" ")}
    {...props}
  />
));
ToastViewport.displayName = "ToastViewport";

export interface ToastProps extends ComponentPropsWithoutRef<
  typeof ToastPrimitive.Root
> {
  variant?: ToastVariant;
}

export const Toast = forwardRef<HTMLLIElement, ToastProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <ToastPrimitive.Root
      ref={ref}
      className={[
        "ax-toast",
        variant === "destructive" ? "ax-toast-destructive" : "ax-toast-default",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  ),
);
Toast.displayName = "Toast";

export const ToastTitle = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof ToastPrimitive.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Title
    ref={ref}
    className={["ax-toast-title", className].filter(Boolean).join(" ")}
    {...props}
  />
));
ToastTitle.displayName = "ToastTitle";

export const ToastDescription = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof ToastPrimitive.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Description
    ref={ref}
    className={["ax-toast-description", className].filter(Boolean).join(" ")}
    {...props}
  />
));
ToastDescription.displayName = "ToastDescription";

export const ToastAction = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<typeof ToastPrimitive.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Action
    ref={ref}
    className={["ax-toast-action", className].filter(Boolean).join(" ")}
    {...props}
  />
));
ToastAction.displayName = "ToastAction";

export const ToastClose = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<typeof ToastPrimitive.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Close
    ref={ref}
    className={["ax-toast-close", className].filter(Boolean).join(" ")}
    toast-close=""
    aria-label="Dismiss notification"
    {...props}
  >
    <XIcon width={14} height={14} />
  </ToastPrimitive.Close>
));
ToastClose.displayName = "ToastClose";

export interface ToasterProps {
  duration?: number;
}

export function Toaster({ duration = 5000 }: ToasterProps) {
  const { toasts } = useToast();

  return (
    <ToastProvider swipeDirection="right" duration={duration}>
      {toasts.map(
        ({ id, title, description, variant, open, duration: itemDuration }) => (
          <Toast
            key={id}
            open={open}
            variant={variant}
            duration={itemDuration ?? duration}
            onOpenChange={(nextOpen) => {
              if (!nextOpen) {
                dismissToast(id);
              }
            }}
          >
            <div className="ax-toast-content">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            <ToastClose />
          </Toast>
        ),
      )}
      <ToastViewport />
    </ToastProvider>
  );
}

export type ToastActionElement = ReactElement<typeof ToastAction>;
