import React from "react";
import Button from "../Button/Button";
import "./PopupListNFT.css";
import MintPopUpProcessing from "../MintPopUp/MintPopUpProcessing/MintPopUpProcessing";
import MintPopUpStatus from "../MintPopUp/MintPopUpStatus/MintPopUpStatus";
import PopUpBlockchainError from "../PopUpBlockchainError/PopUpBlockchainError";

const PopupListNFT = ({ handlePopupListNFT, mintPopUpProccesing, blockchainError, listingBlockchainError, handleBlockchainListingErrorPreviousStepButtonClicked }) => {
  const arrowBottom =
    "https://firebasestorage.googleapis.com/v0/b/sofan-app.appspot.com/o/arrow_bottom.svg?alt=media&token=f2e7b3b5-65da-4edc-9758-9aeda489d2dc";
  const nftImage =
    "https://firebasestorage.googleapis.com/v0/b/sofan-app.appspot.com/o/Rectangle%20131.png?alt=media&token=f394cf39-6fa3-475a-9f3e-9ac5a63c0027";

    
    
  return (
    <>
    {
      mintPopUpProccesing ? 
      <div className="popuplistnft-mintpopupprocessing-wrap">
      <MintPopUpProcessing styleImage={{right: "119.5px"}} styleP={{right: "63px"}} styleDiv={{bottom: "21px", right:"185px"}} styleP2={{right: "118.5px"}} />
      </div>
      :
      blockchainError ?
      <PopUpBlockchainError buttonText={"Back to Listing"} contractError={listingBlockchainError} handleButtonClick={handleBlockchainListingErrorPreviousStepButtonClicked} />
      :

      <div className="popuplistnft-component">
      <div className="popuplistnft-container">
        <span>Mettre en vente</span>
        <div className="popuplistnft-container-nft-wrap">
          <img src={nftImage} alt="nft" />
          <div>
            <div className="popuplistnft-container-nft-wrap-info">
              <span className="popuplistnft-container-nft-wrap-info-bold">
                Pass WC22 #12341
              </span>
              <span className="popuplistnft-container-nft-wrap-info-bold">
                1.0 ETH
              </span>
            </div>
            <div className="popuplistnft-container-nft-wrap-info">
              <span>World cup 2022</span>
              <span>$ 1867.53</span>
            </div>
          </div>
        </div>
        <div className="popuplistnft-container-line"></div>
        <div className="popuplistnft-container-input-wrap">
          <input type="number" />
          <div>
            <span>ETH</span>
            <img src={arrowBottom} alt="arrow bottom" />
          </div>
        </div>
        <div className="popuplistnft-container-line"></div>
        <div className="popuplistnft-container-fee-wrap">
          <span>Service fee 5% </span>
          <div className="popuplistnft-container-fee-wrap-subwrap">
            <span>$ 93.37</span>
            <span>0.05 ETH </span>
          </div>
        </div>
        <div className="popuplistnft-container-receive-wrap">
          <span>You will receive</span>
          <div className="popuplistnft-container-receive-wrap-subwrap">
            <span>$ 1774.15</span>
            <span>0.95 ETH</span>
          </div>
        </div>
        <Button
          style={popupListNFTButton}
          text={"Vendre"}
          onClick={handlePopupListNFT}
          hover={"button-component-create-post"}
          customMediaQueries={".button-component:active{transform: scale(0.92)}"}
        />
      </div>
    </div>
    }
    </>
  );
};

export default PopupListNFT;

const popupListNFTButton = {
  width: "468px",
  height: "56px",
  borderRadius: "9.058px",
  background: "#F6D463",
  outline: "none",
  border: "transparent",
  marginTop: "33px",
  fontFamily: "Lufga",
  fontSize: "16px",
  lineHeight: "normal",
};
