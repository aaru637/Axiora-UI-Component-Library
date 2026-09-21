import * as SliderPrimitive from "@radix-ui/react-slider";
import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { themeVars } from "./styles/themeVars";

// AI-ASSISTED: Cursor
// PROMPT: Add Slider component (shadcn-style)
// ACCEPTED-BY: dhinesh

export const Slider = forwardRef<
  HTMLSpanElement,
  ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ style, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    style={{
      position: "relative",
      display: "flex",
      alignItems: "center",
      width: "100%",
      height: 20,
      touchAction: "none",
      userSelect: "none",
      ...style,
    }}
    {...props}
  >
    <SliderPrimitive.Track
      style={{
        position: "relative",
        flexGrow: 1,
        height: 8,
        backgroundColor: `color-mix(in srgb, ${themeVars.color.primary} 15%, transparent)`,
        borderRadius: 9999,
      }}
    >
      <SliderPrimitive.Range
        style={{
          position: "absolute",
          height: "100%",
          backgroundColor: themeVars.color.primary,
          borderRadius: 9999,
        }}
      />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      style={{
        display: "block",
        width: 20,
        height: 20,
        backgroundColor: themeVars.color.surface,
        border: `2px solid ${themeVars.color.primary}`,
        borderRadius: 9999,
        boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
        cursor: "grab",
      }}
    />
  </SliderPrimitive.Root>
));
Slider.displayName = "Slider";
