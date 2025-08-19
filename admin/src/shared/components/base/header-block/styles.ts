import { createStyleMap } from "@/shared/utils/createStyleMap";

export const styles = createStyleMap({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    rowGap: "8px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
});
