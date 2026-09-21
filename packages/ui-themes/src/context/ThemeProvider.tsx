import {
  useLayoutEffect,
  useMemo,
  type CSSProperties,
  type ReactNode,
} from "react";
import { themeCssVarKeys, themeToCSSVars } from "../css/apply-theme-vars";
import type { ThemeConfig } from "../types/theme";
import { mergeTheme } from "../utils/mergeTheme";
import { validateTheme } from "../validation/validateTheme";
import { ThemeContext } from "./ThemeContext";

// AI-ASSISTED: Cursor
// PROMPT: Remove duplicate ax-themed wrapper; vars applied via root + inline style
// ACCEPTED-BY: dhinesh

export interface ThemeProviderProps {
  theme?: ThemeConfig;
  children: ReactNode;
  /** Apply vars to document.documentElement (default) or only the wrapper div */
  target?: "wrapper" | "root";
}

function applyVarsToElement(
  element: HTMLElement,
  vars: Record<string, string>,
  name: string,
) {
  Object.entries(vars).forEach(([key, value]) => {
    element.style.setProperty(key, value);
  });
  element.setAttribute("data-theme", name);
}

function clearVarsFromElement(element: HTMLElement) {
  themeCssVarKeys.forEach((key) => {
    element.style.removeProperty(key);
  });
  element.removeAttribute("data-theme");
}

function useApplyVarsToDocument(
  vars: Record<string, string>,
  name: string,
  enabled: boolean,
) {
  useLayoutEffect(() => {
    if (!enabled || typeof document === "undefined") return;

    applyVarsToElement(document.documentElement, vars, name);
  }, [vars, name, enabled]);

  useLayoutEffect(() => {
    if (!enabled || typeof document === "undefined") return;

    return () => {
      clearVarsFromElement(document.documentElement);
    };
  }, [enabled]);
}

export function ThemeProvider({
  theme,
  children,
  target = "root",
}: ThemeProviderProps) {
  const resolved = useMemo(() => {
    const validated = theme ? validateTheme(theme) : undefined;
    return mergeTheme(validated);
  }, [theme]);

  const cssVars = useMemo(() => themeToCSSVars(resolved), [resolved]);

  useApplyVarsToDocument(cssVars, resolved.name, target === "root");

  const wrapperStyle = cssVars as CSSProperties;

  if (target === "wrapper") {
    return (
      <ThemeContext.Provider value={resolved}>
        <div
          data-theme={resolved.name}
          className="ax-themed"
          style={wrapperStyle}
        >
          {children}
        </div>
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={resolved}>
      <div data-theme={resolved.name} style={wrapperStyle}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
