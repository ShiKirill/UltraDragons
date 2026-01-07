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
  description: {
    display: "flex",
    minWidth: 0,
  },
  list: {
    listStyle: "none",
    minWidth: 0,
  },
  listItemIcon: {
    display: "flex",
    flexShrink: 0,
  },
  listItem: {
    display: "flex",
    alignItems: "center",
    columnGap: "8px",

    "& .MuiTypography-root": {
      width: "100%",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
  },
}));
