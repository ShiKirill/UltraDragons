import { createStyleMap } from "@/shared/utils/createStyleMap";

export const styles = createStyleMap(() => ({
  modal: {
    "& .MuiPaper-root": {
      border: "none",
      borderRadius: "24px",
    },
  },

  closeIcon: {
    position: "absolute",
    top: "20px",
    right: "20px",
    cursor: "pointer",
  },
}));
