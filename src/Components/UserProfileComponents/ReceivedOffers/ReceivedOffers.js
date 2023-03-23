import React from "react";
import DataTitles from "../DataTitles/DataTitles";
import NftList from "../NftList/NftList";
import "./ReceivedOffers.css";

function ReceivedOffers({ userFrom, nftsFromOwner, transferNftDataApi }) {
  const nftTransferDate = [];
  for (let i = 0; i < transferNftDataApi.transfers.length; i++) {
    const dateString =
      transferNftDataApi?.transfers[i]?.metadata?.blockTimestamp;
    const date = new Date(Date.parse(dateString));
    const today = new Date();
    const diffInMs = today.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    nftTransferDate.push(diffInDays);
  }
  
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
    const today = new Date();
    const diffInMs = today.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    nftTransferDate.push(diffInDays)
  }
  function displayCurrentOffersStatus() {
    // Backend here --> User can make offer from the platform directly
    if (currentStatusOffers.validate === true) {
      return "formulated-offers-status-validate";
    } else if (currentStatusOffers.pending === true) {
      return "formulated-offers-status-pending";
    } else if (currentStatusOffers.cancelled === true) {
      return "formulated-offers-status-cancelled";
    }
  }
  return (
    <section className="received-offers-user-container">
      {/* class à rename en bas */}
      <DataTitles
        yourOffersTitle="Offers"
        offersFromTitle="From"
        offersToTitle="To"
        //
        offersNftTitleClass="formulated-offers-nft-title"
        yourOffersTitleClass="received-offers-offers-title"
        offersFromTitleClass="received-offers-from-title"
        offersToTitleClass="received-offers-to-title"
        offersDateTitleClass="received-offers-date-title"
        // Nft data list
      />
      <div className="received-offers-nft-list-container">
        {nftsFromOwner?.map((user, i, apiNftData) => (
          <NftList
            key={i}
            offersDisplaySourceTypeClass="formulated-offers-display-source-type"
            receivedFrom={user.from}
            offersTo={user.to}
            priceEth={user.nftPriceEth}
            nftTitle={user.nftTitle}
            nftId={user.nftId}
            date={user.date}
            nftImg={user.nftImg}
            //
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
            offersNftContentClass="received-offers-nft-picture-and-title"
            offersYourOffersPriceClass="received-offers-offers-price"
            offersFromClass="received-offers-from"
            offersToClass="received-offers-to"
            offersDateClass="received-offers-date"
            offersDeclineClass="received-offers-decline"
            offersAcceptClass="received-offers-accept"
          />
        ))}
      </div>
    </section>
  );
}

export default ReceivedOffers;
