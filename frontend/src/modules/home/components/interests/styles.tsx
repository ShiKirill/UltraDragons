import { createStyleMap } from "@/shared/utils/createStyleMap";

export const styles = createStyleMap(() => ({
  wrapper: {
    display: "flex",
    flexWrap: "wrap",
    gap: "16px",
  },

  interest: {
    display: "flex",
    alignItems: "center",
    columnGap: "4px",
    width: "fit-content",
    p: "4px 8px",
    cursor: "pointer",
    textTransform: "uppercase",
    color: "#776F6F",
  },

  selected: {
    outline: "1px solid currentColor",
    borderRadius: "16px",
    color: "#9B9863",
  },

  image: {
    objectFit: "cover",
    borderRadius: "50%",
  },
}));
