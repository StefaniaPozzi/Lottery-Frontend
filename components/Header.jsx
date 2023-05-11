import { Web3Button } from "@web3modal/react";
import { useAccount } from "wagmi";

export default function Header() {
  const { address, connector, isConnected, isDisconnected } = useAccount();
  let msgWalletStatus = "";

  if (isDisconnected) msgWalletStatus = <div>Wallet disconnect</div>;
  if (isConnected) msgWalletStatus = <div> {address} Connected</div>;

  return (
    <>
      {msgWalletStatus}
      <Web3Button icon="show" label="Connect Wallet" balance="show" />
    </>
  );
}
