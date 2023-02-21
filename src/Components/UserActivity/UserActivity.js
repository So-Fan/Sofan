import React from "react";
import "./UserActivity.css";
import NftList from "../NftList/NftList";

function UserActivity() {
  const nftListArray = Array.from({length: 159}); // create an array with 6 empty elements

  return (
    <div className="user-activity-container">
      <div className="separation-line-horizontal-userprofile"></div>
      <div className="user-data-types-activity">
        <div className="user-nft-type-activity">NFT</div>
        <div className="user-price-type-activity">Price</div>
        <div className="user-quantity-type-activity">Quantity</div>
        <div className="user-from-type-activity">From</div>
        <div className="user-to-type-activity">To</div>
        <div className="user-date-type-activity">Date</div>
      </div>
      <div className="separation-line-horizontal-userprofile" id="separation-line-horizontal-bottom-userprofile"></div>
      <div className="nft-list-activity-user-container">
      {nftListArray.map((_, index) => <NftList key={index} />)}
      </div>
    </div>
  );
}

export default UserActivity;
