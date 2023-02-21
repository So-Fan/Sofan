import React from "react";
import "./UserActivity.css";
import explorePicture from "../../Assets/Image/explorepicture.svg";
import NftList from "../NftList/NftList";
function UserActivity() {
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
      <div className="separation-line-horizontal-userprofile"></div>
      <NftList/>
    </div>
  );
}

export default UserActivity;
