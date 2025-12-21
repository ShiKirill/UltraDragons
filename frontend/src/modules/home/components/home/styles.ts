import { createStyleMap } from "@/shared/utils/createStyleMap";

export const styles = createStyleMap((theme) => ({
  wrapper: {
    flex: 1,
    display: "flex",
    height: "100%",
  },
  left: {
    flexBasis: "60%",
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    justifyContent: "center",
  },
  right: {
    position: "relative",
    flexBasis: "40%",

    "&:after": {
      content: '""',
      position: "absolute",
      top: '10%',
      left: 0,
      width: "1px",
      height: "80%",
      backgroundColor: theme.palette.divider,
    },
  },
}));
