import type { ReactNode } from "react";

import { Box } from "@mui/material";

import { SideBar } from "@/components/base/SideBar";
import { AppFooter, AppHeader } from "@/components/layout";

import { styles } from "./Layout.styles";

interface IProps {
  children: ReactNode;
}

export const Layout = ({ children }: IProps) => {
  return (
    <Box sx={styles.wrapper}>
      <Box sx={styles.mainContainer}>
        <SideBar />

        <Box sx={styles.contentWrapper}>
          <AppHeader />

          <Box component="main" sx={styles.content}>
            {children}
          </Box>
        </Box>
      </Box>

      <AppFooter />
    </Box>
  );
};
