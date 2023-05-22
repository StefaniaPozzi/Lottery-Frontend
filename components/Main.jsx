"use client";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Sepolia } from "@thirdweb-dev/chains";
import { NotificationProvider } from "web3uikit";
import Content from "./Content";

export default function Main() {
  const connectors = {
    injected: {},
  };

  return (
    <ThirdwebProvider activeChain={Sepolia} connectors={connectors}>
      <NotificationProvider>
        <Content />
      </NotificationProvider>
    </ThirdwebProvider>
  );
}
