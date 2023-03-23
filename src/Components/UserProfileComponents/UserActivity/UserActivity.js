import React from "react";
import "./UserActivity.css";
import NftList from "../NftList/NftList";
import DataTitles from "../DataTitles/DataTitles";

function UserActivity({ userFrom, nftsFromOwner }) {
  // setTimeout(() => {
    
  //   console.log(nftsFromOwner)
  // }, 5000);
  console.log(nftsFromOwner)
  return (
    <div className="user-activity-container">
      <DataTitles
        activityUserPriceTitle="Price"
        activityUserQuantityTitle="Quantity"
        activityUserFrom="From"
        activityUserTo="To"
      />
      <div className="nft-list-activity-user-container">
        {nftsFromOwner?.map((user, i, apiNftData) => (
          <NftList
            nftsFromOwnerImage={apiNftData[i]?.media[0]?.gateway}
            nftsFromOwnerNameCollection={apiNftData[i]?.contract?.name}
            nftsFromOwnerIdNft={apiNftData[i]?.tokenId}
            nftsFromOwnerFloorPrice={
              apiNftData[i]?.contract?.openSea?.floorPrice
            }
            nftsFromOwnerQuantity={apiNftData[i]?.balance}
            //
            activityUserQuantity="1"  
            activityUserFrom={user.from}
            activityUserTo={user.to}
            priceEth={user.nftPriceEth}
            date={user.date}
            nftTitle={user.nftTitle}
            nftId={user.nftId}
            nftImg={user.nftImg}
            func={user.function}
            key={i}
            //
          />
        ))}
      </div>
    </div>
  );
}

export default UserActivity;
