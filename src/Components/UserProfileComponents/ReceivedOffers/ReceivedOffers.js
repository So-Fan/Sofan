import React from "react";
import DataTitles from "../DataTitles/DataTitles";
import NftList from "../NftList/NftList";
import "./ReceivedOffers.css";

function ReceivedOffers() {
  return (
    <div>
      {/* class à rename en bas */}
      <DataTitles
        yourOffersTitle="Offers"
        offersFromTitle="From"
        offersToTitle="To"
        //
        offersNftTitleClass="formulated-offers-nft-title"
        yourOffersTitleClass="formulated-offers-your-offers-title"
        offersFromTitleClass="formulated-offers-from-title"
        offersToTitleClass="formulated-offers-to-title"
        offersDateTitleClass="received-offers-date-title"
        //
      />
      <NftList
        offersDisplaySourceTypeClass="formulated-offers-display-source-type"
        offersFrom="DonOfSomething"
        offersTo="Gr3goir3"
        //
        offersNftContentClass="formulated-offers-nft-picture-and-title"
        offersYourOffersPriceClass="received-offers-offers-price"
        offersFromClass="received-offers-from"
        offersToClass="received-offers-to"
        offersDateClass="received-offers-date"
        offersDeclineClass="received-offers-decline"
        offersAcceptClass="received-offers-accept"
      />
    </div>
  );
}

export default ReceivedOffers;
