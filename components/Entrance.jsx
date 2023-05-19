import {
  useAddress,
  useContract,
  useChainId,
  useContractRead,
  useContractWrite,
  Web3Button,
} from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
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
  const { mutateAsync, error } = useContractWrite(contract, "buyTicket");
  const resultTicketPrice = data ? data.toString() : null;
  const amount = ethers.utils.parseEther("0.1");
  useEffect(() => {
    if (chainId && address) {
      setTicketPrice(resultTicketPrice);
    }
  }, [resultTicketPrice]);

  return (
    <div>
      {address && contract ? (
        <div>
          <Web3Button
            contractAddress={currentContractAddress}
            action={() => {
              mutateAsync({
                args: [],
                overrides: { value: amount },
              });
            }}
          >
            Send Transaction
          </Web3Button>
          <p>
            Current ticket price:
            {ticketPrice
              ? ethers.utils.formatUnits(ticketPrice, "ether")
              : ""}{" "}
            ETH
          </p>
        </div>
      ) : (
        <div>Connect a wallet to enjoy my amazing features</div>
      )}
    </div>
  );
}
