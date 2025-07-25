import type { AppProps } from "next/app";
import { Roboto } from "next/font/google";

import { LayoutWrapper } from "@/layouts/LayoutWrapper/LayoutWrapper";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import "@/styles/globals.css";
import { theme } from "@/styles/theme";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LayoutWrapper>
        <Component className={roboto.className} {...pageProps} />
      </LayoutWrapper>
    </ThemeProvider>
  );
}
