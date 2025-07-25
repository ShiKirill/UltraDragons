import { createStyleMap } from "@/shared/utils/createStyleMap";

export const styles = createStyleMap(() => ({
  wrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "64px",
    width: "100%",
    padding: "0 24px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    borderRadius: "16px",
  },

  logo: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "white",
    fontSize: "24px",
    userSelect: "none",
  },

  logoIcon: {
    fontSize: "32px",
  },

  userMenu: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "white",
    cursor: "pointer",
    padding: "8px 12px",
    borderRadius: "16px",
    transition: "all 0.2s ease-in-out",

    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
  },
}));
