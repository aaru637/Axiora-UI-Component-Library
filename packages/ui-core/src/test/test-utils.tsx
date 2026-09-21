import {
  render,
  type RenderOptions,
  type RenderResult,
} from "@testing-library/react";
import type { ReactElement, ReactNode } from "react";
import { ThemeProvider } from "@axiora-ui/ui-themes";

function TestProviders({ children }: { children: ReactNode }) {
  return <ThemeProvider theme={{ mode: "light" }}>{children}</ThemeProvider>;
}

export function renderWithTheme(
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
): RenderResult {
  return render(ui, {
    wrapper: ({ children }) => <TestProviders>{children}</TestProviders>,
    ...options,
  });
}
