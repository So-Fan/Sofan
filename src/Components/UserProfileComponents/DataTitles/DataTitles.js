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
  formulatedOffersNftTitleClass,
  formulatedOffersYourOffersTitleClass,
  formulatedOffersFromTitleClass,
  formulatedOffersToTitleClass,
  formulatedOffersStatusTitleClass,
  formulatedOffersDateTitleClass
}) {
  return (
    <>
      <div className="separation-line-horizontal-userprofile"></div>
      <div className="user-data-types-activity">
        <div
          className={`user-nft-type-activity ${formulatedOffersNftTitleClass}`}
        >
          NFT
        </div>
        <div
          className={`user-price-type-activity ${formulatedOffersYourOffersTitleClass}`}
        >
          {activityUserPriceTitle}
          {formulatedOffersYourOffersTitle}
        </div>
        <div
          className={`user-quantity-type-activity ${formulatedOffersFromTitleClass}`}
        >
          {activityUserQuantityTitle}
          {formulatedOffersFromTitle}
        </div>
        <div
          className={`user-from-type-activity ${formulatedOffersToTitleClass} `}
        >
          {activityUserFrom}
          {formulatedOffersToTitle}
        </div>
        <div
          className={`user-to-type-activity ${formulatedOffersStatusTitleClass}`}
        >
          {activityUserTo}
          {formulatedOffersStatusTitle}
        </div>
        <div className={`user-date-type-activity ${formulatedOffersDateTitleClass}`}>Date</div>
      </div>
      <div
        className="separation-line-horizontal-userprofile"
        id="separation-line-horizontal-bottom-userprofile"
      ></div>
    </>
  );
}

export default DataTitles;
