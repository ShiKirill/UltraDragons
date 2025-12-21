"use client";

import { type PropsWithChildren, useState } from "react";

import { AuthProvider } from "@/modules/auth/context";
import { LocaleProvider } from "@/shared/providers/locale-provider";
import { theme } from "@/shared/styles/theme";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const ClientProviders = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <LocaleProvider>
          <AuthProvider>{children}</AuthProvider>
        </LocaleProvider>
      </QueryClientProvider>
      <CssBaseline />
    </ThemeProvider>
  );
};
