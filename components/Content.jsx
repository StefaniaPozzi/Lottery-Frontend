"use client";
import {
  EthereumClient,
  w3mProvider,
  w3mConnectors,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createConfig, WagmiConfig, sepolia } from "wagmi";
import { createPublicClient, http } from "viem";
import Header from "../components/Header";

const chains = [sepolia];
const projectId = process.env.WALLET_CONNECT_PROJECT_ID;

const { provider } = configureChains(chains, [w3mProvider({ projectId })]);

const wagmiConfig = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: sepolia,
    transport: http(),
  }),
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  provider,
});

const ethereumClient = new EthereumClient(wagmiConfig, chains);

export default function Content() {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <Header />
      </WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  );
}
