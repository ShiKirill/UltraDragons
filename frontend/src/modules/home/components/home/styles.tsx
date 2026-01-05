import { createStyleMap } from "@/shared/utils/createStyleMap";

export const styles = createStyleMap(() => ({
  wrapper: {
    flex: 1,
    display: "flex",
    height: "100%",
  },
  mapWrapper: {
    flexBasis: "60%",
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    justifyContent: "center",
  },
  divider: {
    height: "85vh",
    marginBlock: "auto",
  },
}));
