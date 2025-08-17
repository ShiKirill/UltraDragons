import type { ReactNode } from "react";

import { Box, SxProps } from "@mui/material";

import { styles } from "./styles";

interface IProps {
  children: ReactNode;
  sx?: SxProps;
}

export const PageWrapper = (props: IProps) => {
  const { children, sx } = props;

  return (
    <Box
      height={"100%"}
      padding={{ zero: `0 28px`, lg: "0 20px" }}
      sx={{ ...styles.wrapper, ...sx }}
    >
      {children}
    </Box>
  );
};
