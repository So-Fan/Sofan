import React from "react";
import "./ValidationSignup.css";
import previousArrow from "../../../Assets/Image/arrow-previous.svg";
import greenCross from "../../../Assets/Image/greencross-offers.svg";
import Button from "../../Button/Button";

function ValidationSignup({ handleClick }) {
  return (
    <div className="signup-user-validation-signup-wrap">
      <div className="signup-user-validation-signup-greencross">
        <img src={greenCross} alt="logo validé" />
      </div>
      <div className="signup-user-validation-signup-title">
        Votre compte a été créé avec succès
      </div>
      {/* <button className="signup-user-validation-signup-close-button-container">
        Fermer
      </button> */}

      <Button
        text="Fermer"
        id="custom-close-button"
        onClick={handleClick}
        hover="button-hover-props"
      />
      <div className="signup-user-validation-signup-progress-bar-container">
        <div
          style={{ width: "100%" }}
          className="signup-user-validation-signup-progress-bar"
        ></div>
      </div>
    </div>
  );
}

export default ValidationSignup;
