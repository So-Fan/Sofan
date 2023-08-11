import React from "react";
import "./MintPopUpProcessing.css";
import explorePicture from "../../../Assets/Image/explorepicture.svg";
function MintPopUpProcessing({
  isListing,
  isBuying,
  isBid,
  styleImage,
  styleP,
  styleDiv,
  styleP2,
}) {
  return (
    <div className="mint-pop-up-processing">
      <div>
        <img
          className="mint-pop-up-processing-image"
          src={explorePicture}
          alt="IMAGE EXPLORE D'ATTENTE"
          style={styleImage}
        />
      </div>
      <div>
        <p className="mint-pop-up-processing-text-title" style={styleP}>
          {isListing
            ? "Annulation en cours..."
            : isBuying
            ? "Votre achat est en cours..."
            : isBid
            ? "Placement de l'offre en cours..."
            : "Your purchase is processing..."}
        </p>
        <div
          className="lds-ellipsis mint-pop-up-processing-animation"
          style={styleDiv}
        >
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <p className="mint-pop-up-processing-text" style={styleP2}>
          please do not close the window
        </p>
      </div>
    </div>
  );
}

export default MintPopUpProcessing;
