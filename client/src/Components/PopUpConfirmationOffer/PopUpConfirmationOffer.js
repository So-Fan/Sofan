import React, { useState, useEffect } from "react";
import "./PopUpConfirmationOffer.css";
import { Network, Alchemy } from "alchemy-sdk";

function PopUpConfirmationOffer() {

  return (
    <div className="popup-confirmation-offer-container">
      <div className="popup-confirmation-offer-wrap">
        <div className="popup-confirmation-offer-question">
          Voulez-vous vraiment accepter cette offre ?
        </div>
        <div className=""></div>
        <div className="popup-confirmation-offer-informations-container">
          <img
            className="popup-confirmation-offer-informations-image"
            // src={nftMetadataApi?.openSea?.imageUrl}
            alt="NFT IMAGE"
          />
          <div className="popup-confirmation-offer-informations-collection-name-and-nft-id">
            <div className="popup-confirmation-offer-informations-collection-name">
              Explore the world with Alexia
            </div>
            <div className="popup-confirmation-offer-informations-nft-id">
              #7603
            </div>
          </div>
          <div className="popup-confirmation-offer-informations-from">
            Gr3goir3
          </div>
          <div className="popup-container-offer-informations-date">
            4 setp. 1999
          </div>
        </div>
        <div className="popup-confirmation-offer-price-container">
          <div className="popup-confirmation-offer-price-title">Prix</div>
          <div className="popup-confirmation-offer-price-wrap">
            <div className="popup-confirmation-offer-price-eur">100€</div>
            <div className="popup-confirmation-offer-price-eth">0.012 ETH</div>
          </div>
        </div>
        <div className="popup-confirmation-offer-choice-container">
          <div className="popup-confirmation-offer-validate">
            Oui je souhaite vraiment accepter cette offre.
          </div>
          <div className="popup-confirmation-offer-cancel">
            Annuler. Revenir sur la page.
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopUpConfirmationOffer;
