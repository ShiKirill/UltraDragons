import type { CSSObject } from "@emotion/react";
import type { Theme } from "@mui/material";

import { theme } from "@/styles/theme";

type StyleMap<T extends string> = Record<T, CSSObject>;
type ThemeFunction<T extends string> = (theme: Theme) => StyleMap<T>;

export function createStyleMap<T extends string>(
  cfgOrFn: StyleMap<T> | ThemeFunction<T>,
): StyleMap<T> {
  if (typeof cfgOrFn === "function") {
    return cfgOrFn(theme);
  }
  return cfgOrFn;
}
