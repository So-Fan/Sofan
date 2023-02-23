import React from "react";
import "./UserActivity.css";
import NftList from "../NftList/NftList";
import DataTitles from "../DataTitles/DataTitles";

function UserActivity() {
  // Backend here
  const nftListArray = Array.from({ length: 159 });

  return (
    <div className="user-activity-container">
      <DataTitles
      activityUserPriceTitle="Price"
      activityUserQuantityTitle="Quantity"
      activityUserFrom="From"
      activityUserTo="To"
      />
      <div className="nft-list-activity-user-container">
        {nftListArray.map((_, index) => (
          <NftList 
          activityUserQuantity="1"
          activityUserFrom="Alexia Barrier"
          activityUserTo="Gr3goir3"
          key={index} />
        ))}
      </div>
    </div>
  );
}

export default UserActivity;
