import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRef, useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { useClickOutside } from "./useClickOutside";

function ClickOutsideDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(true);

  useClickOutside(ref, () => setOpen(false));

  return (
    <div>
      <button type="button">Outside</button>
      {open && (
        <div ref={ref} data-testid="panel">
          Inside panel
        </div>
      )}
    </div>
  );
}

describe("useClickOutside", () => {
  it("calls handler when clicking outside the ref element", async () => {
    const user = userEvent.setup();
    render(<ClickOutsideDemo />);

    expect(screen.getByTestId("panel")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Outside" }));
    expect(screen.queryByTestId("panel")).not.toBeInTheDocument();
  });

  it("does not call handler when disabled", async () => {
    const handler = vi.fn();

    function DisabledDemo() {
      const ref = useRef<HTMLDivElement>(null);
      useClickOutside(ref, handler, false);

      return (
        <div>
          <button type="button">Outside</button>
          <div ref={ref}>Inside</div>
        </div>
      );
    }

    const user = userEvent.setup();
    render(<DisabledDemo />);
    await user.click(screen.getByRole("button", { name: "Outside" }));
    expect(handler).not.toHaveBeenCalled();
  });
});
