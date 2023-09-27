import React, { useEffect, useMemo, useState } from "react";
import "./CollectionActivityTab.css";
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
const CollectionActivityTab = ({ ethPrice, currentCollectionAddress }) => {
  const [concatArray, setConcatArray] = useState([]);
  const [alchemyArray, setAlchemyArray] = useState([]);
  const [final, setFinal] = useState([]);
  const [AllTx, setAllTx] = useState([]);
  const [AllSofanCollection, setAllSofanCollection] = useState([]);
  const [AllSofanCollectionBackend, setAllSofanCollectionBackend] = useState(
    []
  );
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
    if (AllTx.length != 0 && allErc721Event.length != 0) {
      console.log("Alltx", AllTx);
      let tempConcatArray = [];
      let tempAlchemyArray = [];
      for (let i = 0; i < AllTx.result.length; i++) {
        const txElement = AllTx.result[i];
        // Check if Mint
        if (
          currentCollectionAddress.toLowerCase() ===
            txElement.to.toLowerCase() &&
          txElement.functionName.split("(")[0] === "mint" &&
          txElement.isError === "0"
        ) {
          console.log("enter mint", console.log(txElement));
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
              console.log("it's a match");
              let isAlreadyIncluded;
              for (let i = 0; i < tempConcatArray.length; i++) {
                const tempConcatArrayElement = tempConcatArray[i];
                if (
                  tempConcatArrayElement.tokenId ===
                  allErc721EventElement.tokenID
                ) {
                  isAlreadyIncluded = true;
                }
              }
              if (!isAlreadyIncluded) {
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
          }
        } else if (
          currentCollectionAddress.toLowerCase() ===
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
      }
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
  }, [AllTx, allErc721Event]);

  useMemo(() => {
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
                    alchemyMetadataElement.contract.name,
                    22,
                    22,
                    true,
                    false,
                    0
                  ),
                  image: alchemyMetadataElement?.rawMetadata.image,
                };
                tempConcatArray[i] = tempobj;
              }
            }
          }
          console.log("after added image", tempConcatArray);
          for (let i = 0; i < tempConcatArray.length; i++) {
            const tempConcatArrayElement = tempConcatArray[i];
            let tempArray = [];
            // console.log(tempConcatArrayElement);
            // console.log("tempCVsdfArray", allErc20Event.result.length);
            // for (let i = 0; i < allErc20Event.result.length; i++) {
            //   const allErc20Element = allErc20Event.result[i];
            //   console.log(i);
            //   if (
            //     tempConcatArrayElement.hash.toLowerCase() ===
            //     allErc20Element.hash.toLowerCase()
            //     //   &&
            //     // allErc20Element.from.toLowerCase() ===
            //     //   tempConcatArrayElement.from.toLowerCase()
            //   ) {
            //     console.log("push");
            //     tempArray.push(allErc20Element);
            //   }
            // }

            //   console.log(tempArray);
            //   const sumOfUsdcValues = tempArray.reduce((sum, current) => {
            //     return sum + parseInt(current.value);
            //   }, 0);
            // console.log(sumOfUsdcValues, tempConcatArrayElement);
            let sumOfUsdcValues =
              tempConcatArrayElement.usdcValue /
              tempConcatArrayElement.quantity;
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
    const load = async () => {
      const q = query(collection(db, "nft_collections"));
      const querySnapshot = await getDocs(q);

      let tempAllAthleteCollection = [];
      let tempAllAthleteCollectionBackend = [];
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          const tempNftcollectionInfo = doc.data();
          tempAllAthleteCollection.push(
            tempNftcollectionInfo.collection_address
          );
          tempAllAthleteCollectionBackend.push(tempNftcollectionInfo);
        });
      } else {
      }
      setAllSofanCollectionBackend(tempAllAthleteCollectionBackend);
      setAllSofanCollection(tempAllAthleteCollection);
      const fetchAllTx = await fetch(
        `https://api-goerli.etherscan.io/api?module=account&action=txlist&address=${currentCollectionAddress}&startblock=9458446&endblock=99999999&page=1&offset=25&sort=desc&apikey=${process.env.REACT_APP_ETHERSCAN_ID}`
      );
      const dataAllTx = await fetchAllTx.json();
      setAllTx(dataAllTx);
      console.log(dataAllTx);
      const fetchAllErc721TransferEvent = await fetch(
        `https://api-goerli.etherscan.io/api?module=account&action=tokennfttx&contractaddress=${currentCollectionAddress}&page=1&offset=25&startblock=9458446&endblock=99999999&sort=desc&apikey=${process.env.REACT_APP_ETHERSCAN_ID}`
      );
      const dataAllErc721TransferEvent =
        await fetchAllErc721TransferEvent.json();
      console.log("ERC721", dataAllErc721TransferEvent);
      setAllErc721Event(dataAllErc721TransferEvent);

      // const fetchAllErc20TransferEvent = await fetch(
      //   `https://api-goerli.etherscan.io/api?module=account&action=tokentx&contractaddress=${currentCollectionAddress}&page=1&offset=100&startblock=9458446&endblock=27025780&sort=asc&apikey=${process.env.REACT_APP_ETHERSCAN_ID}`
      // );
      //   const dataAllErc20TransferEvent = await fetchAllErc20TransferEvent.json();
      //   setAllErc20Event(dataAllErc20TransferEvent);
      //   console.log("ERC20", dataAllErc20TransferEvent);
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

  useEffect(() => {
    const displayInfoFromBackend = async () => {
      if (final.length != 0 && displayInfoFromBackendAvailable === true) {
        console.log("final use Effect");
        /*
                1. get current collection info 
                2. extract the "real address", "title" and athleteId
                3. before create an array
                3. For each tx in final, first check if from is in array then if true use this data then if false check if "from" is a "user"
                3.bis. if true, CRUD the element and save data that be CRUD to the element in an array of obj
                3.ter. if false do nothing
                4. CRUD the "to" part of the element with collection info 
            
            */
        const feedPostCollectionRef = collection(db, "users");
        // 1. get current collection info
        // 2. extract the "real address", "title" and athleteId in currentCollectionInfo
        let currentCollectionInfo;
        for (let i = 0; i < AllSofanCollectionBackend.length; i++) {
          const sofanCollectionElement = AllSofanCollectionBackend[i];
          if (
            sofanCollectionElement.collection_address.toLowerCase() ===
            currentCollectionAddress.toLowerCase()
          ) {
            currentCollectionInfo = sofanCollectionElement;
          }
        }

        // 3. before create an array
        let alreadyQueriedUser = [];

        // 3. For each tx in final, first check if from is in array then if true use this data then if false check if "from" is a "user"
        var userSpecificData;

        const finalCopy = [...final];
        for (let i = 0; i < finalCopy.length; i++) {
          const element = finalCopy[i];
          let tempOtherUserSpecificQuery;
          let isAlreadyQueriedUser = false;
          for (let i = 0; i < alreadyQueriedUser.length; i++) {
            const alreadyQueriedElement = alreadyQueriedUser[i];
            if (
              alreadyQueriedElement.web3auth ===
                web3Instance.utils.toChecksumAddress(element.from) ||
              alreadyQueriedElement.metamask ===
                web3Instance.utils.toChecksumAddress(element.from)
            ) {
              console.log(alreadyQueriedElement);
              userSpecificData = alreadyQueriedElement;
              isAlreadyQueriedUser = true;
            }
          }

          if (isAlreadyQueriedUser === false) {
            // console.log(web3Instance.utils.toChecksumAddress(element.from));
            try {
              const tempUserSpecificQueryMetamask = query(
                feedPostCollectionRef,
                where(
                  "metamask",
                  "==",
                  web3Instance.utils.toChecksumAddress(element.from)
                )
              );
              const querySnapshot = await getDocs(
                tempUserSpecificQueryMetamask
              );
              if (!querySnapshot.empty) {
                querySnapshot.forEach((doc) => {
                  const userInfo = doc.data();
                  userSpecificData = userInfo;
                  alreadyQueriedUser.push(userInfo);
                  console.log(userInfo);
                });
              } else {
                // try web3auth
                // console.log("No metamask found");
                const tempUserSpecificQueryWeb3auth = query(
                  feedPostCollectionRef,
                  where(
                    "web3auth",
                    "==",
                    web3Instance.utils.toChecksumAddress(element.from)
                  )
                );
                const querySnapshot = await getDocs(
                  tempUserSpecificQueryWeb3auth
                );
                if (!querySnapshot.empty) {
                  querySnapshot.forEach((doc) => {
                    const userInfo = doc.data();
                    userSpecificData = userInfo;
                    alreadyQueriedUser.push(userInfo);
                    // console.log(userInfo);
                  });
                } else {
                  // console.log("No metamask or web3auth found");
                }
              }
            } catch (error) {
              console.error(error);
            }
          }
          // console.log(userSpecificData);

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

          if (currentCollectionInfo) {
            let tempObj = {
              ...tempNewObject,
              toAccountType: "contractAddress",
              toAthleteId: currentCollectionInfo.athlete_id,
              toCollectionName: currentCollectionInfo.collection_title,
            };
            // handle string display
            tempObj.nftContract = currentCollectionInfo.collection_address;
            tempNewObject = tempObj;
          }
          if (tempNewObject) {
            finalCopy[i] = tempNewObject;
          }
          // else do nothing
        }
        // console.log(finalCopy);
        // setUserProfileSpecificData(userSpecificData);
        setDisplayInfoFromBackendAvailable(false);
        console.log("realFinal", finalCopy);
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
            ? // final.length != 0 &&
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
                      <span>{tx?.usdc ? "0.00" + " ETH" : "--"}</span>
                    </div>
                  </div>
                  <div className="useractivitytab-content-container-qty-wrap">
                    <span>{tx?.quantity ? "1" : "1"}</span>
                  </div>
                  <div></div>
                  {tx?.fromDisplay?.slice(0, 2) != "0x" ? (
                    <div>
                      <Link
                        style={{ textDecoration: "none" }}
                        to={`/userprofile/${tx.fromAccountId}`}
                        target="_blank"
                      >
                        {tx.fromDisplay}
                      </Link>
                      <div>
                        <span
                          about={tx.from}
                          style={{ opacity: "0.7", fontSize: "11px" }}
                        >
                          {tx.oldFromDisplay}
                        </span>
                        <img
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
                  {tx.toAccountType === "contractAddress" ? (
                    <div>
                      <span>{tx.toCollectionName}</span>
                      <div>
                        <span
                          about={tx.to}
                          style={{ opacity: "0.7", fontSize: "11px" }}
                        >
                          {tx.toDisplay}
                        </span>
                        <img
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
                      <span>€</span>
                    </div>
                  </div>
                  <div className="useractivitytab-content-container-qty-wrap">
                    <span>{1}</span>
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

export default CollectionActivityTab;
