import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../Accordion";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../Collapsible";
import { Button } from "../Button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../Tabs";
import { renderWithTheme } from "./test-utils";

describe("Tabs", () => {
  it("switches tab panels", async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <Tabs defaultValue="one">
        <TabsList>
          <TabsTrigger value="one">One</TabsTrigger>
          <TabsTrigger value="two">Two</TabsTrigger>
        </TabsList>
        <TabsContent value="one">Panel one</TabsContent>
        <TabsContent value="two">Panel two</TabsContent>
      </Tabs>,
    );
    expect(screen.getByText("Panel one")).toBeVisible();
    await user.click(screen.getByRole("tab", { name: "Two" }));
    expect(screen.getByText("Panel two")).toBeVisible();
  });
});

describe("Accordion", () => {
  it("expands section on trigger click", async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Section</AccordionTrigger>
          <AccordionContent>Hidden content</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );
    await user.click(screen.getByRole("button", { name: "Section" }));
    expect(await screen.findByText("Hidden content")).toBeVisible();
  });
});

describe("Collapsible", () => {
  it("reveals content when opened", async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <Collapsible>
        <CollapsibleTrigger asChild>
          <Button variant="secondary">Toggle</Button>
        </CollapsibleTrigger>
        <CollapsibleContent>More details</CollapsibleContent>
      </Collapsible>,
    );
    await user.click(screen.getByRole("button", { name: "Toggle" }));
    expect(await screen.findByText("More details")).toBeVisible();
  });
});
