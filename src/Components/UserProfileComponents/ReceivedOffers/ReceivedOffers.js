import React from "react";
import DataTitles from "../DataTitles/DataTitles";
import NftList from "../NftList/NftList";
import "./ReceivedOffers.css";

function ReceivedOffers({ userFrom }) {
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
        {userFrom?.map((user, index) => (
          <NftList
            key={index}
            offersDisplaySourceTypeClass="formulated-offers-display-source-type"
            receivedFrom={user.from}
            offersTo={user.to}
            priceEth={user.nftPriceEth}
            nftTitle={user.nftTitle}
            nftId={user.nftId}
            date={user.date}

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