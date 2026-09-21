import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { themeVars } from "./styles/themeVars";

export const Separator = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(({ orientation = "horizontal", decorative = true, style, ...props }, ref) => (
  <SeparatorPrimitive.Root
    ref={ref}
    decorative={decorative}
    orientation={orientation}
    style={{
      flexShrink: 0,
      backgroundColor: themeVars.color.border,
      ...(orientation === "horizontal"
        ? { height: 1, width: "100%" }
        : { width: 1, height: "100%" }),
      ...style,
    }}
    {...props}
  />
));
Separator.displayName = "Separator";
