import React from "react";
import "./UserActivity.css";
import NftList from "../NftList/NftList";
import DataTitles from "../DataTitles/DataTitles";

function UserActivity({userFrom}) {
  return (
    <div className="user-activity-container">
      <DataTitles
      activityUserPriceTitle="Price"
      activityUserQuantityTitle="Quantity"
      activityUserFrom="From"
      activityUserTo="To"
      />
      <div className="nft-list-activity-user-container">
        {userFrom?.map((user, index) => (
          <NftList 
          activityUserQuantity="1"
          activityUserFrom={user.from}
          activityUserTo={user.to}
          priceEth={user.nftPriceEth}
          date={user.date}
          key={index} />
        ))}
      </div>
    </div>
  );
}

export default UserActivity;
