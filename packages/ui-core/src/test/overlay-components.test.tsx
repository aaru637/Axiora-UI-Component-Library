import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../AlertDialog";
import { Button } from "../Button";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "../ContextMenu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../Dialog";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../HoverCard";
import { Popover, PopoverContent, PopoverTrigger } from "../Popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  TooltipWrapper,
} from "../Tooltip";
import { renderWithTheme } from "./test-utils";

describe("Dialog", () => {
  it("opens content when trigger is clicked", async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <Dialog>
        <DialogTrigger asChild>
          <Button>Open</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>Make changes here.</DialogDescription>
        </DialogContent>
      </Dialog>,
    );
    await user.click(screen.getByRole("button", { name: "Open" }));
    expect(await screen.findByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Edit profile")).toBeInTheDocument();
  });
});

describe("AlertDialog", () => {
  it("opens with cancel and action buttons", async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="danger">Delete</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>,
    );
    await user.click(screen.getByRole("button", { name: "Delete" }));
    expect(await screen.findByRole("alertdialog")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Continue" }),
    ).toBeInTheDocument();
  });
});

describe("Popover", () => {
  it("shows content when trigger is clicked", async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <Popover>
        <PopoverTrigger asChild>
          <Button>Open popover</Button>
        </PopoverTrigger>
        <PopoverContent>Popover body</PopoverContent>
      </Popover>,
    );
    await user.click(screen.getByRole("button", { name: "Open popover" }));
    expect(await screen.findByText("Popover body")).toBeInTheDocument();
  });
});

describe("Tooltip", () => {
  it("shows tooltip on hover", async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button>Hover</Button>
          </TooltipTrigger>
          <TooltipContent>Tooltip text</TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    );
    await user.hover(screen.getByRole("button", { name: "Hover" }));
    expect(await screen.findByText("Tooltip text")).toBeInTheDocument();
  });

  it("renders wrapper API", async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <TooltipWrapper content="Wrapped tooltip">
        <Button>Target</Button>
      </TooltipWrapper>,
    );
    await user.hover(screen.getByRole("button", { name: "Target" }));
    expect(await screen.findByText("Wrapped tooltip")).toBeInTheDocument();
  });
});

describe("HoverCard", () => {
  it("shows card on hover", async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <HoverCard openDelay={0}>
        <HoverCardTrigger asChild>
          <Button>@user</Button>
        </HoverCardTrigger>
        <HoverCardContent>Profile details</HoverCardContent>
      </HoverCard>,
    );
    await user.hover(screen.getByRole("button", { name: "@user" }));
    expect(await screen.findByText("Profile details")).toBeInTheDocument();
  });
});

describe("ContextMenu", () => {
  it("opens menu on right click", async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <ContextMenu>
        <ContextMenuTrigger>Right click</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Copy</ContextMenuItem>
          <ContextMenuItem>Paste</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>,
    );
    await user.pointer({
      keys: "[MouseRight>]",
      target: screen.getByText("Right click"),
    });
    expect(
      await screen.findByRole("menuitem", { name: "Copy" }),
    ).toBeInTheDocument();
  });
});
