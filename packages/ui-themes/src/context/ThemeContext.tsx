import { createContext } from "react";
import type { ResolvedTheme } from "../utils/mergeTheme";

export const ThemeContext = createContext<ResolvedTheme | null>(null);
