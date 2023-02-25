import React from "react";
import DataTitles from "../DataTitles/DataTitles";
import NftList from "../NftList/NftList";
import "./ReceivedOffers.css";

function ReceivedOffers({ userFrom }) {
  const nftListArray = Array.from({ length: 159 });
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
        {nftListArray.map((_, index) => (
          <NftList
            key={index}
            offersDisplaySourceTypeClass="formulated-offers-display-source-type"
            receivedFrom={userFrom}
            offersTo="Gr3goir3"
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
