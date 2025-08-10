import type { ReactNode } from "react";

import { useRouter } from "next/router";

import { Box } from "@mui/material";

import { SideBar } from "@/components/base/SideBar";
import { AppFooter, AppHeader } from "@/components/layout";

import { styles } from "./Layout.styles";

interface IProps {
  children: ReactNode;
}

export const Layout = ({ children }: IProps) => {
  const router = useRouter();

  const pagesWithoutLayout = ["/404", "/500", "/_error"];
  const isErrorPage = pagesWithoutLayout.includes(router.pathname);

  if (isErrorPage) {
    return <>{children}</>;
  }

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
