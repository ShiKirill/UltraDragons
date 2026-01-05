import { createStyleMap } from "@/shared/utils/createStyleMap";

export const styles = createStyleMap(() => ({
  wrapper: {
    height: "80vh",
    maxHeight: "80vh",
    display: "flex",
    flexDirection: "column",
    marginBlock: "auto",
  },

  buttonWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    rowGap: "8px",
    width: "264px",
    marginInline: "auto",

    "& .MuiButton-root:first-of-type": {
      height: "80px",
      fontSize: "28px",
      fontWeight: 700,
      borderRadius: "40px",
    },

    "& .MuiButton-root:last-of-type": {
      width: "fit-content",
      marginInline: "auto",
    },
  },
}));
