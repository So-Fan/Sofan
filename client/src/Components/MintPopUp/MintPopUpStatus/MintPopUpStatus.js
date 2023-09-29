import React, { useEffect } from "react";
import "./MintPopUpStatus.css";
import greenCross from "../../../Assets/Image/greencross-offers.svg";
import redCross from "../../../Assets/Image/redcross-offers.svg";
import MintPopUpProcessing from "../MintPopUpProcessing/MintPopUpProcessing";
import { Link } from "react-router-dom";
function MintPopUpStatus({
  statusMint,
  statusProcessing,
  setIsMintingProcessBegan,
  setMintingProcessStatus,
  setIsMintingProcessEndedSuccessfully,
  styleP,
  styleImage,
  styleDiv,
  styleP2,
  collection_title,
  isLogged,
}) {
  const handleBackToMintClicked = () => {
    setMintingProcessStatus(true);
    setIsMintingProcessEndedSuccessfully(false);
    setIsMintingProcessBegan(false);
  };
  return (
    <>
      {/* {statusMint} */}
      {statusProcessing ? (
        <>
          <MintPopUpProcessing
            styleP={styleP}
            styleImage={styleImage}
            styleDiv={styleDiv}
            styleP2={styleP2}
          />
        </>
      ) : (
        <>
          <div className="mint-pop-up-status-container">
            <div>
              {statusMint ? (
                <>
                  <img
                    className="mint-pop-up-status-image"
                    src={greenCross}
                    alt="LOGO VALIDATION"
                  />
                </>
              ) : (
                <>
                  <img
                    className="mint-pop-up-status-image"
                    src={redCross}
                    alt="LOGO ERREUR"
                  />
                </>
              )}
            </div>
            <div className="mint-pop-up-status-text">
              {statusMint ? (
                <>
                  <p>
                    Félicitations ! Vous êtes un détenteur de la collection
                    <span>
                      <br /> {collection_title}
                    </span>
                  </p>
                </>
              ) : (
                <>An error has occured, please try later</>
              )}
            </div>
            {statusMint ? (
              <>
                <Link
                  to={
                    isLogged.isLogged.account_type === "athlete"
                      ? `/athleteprofile/${isLogged.isLogged.id}`
                      : `/userprofile/${isLogged.isLogged.id}`
                  }
                  // isLogged.isLogged
                  className="mint-pop-up-status-button-link"
                >
                  Aller vers mon profil
                </Link>
              </>
            ) : (
              <>
                <button
                  className="mint-pop-up-status-button"
                  onClick={handleBackToMintClicked}
                >
                  Back to mint
                </button>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default MintPopUpStatus;
