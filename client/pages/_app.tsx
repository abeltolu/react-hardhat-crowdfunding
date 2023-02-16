import "@/styles/globals.css";
import { MantineProvider } from "@mantine/core";
import type { AppProps } from "next/app";
import { Inter } from "@next/font/google";
import Head from "next/head";
import { MoralisProvider } from "react-moralis";
import { WagmiConfig, createClient, configureChains } from "wagmi";
import { hardhat } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from "wagmi/providers/alchemy";
//import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { InjectedConnector } from "wagmi/connectors/injected";
import dynamic from "next/dynamic";
const CrowdFundingProvider = dynamic(() => import("../context/crowdfunding"), { ssr: false });

const { chains, provider, webSocketProvider } = configureChains(
  [hardhat],
  [
    alchemyProvider({ apiKey: process.env["NEXT_PUBLIC_ALCHEMY_KEY"] as string, priority: 0 }),
    publicProvider({ priority: 1 }),
  ]
);

const connector = new InjectedConnector({ chains });

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
  connectors: [connector],
});

const inter = Inter({ subsets: ["latin"] });

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
      <Head>
        <title>CrowdFundr.io - Built by @abeltolu</title>
        <meta name="description" content="CrowdFunding DAPP built with React and Hardhat" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="author" content="@abeltolu" />
      </Head>
      <WagmiConfig client={client}>
        {/* <MoralisProvider initializeOnMount={false}> */}
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
        {/* </MoralisProvider> */}
      </WagmiConfig>
    </>
  );
}
