import React, { useState } from "react";
import DataTitles from "../DataTitles/DataTitles";
import NftList from "../NftList/NftList";
import "./FormulatedOffers.css";

function FormulatedOffers({userFrom}) {
  // Backend here
  const [currentStatusOffers, setCurrentStatusOffers] = useState({
    validate: false,
    pending: true,
    cancelled: false,
  });
  function displayCurrentOffersStatus() {
    if (currentStatusOffers.validate === true) {
      return "formulated-offers-status-validate";
    } else if (currentStatusOffers.pending === true) {
      return "formulated-offers-status-pending";
    } else if (currentStatusOffers.cancelled === true) {
      return "formulated-offers-status-cancelled";
    }
  }
  const nftListArray = Array.from({ length: 159 });
  return (
    <>
      <section className="formulated-offers-user-container">
        <DataTitles
          yourOffersTitle="Your Offers"
          offersFromTitle="From"
          offersToTitle="To"
          offersStatusTitle="Status"
          offersNftTitleClass="formulated-offers-nft-title"
          yourOffersTitleClass="formulated-offers-your-offers-title"
          offersFromTitleClass="formulated-offers-from-title"
          offersToTitleClass="formulated-offers-to-title"
          offersStatusTitleClass="formulated-offers-status-title"
          offersDateTitleClass="formulated-offers-date-title"
        />
        <div className="nft-list-formulated-offer-container">
          {nftListArray.map((_, index) => (
            <NftList
              key={index}
              offersDisplaySourceTypeClass="formulated-offers-display-source-type"
              receivedFrom={userFrom}
              offersTo="Gr3goir3"
              offersStatus="Pending"
              offersStatusImage={
                <>
                  <div className={displayCurrentOffersStatus()}></div>
                </>
              }
              offersNftContentClass="formulated-offers-nft-picture-and-title"
              offersYourOffersPriceClass="formulated-offers-your-offers-price"
              offersFromClass="formulated-offers-from"
              offersToClass="formulated-offers-to"
              offersStatusClass="formulated-offers-status"
              offersDateClass="formulated-offers-date"
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default FormulatedOffers;
