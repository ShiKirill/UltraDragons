import { createStyleMap } from "@/shared/utils/createStyleMap";

export const styles = createStyleMap(() => ({
  inputWrapper: {
    position: "relative",
    width: "100%",
  },

  input: {
    width: "100%",
  },

  errorMessage: {
    position: "absolute",
    bottom: "-16px",
    left: "12px",
    color: "error.main",
    fontSize: "10px",
    fontWeight: 400,
  },
}));
