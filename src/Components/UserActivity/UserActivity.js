import React from "react";
import "./UserActivity.css";
import explorePicture from "../../Assets/Image/explorepicture.svg";
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
      <div className="user-nft-transfer-container">
        <div>Mint</div>
        <div className="user-nft-picture-and-title">
          <img src={explorePicture} alt="nft picture" />
          {/* <div> */}
          <div className="collection-name-nft-id-user-activity">
            <span>Explore the World with Alexia...</span>
            <span>#393</span>
          </div>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}

export default UserActivity;
