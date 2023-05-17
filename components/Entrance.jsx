"use client";
import { useAddress } from "@thirdweb-dev/react";

export default function () {
  const address = useAddress();
  if (!address)
    return <div>Connect to a wallet to enjoy my amazing features</div>;
  return "entrance";
}
