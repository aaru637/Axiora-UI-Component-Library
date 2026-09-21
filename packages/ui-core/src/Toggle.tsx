import * as TogglePrimitive from "@radix-ui/react-toggle";
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type CSSProperties,
} from "react";
import { mergeStyles } from "./utils/mergeStyles";

export const Toggle = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<typeof TogglePrimitive.Root> & {
    style?: CSSProperties;
  }
>(({ className, style, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={["ax-toggle", className].filter(Boolean).join(" ")}
    style={mergeStyles(undefined, style)}
    {...props}
  />
));
Toggle.displayName = "Toggle";
