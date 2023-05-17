"use client";
import {
  ThirdwebProvider,
  useAddress,
  ConnectWallet,
  useSigner,
} from "@thirdweb-dev/react";
import { Sepolia } from "@thirdweb-dev/chains";
import { useState, useEffect } from "react";
import Entrance from "./Entrance";

export default function Content() {
  const connectors = {
    injected: {},
  };
  // if (!address) return <div>No wallet connected</div>;

  // return <div>My wallet address is {address}</div>;
  // //
  // const [showSection, setShowSection] = useState(false);
  // return (
  //   <div>
  //     <button onClick={handleButtonClick}>
  //       {showSection ? "Hide Section" : "Show Section"}
  //     </button>
  //     {showSection && <Entrance />}
  //   </div>
  // );
  // const address = useAddress();
  // console.log(address);
  // if (!address)
  //   return (
  //     <div>
  //       This is an awesome designed Lottery!
  //       <div>Please connect your wallet to enjoy all its features</div>
  //     </div>
  //   );

  return (
    <ThirdwebProvider activeChain={Sepolia} connectors={connectors}>
      <Entrance />
    </ThirdwebProvider>
  );
}
