import React from "react";
import "./NftList.css";
import explorePicture from "../../../Assets/Image/explorepicture.svg";
import redCross from "../../../Assets/Image/redcross-offers.svg";
import greenCross from "../../../Assets/Image/greencross-offers.svg";

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
  receivedFrom
}) {  
  return (
    // Backend here
    <div className="user-nft-transfer-container">
      <div className={`nft-origin-type ${offersDisplaySourceTypeClass}`}>
        Mint
      </div>
      <div className={`user-nft-picture-and-title ${offersNftContentClass}`}>
        <img src={explorePicture} alt="nft picture" />
        <div className="collection-name-nft-id-user-activity">
          <span>Explore the World with Alexia...</span>
          <span>#393</span>
        </div>
      </div>
      <div className={`nft-price-user-activity ${offersYourOffersPriceClass}`}>
        <div className="nftc-price-eth-user-activity">0.50 ETH</div>
        <div className="nft-price-eur-user-activity">692.04€</div>
      </div>
      <div className={`nft-quantity-user-activity ${offersFromClass}`}>
        {activityUserQuantity}
        {receivedFrom}
        
      </div>
      <div className={`nft-from-user-activity ${offersToClass}`}>
        {activityUserFrom}
        {offersTo}
      </div>
      <div className={`nft-to-user-activity ${offersStatusClass}`}>
        {activityUserTo}
        {offersStatus}
        {offersStatusImage}
      </div>
      <div className={`nft-date-transfer-user-activity ${offersDateClass}`}>
        1 hours ago
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
