import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export default function Header() {
  const { isConnected, isDisconnected, address } = useAccount();
  const [msgWalletStatus, setMsgWalletStatus] = useState("Wallet connected");

  useEffect(() => {
    if (isConnected) {
      setMsgWalletStatus("Wallet Connected");
    }
    if (isDisconnected) {
      setMsgWalletStatus("Wallet Disconnected");
    }
  }, [isConnected]);

  useEffect(() => {
    if (address != null) console.log(`account changed to ${address}`);
  }, [address]);

  return (
    <>
      <h1>Decentralized Lottery</h1>
    </>
  );
}
