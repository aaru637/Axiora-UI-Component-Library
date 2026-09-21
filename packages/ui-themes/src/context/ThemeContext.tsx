import { createContext } from "react";
import type { ResolvedTheme } from "../utils/mergeTheme";

// AI-ASSISTED: Cursor
// PROMPT: Create React context for resolved theme
// ACCEPTED-BY: dhinesh

export const ThemeContext = createContext<ResolvedTheme | null>(null);
