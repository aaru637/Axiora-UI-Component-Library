import * as TogglePrimitive from "@radix-ui/react-toggle";
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type CSSProperties,
} from "react";
import { mergeStyles } from "./utils/mergeStyles";

// AI-ASSISTED: Cursor
// PROMPT: Revert Toggle to CSS-only formatting chip styles
// ACCEPTED-BY: dhinesh

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
