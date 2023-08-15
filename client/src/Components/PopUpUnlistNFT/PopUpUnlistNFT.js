import React from "react";
import "./PopUpUnlistNFT.css";
import Button from "../Button/Button";
import MintPopUpProcessing from "../MintPopUp/MintPopUpProcessing/MintPopUpProcessing";
import PopUpBlockchainError from "../PopUpBlockchainError/PopUpBlockchainError";

const PopUpUnlistNFT = ({
  handlePopupUnlistNFT,
  handlePopupUnlistNFTClosed,
  mintPopUpProccesing,
  blockchainError,
  listingBlockchainError,
  handleBlockchainListingErrorPreviousStepButtonClicked,
}) => {
  return (
    <>
      {mintPopUpProccesing ? (
        <div className="popuplistnft-mintpopupprocessing-wrap">
          <MintPopUpProcessing
            isListing={true}
            styleImage={{ right: "119.5px" }}
            styleP={{ right: "25px" }}
            styleDiv={{ bottom: "21px", right: "185px" }}
            styleP2={{ right: "118.5px" }}
          />
        </div>
      ) : blockchainError ? (
        <PopUpBlockchainError
          buttonText={"Back to Listing"}
          contractError={listingBlockchainError}
          handleButtonClick={
            handleBlockchainListingErrorPreviousStepButtonClicked
          }
        />
      ) : (
        <div className="popupunlistnft-component">
          <span>Annuler la mise en vente du NFT ?</span>
          <Button
            onClick={handlePopupUnlistNFT}
            style={popupUnlistNFTWhiteButton}
            text={"Oui"}
          />
          <Button
            onClick={handlePopupUnlistNFTClosed}
            style={popupUnlistNFTYellowButton}
            text={"Non"}
          />
        </div>
      )}
    </>
  );
};

export default PopUpUnlistNFT;

const popupUnlistNFTYellowButton = {
  width: "410px",
  height: "56px",
  borderRadius: "10px",
  background: "#F6D463",
  outline: "none",
  border: "transparent",
  marginTop: "10px",
  marginBottom: "20px",
  fontFamily: "britanica-heavy",
  fontSize: "20px",
  lineHeight: "normal",
};

const popupUnlistNFTWhiteButton = {
  width: "408px",
  height: "54px",
  borderRadius: "10px",
  background: "white",
  // outline: "none",
  border: "1px solid #000",
  marginTop: "107px",
  fontFamily: "britanica-heavy",
  fontSize: "20px",
  lineHeight: "normal",
};
