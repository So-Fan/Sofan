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
