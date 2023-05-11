import { Web3Button } from "@web3modal/react";
import { useAccount } from "wagmi";
import { useState } from "react";

export default function Header() {
  const { address, connector, isConnected, isDisconnected } = useAccount();
  let msgWalletStatus = useState("Wallet disconnected");

  if (isDisconnected) msgWalletStatus = "Wallet Disconnected";
  if (isConnected) msgWalletStatus = "Wallet Connected";

  return (
    <>
      {msgWalletStatus}
      <Web3Button icon="show" label="Connect Wallet" balance="show" />
    </>
  );
}
