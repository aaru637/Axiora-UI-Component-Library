import { act, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
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
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from "../Drawer";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../HoverCard";
import { Popover, PopoverContent, PopoverTrigger } from "../Popover";
import { Toaster } from "../Toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  TooltipWrapper,
} from "../Tooltip";
import { resetToasts, toast } from "../useToast";
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

describe("Drawer", () => {
  it("opens side panel when trigger is clicked", async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <Drawer>
        <DrawerTrigger asChild>
          <Button>Open drawer</Button>
        </DrawerTrigger>
        <DrawerContent side="right">
          <DrawerTitle>Settings</DrawerTitle>
          <DrawerDescription>Manage your preferences.</DrawerDescription>
        </DrawerContent>
      </Drawer>,
    );
    await user.click(screen.getByRole("button", { name: "Open drawer" }));
    expect(await screen.findByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
  });

  it("applies side data attribute", async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <Drawer>
        <DrawerTrigger asChild>
          <Button>Open left</Button>
        </DrawerTrigger>
        <DrawerContent side="left">
          <DrawerTitle>Menu</DrawerTitle>
        </DrawerContent>
      </Drawer>,
    );
    await user.click(screen.getByRole("button", { name: "Open left" }));
    const panel = await screen.findByRole("dialog");
    expect(panel).toHaveAttribute("data-side", "left");
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

describe("Toast", () => {
  afterEach(() => {
    resetToasts();
  });

  it("renders toast notification when toast() is called", async () => {
    renderWithTheme(<Toaster />);

    act(() => {
      toast({
        title: "Saved",
        description: "Your profile was updated.",
      });
    });

    expect(await screen.findByText("Saved")).toBeInTheDocument();
    expect(screen.getByText("Your profile was updated.")).toBeInTheDocument();
  });

  it("renders destructive variant", async () => {
    renderWithTheme(<Toaster />);

    act(() => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Request failed.",
      });
    });

    const toastItem = (await screen.findByText("Error")).closest("li");
    expect(toastItem).toHaveClass("ax-toast-destructive");
  });

  it("renders action button when actionLabel is provided", async () => {
    const user = userEvent.setup();
    const onAction = vi.fn();
    renderWithTheme(<Toaster />);

    act(() => {
      toast({
        title: "Archived",
        actionLabel: "Undo",
        onAction,
      });
    });

    await user.click(await screen.findByRole("button", { name: "Undo" }));
    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it("dismisses toast when close button is clicked", async () => {
    const user = userEvent.setup();
    renderWithTheme(<Toaster />);

    act(() => {
      toast({ title: "Dismiss me" });
    });

    const toastItem = (await screen.findByText("Dismiss me")).closest("li");
    expect(toastItem).not.toBeNull();

    await user.click(
      within(toastItem as HTMLElement).getByRole("button", {
        name: "Dismiss notification",
      }),
    );

    expect(screen.queryByText("Dismiss me")).not.toBeInTheDocument();
  });
});
