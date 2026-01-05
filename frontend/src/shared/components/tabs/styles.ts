import { createStyleMap } from "@/shared/utils/createStyleMap";

export const styles = createStyleMap(() => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    height: "100%",

    "& .MuiTabs-list": {
      justifyContent: "space-between",
    },
  },

  tabsWrapper: {
    flex: 1,
    minHeight: 0,
  },

  tabsContent: {
    padding: 3,
    height: "100%",
    overflowY: "auto",
    overflowX: "hidden",
  },
}));
