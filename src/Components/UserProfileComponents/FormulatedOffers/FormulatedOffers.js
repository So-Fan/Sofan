import React, { useState } from "react";
import DataTitles from "../DataTitles/DataTitles";
import NftList from "../NftList/NftList";
// import statusPending from "../../../Assets/Image/statutspending.svg"
import "./FormulatedOffers.css";

function FormulatedOffers() {
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
  return (
    <>
      <section className="formulated-offers-user-container">
        <DataTitles
          formulatedOffersYourOffersTitle="Your Offers"
          formulatedOffersFromTitle="From"
          formulatedOffersToTitle="To"
          formulatedOffersStatusTitle="Status"
          formulatedOffersNftTitleClass="formulated-offers-nft-title"
          formulatedOffersYourOffersTitleClass="formulated-offers-your-offers-title"
          formulatedOffersFromTitleClass="formulated-offers-from-title"
          formulatedOffersToTitleClass="formulated-offers-to-title"
          formulatedOffersStatusTitleClass="formulated-offers-status-title"
        />
        <NftList
          formulatedOffersDisplaySourceType="formulated-offers-display-source-type"
          formulatedOffersFrom="you"
          formulatedOffersTo="Gr3goir3"
          formulatedOffersStatus="Pending"
          formulatedOffersStatusImage={
            <>
              <div className={displayCurrentOffersStatus()}></div>
            </>
          }
          formulatedOffersNftContentClass="formulated-offers-nft-picture-and-title"
          formulatedOffersYourOffersPriceClass="formulated-offers-your-offers-price"
          formulatedOffersFromClass="formulated-offers-from"
          formulatedOffersToClass="formulated-offers-to"
          formulatedOffersStatusClass="formulated-offers-status"
          formulatedOffersDateClass="formulated-offers-date"
        />
      </section>
    </>
  );
}

export default FormulatedOffers;
