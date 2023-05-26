"use client";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";

export default function Header() {
  return (
    <div className="border-b-2  border-amber-600">
      <div className="grid grid-cols-4 gap-4">
        <div className="text-2xl"> Decentralized Lottery</div>
        <div></div>
        <div></div>
        <div>
          <ConnectWallet />
        </div>
      </div>
    </div>
  );
}
