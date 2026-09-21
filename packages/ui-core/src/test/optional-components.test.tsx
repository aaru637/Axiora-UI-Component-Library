import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { MultiSelect } from "../MultiSelect";
import { TimePicker, formatDisplayTime } from "../TimePicker";
import { renderWithTheme } from "./test-utils";

describe("TimePicker", () => {
  it("selects hour and minute", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    renderWithTheme(
      <TimePicker label="Start time" onChange={onChange} minuteStep={15} />,
    );

    await user.click(screen.getByRole("button", { name: "Start time" }));
    const hourList = screen.getByRole("listbox", { name: "Hour" });
    const minuteList = screen.getByRole("listbox", { name: "Minute" });
    await user.click(within(hourList).getByRole("option", { name: "10 AM" }));
    await user.click(within(minuteList).getByRole("option", { name: "30" }));

    expect(onChange).toHaveBeenCalledWith({ hours: 10, minutes: 30 });
  });

  it("clears error after time is selected", async () => {
    const user = userEvent.setup();

    renderWithTheme(
      <TimePicker
        label="Start time"
        error="Time is required"
        minuteStep={15}
      />,
    );

    expect(screen.getByRole("alert")).toHaveTextContent("Time is required");
    await user.click(screen.getByRole("button", { name: "Start time" }));
    const minuteList = screen.getByRole("listbox", { name: "Minute" });
    await user.click(within(minuteList).getByRole("option", { name: "15" }));

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
});

describe("formatDisplayTime", () => {
  it("formats 12-hour display", () => {
    expect(formatDisplayTime({ hours: 14, minutes: 5 })).toBe("2:05 PM");
  });

  it("formats 24-hour display", () => {
    expect(formatDisplayTime({ hours: 14, minutes: 5 }, true)).toBe("14:05");
  });
});

describe("MultiSelect", () => {
  it("toggles multiple options", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    renderWithTheme(
      <MultiSelect
        label="Skills"
        options={[
          { value: "react", label: "React" },
          { value: "vue", label: "Vue" },
        ]}
        onValueChange={onValueChange}
      />,
    );

    await user.click(screen.getByRole("combobox", { name: "Skills" }));
    await user.click(screen.getByRole("option", { name: "React" }));
    await user.click(screen.getByRole("option", { name: "Vue" }));

    expect(onValueChange).toHaveBeenLastCalledWith(["react", "vue"]);
  });

  it("clears error after selection", async () => {
    const user = userEvent.setup();

    renderWithTheme(
      <MultiSelect
        label="Skills"
        error="Select at least one"
        options={[{ value: "react", label: "React" }]}
      />,
    );

    expect(screen.getByRole("alert")).toHaveTextContent("Select at least one");
    await user.click(screen.getByRole("combobox", { name: "Skills" }));
    await user.click(screen.getByRole("option", { name: "React" }));

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("filters options by search", async () => {
    const user = userEvent.setup();

    renderWithTheme(
      <MultiSelect
        label="Skills"
        options={[
          { value: "react", label: "React" },
          { value: "vue", label: "Vue" },
        ]}
      />,
    );

    await user.click(screen.getByRole("combobox", { name: "Skills" }));
    await user.type(screen.getByLabelText("Search…"), "vue");

    expect(
      screen.queryByRole("option", { name: "React" }),
    ).not.toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Vue" })).toBeInTheDocument();
  });
});
