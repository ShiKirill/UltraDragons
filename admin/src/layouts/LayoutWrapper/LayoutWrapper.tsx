import type { ReactNode } from "react";

import { useRouter } from "next/router";

import { Layout } from "@/layouts/Layout";

interface IProps {
  children: ReactNode;
}

export const LayoutWrapper = ({ children }: IProps) => {
  const router = useRouter();

  const pagesWithoutLayout = ["/404", "/500", "/_error"];

  const isErrorPage = pagesWithoutLayout.includes(router.pathname);

  if (isErrorPage) {
    return <>{children}</>;
  }

  return <Layout>{children}</Layout>;
};
