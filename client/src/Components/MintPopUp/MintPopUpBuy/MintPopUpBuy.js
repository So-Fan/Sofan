import React, { useEffect, useState } from "react";
import "./MintPopUpBuy.css";
import crossButton from "../../../Assets/Image/cross.svg";
import LaunchPadMintProgressBar from "../../LaunchPadMintProgressBar/LaunchPadMintProgressBar";
import useEth from "../../../contexts/EthContext/useEth";
import MintPopUpStatus from "../MintPopUpStatus/MintPopUpStatus";
import { formatCurrentBalance } from "../../../Utils/formatCurrentBalance";
import Modal from "../../Modal/Modal";
import PopUpAddFundToWallet from "../../PopUpAddFundToWallet/PopUpAddFundToWallet";
import { Alchemy, Network } from "alchemy-sdk";
import useUserCollection from "../../../contexts/UserContext/useUserCollection";
import { CrossmintPayButton } from "@crossmint/client-sdk-react-ui";
function MintPopUpBuy({
  maxMint,
  mintCounter,
  setMintCounter,
  counterNftMinted,
  totalNftMintable,
  nftMintPriceInETH,
  nftMintPriceInUSDC,
  //
  ethPriceApi,
  dataBlockchain,
  setIsMintButtonClicked,
  approve,
  isMintingProcessBegan,
  limitByWalletInfo,
  nftCollectionAddress,
  setTotalPriceInUSDC,
  totalPriceInUSDC,
  launchpadCollectionLiveAthleteDataBackend,
}) {
  const [currentNumberOfNftOwned, setCurrentNumberOfNftOwned] = useState(0);
  const [copyLimitByWalletInfo, setCopyLimitByWalletInfo] = useState();

  const [totalPriceInETH, setTotalPriceInETH] = useState();
  const loggedInUserInfo = useUserCollection();
  const settings = {
    apiKey: "34lcNFh-vbBqL9ignec_nN40qLHVOfSo",
    network: Network.ETH_GOERLI,
    maxRetries: 10,
  };

  const alchemy = new Alchemy(settings);

  useEffect(() => {
    if (limitByWalletInfo) {
      const loadData = async () => {
        if (
          limitByWalletInfo?.isLimitByWallet === true &&
          loggedInUserInfo.loggedInUser
        ) {
          if (loggedInUserInfo.loggedInUser.metamask) {
            const data = await alchemy.nft.getNftsForOwner(
              loggedInUserInfo.loggedInUser.metamask,
              {
                contractAddresses: [nftCollectionAddress],
              }
            );
            setCurrentNumberOfNftOwned(data.totalCount);
          } else if (loggedInUserInfo.loggedInUser.web3auth) {
            const data = await alchemy.nft.getNftsForOwner(
              loggedInUserInfo.loggedInUser.web3auth,
              {
                contractAddresses: [nftCollectionAddress],
              }
            );
            setCurrentNumberOfNftOwned(data.totalCount);
          }
        }
      };
      loadData();
    }
  }, [limitByWalletInfo]);

  useEffect(() => {
    const tempObj = {
      ...limitByWalletInfo,
    };
    tempObj.limitByWallet =
      parseInt(tempObj.limitByWallet) - parseInt(currentNumberOfNftOwned);
    setCopyLimitByWalletInfo(tempObj);
  }, [currentNumberOfNftOwned]);

  function handleClick(e) {
    // console.log("before click");
    if (
      copyLimitByWalletInfo.limitByWallet != 0 &&
      e.target.className ===
        "mint-pop-up-buy-quantity-selector-increase-button" &&
      mintCounter < copyLimitByWalletInfo.limitByWallet
    ) {
      // console.log("increment click");
      setMintCounter(mintCounter + 1);
      setTotalPriceInUSDC(nftMintPriceInUSDC * (mintCounter + 1));
      setTotalPriceInETH(nftMintPriceInETH * (mintCounter + 1));
    } else if (
      copyLimitByWalletInfo.limitByWallet != 0 &&
      e.target.className ===
        "mint-pop-up-buy-quantity-selector-decrease-button" &&
      mintCounter > 1
    ) {
      // console.log("decrement click");
      setMintCounter(mintCounter - 1);
      setTotalPriceInUSDC(nftMintPriceInUSDC * (mintCounter - 1));
      setTotalPriceInETH(nftMintPriceInETH * (mintCounter - 1));
    } else if (
      copyLimitByWalletInfo.limitByWallet === 0 &&
      e.target.className === "mint-pop-up-buy-quantity-selector-increase-button"
    ) {
      // console.log("increment click from second");
      setMintCounter(mintCounter + 1);
      setTotalPriceInUSDC(nftMintPriceInUSDC * (mintCounter + 1));
      setTotalPriceInETH(nftMintPriceInETH * (mintCounter + 1));
    } else if (
      copyLimitByWalletInfo.limitByWallet === 0 &&
      e.target.className ===
        "mint-pop-up-buy-quantity-selector-decrease-button" &&
      mintCounter > 1
    ) {
      // console.log("decrement click");
      setMintCounter(mintCounter - 1);
      setTotalPriceInUSDC(nftMintPriceInUSDC * (mintCounter - 1));
      setTotalPriceInETH(nftMintPriceInETH * (mintCounter - 1));
    }
  }
  useEffect(() => {
    setTotalPriceInUSDC(nftMintPriceInUSDC * mintCounter);
    setTotalPriceInETH(nftMintPriceInETH * mintCounter);
  }, []);

  const nftMintedCalculated = (counterNftMinted / totalNftMintable) * 100;
  // console.log(loggedInUserInfo);
  return (
    <>
      <div className="mint-pop-up-buy-container">
        <div
          className={
            isMintingProcessBegan
              ? "mint-pop-up-buy-wrap mint-pop-up-buy-wrap-hidden"
              : "mint-pop-up-buy-wrap"
          }
          style={{ marginBottom: "29px" }}
        >
          <div className="mint-pop-up-buy-title-and-cancel-button">
            <div>Acheter NFT</div>
            <div>{/* <img src={crossButton} alt="BOUTON CROIX" /> */}</div>
          </div>
          <div className="mint-pop-up-buy-question-and-max-nft">
            <div>Combien de NFT(s) voulez-vous ?</div>
            {copyLimitByWalletInfo?.isLimitByWallet && (
              <div>Max {copyLimitByWalletInfo?.limitByWallet} NFTs</div>
            )}
          </div>
          <div className="mint-pop-up-buy-quantity-selector-container">
            <div
              onClick={handleClick}
              className="mint-pop-up-buy-quantity-selector-decrease-button"
            >
              <span>-</span>
            </div>
            <div className="mint-pop-up-buy-quantity-selector-counter">
              {mintCounter}
            </div>
            <div
              onClick={handleClick}
              className="mint-pop-up-buy-quantity-selector-increase-button"
            >
              <span>+</span>
            </div>
          </div>
          <div className="mint-pop-up-line-separation-first"></div>
          <div className="mint-pop-up-price-container">
            <div className="mint-pop-up-price-title">Prix</div>
            <div className="mint-pop-up-price-eth-eur-container">
              <div className="mint-pop-up-price-eth">
                {totalPriceInUSDC &&
                  formatCurrentBalance(totalPriceInUSDC).slice(0, 4)}
                €
              </div>
              <div className="mint-pop-up-price-eur">
                {totalPriceInETH && totalPriceInETH.toString().slice(0, 8)}
                ETH
              </div>
            </div>
          </div>
          <div className="mint-pop-up-line-separation-second"></div>
          <button
            className="mint-pop-up-mint-button"
            style={{ marginBottom: "19px", height: "35px" }}
            onClick={approve}
          >
            Mint maintenant
          </button>
          <CrossmintPayButton
            getButtonText={(connecting, paymentMethod) =>
              connecting ? "Connection..." : `Payer par carte bancaire`
            }
            collectionId={`${launchpadCollectionLiveAthleteDataBackend[0].crossmint_collection_id}`}
            projectId={`${launchpadCollectionLiveAthleteDataBackend[0].crossmint_project_id}`}
            mintConfig={{
              type: "erc-721",
              totalPrice: `${formatCurrentBalance(totalPriceInUSDC)}`,
              _quantity: `${mintCounter}`,
              _amount: `${totalPriceInUSDC}`,
              quantity: `${mintCounter}`,
            }}
            environment="staging"
            mintTo={
              loggedInUserInfo.loggedInUser?.metamask
                ? `${loggedInUserInfo.loggedInUser.metamask}`
                : loggedInUserInfo.loggedInUser?.web3auth
                ? `${loggedInUserInfo.loggedInUser.web3auth}`
                : null
            }
            className="xmint-btn"
          />
          <div className="mint-pop-up-progress-bar-and-total-minted">
            <LaunchPadMintProgressBar
              nftMintedCalculated={nftMintedCalculated}
              counterNftMinted={counterNftMinted}
              totalNftMintable={totalNftMintable}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default MintPopUpBuy;
