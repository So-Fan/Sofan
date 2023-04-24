import React, { useState } from "react";
import "./NftCollectionHeader.css";
import explorePicture from "../../Assets/Image/explorepicture.svg";
import DropDownButtonMenu from "../PostsComponents/DropDownButtonMenu/DropDownButtonMenu";
import LaunchPadMintProgressBar from "../LaunchPadMintProgressBar/LaunchPadMintProgressBar";
import Button from "../Button/Button";

function NftCollectionHeader({
  collectionName,
  nftNumber,
  creatorName,
  creatorProfilePic,
  // description,
  ownerName,
  ownerProfilePic,
  //
  nftPriceEth,
  nftPriceEur,
  nftBidEth,
  nftBifEur,
  //
  launchpadCollectionLiveHeader,
  //
  minLimit,
  timer,
  counterNftMinted,
  totalNftMintable,
  //
  collectionNameApi,
  collectionDescriptionApi,
  nftPicture,
  nftIdApi,
  //
  ethPrice,
  handleBuyNftButtonClick,
  handleBidNftButtonClick,
  //
  handleMintButtonClick,
}) {
  const [styleChangeButton, setStyleChangeButton] = useState("");

  const nftMintedCalculated = (counterNftMinted / totalNftMintable) * 100;
  function handleStyleButton() {
    if (nftMintedCalculated === 0 || nftMintedCalculated === 100) {
      return "#EDEDED";
    } else if (nftMintedCalculated > 0) {
      return "";
    }
  }
  // console.log(collectionDescriptionApi)
  let ethPricePriceConverted = (nftPriceEth * ethPrice).toLocaleString(
    "fr-FR",
    { maximumFractionDigits: 2 }
  );
  let ethBidPriceConverted = (nftBidEth * ethPrice).toLocaleString("fr-FR", {
    maximumFractionDigits: 2,
  });
  return (
    <section className="nft-collection-header-container">
      <div className="nft-collection-header-picture">
        {launchpadCollectionLiveHeader && (
          <>
            <button className="launchpad-collection-live-button-container">
              Explorer la collection
            </button>
          </>
        )}
        <img src={nftPicture} alt="IMAGE NFT" />
      </div>
      {launchpadCollectionLiveHeader ? (
        <>
          <div className="launchpad-collection-live-header-right-container">
            <div className="launchpad-collection-live-header-right-wrap">
              <div className="launchpad-collection-live-header-right-creator-pic-and-usernamme">
                <div>
                  <img
                    src={creatorProfilePic}
                    alt="Photo de profile Createur"
                  />
                </div>
                <div>by {creatorName}</div>
              </div>
              <div className="launchpad-collection-live-header-right-collection-name">
                {collectionNameApi}
              </div>
              <div className="launchpad-collection-live-header-right-collection-description">
                {collectionDescriptionApi}
              </div>
              <div className="launchpad-collection-live-header-right-line-separation"></div>
              <div className="launchpad-collection-live-header-right-price-container">
                <div className="launchpad-collection-live-header-right-eth-price">
                  {ethPricePriceConverted}€
                </div>
                <div className="launchpad-collection-live-header-right-eur-price">
                  {nftPriceEth} ETH
                </div>
              </div>
              <div className="launchpad-collection-live-header-right-mint-module-container">
                <div className="launchpad-collection-live-header-right-mint-module-timer-and-limit">
                  <div className="launchpad-collection-live-header-right-mint-module-timer">
                    End in {timer}
                  </div>
                  <div className="launchpad-collection-live-header-right-mint-module-limit">
                    Limit {minLimit} per wallet
                  </div>
                </div>
                <LaunchPadMintProgressBar
                  nftMintedCalculated={nftMintedCalculated}
                  counterNftMinted={counterNftMinted}
                  totalNftMintable={totalNftMintable}
                />
                <div className="launchpad-collection-live-header-right-mint-module-mint-button-container">
                  <button
                    style={{ backgroundColor: handleStyleButton() }}
                    className="launchpad-collection-live-header-right-mint-module-mint-button"
                    onClick={handleMintButtonClick}
                  >
                    Mint now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="nft-collection-header-data-and-buy-module-container">
            <div className="nft-collection-header-data-and-buy-module-content">
              <div className="nft-collection-header-collection-name-and-number">
                <div className="nft-collection-header-collection-name-title">
                  <p>{collectionNameApi}</p>
                  <div className="nft-collection-header-dropdown-button">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
                <div className="nft-collection-header-nft-number">
                  #{nftIdApi}
                </div>
              </div>
            </div>
            <div className="nft-collection-header-owner-creator-container">
              <div className="nft-collection-header-owner-creator-wrap">
                <div className="nft-collection-header-owner-container">
                  <div>
                    <img
                      src={creatorProfilePic}
                      alt="Photo de profile Createur"
                    />
                  </div>
                  <div className="nft-collection-header-owner-creator-title-and-name-creator">
                    <span className="nft-collection-header-owner-creator-title-creator">
                      Creator
                    </span>
                    <span className="nft-collection-header-owner-creator-name-creator">
                      {creatorName}
                    </span>
                  </div>
                </div>
                <div className="nft-collection-header-owner-container">
                  <div>
                    <img
                      src={ownerProfilePic}
                      alt="Photo de profile Propriétaire"
                    />
                  </div>
                  <div className="nft-collection-header-owner-creator-title-and-name-owner">
                    <span className="nft-collection-header-owner-creator-title-owner">
                      Owner
                    </span>
                    <span className="nft-collection-header-owner-creator-name-owner">
                      {ownerName}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="nft-collection-header-line-separation"></div>
            <div className="nft-collection-header-buy-module-container">
              <div className="nft-collection-header-buy-module-wrap">
                <div className="nft-collection-header-price-and-bid-container">
                  <div className="nft-collection-header-price-container">
                    <div className="nft-collection-header-price-wrap">
                      <span className="nft-collection-header-title-price">
                        Price
                      </span>
                      <span className="nft-collection-header-eth-price">
                        {ethPricePriceConverted} €
                      </span>
                      <span className="nft-collection-header-eur-price">
                        {nftPriceEth} ETH
                      </span>
                    </div>
                  </div>
                  <div className="nft-collection-header-bid-container">
                    <div className="nft-collection-header-bid-wrap">
                      <span className="nft-collection-header-title-bid">
                        Highest bid
                      </span>
                      <span className="nft-collection-header-eth-bid">
                        {ethBidPriceConverted} €
                      </span>
                      <span className="nft-collection-header-eur-bid">
                        {nftBidEth} ETH
                      </span>
                    </div>
                  </div>
                </div>
                <div className="nft-collection-header-buttons-container">
                  <div
                    className="nft-collection-header-buy-button"
                    onClick={handleBuyNftButtonClick}
                  >
                    Buy NFT
                  </div>
                  <div
                    className="nft-collection-header-bid-button"
                    onClick={handleBidNftButtonClick}
                  >
                    Place a bid
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default NftCollectionHeader;
