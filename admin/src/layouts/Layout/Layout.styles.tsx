import { createStyleMap } from "@/shared/utils/createStyleMap";

export const styles = createStyleMap(() => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight: "100vh",
    height: "100%",
    padding: "16px",
  },

  mainContainer: {
    display: "flex",
    columnGap: "16px",
  },

  contentWrapper: {
    display: "flex",
    flexDirection: "column",
    rowGap: "16px",
    width: "100%",
    overflow: "hidden",
  },

  content: {
    padding: "32px",
    borderRadius: "16px",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
}));
