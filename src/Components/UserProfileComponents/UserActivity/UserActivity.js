import React, { useState, useEffect } from "react";
import "./UserActivity.css";
import NftList from "../NftList/NftList";
import DataTitles from "../DataTitles/DataTitles";

function UserActivity({
  userFrom,
  nftsFromOwner,
  transferNftDataApi,
  setTransferNftDataApi,
}) {
  const [concatTransferNftDataApi, setConcatTransferNftDataApi] = useState();
  // const [nftTransferDate, setNftTransferDate] = useState([]);
  const nftTransferDate = []
  // useEffect(() => {
  function concatStringFromTo(
    string,
    maxLentgth,
    from0To_NUMBER_,
    isDotDotDot,
    isEnd
  ) {
    if (string.length > maxLentgth) {
      const stringBegin = string.slice(0, from0To_NUMBER_);
      const dotDotDot = "...";
      const stringEnd = string.slice(string.length - 3, string.length);
      if (!isDotDotDot && !isEnd) {
        return stringBegin;
      } else if (isDotDotDot && !isEnd) {
        return stringBegin + dotDotDot;
      } else if (isDotDotDot && isEnd) {
        return stringBegin + dotDotDot + stringEnd;
      } else {
        return string;
      }
    } else {
      return string;
    }
  }

  // Boucle pour UserActivity des données API - FROM
  for (let i = 0; i < transferNftDataApi.transfers.length; i++) {
    transferNftDataApi.transfers[i].from = concatStringFromTo(
      transferNftDataApi?.transfers[i]?.from,
      7,
      7,
      false,
      false
    );
  }
  // Boucle pour UserActivity des données API - TO
  for (let i = 0; i < transferNftDataApi.transfers.length; i++) {
    transferNftDataApi.transfers[i].to = concatStringFromTo(
      transferNftDataApi?.transfers[i]?.to,
      7,
      7,
      false,
      false
    );
  }
  // console.log(transferNftDataApi?.transfers[0]?.metadata?.blockTimestamp);
  for (let i = 0; i < transferNftDataApi.transfers.length; i++) {
    const dateString =
      transferNftDataApi?.transfers[i]?.metadata?.blockTimestamp;
    const date = new Date(Date.parse(dateString));
    const today = new Date();
    const diffInMs = today.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    nftTransferDate.push(diffInDays)
  }
  // console.log(nftTransferDate)
  // console.log(transferNftDataApi.transfers.length)
  // "2021-11-10T03:55:03.000Z"

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
            transferNftDataApi={transferNftDataApi.transfers[i]}
            nftTransferDate={nftTransferDate[i]}
            // 
            // nftTransferDate={nftTransferDate}
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
