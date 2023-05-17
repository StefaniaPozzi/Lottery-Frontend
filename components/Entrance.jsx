import { ConnectWallet, useSigner } from "@thirdweb-dev/react";

export default function Entrance() {
  const address = useSigner();

  console.log(address);
  return (
    <div>
      <ConnectWallet />
      <p>Section content goes here.</p>
    </div>
  );
}
