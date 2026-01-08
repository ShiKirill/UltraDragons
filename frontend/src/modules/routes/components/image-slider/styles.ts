import { createStyleMap } from "@/shared/utils/createStyleMap";

export const styles = createStyleMap(() => ({
  wrapper: {
    position: "relative",
    height: "100%",
  },

  sliderWrapper: {
    height: "100%",

    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      borderRadius: "60px 60px 0 0",
    },
  },

  dots: {
    position: "absolute",
    bottom: "10%",
    left: "50%",
    transform: "translate(-50%, -50%)",

    display: "flex",
    gap: "4px",

    "& button": {
      width: 8,
      height: 8,
      borderRadius: "50%",
      border: "none",
      background: "rgba(255, 255, 255, 0.7)",
      opacity: 0.5,
      transition: "opacity 0.3s",

      "&.active": {
        opacity: 1,
      },
    },
  },
}));
