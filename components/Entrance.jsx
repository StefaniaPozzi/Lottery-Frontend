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

  const handleBuyTicketSuccess = () => {
    notificationDispatch({
      type: "info",
      message: "Transaction completed",
      title: "Success",
      position: "topR",
    });
  };

  const handleRejectedTx = () => {
    notificationDispatch({
      type: "info",
      message: "Transaction rejected",
      title: "Failed",
      position: "topR",
    });
  };
  return (
    <div>
      {address && contract ? (
        <div>
          <Web3Button
            className=" hover:bg-amber-500"
            contractAddress={currentContractAddress}
            action={async () => {
              txReceipt = await mutateAsync({
                args: [],
                overrides: { value: amount },
              }).catch((e) => {
                console.log("mutate error");
              });

              txReceipt
                .then((val) => {
                  if (val["receipt"]["status"] == "0x1") {
                    handleBuyTicketSuccess();
                  }
                  console.log(
                    `Event: ${EventLottery__TicketBuyed[0]["eventName"]}`
                  );
                })
                .catch((err) => handleRejectedTx());
            }}
            onError={(error) => console.log(error)}
            isDisabled={isLoading}
          >
            {isLoading ? (
              <div className="animate-spin">Processing...</div>
            ) : (
              <div>Buy ticket</div>
            )}
          </Web3Button>
          <div className="text-amber-600">
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
