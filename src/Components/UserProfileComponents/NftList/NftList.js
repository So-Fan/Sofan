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
  nftImg
}) {  
  console.log(date);
  return (
    // Backend here
    <div className="user-nft-transfer-container">
      <div className={`nft-origin-type ${offersDisplaySourceTypeClass}`}>
        {func}
      </div>
      <Link className={`user-nft-picture-and-title ${offersNftContentClass}`}>
        <img src={nftImg} alt="nft picture" />
        <div className="collection-name-nft-id-user-activity">
          <span>{nftTitle}</span>
          <span>{nftId}</span>
        </div>
      </Link>
      <div className={`nft-price-user-activity ${offersYourOffersPriceClass}`}>
        <div className="nftc-price-eth-user-activity">{priceEth} ETH</div>
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
        {date}
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
