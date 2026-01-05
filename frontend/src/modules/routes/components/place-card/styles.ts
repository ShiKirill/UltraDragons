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
    height: "800px",

    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      borderRadius: "60px 60px 0 0",
    },
  },
  textWrapper: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    minHeight: "500px",
  },

  buttonWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    rowGap: "8px",
    width: "264px",
    marginInline: "auto",
    marginBottom: '50px',

    "& .MuiButton-root": {
      height: "80px",
      fontSize: "28px",
      fontWeight: 700,
      borderRadius: "40px",
    },
  },
}));
