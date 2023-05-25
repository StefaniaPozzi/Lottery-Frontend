"use client";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import { Sepolia } from "@thirdweb-dev/chains";

export default function Header() {
  return (
    <div className="border-y-4 border-amber-600">
      <ConnectWallet />
    </div>
  );
}
