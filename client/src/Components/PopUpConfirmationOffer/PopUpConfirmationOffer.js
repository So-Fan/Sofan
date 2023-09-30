import React, { useState, useEffect } from "react";
import "./PopUpConfirmationOffer.css";
import { Network, Alchemy } from "alchemy-sdk";
import Button from "../Button/Button";
import explorePic from "../../Assets/Image/explorepicture.svg";
import MintPopUpProcessing from "../MintPopUp/MintPopUpProcessing/MintPopUpProcessing";
import PopUpBlockchainError from "../PopUpBlockchainError/PopUpBlockchainError";

function PopUpConfirmationOffer({
  handleClick,
  isAcceptedOffersClicked,
  isCanceledOffersClicked,
  isRejectedOffersClicked,
  dataPopupConfirmation,
  mintPopUpProccesing,
  isBlockchainError,
  blockchainError,
  setIsBlockchainError,
  setIsStatusClicked,
}) {
  console.log(dataPopupConfirmation);
  return (
    <>
      {mintPopUpProccesing ? (
        <div className="popuplistnft-mintpopupprocessing-wrap">
          <MintPopUpProcessing
            styleImage={{ right: "119.5px" }}
            styleP={{ right: "25px" }}
            styleDiv={{ bottom: "21px", right: "185px" }}
            styleP2={{ right: "118.5px" }}
          />
        </div>
      ) : isBlockchainError ? (
        <PopUpBlockchainError
          buttonText={"Back to accept"}
          contractError={blockchainError}
          handleButtonClick={() => setIsBlockchainError(false)}
        />
      ) : (
        <div className="popup-confirmation-offer-container">
          <div className="popup-confirmation-offer-wrap">
            <div className="popup-confirmation-offer-question">
              {isAcceptedOffersClicked && (
                <>Voulez-vous vraiment accepter cette offre ?</>
              )}
              {isCanceledOffersClicked && (
                <>Voulez-vous vraiment annuler cette offre ?</>
              )}
              {isRejectedOffersClicked && (
                <>Voulez-vous vraiment refuser cette offre ?</>
              )}
            </div>
            <div className=""></div>
            <div className="popup-confirmation-offer-informations-container">
              <img
                className="popup-confirmation-offer-informations-image"
                // src={nftMetadataApi?.openSea?.imageUrl}
                src={explorePic}
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
                <div className="popup-confirmation-offer-price-eth">
                  0.012 ETH
                </div>
              </div>
            </div>
            <div className="popup-confirmation-offer-choice-container">
              <div
                onClick={handleClick}
                className="popup-confirmation-offer-validate"
              >
                {isAcceptedOffersClicked && (
                  <> Oui je souhaite vraiment accepter cette offre.</>
                )}
                {isCanceledOffersClicked && (
                  <> Oui je souhaite vraiment annuler cette offre.</>
                )}
                {isRejectedOffersClicked && (
                  <>Oui je souhaite vraiment refuser cette offre.</>
                )}
              </div>
              <div
                id="custom-close-button"
                className="popup-confirmation-offer-cancel"
                onClick={() => setIsStatusClicked(false)}
              >
                Annuler. Revenir sur la page.
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PopUpConfirmationOffer;
