import {
  useAddress,
  useContract,
  useChainId,
  useContractRead,
  useContractWrite,
  useContractEvents,
  Web3Button,
} from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import { contractAddress, contractABI } from "../constants/index.js";
import { useNotification } from "web3uikit";
import { ethers } from "ethers";

export default function MyComponent() {
  let txReceipt;
  const address = useAddress();
  const chainId = useChainId();
  const [ticketPrice, setTicketPrice] = useState(0);
  const [numPlayers, setNumPlayers] = useState(0);
  const [recentWinner, setRecentWinner] = useState(0);

  const currentContractAddress = chainId ? contractAddress[chainId][0] : null;
  const { contract } = useContract(currentContractAddress, contractABI);
  //rebuild to see changes
  const { data: getTicketPrice } = useContractRead(contract, "getTicketPrice");
  const { data: getNumPlayers } = useContractRead(contract, "getNumPlayers");
  const { data: getRecentWinner } = useContractRead(
    contract,
    "getRecentWinner"
  );
  const { mutateAsync, isLoading, error } = useContractWrite(
    contract,
    "buyTicket"
  );

  const { data: EventLottery__TicketBuyed } = useContractEvents(
    contract,
    "EventLottery__TicketBuyed"
  );

  const notificationDispatch = useNotification();
  const resultTicketPrice = getTicketPrice ? getTicketPrice.toString() : null;
  const resultNumPlayers = getNumPlayers ? getNumPlayers.toString() : null;
  const resultRecentWinner = getRecentWinner
    ? getRecentWinner.toString()
    : null;
  const amount = ethers.utils.parseEther("0.001");

  useEffect(() => {
    if (chainId && address) {
      setTicketPrice(resultTicketPrice);
    }
  }, [resultTicketPrice]);

  useEffect(() => {
    if (chainId && address) {
      setNumPlayers(resultNumPlayers);
      setRecentWinner(resultRecentWinner);
    }
  }, [resultNumPlayers]);

  const handleNotification = () => {
    notificationDispatch({
      type: "info",
      message: "Transaction completed",
      title: "Success",
      position: "topR",
      icon: "bell",
    });
  };

  return (
    <div>
      {address && contract ? (
        <div>
          <Web3Button
            contractAddress={currentContractAddress}
            action={() => {
              txReceipt = mutateAsync({
                args: [],
                overrides: { value: amount },
              });
              txReceipt.then((val) => {
                if (val["receipt"]["status"] == "0x1") {
                  handleNotification();
                }
                console.log(
                  `Event: ${EventLottery__TicketBuyed[0]["eventName"]}`
                );
              });
            }}
            onError={(error) => console.log(error)}
            isDisabled={isLoading}
          >
            {/* <div>Loading..</div> */}
            <div>Buy your lottery ticket here!</div>
          </Web3Button>
          <div>
            Ticket price:{" "}
            {ticketPrice ? ethers.utils.formatUnits(ticketPrice, "ether") : ""}
            ETH
            <div>Players: {numPlayers ? numPlayers : ""}</div>
            <div>Recent winner: {recentWinner ? recentWinner : ""}</div>
          </div>
        </div>
      ) : (
        <div>Connect a wallet to enjoy my amazing features</div>
      )}
    </div>
  );
}
