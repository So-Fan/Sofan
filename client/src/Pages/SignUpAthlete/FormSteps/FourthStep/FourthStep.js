import React, { useState } from "react";
import "./FourthStep.css";
import meetingsLogo from "../../../../Assets/Image/meetings-logo.svg";
import liveLogo from "../../../../Assets/Image/live-logo.svg";
import merchLogo from "../../../../Assets/Image/merch-logo.svg";

function FourthStep({ lastStepFormValidation, setFourthStepValidated, handleNextStep }) {
  // insert submit form here for backend
  

  const [meetingsButton, setMeetingsButton] = useState(false);
  const [liveButton, setLiveButton] = useState(false);
  const [merchButton, setMerchButton] = useState(false);

  const handleMeetingButton = (e) => {
    e.preventDefault();
    setMeetingsButton((prevMeetingsButton) => !prevMeetingsButton);
  };

  const handleLiveButton = (e) => {
    e.preventDefault();
    setLiveButton((prevLiveButton) => !prevLiveButton);
  };

  const handleMerchButton = (e) => {
    e.preventDefault();
    setMerchButton((prevMerchButton) => !prevMerchButton);
  };
  if (meetingsButton === true || liveButton === true || merchButton === true) {
    setFourthStepValidated(true)
  } else {
    setFourthStepValidated(false)
  }
  lastStepFormValidation();
  return (
    <section className="fourthstep-container">
      <div className="title-fourthstep">
        Quel genre de contreparties souhaitez-vous offrir à vos fans ?{" "}
      </div>
      <span className="fourthstep-disclaimer">
        (Cette question est à but informatif et ne vous engage à rien !)
      </span>
      <div className="fourthstep-form-container">
        <form>
          <button
            onClick={handleMeetingButton}
            className={
              meetingsButton
                ? "button-counterpart-fourthstep-selected"
                : "button-counterpart-fourthstep"
            }
          >
            <img src={meetingsLogo} alt="" />
            Meetings
          </button>
          <button
            onClick={handleLiveButton}
            className={
              liveButton
                ? "button-counterpart-fourthstep-selected"
                : "button-counterpart-fourthstep"
            }
          >
            <img src={liveLogo} alt="" />
            Live
          </button>
          <button
            onClick={handleMerchButton}
            className={
              merchButton
                ? "button-counterpart-fourthstep-selected"
                : "button-counterpart-fourthstep"
            }
          >
            <img src={merchLogo} alt="" />
            Merch
          </button>
        </form>
        <div className="validation-button-container">
          <button className="validation-button" onClick={handleNextStep}>
            Valider
          </button>
        </div>
      </div>
    </section>
  );
}
export default FourthStep;
