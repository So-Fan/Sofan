import React, { useState } from "react";
import "./NftCollectionHeader.css";
import explorePicture from "../../Assets/Image/explorepicture.svg";
import DropDownButtonMenu from "../PostsComponents/DropDownButtonMenu/DropDownButtonMenu";
import LaunchPadMintProgressBar from "../LaunchPadMintProgressBar/LaunchPadMintProgressBar";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import PopupListNFT from "../PopupListNFT/PopupListNFT";
import { Link } from "react-router-dom";
import { formatCurrentBalance } from "../../Utils/formatCurrentBalance";
import { useLocation } from "react-router-dom";
import MoreAboutThisCollection from "../MoreAboutThisCollection/MoreAboutThisCollection";
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
  currentOwnerInfo,
  knowMoreAboutCollection,
}) {
  const [styleChangeButton, setStyleChangeButton] = useState("");
  const location = useLocation();
  const segments = location.pathname.split("/");
  const currentPage = segments[1];
  const collectionAddress = segments[3];
  const nftMintedCalculated = (counterNftMinted / totalNftMintable) * 100;
  function handleStyleButton() {
    // if (nftMintedCalculated === 0 || nftMintedCalculated === 100) {
    //   return "#EDEDED";
    // } else if (nftMintedCalculated > 0) {
    //   return "";
    // }
  }
  let ethPricePriceConverted = (nftPriceEth * ethPrice).toLocaleString(
    "fr-FR",
    { maximumFractionDigits: 2 }
  );
  let ethBidPriceConverted = (nftBidEth * ethPrice).toLocaleString("fr-FR", {
    maximumFractionDigits: 2,
  });
  //console.log(currentOwnerInfo);
  return (
    <section className="nft-collection-header-container">
      <div className="nft-collection-header-picture">
        <Link
          to={
            currentPage === "nftsingle"
              ? `/nftcollection/${segments[2]}`
              : `/nftcollection/${segments[3]}`
          }
        >
          <button className="launchpad-collection-live-button-container">
            Explorer la collection
          </button>
        </Link>
        {nftPicture ? (
          <>
            <img src={nftPicture} alt="IMAGE NFT" />
          </>
        ) : (
          <div className="nft-collection-header-div-no-img">PAS D'IMAGE</div>
        )}
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
                  {nftPriceEur && formatCurrentBalance(nftPriceEur).slice(0, 4)}
                  €
                </div>
                <div className="launchpad-collection-live-header-right-eur-price">
                  {nftPriceEth} ETH
                </div>
              </div>
              <div className="launchpad-collection-live-header-right-mint-module-container">
                <div className="launchpad-collection-live-header-right-mint-module-timer-and-limit">
                  <div
                    style={{ visibility: "hidden" }}
                    className="launchpad-collection-live-header-right-mint-module-timer"
                  >
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
                    // style={{ backgroundColor: handleStyleButton() }}
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
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                    to={`/athleteprofile/${athleteId}`}
                    className="nft-collection-header-owner-creator-title-and-name-creator"
                  >
                    <span className="nft-collection-header-owner-creator-title-creator">
                      Créateur
                    </span>
                    <span className="nft-collection-header-owner-creator-name-creator">
                      {creatorName}
                    </span>
                  </Link>
                </div>
                <div className="nft-collection-header-owner-container">
                  <div>
                    <img
                      src={ownerProfilePic}
                      alt="Photo de profile Propriétaire"
                    />
                  </div>
                  {currentOwnerInfo?.account_type !== "athlete" &&
                  currentOwnerInfo?.account_type !== "free" ? (
                    <span className="nft-collection-header-owner-creator-title-and-name-owner">
                      <span className="nft-collection-header-owner-creator-title-owner">
                        Propriétaire
                      </span>
                      <span className="nft-collection-header-owner-creator-name-owner">
                        {ownerName}
                      </span>
                    </span>
                  ) : (
                    <Link
                      style={{ textDecoration: "none", color: "black" }}
                      to={
                        currentOwnerInfo?.account_type === "athlete"
                          ? `/athleteprofile/${currentOwnerInfo.id}`
                          : `/userprofile/${currentOwnerInfo.id}`
                      }
                      className="nft-collection-header-owner-creator-title-and-name-owner"
                    >
                      <span className="nft-collection-header-owner-creator-title-owner">
                        Propriétaire
                      </span>
                      <span className="nft-collection-header-owner-creator-name-owner">
                        {ownerName}
                      </span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
            <div className="nft-collection-header-line-separation"></div>
            <MoreAboutThisCollection
              isNftSinglePageDisplayHeader={true}
              knowMoreAboutCollection={knowMoreAboutCollection}
            />
            <Link
              to={`/collectionlive/${athleteId}/${segments[2]}`}
              className="nft-collection-header-mint-button-redirection"
            >
              Aller sur la page de mint
              {/* <div></div> */}
            </Link>
            {/* <div
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
                        {listingPrice ? `${listingPrice} ` : "-- "} €
                      </span>
                      <span className="nft-collection-header-eur-price">
                        {listingPrice ? `${nftPriceEth} ` : "-- "} ETH
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
            </div> */}
          </div>
        </>
      )}
    </section>
  );
}

export default NftCollectionHeader;
