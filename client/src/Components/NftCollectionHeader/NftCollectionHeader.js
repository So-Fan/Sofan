import React, { useState } from "react";
import "./NftCollectionHeader.css";
import explorePicture from "../../Assets/Image/explorepicture.svg";
import DropDownButtonMenu from "../PostsComponents/DropDownButtonMenu/DropDownButtonMenu";
import LaunchPadMintProgressBar from "../LaunchPadMintProgressBar/LaunchPadMintProgressBar";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import PopupListNFT from "../PopupListNFT/PopupListNFT";
import { Link } from "react-router-dom";

function NftCollectionHeader({
  collectionName,
  nftNumber,
  creatorName,
  creatorProfilePic,
  description,
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
  isNFTOwner,
  isNFTListed,
  handleListNftButton,
  handleUnlistButton,
  isBuyListingButtonDisabled,
  listingPrice,
  athleteId,
}) {
  const [styleChangeButton, setStyleChangeButton] = useState("");

  const nftMintedCalculated = (counterNftMinted / totalNftMintable) * 100;
  function handleStyleButton() {
    // if (nftMintedCalculated === 0 || nftMintedCalculated === 100) {
    //   return "#EDEDED";
    // } else if (nftMintedCalculated > 0) {
    //   return "";
    // }
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
            <a href="/nftcollection">
              <button className="launchpad-collection-live-button-container">
                Explorer la collection
              </button>
            </a>
          </>
        )}
        <img src={nftPicture} alt="IMAGE NFT" />
      </div>
      {launchpadCollectionLiveHeader ? (
        <>
          <div className="launchpad-collection-live-header-right-container">
            <div className="launchpad-collection-live-header-right-wrap">
              <div className="launchpad-collection-live-header-right-creator-pic-and-usernamme-container">
                <Link
                  className="launchpad-collection-live-header-right-creator-username-creator-link"
                  to={`/athleteprofile/${athleteId}`}
                >
                  <div className="launchpad-collection-live-header-right-creator-pic-and-usernamme-wrap">
                    <div>
                      <img
                        src={creatorProfilePic}
                        alt="Photo de profile Createur"
                      />
                    </div>
                    <div>par {creatorName}</div>
                  </div>
                </Link>
              </div>
              <div className="launchpad-collection-live-header-right-collection-name">
                {collectionName}
              </div>
              <div className="launchpad-collection-live-header-right-collection-description">
                {description}
              </div>
              <div className="launchpad-collection-live-header-right-line-separation"></div>
              <div className="launchpad-collection-live-header-right-price-container">
                <div className="launchpad-collection-live-header-right-eth-price">
                  {nftPriceEur}€
                </div>
                <div className="launchpad-collection-live-header-right-eur-price">
                  {nftPriceEth} ETH
                </div>
              </div>
              <div className="launchpad-collection-live-header-right-mint-module-container">
                <div className="launchpad-collection-live-header-right-mint-module-timer-and-limit">
                  <div className="launchpad-collection-live-header-right-mint-module-timer">
                    Fin dans {timer}
                  </div>
                  {minLimit?.isLimitByWallet && (
                    <div className="launchpad-collection-live-header-right-mint-module-limit">
                      Limité à {minLimit.limitByWallet} par wallet
                    </div>
                  )}
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
                    Mint maintenant
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
                      Créateur
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
                      Propriétaire
                    </span>
                    <span className="nft-collection-header-owner-creator-name-owner">
                      {ownerName}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="nft-collection-header-line-separation"></div>
            <div
              className={
                isNFTOwner
                  ? "nft-collection-header-buy-module-container-owner"
                  : "nft-collection-header-buy-module-container"
              }
            >
              <div className="nft-collection-header-buy-module-wrap">
                <div
                  className={
                    isNFTOwner
                      ? "nft-collection-header-price-and-bid-container-owner"
                      : "nft-collection-header-price-and-bid-container"
                  }
                >
                  <div className="nft-collection-header-price-container">
                    <div className="nft-collection-header-price-wrap">
                      <span className="nft-collection-header-title-price">
                        Prix
                      </span>
                      <span className="nft-collection-header-eth-price">
                        {/* Handle ListingPrice correct display later */}
                        {listingPrice ? `${listingPrice} ` : "-- "} €
                      </span>
                      <span className="nft-collection-header-eur-price">
                        {listingPrice ? `${nftPriceEth} ` : "-- "} ETH
                        {/* Change nftPriceEth by the conversion of USDC in ETH */}
                      </span>
                    </div>
                  </div>
                  <div className="nft-collection-header-bid-container">
                    <div className="nft-collection-header-bid-wrap">
                      <span className="nft-collection-header-title-bid">
                        Meilleur offre
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
                  {isNFTOwner && isNFTListed ? (
                    <>
                      <div
                        className="nft-collection-header-buy-button"
                        onClick={handleUnlistButton}
                      >
                        Annuler
                      </div>
                    </>
                  ) : isNFTOwner && !isNFTListed ? (
                    <>
                      <div
                        className="nft-collection-header-buy-button"
                        onClick={handleListNftButton}
                      >
                        Mettre en vente
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        className={
                          isBuyListingButtonDisabled
                            ? "nft-collection-header-buy-button-disabled"
                            : "nft-collection-header-buy-button"
                        }
                        onClick={handleBuyNftButtonClick}
                      >
                        {isBuyListingButtonDisabled
                          ? "Not listed"
                          : "Acheter le NFT"}
                      </div>
                      <div
                        className="nft-collection-header-bid-button"
                        onClick={handleBidNftButtonClick}
                      >
                        Placer une offre
                      </div>
                    </>
                  )}
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
