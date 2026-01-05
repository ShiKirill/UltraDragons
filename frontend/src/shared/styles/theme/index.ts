import { createTheme } from "@mui/material/styles";

import { breakpoints } from "./breakpoints";
import { components } from "./components";
import { palette } from "./palette";

export const theme = createTheme({
  components,
  breakpoints,
  palette,
  typography: {
    fontFamily: "var(--font-raleway), Arial, Helvetica, sans-serif",
  },
});
