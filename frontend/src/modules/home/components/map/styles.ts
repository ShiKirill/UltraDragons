import Image from "next/image";

import { createStyleMap } from "@/shared/utils/createStyleMap";
import { styled } from "@mui/material/styles";

export const styles = createStyleMap(() => ({
  wrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
}));

export const StyledImage = styled(Image)(({ theme }) => ({
  objectFit: "cover",
  [theme.breakpoints.down("md")]: {
    width: "200px",
    height: "300px",
  },
}));
