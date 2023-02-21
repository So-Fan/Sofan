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
        <div className="nft-price-user-activity">
          <div className="nftc-price-eth-user-activity">0.50 ETH</div>
          <div className="nft-price-eur-user-activity">692.04€</div>
        </div>
        <div className="nft-quantity-user-activity">1</div>
        <div className="nft-from-user-activity">Alexia Barrier</div>
        <div className="nft-to-user-activity">Gr3goir3</div>
        <div className="nft-date-transfer-user-activity">1 hour ago</div>
      </div>
    </div>
  );
}

export default UserActivity;
