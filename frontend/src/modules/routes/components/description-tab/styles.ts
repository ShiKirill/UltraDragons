import { createStyleMap } from "@/shared/utils/createStyleMap";

export const styles = createStyleMap(() => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    rowGap: "20px",
    paddingTop: "22px",
  },
  header: {
    display: "flex",
  },
  content: {
    display: "grid",
    gridTemplateColumns: "1fr 1px 1fr",
    columnGap: "24px",
    rowGap: "20px",
  },
  contentRight: {},
}));
