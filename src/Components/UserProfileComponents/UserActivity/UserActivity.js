import React from "react";
import "./UserActivity.css";
import NftList from "../NftList/NftList";
import DataTitles from "../DataTitles/DataTitles";

function UserActivity() {
  // Backend here
  const nftListArray = Array.from({ length: 159 }); // create an array with 6 empty elements

  return (
    <div className="user-activity-container">
      <DataTitles/>
      <div className="nft-list-activity-user-container">
        {nftListArray.map((_, index) => (
          <NftList key={index} />
        ))}
      </div>
    </div>
  );
}

export default UserActivity;
