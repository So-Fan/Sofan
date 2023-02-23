import React from "react";
import "./NftList.css";
import explorePicture from "../../../Assets/Image/explorepicture.svg";
function NftList({
  activityUserFrom,
  activityUserTo,
  activityUserQuantity,
  formulatedOffersDisplaySourceType,
  formulatedOffersFrom,
  formulatedOffersTo,
  formulatedOffersStatus,
  formulatedOffersStatusImage,
  formulatedOffersNftContentClass,
  formulatedOffersYourOffersPriceClass,
  formulatedOffersFromClass,
  formulatedOffersToClass,
  formulatedOffersStatusClass,
  formulatedOffersDateClass,
}) {
  return (
    // Backend here
    <div className="user-nft-transfer-container">
      <div className={`nft-origin-type ${formulatedOffersDisplaySourceType}`}>
        Mint
      </div>
      <div
        className={`user-nft-picture-and-title ${formulatedOffersNftContentClass}`}
      >
        <img src={explorePicture} alt="nft picture" />
        <div className="collection-name-nft-id-user-activity">
          <span>Explore the World with Alexia...</span>
          <span>#393</span>
        </div>
      </div>
      <div
        className={`nft-price-user-activity ${formulatedOffersYourOffersPriceClass}`}
      >
        <div className="nftc-price-eth-user-activity">0.50 ETH</div>
        <div className="nft-price-eur-user-activity">692.04€</div>
      </div>
      <div
        className={`nft-quantity-user-activity ${formulatedOffersFromClass}`}
      >
        {activityUserQuantity}
        {formulatedOffersFrom}
      </div>
      <div className={`nft-from-user-activity ${formulatedOffersToClass}`}>
        {activityUserFrom}
        {formulatedOffersTo}
      </div>
      <div className={`nft-to-user-activity ${formulatedOffersStatusClass}`}>
        {activityUserTo}
        {formulatedOffersStatus}
        {formulatedOffersStatusImage}
      </div>
      <div
        className={`nft-date-transfer-user-activity ${formulatedOffersDateClass}`}
      >
        1 hours ago
      </div>
    </div>
  );
}

export default NftList;
