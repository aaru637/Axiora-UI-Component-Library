import * as ProgressPrimitive from "@radix-ui/react-progress";
import { forwardRef, type ComponentPropsWithoutRef } from "react";

export const Progress = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={["ax-progress-root", className].filter(Boolean).join(" ")}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="ax-progress-indicator"
      style={{ transform: `translateX(-${100 - (value ?? 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = "Progress";
