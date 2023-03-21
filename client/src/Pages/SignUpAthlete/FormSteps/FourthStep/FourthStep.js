import React, { useState } from "react";
import "./FourthStep.css";
import meetingsLogo from "../../../../Assets/Image/meetings-logo.svg";
import liveLogo from "../../../../Assets/Image/live-logo.svg";
import merchLogo from "../../../../Assets/Image/merch-logo.svg";
function FourthStep({ lastStepFormValidation }) {
  // insert submit form here for backend
  const handleValidation = (e) => {
    e.preventDefault();
  };

  const [meetingsButton, setMeetingsButton] = useState(false);
  const [liveButton, setLiveButton] = useState(false);
  const [merchButton, setMerchButton] = useState(false);

  const handleMeetingButton = (e) => {
    e.preventDefault();
    setMeetingsButton(true);
    setLiveButton(false);
    setMerchButton(false);
  };

  const handleLiveButton = (e) => {
    e.preventDefault();
    setMeetingsButton(false);
    setLiveButton(true);
    setMerchButton(false);
    console.log(liveButton);
  };

  const handleMerchButton = (e) => {
    e.preventDefault();
    setMeetingsButton(false);
    setLiveButton(false);
    setMerchButton(true);
  };

  return (
    <section className="fourthstep-container">
      {lastStepFormValidation()}
      <div className="title-fourthstep">
        Quel genre de contreparties souhaitez-vous offrir à vos fans ?{" "}
      </div>
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
          <button className="validation-button" onClick={handleValidation}>
            Valider
          </button>
        </div>
      </div>
    </section>
  );
}
export default FourthStep;
