import type { AppProps } from "next/app";
import { Roboto } from "next/font/google";

import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Layout } from "@/components/layout";

import "@/styles/globals.css";
import { theme } from "@/styles/theme";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <Component className={roboto.className} {...pageProps} />
        </Layout>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
