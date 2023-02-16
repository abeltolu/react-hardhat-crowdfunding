import "@/styles/globals.css";
import { MantineProvider } from "@mantine/core";
import type { AppProps } from "next/app";
import { Inter } from "@next/font/google";
import { CrowdFundingProvider } from "@/context/crowdfunding";

const inter = Inter({
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-inter: ${inter.style.fontFamily};
          }
        `}
      </style>
      <MantineProvider
        theme={{ fontFamily: "var(--font-inter)", primaryColor: "violet" }}
        withCSSVariables
        withGlobalStyles
        withNormalizeCSS
      >
        <CrowdFundingProvider>
          <Component {...pageProps} />
        </CrowdFundingProvider>
      </MantineProvider>
    </>
  );
}
