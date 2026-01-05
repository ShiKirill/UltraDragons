import type { Theme } from "@emotion/react";
import type { Components, CssVarsTheme } from "@mui/material";

export const components: Components<
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
      text: {
        "&:hover": {
          backgroundColor: "transparent",
        },
        "&:active": {
          backgroundColor: "transparent",
        },
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
