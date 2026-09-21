import * as AccordionPrimitive from "@radix-ui/react-accordion";
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type CSSProperties,
} from "react";
import { ChevronDownIcon } from "./icons";
import { mergeStyles } from "./utils/mergeStyles";

// AI-ASSISTED: Cursor
// PROMPT: Add Accordion component (shadcn-style)
// ACCEPTED-BY: dhinesh

export const Accordion = AccordionPrimitive.Root;

export const AccordionItem = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={["ax-accordion-item", className].filter(Boolean).join(" ")}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

export const AccordionTrigger = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> & {
    style?: CSSProperties;
  }
>(({ className, style, children, ...props }, ref) => (
  <AccordionPrimitive.Header style={{ display: "flex" }}>
    <AccordionPrimitive.Trigger
      ref={ref}
      className={["ax-accordion-trigger", className].filter(Boolean).join(" ")}
      style={style}
      {...props}
    >
      {children}
      <ChevronDownIcon className="ax-accordion-chevron" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = "AccordionTrigger";

export const AccordionContent = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> & {
    style?: CSSProperties;
  }
>(({ className, style, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={["ax-accordion-content", className].filter(Boolean).join(" ")}
    style={style}
    {...props}
  >
    <div className="ax-accordion-inner" style={mergeStyles(undefined, style)}>
      {children}
    </div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = "AccordionContent";
