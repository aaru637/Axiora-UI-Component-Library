import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type CSSProperties,
} from "react";
import { mergeStyles } from "./utils/mergeStyles";

// AI-ASSISTED: Cursor
// PROMPT: Add HoverCard component (shadcn-style)
// ACCEPTED-BY: dhinesh

export const HoverCard = HoverCardPrimitive.Root;
export const HoverCardTrigger = HoverCardPrimitive.Trigger;

export const HoverCardContent = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content> & {
    style?: CSSProperties;
  }
>(({ className, style, align = "center", sideOffset = 4, ...props }, ref) => (
  <HoverCardPrimitive.Content
    ref={ref}
    align={align}
    sideOffset={sideOffset}
    className={["ax-content", className].filter(Boolean).join(" ")}
    style={mergeStyles({ padding: 16, width: 320 }, style)}
    {...props}
  />
));
HoverCardContent.displayName = "HoverCardContent";
