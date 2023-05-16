"use client";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, sepolia } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

import Header from "../components/Header";
import Entrance from "../components/Entrance";
import MoralisNextApi from "../api/moralis/exportAPI.ts";

const chainList = [mainnet, sepolia];

const { chains, provider } = configureChains(chainList, [publicProvider()]);

// const { connectors } = getDefaultWallets({
//   appName: "Lottery",
//   projectId: ,
//   chains,
// });

// const wagmiConfig = createConfig({
//   autoConnect: true,
//   connectors,
//   provider,
// });

export default function Content() {
  console.log(MoralisNextApi);
  return <>test</>;
}
