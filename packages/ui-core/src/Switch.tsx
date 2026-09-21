import * as SwitchPrimitive from "@radix-ui/react-switch";
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type CSSProperties,
} from "react";

// AI-ASSISTED: Cursor
// PROMPT: Remove unused mergeStyles import (eslint)
// ACCEPTED-BY: dhinesh

export const Switch = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> & {
    style?: CSSProperties;
  }
>(({ className, style, ...props }, ref) => (
  <SwitchPrimitive.Root
    ref={ref}
    className={["ax-switch", className].filter(Boolean).join(" ")}
    style={style}
    {...props}
  >
    <SwitchPrimitive.Thumb className="ax-switch-thumb" />
  </SwitchPrimitive.Root>
));
Switch.displayName = "Switch";
