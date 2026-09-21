import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ThemeProvider } from "./ThemeProvider";
import { useTheme } from "./useTheme";

// AI-ASSISTED: Cursor
// PROMPT: Update tests for root-level CSS variable injection
// ACCEPTED-BY: dhinesh

function ThemeConsumer() {
  const theme = useTheme();
  return <span data-testid="primary">{theme.colors.primary}</span>;
}

describe("ThemeProvider", () => {
  it("provides resolved theme via context", () => {
    render(
      <ThemeProvider theme={{ colors: { primary: "#7c3aed" } }}>
        <ThemeConsumer />
      </ThemeProvider>,
    );

    expect(screen.getByTestId("primary").textContent).toBe("#7c3aed");
  });

  it("sets CSS variables on document root by default", () => {
    render(
      <ThemeProvider theme={{ colors: { primary: "#059669" } }}>
        <div>child</div>
      </ThemeProvider>,
    );

    expect(
      document.documentElement.style.getPropertyValue("--color-primary"),
    ).toBe("#059669");
    expect(document.documentElement.getAttribute("data-theme")).toBeTruthy();
  });

  it("sets CSS variables on wrapper when target is wrapper", () => {
    const { container } = render(
      <ThemeProvider
        target="wrapper"
        theme={{ colors: { primary: "#059669" } }}
      >
        <div>child</div>
      </ThemeProvider>,
    );

    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.style.getPropertyValue("--color-primary")).toBe("#059669");
    expect(wrapper.classList.contains("ax-themed")).toBe(true);
  });

  it("throws when useTheme is used outside provider", () => {
    expect(() => render(<ThemeConsumer />)).toThrow(
      /useTheme must be used within a ThemeProvider/,
    );
  });
});
