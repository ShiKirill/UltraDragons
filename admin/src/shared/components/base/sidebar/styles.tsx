import { createStyleMap } from "@/shared/utils/createStyleMap";

export const styles = createStyleMap(() => ({
  sidebar: {
    display: "flex",
    flexDirection: "column",

    height: "100%",
    width: "25%",
    padding: "16px",
    background: "linear-gradient(180deg, #2c3e50 0%, #34495e 100%)",
    borderRadius: "16px",
  },

  list: {
    padding: 0,
  },

  navItem: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    marginBottom: "4px",
    color: "rgba(255, 255, 255, 0.8)",
    borderRadius: "16px",
    transition: "background-color 0.2s ease-in-out",

    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      color: "white",
    },
  },

  navItemActive: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    color: "white",
    fontWeight: 600,
  },

  navItemIcon: {
    fontSize: "24px",
  },
}));
