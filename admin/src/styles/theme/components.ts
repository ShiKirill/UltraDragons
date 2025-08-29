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
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: "12px",
        textTransform: "none",
        lineHeight: "24px",
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        borderRadius: "12px",
      },
    },
  },
  MuiModal: {
    styleOverrides: {
      root: {
        "& .MuiBox-root": {
          border: "none",
        },
      },
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
