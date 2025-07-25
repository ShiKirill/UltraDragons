import type { Theme } from "@emotion/react";
import type { Components, CssVarsTheme } from "@mui/material";

const components: Components<
  Omit<Theme, "components" | "palette"> & CssVarsTheme
> = {
  MuiButtonBase: {
    defaultProps: {
      disableRipple: true,
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        boxShadow: "none",
      },
    },
  },
};

export default components;
