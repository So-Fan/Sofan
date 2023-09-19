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
function MintPopUpBuy({
  maxMint,
  mintCounter,
  setMintCounter,
  counterNftMinted,
  totalNftMintable,
  ethPrice,
  eurPrice,
  //
  ethPriceApi,
  dataBlockchain,
  setIsMintButtonClicked,
  approve,
  isMintingProcessBegan,
  limitByWalletInfo,
  nftCollectionAddress,
}) {
  const [currentNumberOfNftOwned, setCurrentNumberOfNftOwned] = useState(0);
  const [copyLimitByWalletInfo, setCopyLimitByWalletInfo] = useState();
  const settings = {
    apiKey: "34lcNFh-vbBqL9ignec_nN40qLHVOfSo",
    network: Network.ETH_GOERLI,
    maxRetries: 10,
  };

  const alchemy = new Alchemy(settings);
  let ethPricePriceConverted = (ethPriceApi * ethPrice).toLocaleString(
    "fr-FR",
    { minimumFractionDigits: 1 }
  );

  const loggedInUserInfo = useUserCollection();
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
    console.log(copyLimitByWalletInfo);
    if (
      copyLimitByWalletInfo.limitByWallet != 0 &&
      e.target.className ===
        "mint-pop-up-buy-quantity-selector-increase-button" &&
      mintCounter < copyLimitByWalletInfo.limitByWallet
    ) {
      setMintCounter(mintCounter + 1);
    } else if (
      copyLimitByWalletInfo.limitByWallet != 0 &&
      e.target.className ===
        "mint-pop-up-buy-quantity-selector-decrease-button" &&
      mintCounter > 1
    ) {
      setMintCounter(mintCounter - 1);
    }
  }

  const nftMintedCalculated = (counterNftMinted / totalNftMintable) * 100;

  return (
    <>
      <div className="mint-pop-up-buy-container">
        <div
          className={
            isMintingProcessBegan
              ? "mint-pop-up-buy-wrap mint-pop-up-buy-wrap-hidden"
              : "mint-pop-up-buy-wrap"
          }
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
              -
            </div>
            <div className="mint-pop-up-buy-quantity-selector-counter">
              {mintCounter}
            </div>
            <div
              onClick={handleClick}
              className="mint-pop-up-buy-quantity-selector-increase-button"
            >
              +
            </div>
          </div>
          <div className="mint-pop-up-line-separation-first"></div>
          <div className="mint-pop-up-price-container">
            <div className="mint-pop-up-price-title">Prix</div>
            <div className="mint-pop-up-price-eth-eur-container">
              <div className="mint-pop-up-price-eth">
                {ethPricePriceConverted} €
              </div>
              <div className="mint-pop-up-price-eur">{ethPrice} ETH</div>
            </div>
          </div>
          <div className="mint-pop-up-line-separation-second"></div>
          <button className="mint-pop-up-mint-button" onClick={approve}>
            Mint maintenant
          </button>
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
