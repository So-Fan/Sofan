import React, { useState, useEffect } from "react";
import "./UtilityClaimModal.css";
import meetingsLogo from "../../../Assets/Image/meetings-logo.svg";
import Button from "../../Button/Button";

function UtilityClaimModal({
  isUtiliyClicked,
  utility,
  loggedInUser,
  handleClaimClick,
}) {
  return (
    <div className="utility-pop-up-container">
      <span
        className="utility-pop-up-title"
        style={utility.claimed_status ? { color: "red" } : {}}
      >
        {utility.claimed_status ? "Utilité déjå reclamé" : "Réclamer l'Uilité"}
      </span>
      <div className="utility-info-data">
        <div className="utility-info-header">
          <img src={meetingsLogo} alt="logo contrepartie rencontre fan" />
          <span className="utility-info-title">{utility?.title}</span>
        </div>
        <p className="utility-info-description">{utility?.description}</p>
        <div className="nft-collection-overview-utilities-one-date">
          Date de l'utilité:{" "}
          {utility?.date
            ? new Date(utility.date.seconds * 1000).toDateString()
            : "N/A"}
        </div>
        {!utility.claimed_status && (
          <Button
            text={"Réclamer"}
            style={ClaimButtonStyle.inlineStyle}
            onClick={handleClaimClick}
          />
        )}
        {
          // If the utility is claimed and the logged-in user is the one who claimed it, show the "Disclaim" button
          utility.claimed_status &&
            loggedInUser &&
            utility.claimed_user_id === loggedInUser.id && (
              <Button
                text={"Rétroclamer"}
                style={ClaimButtonStyle.inlineStyle}
                onClick={handleClaimClick}
              />
            )
        }
      </div>
    </div>
  );
}

const ClaimButtonStyle = {
  inlineStyle: {
    backgroundColor: "#F6D463",
    border: "transparent",
    borderRadius: "10px",
    width: "284px",
    minHeight: "54px",
    fontFamily: "Britanica-Heavy",
    fontSize: "20px",
    marginTop: 15,
  },
  customMediaQueries:
    "@media (max-width: 950px) { .button-component { max-width: 250px; }}@media (max-width: 900px) {.button-component {max-width: 220px; } } @media (max-width: 860px){.button-component {max-width: 200px;}}@media (max-width: 840px){.button-component {max-width: 183px;}}",
};

export default UtilityClaimModal;
