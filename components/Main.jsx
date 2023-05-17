"use client";
import {
  ThirdwebProvider,
  useAddress,
  ConnectWallet,
  useSigner,
} from "@thirdweb-dev/react";
import { Sepolia } from "@thirdweb-dev/chains";
import { useState, useEffect } from "react";
import Content from "./Content";

export default function Main() {
  const connectors = {
    injected: {},
  };

  return (
    <ThirdwebProvider activeChain={Sepolia} connectors={connectors}>
      <Content />
    </ThirdwebProvider>
  );
}
