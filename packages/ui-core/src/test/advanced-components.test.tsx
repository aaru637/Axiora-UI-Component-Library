import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Calendar, formatDisplayDate } from "../Calendar";
import { Combobox } from "../Combobox";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "../Command";
import { DatePicker } from "../DatePicker";
import { renderWithTheme } from "./test-utils";

describe("Combobox", () => {
  it("filters and selects an option", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    renderWithTheme(
      <Combobox
        label="Framework"
        options={[
          { value: "react", label: "React" },
          { value: "vue", label: "Vue" },
        ]}
        onValueChange={onValueChange}
      />,
    );

    await user.click(screen.getByRole("combobox", { name: "Framework" }));
    await user.type(screen.getByLabelText("Search…"), "vue");
    await user.click(screen.getByRole("option", { name: "Vue" }));

    expect(onValueChange).toHaveBeenCalledWith("vue");
  });

  it("shows empty message when filter matches nothing", async () => {
    const user = userEvent.setup();

    renderWithTheme(
      <Combobox
        label="Framework"
        emptyMessage="Nothing found"
        options={[{ value: "react", label: "React" }]}
      />,
    );

    await user.click(screen.getByRole("combobox", { name: "Framework" }));
    await user.type(screen.getByLabelText("Search…"), "xyz");

    expect(screen.getByText("Nothing found")).toBeInTheDocument();
  });

  it("shows error message when error is set", () => {
    renderWithTheme(
      <Combobox
        label="Framework"
        error="Required"
        options={[{ value: "react", label: "React" }]}
      />,
    );

    expect(screen.getByRole("alert")).toHaveTextContent("Required");
  });

  it("clears error after valid selection", async () => {
    const user = userEvent.setup();

    renderWithTheme(
      <Combobox
        label="Framework"
        error="Please select an option"
        options={[
          { value: "react", label: "React" },
          { value: "vue", label: "Vue" },
        ]}
      />,
    );

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Please select an option",
    );
    await user.click(screen.getByRole("combobox", { name: "Framework" }));
    await user.click(screen.getByRole("option", { name: "React" }));
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
});

describe("Calendar", () => {
  it("selects a day", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();

    renderWithTheme(
      <Calendar selected={new Date(2026, 8, 1)} onSelect={onSelect} />,
    );

    await user.click(screen.getByRole("gridcell", { name: "15" }));
    expect(onSelect).toHaveBeenCalled();
  });

  it("navigates to the next month", async () => {
    const user = userEvent.setup();

    renderWithTheme(<Calendar selected={new Date(2026, 8, 1)} />);

    expect(screen.getByText("September 2026")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Next month" }));
    expect(screen.getByText("October 2026")).toBeInTheDocument();
  });

  it("does not select disabled days", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();

    renderWithTheme(
      <Calendar
        selected={new Date(2026, 8, 1)}
        onSelect={onSelect}
        disabled={(date) => date.getDate() === 15}
      />,
    );

    await user.click(screen.getByRole("gridcell", { name: "15" }));
    expect(onSelect).not.toHaveBeenCalled();
  });
});

describe("formatDisplayDate", () => {
  it("formats dates for display", () => {
    const formatted = formatDisplayDate(new Date(2026, 8, 21));
    expect(formatted).toMatch(/2026/);
    expect(formatted).toMatch(/21/);
  });
});

describe("DatePicker", () => {
  it("opens calendar and selects a date", async () => {
    const user = userEvent.setup();

    renderWithTheme(<DatePicker label="Due date" placeholder="Pick a date" />);

    await user.click(screen.getByRole("button", { name: "Due date" }));

    const dayCells = await screen.findAllByRole("gridcell", { name: "15" });
    const inMonthCell = dayCells.find(
      (cell) => !cell.classList.contains("ax-calendar-day-outside"),
    );
    expect(inMonthCell).toBeDefined();
    await user.click(inMonthCell as HTMLElement);

    expect(
      screen.getByRole("button", { name: "Due date" }),
    ).not.toHaveTextContent("Pick a date");
  });

  it("calls onChange when a date is selected", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    renderWithTheme(
      <DatePicker
        label="Due date"
        onChange={onChange}
        placeholder="Pick a date"
      />,
    );

    await user.click(screen.getByRole("button", { name: "Due date" }));

    const dayCells = await screen.findAllByRole("gridcell", { name: "10" });
    const inMonthCell = dayCells.find(
      (cell) => !cell.classList.contains("ax-calendar-day-outside"),
    );
    await user.click(inMonthCell as HTMLElement);

    expect(onChange).toHaveBeenCalled();
  });

  it("clears error after a date is selected", async () => {
    const user = userEvent.setup();

    renderWithTheme(
      <DatePicker
        label="Due date"
        error="Date is required"
        placeholder="Pick a date"
      />,
    );

    expect(screen.getByRole("alert")).toHaveTextContent("Date is required");
    await user.click(screen.getByRole("button", { name: "Due date" }));

    const dayCells = await screen.findAllByRole("gridcell", { name: "10" });
    const inMonthCell = dayCells.find(
      (cell) => !cell.classList.contains("ax-calendar-day-outside"),
    );
    await user.click(inMonthCell as HTMLElement);

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
});

describe("Command", () => {
  it("filters command items by search", async () => {
    const user = userEvent.setup();

    renderWithTheme(
      <Command>
        <CommandInput placeholder="Search commands…" />
        <CommandList>
          <CommandItem value="profile">Profile</CommandItem>
          <CommandItem value="settings">Settings</CommandItem>
        </CommandList>
      </Command>,
    );

    expect(screen.getByRole("option", { name: "Profile" })).toBeInTheDocument();

    await user.type(screen.getByPlaceholderText("Search commands…"), "set");

    expect(
      screen.queryByRole("option", { name: "Profile" }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "Settings" }),
    ).toBeInTheDocument();
  });

  it("shows empty state when search matches nothing", async () => {
    const user = userEvent.setup();

    renderWithTheme(
      <Command>
        <CommandInput placeholder="Search commands…" />
        <CommandList>
          <CommandEmpty>No commands found.</CommandEmpty>
          <CommandItem value="profile">Profile</CommandItem>
        </CommandList>
      </Command>,
    );

    expect(screen.queryByText("No commands found.")).not.toBeInTheDocument();

    await user.type(screen.getByPlaceholderText("Search commands…"), "zzz");

    expect(screen.getByText("No commands found.")).toBeInTheDocument();
  });

  it("opens CommandDialog and selects an item", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();

    renderWithTheme(
      <CommandDialog open>
        <CommandInput placeholder="Search…" />
        <CommandList>
          <CommandItem value="settings" onSelect={onSelect}>
            Settings
          </CommandItem>
        </CommandList>
      </CommandDialog>,
    );

    expect(await screen.findByRole("dialog")).toBeInTheDocument();
    await user.click(screen.getByRole("option", { name: "Settings" }));
    expect(onSelect).toHaveBeenCalledWith("settings");
  });
});
