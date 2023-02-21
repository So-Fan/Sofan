import React from "react";
import DataTitles from "../DataTitles/DataTitles";
import NftList from "../NftList/NftList";
import "./FormulatedOffers.css";

function FormulatedOffers() {
  return (
    <>
      <section className="formulated-offers-user-container">
        <DataTitles/>
        <NftList formulatedOffersDisplay="formulated-offers-display" />
      </section>
    </>
  );
}

export default FormulatedOffers;
