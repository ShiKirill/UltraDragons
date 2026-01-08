import { createStyleMap } from "@/shared/utils/createStyleMap";

export const styles = createStyleMap(() => ({
  wrapper: {
    width: "134px",
    height: "134px",
    backgroundColor: "black",
    transition: "transform 0.3s",

    "& path": {
      fill: "#AD4F44",
      transition: "opacity 0.3s",
    },

    "&:hover path": {
      opacity: 0.8,
    },

    "&:active ": {
      transform: "scale(0.95)",
    },

    "& svg": {
      transform: "scale(0.8)",
    },
  },
}));
