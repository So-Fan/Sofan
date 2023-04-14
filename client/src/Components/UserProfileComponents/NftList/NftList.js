import React from "react";
import "./NftList.css";
import redCross from "../../../Assets/Image/redcross-offers.svg";
import greenCross from "../../../Assets/Image/greencross-offers.svg";
import { Link } from "react-router-dom";

function NftList({
  activityUserFrom,
  activityUserTo,
  activityUserQuantity,
  offersDisplaySourceTypeClass,
  offersTo,
  offersStatus,
  offersStatusImage,
  offersNftContentClass,
  offersYourOffersPriceClass,
  offersFromClass,
  offersToClass,
  offersStatusClass,
  offersDateClass,
  offersDeclineClass,
  offersAcceptClass,
  receivedFrom,
  nftTitle,
  nftId,
  date,
  priceEth,
  func,
  nftImg,
  // api Data
  nftsFromOwnerImage,
  nftsFromOwnerIdNft,
  nftsFromOwnerNameCollection,
  nftsFromOwnerFloorPrice,
  nftsFromOwnerQuantity,
  // transfer Data Api
  transferNftDataApi,
  nftTransferDate,
  // formulated offers
  isFormulatedOffersSectionActive,
  isUserActivitySectionActive,
  ethPrice,
}) {
  let ethPricePriceConverted = (
    nftsFromOwnerFloorPrice * ethPrice
  ).toLocaleString("fr-FR", { maximumFractionDigits: 1 });
  return (
    // Backend here
    <div className="user-nft-transfer-container">
      <div className={`nft-origin-type ${offersDisplaySourceTypeClass}`}>
        {func}
      </div>
      <Link className={`user-nft-picture-and-title ${offersNftContentClass}`}>
        <img src={nftsFromOwnerImage} alt="nft picture" />
        <div className="collection-name-nft-id-user-activity">
          <span>{nftsFromOwnerNameCollection}</span>
          <span>#{nftsFromOwnerIdNft}</span>
        </div>
      </Link>
      <div className={`nft-price-user-activity ${offersYourOffersPriceClass}`}>
        <div className="nftc-price-eth-user-activity">
          {ethPricePriceConverted}€
        </div>
        <div className="nft-price-eur-user-activity">
          {nftsFromOwnerFloorPrice} ETH
        </div>
      </div>
      <div className={`nft-quantity-user-activity ${offersFromClass}`}>
        {isFormulatedOffersSectionActive && <>{transferNftDataApi.from}</>}

        {nftsFromOwnerQuantity}
        {receivedFrom}
      </div>
      <div className={`nft-from-user-activity ${offersToClass}`}>
        {isUserActivitySectionActive && <>{transferNftDataApi.from}</>}
        {isFormulatedOffersSectionActive && (
          <>
            {transferNftDataApi.to}
            {/* {offersTo} */}
          </>
        )}
      </div>
      <div className={`nft-to-user-activity ${offersStatusClass}`}>
        {isUserActivitySectionActive && <> {transferNftDataApi.to}</>}
        {isFormulatedOffersSectionActive && <>Pending {offersStatusImage}</>}
      </div>
      <div className={`nft-date-transfer-user-activity ${offersDateClass}`}>
        {nftTransferDate}
      </div>
      <div className={`nft-decline-received-offers ${offersDeclineClass}`}>
        <img src={redCross} alt="" />
      </div>
      <div className={`nft-accept-received-offers ${offersAcceptClass}`}>
        <img src={greenCross} alt="BOUTON ACCEPTER" />
      </div>
    </div>
  );
}

export default NftList;
