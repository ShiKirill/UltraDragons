import type { ReactNode } from "react";

import { Box, SxProps } from "@mui/material";

import { AppFooter } from "../AppFooter";
import { AppHeader } from "../AppHeader";

interface IProps {
  children: ReactNode;
  /** Стили для верхней обертки страницы */
  wrapperSx?: SxProps;
  /** Стили для внутренней обертки (main) */
  bodySx?: SxProps;
  /** Стили для header */
  headerSx?: SxProps;
  /** Стили для footer */
  footerSx?: SxProps;
}

export const PageWrapper = (props: IProps) => {
  const { children, bodySx, wrapperSx, headerSx, footerSx } = props;

  return (
    <Box height={"100%"} sx={wrapperSx}>
      <AppHeader />

      <Box component="main" sx={bodySx}>
        {children}
      </Box>

      <AppFooter />
    </Box>
  );
};
