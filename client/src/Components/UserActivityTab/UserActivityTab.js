import React, { useEffect, useMemo, useState } from "react";
import "./UserActivityTab.css";
import { v4 as uuidv4 } from "uuid";
import Web3 from "web3";
import useEth from "../../contexts/EthContext/useEth";
import { Alchemy, Network } from "alchemy-sdk";
import { concatStringFromTo } from "../../Utils/concatString";
import { fr } from "date-fns/locale";
import { formatDistanceToNow } from "date-fns";
const UserActivityTab = ({ ethPrice, currentProfileUserWallet }) => {
  const [concatArray, setConcatArray] = useState([]);
  const [alchemyArray, setAlchemyArray] = useState([]);
  const [final, setFinal] = useState([]);
  const [AllTx, setAllTx] = useState([]);
  const [AllSofanCollection, setAllSofanCollection] = useState([]);
  const [allErc721Event, setAllErc721Event] = useState([]);
  const [web3Instance, setWeb3Instance] = useState();
  const { marketplaceAddress } = useEth();

  const settings = {
    apiKey: "34lcNFh-vbBqL9ignec_nN40qLHVOfSo",
    network: Network.ETH_GOERLI,
    maxRetries: 10,
  };
  const alchemy = new Alchemy(settings);

  useMemo(() => {
    if (AllTx.length != 0 && AllSofanCollection.length != 0) {
      console.log(AllTx);
      console.log(AllSofanCollection);
      let tempConcatArray = [];
      let tempAlchemyArray = [];
      for (let i = 0; i < AllTx.result.length; i++) {
        const txElement = AllTx.result[i];
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
            const decodedParams = web3Instance.eth.abi.decodeParameters(
              [
                { type: "address", name: "to" },
                { type: "uint256", name: "quantity" },
                { type: "uint256", name: "value" },
              ],
              txElement.input.slice(
                txElement.methodId.length,
                txElement.input.length
              )
            );
            let tempObj = {
              ...txElement,
              functionName: "Mint",
              quantity: decodedParams.quantity,
              usdcValue: decodedParams.value,
            };

            console.log(allErc721Event);
            for (let i = 0; i < allErc721Event.result.length; i++) {
              const allErc721EventElement = allErc721Event.result[i];
              if (
                txElement.hash.toLowerCase() ===
                allErc721EventElement.hash.toLowerCase()
              ) {
                let tempObjForAlchemy = {
                  contractAddress: txElement.to,
                  tokenId: allErc721EventElement.tokenID,
                  tokenType: "ERC721",
                };
                tempAlchemyArray.push(tempObjForAlchemy);
                tempConcatArray.push({
                  ...tempObj,
                  tokenId: allErc721EventElement.tokenID,
                  nftContract: txElement.to,
                });
              }
            }
          } else if (
            collectionAddressElement.toLowerCase() ===
              txElement.to.toLowerCase() &&
            txElement.functionName.split("(")[0] === "transferFrom" &&
            txElement.isError === "0"
          ) {
            // transfer
            const decodedParams = web3Instance.eth.abi.decodeParameters(
              [
                { type: "address", name: "from" },
                { type: "address", name: "to" },
                { type: "uint256", name: "tokens" },
              ],
              txElement.input.slice(
                txElement.methodId.length,
                txElement.input.length
              )
            );
            let tempObj = {
              ...txElement,
              functionName: "transferFrom",
              tokenId: decodedParams.tokens,
              nftContract: txElement.to,
            };
            tempConcatArray.push(tempObj);
            let tempObjForAlchemy = {
              contractAddress: txElement.to,
              tokenId: decodedParams.tokens,
              tokenType: "ERC721",
            };
            tempAlchemyArray.push(tempObjForAlchemy);
          }
        } // TODO: Maybe: add else if to detect if someone transfered to us a nft linked to Sofan with the allErc721Event array
        // add if else to handle marketPlace address tx
        if (
          // TODO: only for test. should be replaced by marketplaceAddress.
          "0x7082cc65e582de32a7cad11fdc396b02490b97dd".toLowerCase() ===
            txElement.to.toLowerCase() &&
          txElement.functionName.split("(")[0] === "listToSell" &&
          txElement.isError === "0"
        ) {
          const decodedParams = web3Instance.eth.abi.decodeParameters(
            [
              { type: "address", name: "_contract" },
              { type: "uint256", name: "_tokenId" },
              { type: "uint256", name: "_price" },
            ],
            txElement.input.slice(
              txElement.methodId.length,
              txElement.input.length
            )
          );

          let tempObj = {
            ...txElement,
            functionName: "List",
            tokenId: decodedParams._tokenId,
            price: decodedParams._price,
            nftContract: decodedParams._contract,
          };
          tempConcatArray.push(tempObj);

          let tempObjForAlchemy = {
            contractAddress: decodedParams._contract,
            tokenId: decodedParams._tokenId,
            tokenType: "ERC721",
          };
          tempAlchemyArray.push(tempObjForAlchemy);
        }
        if (
          // TODO: only for test. should be replaced by marketplaceAddress.
          "0x7082cc65e582de32a7cad11fdc396b02490b97dd".toLowerCase() ===
            txElement.to.toLowerCase() &&
          txElement.functionName.split("(")[0] === "cancelListing" &&
          txElement.isError === "0"
        ) {
          const decodedParams = web3Instance.eth.abi.decodeParameters(
            [{ type: "address", name: "itemId" }],
            txElement.input.slice(
              txElement.methodId.length,
              txElement.input.length
            )
          );
          let tempObj = {
            ...txElement,
            functionName: "Cancel",
            listingId: decodedParams.itemId,
            // nftContract: decodedParams._contract
          };
          tempConcatArray.push(tempObj);
          // request token Id from Listing Id
          // let tempObjForAlchemy = {
          //   contractAddress: txElement.to,
          //   tokenId:  decodedParams._tokenId,
          //   tokenType: "ERC721",
          // };
          // tempAlchemyArray.push(tempObjForAlchemy);
        }
        if (
          // TODO: only for test. should be replaced by marketplaceAddress.
          "0x7082cc65e582de32a7cad11fdc396b02490b97dd".toLowerCase() ===
            txElement.to.toLowerCase() &&
          txElement.functionName.split("(")[0] === "buyListing" &&
          txElement.isError === "0"
        ) {
          const decodedParams = web3Instance.eth.abi.decodeParameters(
            [
              { type: "address", name: "nftAddress" }, // correspond à _receiverAddress
              { type: "uint256", name: "tokenId" },
            ],
            txElement.input.slice(
              txElement.methodId.length,
              txElement.input.length
            )
          );
          let tempObj = {
            ...txElement,
            functionName: "Buy",
            tokenId: decodedParams.tokenId,
            // nftContract: decodedParams.nftAddress, // correspond à _receiverAddress
          };
          tempConcatArray.push(tempObj);
          // let tempObjForAlchemy = {
          //   contractAddress: decodedParams.nftAddress, // correspond à _receiverAddress
          //   tokenId: decodedParams.tokenId,
          //   tokenType: "ERC721",
          // };
          // tempAlchemyArray.push(tempObjForAlchemy);
        }
        if (
          // TODO: only for test. should be replaced by marketplaceAddress.
          "0x7082cc65e582de32a7cad11fdc396b02490b97dd".toLowerCase() ===
            txElement.to.toLowerCase() &&
          txElement.functionName.split("(")[0] === "acceptBid" &&
          txElement.isError === "0"
        ) {
          const decodedParams = web3Instance.eth.abi.decodeParameters(
            [
              { type: "address", name: "_contract" },
              { type: "uint256", name: "_tokenId" },
              { type: "uint256", name: "_offerPrice" },
              { type: "address", name: "_receiver" },
            ],
            txElement.input.slice(
              txElement.methodId.length,
              txElement.input.length
            )
          );
          let tempObj = {
            ...txElement,
            functionName: "Sell",
            tokenId: decodedParams._tokenId,
            offerPrice: decodedParams._offerPrice,
            nftContract: decodedParams._contract,
          };
          tempConcatArray.push(tempObj);
          let tempObjForAlchemy = {
            contractAddress: decodedParams._contract,
            tokenId: decodedParams._tokenId,
            tokenType: "ERC721",
          };
          tempAlchemyArray.push(tempObjForAlchemy);
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
        }
      }
      console.log("before", tempConcatArray);
      if (tempConcatArray) {
        for (let i = 0; i < tempConcatArray.length; i++) {
          const element = tempConcatArray[i];
          element.from = concatStringFromTo(element.from, 1, 5, true, true, 6);
          element.to = concatStringFromTo(element.to, 1, 5, true, true, 6);
          element.timeStamp = formatDistanceToNow(element.timeStamp * 1000, {
            locale: fr,
            addSuffix: true,
          });
          element.timeStamp = element.timeStamp.replace("environ ", "");
        }
      }
      console.log("after", tempConcatArray);
      setConcatArray(tempConcatArray);
      setAlchemyArray(tempAlchemyArray);
    }
  }, [AllTx, AllSofanCollection]);
  useMemo(() => {
    // TODO: call API pour image, collection name, prix
    const tryMe = async () => {
      if (alchemyArray.length != 0) {
        console.log("dosfujhnsduovbsbdlvhsdbvhcxbvjxwbvihsdq", alchemyArray);
        try {
          const res = await alchemy.nft.getNftMetadataBatch(alchemyArray, {
            refreshCache: false,
          });
          console.log(res);
          console.log(concatArray);
          var tempConcatArray = [...concatArray];
          console.log(tempConcatArray);
          for (let i = 0; i < res.length; i++) {
            const alchemyMetadataElement = res[i];
            for (let i = 0; i < concatArray.length; i++) {
              const tempConcatArrayElement = concatArray[i];
              if (
                alchemyMetadataElement.tokenId ===
                  tempConcatArrayElement.tokenId &&
                alchemyMetadataElement.contract.address.toLowerCase() ===
                  tempConcatArrayElement.nftContract.toLowerCase()
              ) {
                const tempobj = {
                  ...tempConcatArrayElement,
                  title: alchemyMetadataElement.rawMetadata.name,
                  image: alchemyMetadataElement.rawMetadata.image,
                };
                tempConcatArray[i] = tempobj;
              }
            }
          }
          setFinal(tempConcatArray);
          console.log(tempConcatArray);
        } catch (error) {
          console.error(error);
        }
      }
    };
    tryMe();
  }, [alchemyArray]);

  useEffect(() => {
    const web3Instance = new Web3(
      new Web3.providers.HttpProvider(process.env.REACT_APP_INFURA_ID)
    );
    setWeb3Instance(web3Instance);
    const { abi } = require("../../contracts/Sofan.json");
    const contract = new web3Instance.eth.Contract(
      abi,
      // Replace this with the address of your deployed contract
      marketplaceAddress
    );
    const load = async () => {
      const tempAllSofanCollectionArray = await contract.methods
        .getAllCollection()
        .call();
      setAllSofanCollection(tempAllSofanCollectionArray);
      console.log("je suis", tempAllSofanCollectionArray);
      const fetchAllTx = await fetch(
        `https://api-goerli.etherscan.io/api?module=account&action=txlist&address=${currentProfileUserWallet}&startblock=9458446&endblock=99999999&page=1&offset=25&sort=desc&apikey=${process.env.REACT_APP_ETHERSCAN_ID}`
      );
      const fetchAllErc721TransferEvent = await fetch(
        `https://api-goerli.etherscan.io/api?module=account&action=tokennfttx&address=${currentProfileUserWallet}&page=1&offset=25&startblock=9458446&endblock=99999999&sort=desc&apikey=${process.env.REACT_APP_ETHERSCAN_ID}`
      );
      const dataAllErc721TransferEvent =
        await fetchAllErc721TransferEvent.json();
      setAllErc721Event(dataAllErc721TransferEvent);
      const dataAllTx = await fetchAllTx.json();
      setAllTx(dataAllTx);
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
          {final.length != 0
            ? final.length != 0 &&
              final?.map((tx, index, apiNftData) => (
                <div
                  key={uuidv4()}
                  className="useractivitytab-content-container-wrap"
                >
                  <div className="useractivitytab-content-container-methods-wrap">
                    <span>{"purut"}</span>
                  </div>
                  <div className="useractivitytab-content-container-nft-wrap">
                    <img
                      src={tx?.image ? tx.image : "template image"}
                      alt="nft"
                    />
                    <div className="useractivitytab-content-container-nft-wrap-info-wrap">
                      <span>{"CollectionName"}</span>
                      <span>#{tx.tokenId}</span>
                    </div>
                  </div>
                  <div className="useractivitytab-content-container-price-container">
                    <div className="useractivitytab-content-container-price-wrap">
                      <span>{"Price"} ETH</span>
                      <span>
                        {/* {(
                      apiNftData[index]?.contract?.openSea?.floorPrice *
                      ethPrice
                    ).toLocaleString("fr-FR", {
                      maximumFractionDigits: 1,
                    })} */}
                        €
                      </span>
                    </div>
                  </div>
                  <div className="useractivitytab-content-container-qty-wrap">
                    <span>{tx?.quantity}</span>
                  </div>
                  <div></div>
                  <div className="useractivitytab-content-container-from-wrap">
                    <span>{tx.from}</span>
                  </div>
                  <div>
                    <span>{tx.to}</span>
                  </div>
                  <div></div>
                  <div>
                    {/* TODO: convert to date */}
                    <span>{tx.timeStamp}</span>
                  </div>
                </div>
              ))
            : concatArray.length != 0 &&
              concatArray?.map((tx, index, apiNftData) => (
                <div
                  key={uuidv4()}
                  className="useractivitytab-content-container-wrap"
                >
                  <div className="useractivitytab-content-container-methods-wrap">
                    <span>{tx.functionName}</span>
                  </div>
                  <div className="useractivitytab-content-container-nft-wrap">
                    <img
                      src={tx?.image ? tx.image : "template image"}
                      alt="nft"
                    />
                    <div className="useractivitytab-content-container-nft-wrap-info-wrap">
                      <span>{"CollectionName"}</span>
                      <span>#{tx.tokenId}</span>
                    </div>
                  </div>
                  <div className="useractivitytab-content-container-price-container">
                    <div className="useractivitytab-content-container-price-wrap">
                      <span>{"Price"} ETH</span>
                      <span>
                        {/* {(
                        apiNftData[index]?.contract?.openSea?.floorPrice *
                        ethPrice
                      ).toLocaleString("fr-FR", {
                        maximumFractionDigits: 1,
                      })} */}
                        €
                      </span>
                    </div>
                  </div>
                  <div className="useractivitytab-content-container-qty-wrap">
                    <span>{tx?.quantity}</span>
                  </div>
                  <div></div>
                  <div className="useractivitytab-content-container-from-wrap">
                    <span>{tx.from}</span>
                  </div>
                  <div>
                    <span>{tx.to}</span>
                  </div>
                  <div></div>
                  <div>
                    {/* TODO: convert to date */}
                    <span>{tx.timeStamp}</span>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </>
  );
};

export default UserActivityTab;
