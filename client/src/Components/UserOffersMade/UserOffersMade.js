import React, { useEffect, useState } from "react";
import "./UserOffersMade.css";
import Web3 from "web3";
import { concatStringFromTo } from "../../Utils/concatString";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { formatPriceDisplay } from "../../Utils/formatPriceDisplay";
import { Alchemy, Network } from "alchemy-sdk";
import useEth from "../../contexts/EthContext/useEth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../Configs/firebase";
import { Link } from "react-router-dom";
import copyLogo from "../../Assets/Image/copy-logo.svg";
const UserOffersMade = ({
  ethPrice,
  currentProfileUserWallet,
  display_name,
}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const data = [
      {
        nft: {
          image:
            "https://firebasestorage.googleapis.com/v0/b/sofan-app.appspot.com/o/Rectangle%20131.png?alt=media&token=f394cf39-6fa3-475a-9f3e-9ac5a63c0027",
          name: "JCVD",
          id: "0",
        },
        price: {
          eth: "0.50",
          eur: "692.04",
        },
        methods: "Mint",
        param: {
          quantity: "1",
        },
        from: "Alexia Barrier",
        to: "Gr3goir3",
        time: "1 hour ago",
        status: "Pending",
      },
      {
        nft: {
          image:
            "https://firebasestorage.googleapis.com/v0/b/sofan-app.appspot.com/o/Rectangle%20131.png?alt=media&token=f394cf39-6fa3-475a-9f3e-9ac5a63c0027",
          name: "JCVD",
          id: "0",
        },
        price: {
          eth: "0.50",
          eur: "692.04",
        },
        methods: "Mint",
        param: {
          quantity: "1",
        },
        from: "Alexia Barrier",
        to: "Gr3goir3",
        time: "1 hour ago",
        status: "Cancelled",
      },
    ];
    setData(data);
  }, []);
  const [allTx, setAllTx] = useState([]);
  const { marketplaceAddress } = useEth();
  useEffect(() => {
    const loadUserOffersMade = async () => {
      const fetchAllTx = await fetch(
        `https://api-goerli.etherscan.io/api?module=account&action=txlist&address=${currentProfileUserWallet}&startblock=9458446&endblock=99999999&page=1&offset=25&sort=desc&apikey=${process.env.REACT_APP_ETHERSCAN_ID}`
      );
      const dataFetchAlltx = await fetchAllTx.json();
      console.log(dataFetchAlltx);
      if (dataFetchAlltx.message === "OK") setAllTx(dataFetchAlltx.result);
    };
    loadUserOffersMade();
  }, []);
  const [placeBid, setPlaceBid] = useState([]);
  const [alchemyPlaceBidMetadata, setAlchemyPlaceBidMetadata] = useState([]);
  const [web3Instance, setWeb3Instance] = useState();
  useEffect(() => {
    const tempAllTx = [...allTx];
    let tempPlaceBidTxOnlyArray = [];
    let tempAlchemyArray = [];
    const web3Instance = new Web3(
      new Web3.providers.HttpProvider(process.env.REACT_APP_INFURA_ID)
    );
    setWeb3Instance(web3Instance);
    for (let i = 0; i < tempAllTx.length; i++) {
      const element = tempAllTx[i];
      if (element.functionName.slice(0, 8) === "placeBid") {
        const decodedParams = web3Instance.eth.abi.decodeParameters(
          [
            { type: "address", name: "_contract" },
            { type: "uint256", name: "_tokenId" },
            { type: "uint256", name: "_offerPrice" },
            { type: "address", name: "_receiver" },
          ],
          element.input.slice(element.methodId.length, element.input.length)
        );
        // console.log(decodedParams);
        let tempObj = {
          ...element,
          nftContract: decodedParams._contract,
          tokenId: decodedParams._tokenId,
          price: decodedParams._offerPrice,
          usdc: formatPriceDisplay(decodedParams._offerPrice),
          fromDisplay: display_name,
          toDisplay: concatStringFromTo(
            decodedParams._receiver,
            1,
            4,
            true,
            true,
            5
          ),
        };
        tempObj.to = decodedParams._receiver;
        tempObj.timeStamp = formatDistanceToNow(tempObj.timeStamp * 1000, {
          locale: fr,
          addSuffix: true,
        });
        tempObj.timeStamp = tempObj.timeStamp.replace("environ ", "");
        console.log(tempObj);
        tempPlaceBidTxOnlyArray.push(tempObj);

        let tempAlchemyObj = {
          contractAddress: decodedParams._contract,
          tokenId: decodedParams._tokenId,
          tokenType: "ERC721",
        };
        tempAlchemyArray.push(tempAlchemyObj);
      }
    }
    setAlchemyPlaceBidMetadata(tempAlchemyArray);
    setPlaceBid(tempPlaceBidTxOnlyArray);
  }, [allTx]);

  const [finalPlaceBid, setFinalPlaceBid] = useState([]);

  useEffect(() => {
    const loadMetadataAndBidStatus = async () => {
      if (placeBid.length != 0 && alchemyPlaceBidMetadata.length != 0) {
        const artifacts = require("../../contracts/Sofan.json");
        const { abi } = artifacts;
        const web3MarketplaceInstance = new web3Instance.eth.Contract(
          abi,
          marketplaceAddress
        );

        const settings = {
          apiKey: "34lcNFh-vbBqL9ignec_nN40qLHVOfSo",
          network: Network.ETH_GOERLI,
          maxRetries: 10,
        };
        const alchemy = new Alchemy(settings);

        const res = await alchemy.nft.getNftMetadataBatch(
          alchemyPlaceBidMetadata,
          {
            refreshCache: false,
          }
        );

        // console.log(res);
        let tempPlaceBid = [...placeBid];
        for (let i = 0; i < res.length; i++) {
          const AlchemyElement = res[i];
          for (let i = 0; i < placeBid.length; i++) {
            const element = placeBid[i];
            // query `to` user into firebase and add it if exist
            // let tempUserInfo;
            const feedPostCollectionRef = collection(db, "users");
            const otherUserSpecificQuery = query(
              feedPostCollectionRef,
              where("metamask", "==", element.to)
            );
            const querySnapshot = await getDocs(otherUserSpecificQuery);
            if (!querySnapshot.empty) {
              querySnapshot.forEach((doc) => {
                const userInfo = doc.data();
                // tempUserInfo = userInfo;
                const tempObj = {
                  ...element,
                  firebaseToId: userInfo.id,
                  toAccountType: userInfo.account_type,
                  oldToDisplay: element.toDisplay,
                };
                tempObj.toDisplay = userInfo.display_name;
                tempPlaceBid[i] = tempObj;
                console.log(tempPlaceBid[i]);
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
                  // tempUserInfo = userInfo;
                  const tempObj = {
                    ...element,
                    firebaseToId: userInfo.id,
                    toAccountType: userInfo.account_type,
                    oldToDisplay: element.toDisplay,
                  };
                  tempObj.toDisplay = userInfo.display_name;
                  tempPlaceBid[i] = tempObj;
                  console.log(userInfo);
                });
              } else {
                console.log("No metamask or web3auth found");
              }
            }

            if (
              AlchemyElement.tokenId === element.tokenId &&
              AlchemyElement.contract.address.toLowerCase() ===
                element.nftContract.toLowerCase()
            ) {
              const getBid = await web3MarketplaceInstance.methods
                .getBid(element.to, element.nftContract, element.tokenId)
                .call();
              // console.log("getBid", getBid);
              let tempObj = {
                ...tempPlaceBid[i],
                title: concatStringFromTo(
                  AlchemyElement.rawMetadata.name,
                  22,
                  22,
                  true,
                  false,
                  0
                ),
                image: AlchemyElement.rawMetadata.image,
              };
              for (let i = 0; i < getBid.length; i++) {
                const bidElement = getBid[i];
                // TODO: Change condition to bidElement.TimeStamp when added in smart contract
                if (
                  (bidElement.price === element.price &&
                    bidElement.sender === element.from) ||
                  true // remove '|| true' when deploy new marketplace
                ) {
                  tempObj = { ...tempObj, status: getBid.bidStatus };
                }
              }
              tempPlaceBid[i] = tempObj;
            }
          }
        }
        console.log(tempPlaceBid);
        setFinalPlaceBid(tempPlaceBid);
      }
    };
    loadMetadataAndBidStatus();
  }, [placeBid, alchemyPlaceBidMetadata]);

  // should be in UserProfilePage
  const [isAddressCopiedClicked, setIsAddressCopiedClicked] = useState(false);
  const [copyAddressAnimationHide, setCopyAddressAnimationHide] =
    useState(false);
  const [handleTimeout, setHandleTimeout] = useState([]);
  function handleClickCopyConfirmWallet(e) {
    navigator.clipboard.writeText(
      e.target.parentElement.children[0].attributes[0].value
    );
    console.log(window);
    setIsAddressCopiedClicked(true);
    // setHandleTimeout([first]);
  }

  useEffect(() => {
    if (isAddressCopiedClicked === true) {
      const first = setTimeout(() => {
        setCopyAddressAnimationHide(true);
      }, 2000);

      const second = setTimeout(() => {
        setIsAddressCopiedClicked(false);
        setCopyAddressAnimationHide(false);
      }, 2200);

      return () => {
        clearTimeout(first);
        clearTimeout(second);
      };
    }
  }, [isAddressCopiedClicked]);
  // useEffect(() => {
  //   if
  //   if(handleTimeout.length === 2){
  //     clearTimeout(handleTimeout[0]);
  //     clearTimeout(handleTimeout[1]);
  //   }
  // }, [handleTimeout]);
  return (
    <>
      <div className="useroffersmade-component">
        <div className="useroffersmade-table-container">
          <div>NFT</div>
          <div className="useroffersmade-table-container-offer">Offer</div>
          <div></div>
          <div>from</div>
          <div>To</div>
          <div>Status</div>
          <div className="useroffersmade-table-container-date">Date</div>
        </div>
        <div className="useroffersmade-content-container">
          {finalPlaceBid.length != 0
            ? finalPlaceBid.map((tx) => (
                <div className="useroffersmade-content-container-wrap">
                  <div className="useroffersmade-content-container-nft-wrap">
                    <img src={tx.image} alt="nft" />
                    <div className="useroffersmade-content-container-nft-wrap-info-wrap">
                      <span>{tx.title}</span>
                      <span>#{tx.tokenId}</span>
                    </div>
                  </div>
                  <div className="useroffersmade-content-container-offer-wrap">
                    <span>{tx.usdc} €</span>
                    <span>
                      {tx?.usdc && ethPrice
                        ? (
                            parseFloat(tx.usdc.toString().replace(",", ".")) /
                            ethPrice
                          )
                            .toString()
                            .slice(0, 8) + " ETH"
                        : "--"}
                    </span>
                  </div>
                  <div></div>
                  <div className="useroffersmade-content-container-from-wrap">
                    <span>{tx.fromDisplay}</span>
                  </div>
                  {tx.toDisplay.slice(0, 2) != "0x" ? (
                    <div>
                      <Link
                        style={{ textDecoration: "none" }}
                        to={
                          tx.account_type === "athlete"
                            ? `/athleteprofile/${tx.firebaseToId}`
                            : `/userprofile/${tx.firebaseToId}`
                        }
                        target="_blank"
                      >
                        {tx.toDisplay}
                      </Link>
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
                          style={{ width: 10, heigth: 10, marginLeft: 4 }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <span>{tx.toDisplay}</span>
                    </div>
                  )}
                  <div>
                    <span>{tx.status ? tx.status : "error"}</span>
                  </div>
                  <div>
                    <span className="useroffersmade-content-container-date">
                      {tx.timeStamp}
                    </span>
                  </div>
                </div>
              ))
            : placeBid?.map((tx) => (
                <div className="useroffersmade-content-container-wrap">
                  <div className="useroffersmade-content-container-nft-wrap">
                    <img src={"Loading..."} alt="nft" />
                    <div className="useroffersmade-content-container-nft-wrap-info-wrap">
                      <span>{"Loading"}</span>
                      <span>#{tx.tokenId}</span>
                    </div>
                  </div>
                  <div className="useroffersmade-content-container-offer-wrap">
                    <span>{tx.usdc} €</span>
                    <span>{"tx.price.eth"} ETH</span>
                  </div>
                  <div></div>
                  <div className="useroffersmade-content-container-from-wrap">
                    <span>{tx.fromDisplay}</span>
                  </div>
                  <div>
                    <span>{tx.toDisplay}</span>
                  </div>
                  <div>
                    <span>{"Loading..."}</span>
                  </div>
                  <div>
                    <span className="useroffersmade-content-container-date">
                      {tx.timeStamp}
                    </span>
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
                ? "useroffersmade-address-hide"
                : "useroffersmade-address-copied"
            }
          >
            Copié dans le presse-papier !
          </div>
        </>
      )}
    </>
  );
};

export default UserOffersMade;
