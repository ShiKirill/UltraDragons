import { createStyleMap } from "@/shared/utils/createStyleMap";

export const styles = createStyleMap(() => ({
  wrapper: {
    display: "flex",
    marginBlock: "auto",
  },

  buttonWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    rowGap: "8px",
    width: "264px",
    height: "100%",
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
