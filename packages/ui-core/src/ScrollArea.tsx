import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { forwardRef, type ComponentPropsWithoutRef } from "react";

export const ScrollArea = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={className}
    style={{ position: "relative", overflow: "hidden" }}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport className="ax-scroll-viewport">
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
));
ScrollArea.displayName = "ScrollArea";

export const ScrollBar = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Scrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.Scrollbar
    ref={ref}
    orientation={orientation}
    className={["ax-scroll-scrollbar", className].filter(Boolean).join(" ")}
    {...props}
  >
    <ScrollAreaPrimitive.Thumb className="ax-scroll-thumb" />
  </ScrollAreaPrimitive.Scrollbar>
));
ScrollBar.displayName = "ScrollBar";
