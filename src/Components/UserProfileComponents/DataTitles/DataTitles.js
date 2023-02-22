import React from "react";
import "./DataTitles.css";
function DataTitles({
  activityUserPriceTitle,
  activityUserQuantityTitle,
  activityUserFrom,
  activityUserTo,
  formulatedOffersYourOffersTitle,
  formulatedOffersFromTitle,
  formulatedOffersToTitle,
  formulatedOffersStatusTitle,
}) {
  return (
    <>
      <div className="separation-line-horizontal-userprofile"></div>
      <div className="user-data-types-activity">
        <div className="user-nft-type-activity">NFT</div>
        <div className="user-price-type-activity">
          {activityUserPriceTitle}
          {formulatedOffersYourOffersTitle}
        </div>
        <div className="user-quantity-type-activity">
          {activityUserQuantityTitle}
          {formulatedOffersFromTitle}
        </div>
        <div className="user-from-type-activity">
          {activityUserFrom}
          {formulatedOffersToTitle}
        </div>
        <div className="user-to-type-activity">
          {activityUserTo}
          {formulatedOffersStatusTitle}
        </div>
        <div className="user-date-type-activity">Date</div>
      </div>
      <div
        className="separation-line-horizontal-userprofile"
        id="separation-line-horizontal-bottom-userprofile"
      ></div>
    </>
  );
}

export default DataTitles;
