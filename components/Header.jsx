import { Web3Button } from "@web3modal/react";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export default function Header() {
  const { isConnected, isDisconnected, address } = useAccount();
  const [msgWalletStatus, setMsgWalletStatus] = useState("Wallet connected");

  useEffect(() => {
    if (isConnected) {
      setMsgWalletStatus("Wallet Connected");
      console.log("is connected");
    }
    if (isDisconnected) {
      setMsgWalletStatus("Wallet Disconnected");
      console.log("is disconnected");
    }
  }, [isConnected]);

  useEffect(() => {
    if (address != null) console.log(`account changed to ${address}`);
  }, [address]);

  return (
    <>
      <p>
        <Web3Button
          icon="show"
          label="Connect Wallet"
          balance="show"
          enableExplorer="true"
        />
        {msgWalletStatus}
      </p>
      <h1>Decentralized Lottery</h1>
    </>
  );
}
