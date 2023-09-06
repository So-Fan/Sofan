import React, { useEffect, useMemo, useState } from "react";
import "./UserActivityTab.css";
import { v4 as uuidv4 } from "uuid";
import Web3 from "web3";
import useEth from "../../contexts/EthContext/useEth";
import { Alchemy, Network } from "alchemy-sdk";
import { concatStringFromTo } from "../../Utils/concatString";
import { fr } from "date-fns/locale";
import { formatDistanceToNow } from "date-fns";
import copyLogo from "../../Assets/Image/copy-logo.svg";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  getDocs,
  getDoc,
} from "@firebase/firestore";
import { db } from "../../Configs/firebase";
import { Link } from "react-router-dom";
const UserActivityTab = ({ ethPrice, currentProfileUserWallet }) => {
  const [concatArray, setConcatArray] = useState([]);
  const [alchemyArray, setAlchemyArray] = useState([]);
  const [final, setFinal] = useState([]);
  const [AllTx, setAllTx] = useState([]);
  const [AllSofanCollection, setAllSofanCollection] = useState([]);
  const [allErc721Event, setAllErc721Event] = useState([]);
  const [allErc20Event, setAllErc20Event] = useState([]);
  const [web3Instance, setWeb3Instance] = useState();
  const [isAddressCopiedClicked, setIsAddressCopiedClicked] = useState(false);
  const [copyAddressAnimationHide, setCopyAddressAnimationHide] =
    useState(false);
  const [tempClipboard, setTempClipboard] = useState([]);
  const [
    isCopyClipboardAddressConfirmWalletClicked,
    setIsCopyClipboardAddressConfirmWalletClicked,
  ] = useState([]);
  const [displayInfoFromBackendAvailable, setDisplayInfoFromBackendAvailable] =
    useState(true);
  const [userProfileSpecificData, setUserProfileSpecificData] = useState();
  const { marketplaceAddress } = useEth();

  const settings = {
    apiKey: "34lcNFh-vbBqL9ignec_nN40qLHVOfSo",
    network: Network.ETH_GOERLI,
    maxRetries: 10,
  };
  const alchemy = new Alchemy(settings);
  useMemo(() => {
    if (
      AllTx.length != 0 &&
      AllSofanCollection.length != 0 &&
      allErc721Event.length != 0 &&
      allErc20Event.length != 0
    ) {
      console.log("Alltx", AllTx);
      console.log("all Sofan Collection", AllSofanCollection);
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

            // console.log(allErc721Event);
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
          };
          // tempConcatArray.push(tempObj);
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
                nftContract: allErc721EventElement.contractAddress,
              });
            }
          }
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
            usdc: decodedParams._offerPrice,
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
      for (let i = 0; i < allErc721Event.result.length; i++) {
        const allErc721Element = allErc721Event.result[i];
        for (let i = 0; i < AllSofanCollection.length; i++) {
          const sofanCollectionElement = AllSofanCollection[i];
          for (let i = 0; i < allErc20Event.result.length; i++) {
            const allErc20Element = allErc20Event.result[i];
            if (
              // handle Buy from bid accepted by other user and Sell from other user that buy user's listing
              //
              allErc721Element.contractAddress.toLowerCase() ===
                sofanCollectionElement.toLowerCase() &&
              allErc20Element.hash.toLowerCase() ===
                allErc721Element.hash.toLowerCase() &&
              allErc721Element.from.toLowerCase() !==
                "0x0000000000000000000000000000000000000000".toLowerCase() &&
              (i != 0
                ? allErc20Element.hash !== allErc20Event.result[i - 1].hash
                : true)
            ) {
              // TODO: mimic object from final array but add only used property in DOM
              // console.log(currentProfileUserWallet.toLowerCase());
              let tempObj = {
                blockNumber: allErc721Element.blockNumber,
                hash: allErc721Element.hash,
                from: allErc721Element.from,
                to: allErc721Element.to,
                value: allErc20Element.value, // + part de sofan et part de l'athlete => call le contrat pour connaitre le montant de royalties ou call les transfert erc20 de l'autre user puis les 2 avec le meme hash alors somme la value
                timeStamp: allErc20Element.timeStamp,
                tokenId: allErc721Element.tokenID,
                nftContract: allErc721Element.contractAddress,
                functionName:
                  allErc721Element.from.toLowerCase() ===
                  currentProfileUserWallet.toLowerCase()
                    ? "Sell Bid"
                    : "Buy Bid",
              };
              tempConcatArray.push(tempObj);
            }
          }
        }
      }
      // console.log("before", tempConcatArray);
      if (tempConcatArray) {
        for (let i = 0; i < tempConcatArray.length; i++) {
          const element = tempConcatArray[i];
          // element.from = concatStringFromTo(element.from, 1, 4, true, true, 5);
          // element.to = concatStringFromTo(element.to, 1, 4, true, true, 5);
          element.timeStamp = formatDistanceToNow(element.timeStamp * 1000, {
            locale: fr,
            addSuffix: true,
          });
          element.timeStamp = element.timeStamp.replace("environ ", "");
          const tempObj = {
            ...element,
            fromDisplay: concatStringFromTo(element.from, 1, 4, true, true, 5),
            toDisplay: concatStringFromTo(element.to, 1, 4, true, true, 5),
          };
          tempConcatArray[i] = tempObj;
        }
      }
      console.log("after first useEffect", tempConcatArray);
      setConcatArray(tempConcatArray);
      setAlchemyArray(tempAlchemyArray);
    }
  }, [AllTx, AllSofanCollection, allErc721Event, allErc20Event]);
  useMemo(() => {
    // TODO: call API pour image, collection name, prix
    const tryMe = async () => {
      if (alchemyArray.length != 0) {
        console.log("Lachemy Array to get metadata", alchemyArray);
        try {
          const res = await alchemy.nft.getNftMetadataBatch(alchemyArray, {
            refreshCache: false,
          });
          console.log("getNftMetadata response", res);
          // console.log("should be the same as after first useEffect", concatArray);
          var tempConcatArray = [...concatArray];
          // console.log(tempConcatArray);
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
                  title: concatStringFromTo(
                    alchemyMetadataElement.rawMetadata.name,
                    22,
                    22,
                    true,
                    false,
                    0
                  ),
                  image: alchemyMetadataElement.rawMetadata.image,
                };
                tempConcatArray[i] = tempobj;
              }
            }
          }

          for (let i = 0; i < tempConcatArray.length; i++) {
            const tempConcatArrayElement = tempConcatArray[i];
            const tempArray = [];
            // console.log("tempCVsdfArray", allErc20Event.result.length);
            for (let i = 0; i < allErc20Event.result.length; i++) {
              const allErc20Element = allErc20Event.result[i];
              // console.log(i);
              if (
                tempConcatArrayElement.hash.toLowerCase() ===
                allErc20Element.hash.toLowerCase()
              ) {
                // console.log("push");
                tempArray.push(allErc20Element);
              }
            }
            if (tempArray.length != 0) {
              const sumOfUsdcValues = tempArray.reduce((sum, current) => {
                return sum + parseInt(current.value);
              }, 0);
              // console.log(sumOfUsdcValues, tempConcatArrayElement);
              if (sumOfUsdcValues.toString().length > 6) {
                const beginning = sumOfUsdcValues
                  .toString()
                  .slice(0, sumOfUsdcValues.toString().length - 6);
                const ending = sumOfUsdcValues
                  .toString()
                  .slice(
                    sumOfUsdcValues.toString().length - 6,
                    sumOfUsdcValues.toString().length - 4
                  );
                const tempObj = {
                  ...tempConcatArrayElement,
                  usdc: beginning + "," + ending,
                };
                tempConcatArray[i] = tempObj;
              } else if (sumOfUsdcValues.toString().length === 6) {
                const ending = sumOfUsdcValues.toString().slice(0, 2);
                const tempObj = {
                  ...tempConcatArrayElement,
                  usdc: "0," + ending,
                };
                tempConcatArray[i] = tempObj;
              } else if (sumOfUsdcValues.toString().length === 5) {
                const ending = sumOfUsdcValues.toString().slice(0, 1);
                const tempObj = {
                  ...tempConcatArrayElement,
                  usdc: "0,0" + ending,
                };
                tempConcatArray[i] = tempObj;
              } else if (0 === sumOfUsdcValues.toString().length) {
                const tempObj = {
                  ...tempConcatArrayElement,
                  usdc: "error",
                };
                tempConcatArray[i] = tempObj;
              } else if (
                sumOfUsdcValues.toString().length > 0 &&
                sumOfUsdcValues.toString().length < 6
              ) {
                const tempObj = {
                  ...tempConcatArrayElement,
                  usdc: "--",
                };
                tempConcatArray[i] = tempObj;
              }

              //
            }
          }
          setFinal(tempConcatArray);
          console.log("final array mapped", tempConcatArray);

          //
          let tempTempClipboard = [];
          for (let i = 0; i < tempConcatArray.length; i++) {
            // const element = tempConcatArray[i];
            // const tempObj = {
            //   i: uuidv4()
            // }
            tempTempClipboard.push(false);
            tempTempClipboard.push(false);
          }
          setTempClipboard(tempTempClipboard);
          setIsCopyClipboardAddressConfirmWalletClicked(tempTempClipboard);
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
      // TODO: V2 Can be optimizied be querying NFT contract that user historically interact with. Meaning the upper for loop will loop through less adresses (we can assume that nb of contract interacted with << all Sofan collection)
      const tempAllSofanCollectionArray = await contract.methods
        .getAllCollection()
        .call();
      setAllSofanCollection(tempAllSofanCollectionArray);
      console.log("je suis", tempAllSofanCollectionArray);
      const fetchAllTx = await fetch(
        `https://api-goerli.etherscan.io/api?module=account&action=txlist&address=${currentProfileUserWallet}&startblock=9458446&endblock=99999999&page=1&offset=25&sort=desc&apikey=${process.env.REACT_APP_ETHERSCAN_ID}`
      );
      const dataAllTx = await fetchAllTx.json();
      setAllTx(dataAllTx);

      const fetchAllErc721TransferEvent = await fetch(
        `https://api-goerli.etherscan.io/api?module=account&action=tokennfttx&address=${currentProfileUserWallet}&page=1&offset=25&startblock=9458446&endblock=99999999&sort=desc&apikey=${process.env.REACT_APP_ETHERSCAN_ID}`
      );
      const dataAllErc721TransferEvent =
        await fetchAllErc721TransferEvent.json();
      console.log("ERC721", dataAllErc721TransferEvent);
      setAllErc721Event(dataAllErc721TransferEvent);

      const fetchAllErc20TransferEvent = await fetch(
        `https://api-goerli.etherscan.io/api?module=account&action=tokentx&address=${currentProfileUserWallet}&page=1&offset=100&startblock=9458446&endblock=27025780&sort=asc&apikey=${process.env.REACT_APP_ETHERSCAN_ID}`
      );
      const dataAllErc20TransferEvent = await fetchAllErc20TransferEvent.json();
      setAllErc20Event(dataAllErc20TransferEvent);
      console.log("ERC20", dataAllErc20TransferEvent);
    };
    load();
  }, []);

  function handleClickCopyConfirmWallet(e) {
    navigator.clipboard.writeText(
      e.target.parentElement.children[0].attributes[0].value
    );
    // setIsCopyClipboardAddressConfirmWalletClicked((prevState) => {
    //   const tt = [...tempClipboard];
    //   tt[e.target.name] = true;
    //   return tt;
    // });
    console.log(window);
    setIsAddressCopiedClicked(true);
    // const timeOutAnimationCopyClicked =
    setTimeout(() => {
      setCopyAddressAnimationHide(true);
    }, 2000);
    // clearTimeout(timeOutAnimationCopyClicked);
    // const timeOutHideCopyClicked =
    setTimeout(() => {
      setIsAddressCopiedClicked(false);
      setCopyAddressAnimationHide(false);
    }, 2300);
  }
  // useEffect(() => {
  //   console.log(
  //     isCopyClipboardAddressConfirmWalletClicked[0] === tempClipboard[0]
  //   );
  //   let timeoutCopyConfirmWallet;
  //   for (
  //     let i = 0;
  //     i < isCopyClipboardAddressConfirmWalletClicked.length;
  //     i++
  //   ) {
  //     if (
  //       isCopyClipboardAddressConfirmWalletClicked[i] != tempClipboard[i] &&
  //       tempClipboard.length != 0
  //     ) {
  //       console.log("Timeout est lancé");
  //       timeoutCopyConfirmWallet = setTimeout(() => {
  //         setIsCopyClipboardAddressConfirmWalletClicked([...tempClipboard]);
  //       }, 3000);
  //     }
  //   }
  //   return () => clearTimeout(timeoutCopyConfirmWallet);
  // }, [isCopyClipboardAddressConfirmWalletClicked]);

  useEffect(() => {
    const displayInfoFromBackend = async () => {
      if (
        final.length != 0 &&
        currentProfileUserWallet &&
        displayInfoFromBackendAvailable === true
      ) {
        const feedPostCollectionRef = collection(db, "users");
        var userSpecificData;
        try {
          const tempUserSpecificQueryMetamask = query(
            feedPostCollectionRef,
            where("metamask", "==", currentProfileUserWallet)
          );
          const querySnapshot = await getDocs(tempUserSpecificQueryMetamask);
          if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
              const userInfo = doc.data();
              userSpecificData = userInfo;
              console.log(userInfo);
            });
          } else {
            // try web3auth
            console.log("No metamask found");
            const tempUserSpecificQueryWeb3auth = query(
              feedPostCollectionRef,
              where("web3auth", "==", currentProfileUserWallet)
            );
            const querySnapshot = await getDocs(tempUserSpecificQueryWeb3auth);
            if (!querySnapshot.empty) {
              querySnapshot.forEach((doc) => {
                const userInfo = doc.data();
                userSpecificData = userInfo;
                console.log(userInfo);
              });
            } else {
              console.log("No metamask or web3auth found");
            }
          }
        } catch (error) {
          console.error(error);
        }
        // console.log(userSpecificData);
        const finalCopy = [...final];
        for (let i = 0; i < finalCopy.length; i++) {
          const element = finalCopy[i];
          // Change fromDisplay address to UserSpecificQuery.username + add property linkId: UserSpecificQuery.id + if else for athlete redirection if needed
          // Change toDisplay address to tempOtherUserSpecificQuery.username + add property linkId: UserSpecificQuery.id + if else for athlete redirection if needed
          let tempOtherUserSpecificQuery;
          if (
            element.from.toLowerCase() ===
            currentProfileUserWallet.toLowerCase()
          ) {
            // set element to new object with
            const otherUserSpecificQuery = query(
              feedPostCollectionRef,
              where("metamask", "==", element.to)
            );
            const querySnapshot = await getDocs(otherUserSpecificQuery);
            if (!querySnapshot.empty) {
              querySnapshot.forEach((doc) => {
                const userInfo = doc.data();
                tempOtherUserSpecificQuery = userInfo;
                console.log(userInfo);
              });
            } else {
              console.log("No metamask found");
              const tempUserSpecificQueryWeb3auth = query(
                feedPostCollectionRef,
                where("web3auth", "==", element.to)
              );
              const querySnapshot = await getDocs(
                tempUserSpecificQueryWeb3auth
              );
              if (!querySnapshot.empty) {
                querySnapshot.forEach((doc) => {
                  const userInfo = doc.data();
                  tempOtherUserSpecificQuery = userInfo;
                  console.log(userInfo);
                });
              } else {
                console.log("No metamask or web3auth found");
              }
            }
            let tempNewObject;
            if (userSpecificData) {
              let tempObj = {
                ...element,
                fromAccountType: userSpecificData.account_type,
                fromAccountId: userSpecificData.id,
                oldFromDisplay: element.fromDisplay,
                firebaseFromId: userSpecificData.id,
              };
              // handle string display
              tempObj.fromDisplay = userSpecificData.display_name;
              tempNewObject = tempObj;
            }
            if (tempOtherUserSpecificQuery) {
              let tempObj = tempNewObject
                ? {
                    ...tempNewObject,
                    toAccountType: tempOtherUserSpecificQuery.account_type,
                    toAccountId: tempOtherUserSpecificQuery.id,
                    oldToDisplay: element.toDisplay,
                    firebaseToId: tempOtherUserSpecificQuery.id,
                  }
                : {
                    ...element,
                    toAccountType: tempOtherUserSpecificQuery.account_type,
                    toAccountId: tempOtherUserSpecificQuery.id,
                    oldToDisplay: element.toDisplay,
                    firebaseToId: tempOtherUserSpecificQuery.id,
                  };
              // handle string display
              tempObj.toDisplay = tempOtherUserSpecificQuery.display_name;
              tempNewObject = tempObj;
            }
            if (tempNewObject) {
              finalCopy[i] = tempNewObject;
            }
            // else do nothing
          } else if (
            element.to.toLowerCase() === currentProfileUserWallet.toLowerCase()
          ) {
            // set element to new object with
            const otherUserSpecificQuery = query(
              feedPostCollectionRef,
              where("metamask", "==", element.from)
            );
            const querySnapshot = await getDocs(otherUserSpecificQuery);
            if (!querySnapshot.empty) {
              querySnapshot.forEach((doc) => {
                const userInfo = doc.data();
                tempOtherUserSpecificQuery = userInfo;
                console.log(userInfo);
              });
            } else {
              console.log("No metamask found");
              const tempUserSpecificQueryWeb3auth = query(
                feedPostCollectionRef,
                where("web3auth", "==", element.from)
              );
              const querySnapshot = await getDocs(
                tempUserSpecificQueryWeb3auth
              );
              if (!querySnapshot.empty) {
                querySnapshot.forEach((doc) => {
                  const userInfo = doc.data();
                  tempOtherUserSpecificQuery = userInfo;
                  console.log(userInfo);
                });
              } else {
                console.log("No metamask or web3auth found");
              }
            }
            let tempNewObject;
            if (userSpecificData) {
              let tempObj = {
                ...element,
                toAccountType: userSpecificData.account_type,
                toAccountId: userSpecificData.id,
                oldToDisplay: element.toDisplay,
                firebaseToId: userSpecificData.id,
              };
              // handle string display
              tempObj.toDisplay = userSpecificData.display_name;
              tempNewObject = tempObj;
            }
            if (tempOtherUserSpecificQuery) {
              let tempObj = tempNewObject
                ? {
                    ...tempNewObject,
                    fromAccountType: tempOtherUserSpecificQuery.account_type,
                    fromAccountId: tempOtherUserSpecificQuery.id,
                    oldFromDisplay: element.fromDisplay,
                    firebaseFromId: tempOtherUserSpecificQuery.id,
                  }
                : {
                    ...element,
                    fromAccountType: tempOtherUserSpecificQuery.account_type,
                    fromAccountId: tempOtherUserSpecificQuery.id,
                    oldFromDisplay: element.fromDisplay,
                    firebaseFromId: tempOtherUserSpecificQuery.id,
                  };
              // handle string display
              tempObj.fromDisplay = tempOtherUserSpecificQuery.display_name;
              tempNewObject = tempObj;
            }
            if (tempNewObject) {
              finalCopy[i] = tempNewObject;
            }
            // else do nothing
          }
        }
        // console.log(finalCopy);
        setUserProfileSpecificData(userSpecificData);
        setDisplayInfoFromBackendAvailable(false);
        setFinal(finalCopy);
      }
    };
    displayInfoFromBackend();
  }, [final]);

  return (
    <>
      <div className="useractivitytab-component">
        <div className="useractivitytab-table-container">
          <div></div>
          <div>NFT</div>
          <div className="useractivitytab-table-container-price">Price</div>
          <div className="useractivitytab-table-container-qty">Quantity</div>
          <div></div>
          <div>from</div>
          <div>To</div>
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
                    <span>{tx.functionName}</span>
                  </div>
                  <Link
                    to={`/nftsingle/${tx.nftContract}/${tx.tokenId}`}
                    style={{ textDecoration: "none", color: "black" }}
                    className="useractivitytab-content-container-nft-wrap"
                  >
                    <img
                      src={tx?.image ? tx.image : "template image"}
                      alt="nft"
                    />
                    <div className="useractivitytab-content-container-nft-wrap-info-wrap">
                      <span>{tx?.title ? tx.title : "CollectionName"}</span>
                      <span>#{tx.tokenId}</span>
                    </div>
                  </Link>
                  <div className="useractivitytab-content-container-price-container">
                    <div className="useractivitytab-content-container-price-wrap">
                      <span>{tx?.usdc ? tx.usdc : "--"} €</span>
                      <span>
                        {/* {(
                      apiNftData[index]?.contract?.openSea?.floorPrice *
                      ethPrice
                        ).toLocaleString("fr-FR", {
                       maximumFractionDigits: 1,
                         })} */}
                        {tx?.usdc ? "0.00" + " ETH" : "--"}
                      </span>
                    </div>
                  </div>
                  <div className="useractivitytab-content-container-qty-wrap">
                    <span>{tx?.quantity ? tx.quantity : "1"}</span>
                  </div>
                  <div></div>
                  {tx.fromDisplay.slice(0, 2) != "0x" ? (
                    <div>
                      {tx.firebaseFromId === userProfileSpecificData.id ? (
                        <span>{tx.fromDisplay}</span>
                      ) : (
                        <Link
                          style={{ textDecoration: "none" }}
                          to={`/userprofile/${tx.firebaseFromId}`}
                          target="_blank"
                        >
                          {tx.fromDisplay}
                        </Link>
                      )}
                      <div>
                        <span
                          about={tx.from}
                          style={{ opacity: "0.7", fontSize: "11px" }}
                        >
                          {tx.oldFromDisplay}
                        </span>
                        <img
                          // className="useractivitytab-content-container-clipboardlogo"
                          onClick={handleClickCopyConfirmWallet}
                          src={copyLogo}
                          alt="copy logo"
                          name={2 * index + 1}
                          style={{ width: 10, heigth: 10, marginLeft: 4 }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="useractivitytab-content-container-address-wrap">
                      {/* tout le contenu n'est display que si l'adresse n'appartient pas à un compte Sofan
                    Si l'adresse appartient à un compte Sofan alors il faut display le nom + redirection vers le profil.
                    */}
                      <span about={tx.from}>{tx.fromDisplay}</span>
                      <img
                        className="useractivitytab-content-container-clipboardlogo"
                        onClick={handleClickCopyConfirmWallet}
                        src={copyLogo}
                        alt="copy logo"
                        name={index == 0 ? index : 2 * index}
                      />
                    </div>
                  )}
                  {tx.toDisplay.slice(0, 2) != "0x" ? (
                    <div>
                      {tx.firebaseToId === userProfileSpecificData.id ? (
                        <span>{tx.toDisplay}</span>
                      ) : (
                        <Link
                          style={{ textDecoration: "none" }}
                          to={`/userprofile/${tx.firebaseToId}`}
                          target="_blank"
                        >
                          {tx.toDisplay}
                        </Link>
                      )}
                      <div>
                        <span
                          about={tx.to}
                          style={{ opacity: "0.7", fontSize: "11px" }}
                        >
                          {tx.oldToDisplay}
                        </span>
                        <img
                          // className="useractivitytab-content-container-clipboardlogo"
                          onClick={handleClickCopyConfirmWallet}
                          src={copyLogo}
                          alt="copy logo"
                          name={2 * index + 1}
                          style={{ width: 10, heigth: 10, marginLeft: 4 }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="useractivitytab-content-container-address-wrap">
                      {/* tout le contenu n'est display que si l'adresse n'appartient pas à un compte Sofan
                    Si l'adresse appartient à un compte Sofan alors il faut display le nom + redirection vers le profil.
                    */}
                      <span about={tx.to}>{tx.toDisplay}</span>
                      <img
                        className="useractivitytab-content-container-clipboardlogo"
                        onClick={handleClickCopyConfirmWallet}
                        src={copyLogo}
                        alt="copy logo"
                        name={2 * index + 1}
                      />
                    </div>
                  )}
                  {/* <div></div> */}
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
                    <span>{tx.fromDisplay}</span>
                  </div>
                  <div>
                    <span>{tx.toDisplay}</span>
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
      {isAddressCopiedClicked && (
        <>
          <div
            className={
              copyAddressAnimationHide
                ? "useractivitytab-address-hide"
                : "useractivitytab-address-copied"
            }
          >
            Copié dans le presse-papier !
          </div>
        </>
      )}
    </>
  );
};

export default UserActivityTab;
