import React from "react";
import "./MintPopUpStatus.css";
import greenCross from "../../../Assets/Image/greencross-offers.svg";
import redCross from "../../../Assets/Image/redcross-offers.svg";
import MintPopUpProcessing from "../MintPopUpProcessing/MintPopUpProcessing";
function MintPopUpStatus({ statusMint, statusProcessing }) {
  return (
    <>
      {/* {statusMint} */}
      {statusProcessing ? (
        <>
        <MintPopUpProcessing/>
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
                  <p>Congrats ! You’re now an holder of this collection !</p>
                </>
              ) : (
                <>An error has occured, please try later</>
              )}
            </div>
            {statusMint ? (
              <>
                <button className="mint-pop-up-status-button">
                  Go to my profile
                </button>
              </>
            ) : (
              <>
                <button className="mint-pop-up-status-button">
                  Back to launchpad
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
