import { createStyleMap } from "@/shared/utils/createStyleMap";

export const styles = createStyleMap(() => ({
  wrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "64px",
    width: "100%",
  },

  copyright: {
    color: "text.secondary",
    fontSize: "14px",
    fontWeight: 500,
  },

  links: {
    display: "flex",
    gap: "24px",
    alignItems: "center",
  },

  link: {
    fontSize: "14px",
    fontWeight: 400,
    color: "text.secondary",
    textDecoration: "none",
    transition: "color 0.2s ease-in-out",

    "&:hover": {
      color: "primary.main",
      textDecoration: "none",
    },
  },

  version: {
    fontSize: "12px",
    fontWeight: 400,
    color: "text.disabled",
  },
}));
