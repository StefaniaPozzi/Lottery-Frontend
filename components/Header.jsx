"use client";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import { Sepolia } from "@thirdweb-dev/chains";

export default function Header() {
  return (
    <div class="border border-indigo-600">
      <ConnectWallet />
    </div>
  );
}
