import type { ReactNode } from "react";

import { useRouter } from "next/router";

import { SideBar } from "@/shared/components/base/sidebar";
import { AppFooter } from "@/shared/components/layout/components/app-footer";
import { AppHeader } from "@/shared/components/layout/components/app-header";
import { Box } from "@mui/material";

import { styles } from "./styles";

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
