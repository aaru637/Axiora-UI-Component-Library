import * as TabsPrimitive from "@radix-ui/react-tabs";
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type CSSProperties,
} from "react";

// AI-ASSISTED: Cursor
// PROMPT: Remove unused mergeStyles import (eslint)
// ACCEPTED-BY: dhinesh

export const Tabs = TabsPrimitive.Root;

export const TabsList = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof TabsPrimitive.List> & {
    style?: CSSProperties;
  }
>(({ className, style, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={["ax-tabs-list", className].filter(Boolean).join(" ")}
    style={style}
    {...props}
  />
));
TabsList.displayName = "TabsList";

export const TabsTrigger = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & {
    style?: CSSProperties;
  }
>(({ className, style, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={["ax-tabs-trigger", className].filter(Boolean).join(" ")}
    style={style}
    {...props}
  />
));
TabsTrigger.displayName = "TabsTrigger";

export const TabsContent = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Content> & {
    style?: CSSProperties;
  }
>(({ className, style, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={["ax-tabs-content", className].filter(Boolean).join(" ")}
    style={style}
    {...props}
  />
));
TabsContent.displayName = "TabsContent";
