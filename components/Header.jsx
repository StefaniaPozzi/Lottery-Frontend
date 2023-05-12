import { Web3Button } from "@web3modal/react";
import { useEffect } from "react";
import { useAccount } from "wagmi";

export default function Header() {
  const { isConnected, isDisconnected, accounts } = useAccount();
  let msgWalletStatus = "Wallet Disconnected";

  useEffect(() => {
    if (isConnected) {
      msgWalletStatus = "Wallet Disconnected";
      console.log("is connected");
    }
    if (!isConnected) {
      msgWalletStatus = "Wallet Connected";
      console.log("is disconnected");
    }
  }, [isConnected]);

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
    </>
  );
}
