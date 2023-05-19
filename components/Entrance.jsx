import {
  useAddress,
  useContract,
  useChainId,
  useContractRead,
} from "@thirdweb-dev/react";
import { useEffect, useState, useRef } from "react";
import { contractAddress, contractABI } from "../constants/index.js";
import { ethers } from "ethers";

export default function MyComponent() {
  const address = useAddress();
  const chainId = useChainId();
  const [ticketPrice, setTicketPrice] = useState(0);

  const currentContractAddress = chainId ? contractAddress[chainId][0] : null;
  const { contract } = useContract(currentContractAddress, contractABI);
  //rebuild to see changes
  const { data } = useContractRead(contract, "getTicketPrice");
  const resultTicketPrice = data ? data.toString() : null;

  useEffect(() => {
    if (chainId && address) {
      setTicketPrice(resultTicketPrice);
    }
  }, [address]);

  if (!address)
    return <div>Connect to a wallet to enjoy my amazing features</div>;

  return (
    <div>
      Current ticket price:
      <p>
        {ticketPrice ? ethers.utils.formatUnits(ticketPrice, "ether") : ""} ETH
      </p>
    </div>
  );
}
