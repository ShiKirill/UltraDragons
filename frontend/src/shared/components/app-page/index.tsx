"use client";

import { PropsWithChildren, Suspense } from "react";

import { Container } from "@mui/material";

import { styles } from "./styles";

export const AppPage = ({ children }: PropsWithChildren) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Container sx={styles.container}>{children}</Container>
    </Suspense>
  );
};
