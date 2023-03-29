import React from "react";
import "./DataTitles.css";
function DataTitles({
  activityUserPriceTitle,
  activityUserQuantityTitle,
  activityUserFrom,
  activityUserTo,
  yourOffersTitle,
  offersFromTitle,
  offersToTitle,
  offersStatusTitle,
  offersNftTitleClass,
  yourOffersTitleClass,
  offersFromTitleClass,
  offersToTitleClass,
  offersStatusTitleClass,
  offersDateTitleClass,
}) {
  return (
    <>
      {/* <div className="separation-line-horizontal-userprofile"></div> */}
      <div className="user-data-types-activity">
        <div className={`user-nft-type-activity ${offersNftTitleClass}`}>
          NFT
        </div>
        <div className={`user-price-type-activity ${yourOffersTitleClass}`}>
          {activityUserPriceTitle}
          {yourOffersTitle}
        </div>
        <div className={`user-quantity-type-activity ${offersFromTitleClass}`}>
          {activityUserQuantityTitle}
          {offersFromTitle}
        </div>
        <div className={`user-from-type-activity ${offersToTitleClass} `}>
          {activityUserFrom}
          {offersToTitle}
        </div>
        <div className={`user-to-type-activity ${offersStatusTitleClass}`}>
          {activityUserTo}
          {offersStatusTitle}
        </div>
        <div className={`user-date-type-activity ${offersDateTitleClass}`}>
          Date
        </div>
      </div>
      <div
        className="separation-line-horizontal-userprofile"
        id="separation-line-horizontal-bottom-userprofile"
      ></div>
    </>
  );
}

export default DataTitles;
