import React from "react";
import "./UserActivity.css";
import NftList from "../NftList/NftList";
import DataTitles from "../DataTitles/DataTitles";

function UserActivity({userFrom, userFromApiEth }) {
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
          // 
          ethPriceFromApi={userFromApiEth}
          // 
          date={user.date}
          nftTitle={user.nftTitle}
          nftId={user.nftId}
          nftImg={user.nftImg}
          func={user.function}
          key={index} />
        ))}
      </div>
    </div>
  );
}

export default UserActivity;
