import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "../Button";
import { Checkbox } from "../Checkbox";
import { Input } from "../Input";
import { Label } from "../Label";
import { NativeSelect } from "../NativeSelect";
import { Radio, RadioGroup } from "../RadioGroup";
import { Select } from "../Select";
import { Slider } from "../Slider";
import { Switch } from "../Switch";
import { Textarea } from "../Textarea";
import { Toggle } from "../Toggle";
import { renderWithTheme } from "./test-utils";

describe("Button", () => {
  it("renders children and variant class", () => {
    renderWithTheme(<Button variant="danger">Delete</Button>);
    const button = screen.getByRole("button", { name: "Delete" });
    expect(button).toHaveClass("ax-button-danger");
    expect(button).toHaveAttribute("data-variant", "danger");
  });

  it("does not fire click when disabled", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    renderWithTheme(
      <Button disabled onClick={onClick}>
        Save
      </Button>,
    );
    await user.click(screen.getByRole("button", { name: "Save" }));
    expect(onClick).not.toHaveBeenCalled();
  });
});

describe("Label", () => {
  it("shows required mark when required", () => {
    renderWithTheme(<Label required>Email</Label>);
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(document.querySelector(".ax-required-mark")).toBeInTheDocument();
  });

  it("applies error class when error", () => {
    renderWithTheme(<Label error>Email</Label>);
    expect(screen.getByText("Email")).toHaveClass("ax-label-error");
  });
});

describe("Input", () => {
  it("associates label and shows error", () => {
    renderWithTheme(
      <Input label="Email" error="Invalid email" defaultValue="bad" />,
    );
    expect(screen.getByLabelText("Email")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    expect(screen.getByRole("alert")).toHaveTextContent("Invalid email");
  });

  it("shows helper text when no error", () => {
    renderWithTheme(
      <Input label="Email" helperText="We never share your email." />,
    );
    expect(screen.getByText("We never share your email.")).toHaveClass(
      "ax-helper-text",
    );
  });
});

describe("Textarea", () => {
  it("renders with label and required state", () => {
    renderWithTheme(<Textarea label="Message" required />);
    expect(screen.getByLabelText(/Message/)).toBeRequired();
  });
});

describe("NativeSelect", () => {
  it("renders options and placeholder", () => {
    renderWithTheme(
      <NativeSelect
        label="Country"
        placeholder="Select"
        options={[
          { value: "us", label: "United States" },
          { value: "in", label: "India" },
        ]}
      />,
    );
    const select = screen.getByLabelText("Country");
    expect(select).toBeInTheDocument();
    expect(
      within(select).getByRole("option", { name: "United States" }),
    ).toBeInTheDocument();
  });
});

describe("Checkbox", () => {
  it("renders label and error message", () => {
    renderWithTheme(
      <Checkbox label="Accept terms" error="Required" id="terms" />,
    );
    expect(screen.getByLabelText("Accept terms")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    expect(screen.getByRole("alert")).toHaveTextContent("Required");
  });
});

describe("RadioGroup", () => {
  it("selects a radio option", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    renderWithTheme(
      <RadioGroup label="Plan" onValueChange={onValueChange}>
        <Radio value="free" label="Free" />
        <Radio value="pro" label="Pro" />
      </RadioGroup>,
    );
    await user.click(screen.getByLabelText("Pro"));
    expect(onValueChange).toHaveBeenCalledWith("pro");
  });

  it("throws when Radio is used outside RadioGroup", () => {
    expect(() => renderWithTheme(<Radio value="x" label="X" />)).toThrow(
      /Radio must be used within a RadioGroup/,
    );
  });
});

describe("Switch", () => {
  it("toggles checked state", async () => {
    const user = userEvent.setup();
    renderWithTheme(<Switch aria-label="Notifications" />);
    const toggle = screen.getByRole("switch", { name: "Notifications" });
    expect(toggle).toHaveAttribute("data-state", "unchecked");
    await user.click(toggle);
    expect(toggle).toHaveAttribute("data-state", "checked");
  });
});

describe("Slider", () => {
  it("renders with default value", () => {
    renderWithTheme(<Slider defaultValue={[50]} aria-label="Volume" />);
    expect(screen.getByLabelText("Volume")).toBeInTheDocument();
    expect(screen.getByRole("slider")).toHaveAttribute("aria-valuenow", "50");
  });
});

describe("Toggle", () => {
  it("toggles pressed state", async () => {
    const user = userEvent.setup();
    renderWithTheme(<Toggle aria-label="Bold">B</Toggle>);
    const toggle = screen.getByRole("button", { name: "Bold" });
    expect(toggle).toHaveAttribute("data-state", "off");
    await user.click(toggle);
    expect(toggle).toHaveAttribute("data-state", "on");
  });
});

describe("Select", () => {
  it("renders label and opens options", async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <Select
        label="Country"
        placeholder="Pick one"
        options={[
          { value: "us", label: "United States" },
          { value: "in", label: "India" },
        ]}
      />,
    );
    await user.click(screen.getByRole("combobox", { name: "Country" }));
    expect(
      await screen.findByRole("option", { name: "India" }),
    ).toBeInTheDocument();
  });

  it("clears error after valid selection", async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <Select
        label="Country"
        error="Required"
        options={[{ value: "us", label: "United States" }]}
      />,
    );
    expect(screen.getByRole("alert")).toBeInTheDocument();
    await user.click(screen.getByRole("combobox", { name: "Country" }));
    await user.click(
      await screen.findByRole("option", { name: "United States" }),
    );
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
});
