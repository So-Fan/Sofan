import React, { useState, useEffect } from "react";
import "./UserActivity.css";
import NftList from "../NftList/NftList";
import DataTitles from "../DataTitles/DataTitles";
import { v4 as uuidv4 } from "uuid";

function UserActivity({
  userFrom,
  nftsFromOwner,
  transferNftDataApi,
  isUserActivitySectionActive,
  ethPrice,
}) {
  const nftTransferDate = [];
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

  // Boucle pour concat UserActivity des données API - FROM
  for (let i = 0; i < transferNftDataApi.transfers.length; i++) {
    transferNftDataApi.transfers[i].from = concatStringFromTo(
      transferNftDataApi?.transfers[i]?.from,
      7,
      7,
      false,
      false
    );
  }
  // Boucle pour concat UserActivity des données API - TO
  for (let i = 0; i < transferNftDataApi.transfers.length; i++) {
    transferNftDataApi.transfers[i].to = concatStringFromTo(
      transferNftDataApi?.transfers[i]?.to,
      7,
      7,
      false,
      false
    );
  }
  // Boucle pour convertir les dates
  for (let i = 0; i < transferNftDataApi.transfers.length; i++) {
    const dateString =
      transferNftDataApi?.transfers[i]?.metadata?.blockTimestamp;
    const date = new Date(Date.parse(dateString));

    // Formater la date
    const formattedDate = date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    // console.log(formattedDate);
    nftTransferDate.push(formattedDate);
  }
  // Inverser l'ordre du tableau
  const reversedNftsFromOwner = nftsFromOwner.slice().reverse();

  return (
    <div className="user-activity-container">
      <DataTitles
        activityUserPriceTitle="Price"
        activityUserQuantityTitle="Quantity"
        activityUserFrom="From"
        activityUserTo="To"
      />
      <div className="nft-list-activity-user-container">
        {reversedNftsFromOwner?.map((user, index, apiNftData) => (
          <NftList
            key={uuidv4()}
            isUserActivitySectionActive={isUserActivitySectionActive}
            nftsFromOwnerImage={apiNftData[index]?.media[0]?.gateway}
            nftsFromOwnerNameCollection={apiNftData[index]?.contract?.name}
            nftsFromOwnerIdNft={apiNftData[index]?.tokenId}
            nftsFromOwnerFloorPrice={
              apiNftData[index]?.contract?.openSea?.floorPrice
            }
            nftsFromOwnerQuantity={apiNftData[index]?.balance}
            //
            ethPrice={ethPrice}
            transferNftDataApi={transferNftDataApi.transfers[index]}
            nftTransferDate={nftTransferDate[index]}
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
            //
          />
        ))}
      </div>
    </div>
  );
}

export default UserActivity;
