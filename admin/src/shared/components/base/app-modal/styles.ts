import { createStyleMap } from "@/shared/utils/createStyleMap";

export const styles = createStyleMap({
  wrapper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "1px solid #000",
    borderRadius: "24px",
    p: "24px",
  },
});
