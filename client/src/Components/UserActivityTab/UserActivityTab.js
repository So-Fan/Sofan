import React, { useEffect, useMemo, useState } from "react";
import "./UserActivityTab.css";
import { v4 as uuidv4 } from "uuid";
import Web3 from "web3";
import useEth from "../../contexts/EthContext/useEth";
const UserActivityTab = ({ nftsFromOwner, transferNftDataApi, ethPrice }) => {
  const [reversedNftsFromOwner, setReversedNftsFromOwner] = useState([]);
  const [transferDate, setTransferDate] = useState([]);

  const [AllTx, setAllTx] = useState([]);
  const [AllSofanCollection, setAllSofanCollection] = useState([]);

  const { marketplaceAddress } = useEth();

  useMemo(() => {
    if (AllTx.length != 0 && AllSofanCollection.length != 0) {
      console.log(AllTx);
      console.log(AllSofanCollection);
      let tempFilterArray = [];
      let tempConcatArray = [];
      for (let i = 0; i < AllTx.result.length; i++) {
        const txElement = AllTx.result[i];
        // console.log("first");
        // Handle Collection specific tx
        for (let i = 0; i < AllSofanCollection.length; i++) {
          const collectionAddressElement = AllSofanCollection[i];
          // Check if Mint
          if (
            collectionAddressElement.toLowerCase() ===
              txElement.to.toLowerCase() &&
            txElement.functionName.split("(")[0] === "mint" &&
            txElement.isError === "0"
          ) {
            // Add tx to mint array
            let tempObj = { ...txElement, functionName: "Mint" };
            // Peut etre array séparé pour les mint puis push mintArray Elem en fonction du timestamp dans tempConcatArray
            tempConcatArray.push(tempObj);
            console.log(tempObj);
          }
        }
        // add if else to handle marketPlace address tx
        if (
          // TODO: only for test. should be replaced by marketplaceAddress.
          "0x7082cc65e582de32a7cad11fdc396b02490b97dd".toLowerCase() ===
            txElement.to.toLowerCase() &&
          txElement.functionName.split("(")[0] === "listToSell" &&
          txElement.isError === "0"
        ) {
          let tempObj = { ...txElement, functionName: "List" };
          tempConcatArray.push(tempObj);
          console.log(tempObj);
        }
        if (
          // TODO: only for test. should be replaced by marketplaceAddress.
          "0x7082cc65e582de32a7cad11fdc396b02490b97dd".toLowerCase() ===
            txElement.to.toLowerCase() &&
          txElement.functionName.split("(")[0] === "cancelListing" &&
          txElement.isError === "0"
        ) {
          let tempObj = { ...txElement, functionName: "Cancel" };
          tempConcatArray.push(tempObj);
          console.log(tempObj);
        }
        if (
          // TODO: only for test. should be replaced by marketplaceAddress.
          "0x7082cc65e582de32a7cad11fdc396b02490b97dd".toLowerCase() ===
            txElement.to.toLowerCase() &&
          txElement.functionName.split("(")[0] === "buyListing" &&
          txElement.isError === "0"
        ) {
          let tempObj = { ...txElement, functionName: "Buy" };
          tempConcatArray.push(tempObj);
          console.log(tempObj);
        }
        if (
          // TODO: only for test. should be replaced by marketplaceAddress.
          "0x7082cc65e582de32a7cad11fdc396b02490b97dd".toLowerCase() ===
            txElement.to.toLowerCase() &&
          txElement.functionName.split("(")[0] === "acceptBid" &&
          txElement.isError === "0"
        ) {
          let tempObj = { ...txElement, functionName: "Bid sell" };
          tempConcatArray.push(tempObj);
          console.log(tempObj);
        }
        if (
          // TODO: only for test. should be replaced by marketplaceAddress. Use this if in offer made
          // Not display in Activity but in offers made so use different array
          "0x7082cc65e582de32a7cad11fdc396b02490b97dd".toLowerCase() ===
            txElement.to.toLowerCase() &&
          txElement.functionName.split("(")[0] === "placeBid" &&
          txElement.isError === "0"
        ) {
          // Not needed
          let tempObj = { ...txElement, functionName: "placeBid" };
          // tempConcatArray.push(tempObj);
          console.log(tempObj);
        }
      }
    }
  }, [AllTx, AllSofanCollection]);
  useEffect(() => {
    console.log("nftsFromOwner", nftsFromOwner);
    console.log("transferNftDataApi", transferNftDataApi);
    console.log("ethPrice", ethPrice);
    const reversedNftsFromOwner = nftsFromOwner.slice().reverse();
    setReversedNftsFromOwner(reversedNftsFromOwner);

    const nftTransferDate = [];
    function concatStringFromTo(
      string,
      maxLentgth,
      from0To_NUMBER_,
      isDotDotDot,
      isEnd
    ) {
      if (string.length > maxLentgth) {
        const stringBegin = string.slice(0, from0To_NUMBER_);
        const dotDotDot = "...";
        const stringEnd = string.slice(string.length - 3, string.length);
        if (!isDotDotDot && !isEnd) {
          return stringBegin;
        } else if (isDotDotDot && !isEnd) {
          return stringBegin + dotDotDot;
        } else if (isDotDotDot && isEnd) {
          return stringBegin + dotDotDot + stringEnd;
        } else {
          return string;
        }
      } else {
        return string;
      }
    }

    // Boucle pour concat UserActivity des données API - FROM
    for (let i = 0; i < transferNftDataApi.transfers.length; i++) {
      transferNftDataApi.transfers[i].from = concatStringFromTo(
        transferNftDataApi?.transfers[i]?.from,
        7,
        7,
        false,
        false
      );
    }
    // Boucle pour concat UserActivity des données API - TO
    for (let i = 0; i < transferNftDataApi.transfers.length; i++) {
      transferNftDataApi.transfers[i].to = concatStringFromTo(
        transferNftDataApi?.transfers[i]?.to,
        7,
        7,
        false,
        false
      );
    }
    // Boucle pour convertir les dates
    for (let i = 0; i < transferNftDataApi.transfers.length; i++) {
      const dateString =
        transferNftDataApi?.transfers[i]?.metadata?.blockTimestamp;
      const date = new Date(Date.parse(dateString));

      // Formater la date
      const formattedDate = date.toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
      // console.log(formattedDate);
      nftTransferDate.push(formattedDate);
    }
    setTransferDate(nftTransferDate);

    const web3Instance = new Web3(
      new Web3.providers.HttpProvider(process.env.REACT_APP_INFURA_ID)
    );
    const { abi } = require("../../contracts/Sofan.json");
    const contract = new web3Instance.eth.Contract(
      abi,
      // Replace this with the address of your deployed contract
      marketplaceAddress
    );
    const load = async () => {
      const tx = await contract.methods.getAllCollection().call();
      setAllSofanCollection(tx);
      console.log("je suis", tx);

      const fetcho = await fetch(
        "https://api-goerli.etherscan.io/api?module=account&action=txlist&address=0xd423DCBd697164e282717009044312fDBC6C04f0&startblock=9458446&endblock=99999999&page=1&offset=20&sort=desc&apikey=C8MCC8GR9PSJYDKJ35RSZD93IVEJIT2ACV"
      );
      const data = await fetcho.json();
      setAllTx(data);
    };
    load();
  }, []);
  return (
    <>
      <div className="useractivitytab-component">
        <div className="useractivitytab-table-container">
          <div></div>
          <div>NFT</div>
          <div>Price</div>
          <div>Quantity</div>
          <div></div>
          <div>from</div>
          <div>To</div>
          <div></div>
          <div>Date</div>
        </div>
        <div className="useractivitytab-content-container">
          {reversedNftsFromOwner?.map((tx, index, apiNftData) => (
            <div
              key={uuidv4()}
              className="useractivitytab-content-container-wrap"
            >
              <div className="useractivitytab-content-container-methods-wrap">
                <span>{tx.function}</span>
              </div>
              <div className="useractivitytab-content-container-nft-wrap">
                <img src={apiNftData[index]?.media[0]?.gateway} alt="nft" />
                <div className="useractivitytab-content-container-nft-wrap-info-wrap">
                  <span>{apiNftData[index]?.contract?.name}</span>
                  <span>#{apiNftData[index]?.tokenId}</span>
                </div>
              </div>
              <div className="useractivitytab-content-container-price-container">
                <div className="useractivitytab-content-container-price-wrap">
                  <span>
                    {apiNftData[index]?.contract?.openSea?.floorPrice} ETH
                  </span>
                  <span>
                    {(
                      apiNftData[index]?.contract?.openSea?.floorPrice *
                      ethPrice
                    ).toLocaleString("fr-FR", {
                      maximumFractionDigits: 1,
                    })}{" "}
                    €
                  </span>
                </div>
              </div>
              <div className="useractivitytab-content-container-qty-wrap">
                <span>{apiNftData[index]?.balance}</span>
              </div>
              <div></div>
              <div className="useractivitytab-content-container-from-wrap">
                <span>{transferNftDataApi.transfers[index].from}</span>
              </div>
              <div>
                <span>{transferNftDataApi.transfers[index].to}</span>
              </div>
              <div></div>
              <div>
                <span>{transferDate ? transferDate[index] : ""}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default UserActivityTab;
