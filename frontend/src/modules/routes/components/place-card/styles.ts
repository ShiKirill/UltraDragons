import { createStyleMap } from "@/shared/utils/createStyleMap";

export const styles = createStyleMap(() => ({
  wrapper: {
    display: "flex",
    marginTop: "auto",
    overflow: "hidden",
    columnGap: "60px",
    width: "100%",
  },
  imageWrapper: {
    maxWidth: "536px",
    width: "100%",
  },
  textWrapper: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    minHeight: "500px",
    height: "800px",
  },

  buttonWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    rowGap: "8px",
    columnGap: "32px",
    marginBottom: "50px",

    "& .MuiButton-root": {
      height: "80px",
      fontSize: "28px",
      fontWeight: 700,
      borderRadius: "40px",
    },
  },
}));
