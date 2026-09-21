import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

// AI-ASSISTED: Cursor
// PROMPT: Implement useTheme hook for accessing resolved theme
// ACCEPTED-BY: dhinesh

export function useTheme() {
  const ctx = useContext(ThemeContext);

  if (!ctx) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return ctx;
}
