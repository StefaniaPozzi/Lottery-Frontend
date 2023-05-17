"use client";
import {
  useAddress,
  useContract,
  useChainId,
  useContractRead,
} from "@thirdweb-dev/react";
import { contractAddress, contractABI } from "../constants/index.js";
export default function () {
  let dataFromContract = "";
  const address = useAddress();
  const chainId = useChainId();
  if (chainId) {
    const currentContractAddress = contractAddress[chainId][0];
    const { contract } = useContract(currentContractAddress, contractABI);

    const { data: costant } = useContractRead(contract, "getConstant");
    dataFromContract = costant;
    console.log(costant);
  }
  if (!address)
    return <div>Connect to a wallet to enjoy my amazing features </div>;
  return <p>Getting data from the smartcontract</p>;
}
