import React from "react";
import "./UtilityClaimModal.css";
import meetingsLogo from "../../../Assets/Image/meetings-logo.svg";
import Button from "../../Button/Button";
import validationLogo from "../../../Assets/Image/greencross-offers.svg";

function UtilityClaimModal({
  isUtiliyClicked,
  utility,
  loggedInUser,
  handleClaimClick,
  isloggedUserNftHolder,
  setIsloggedUserNftHolder,
  isClaimConfirmed,
  isUtilityClaimed, // New prop added here
  claimedUserEmail, // New prop: the email of the user who claimed the utility
}) {
  const isClaimedByLoggedInUser =
    isUtilityClaimed && loggedInUser?.email === claimedUserEmail;
  return (
    <>
      {!isClaimConfirmed ? (
        <div className="utility-pop-up-container">
          <span
            className="utility-pop-up-title"
            style={{ color: isUtilityClaimed ? "red" : "inherit" }}
          >
            {
              isClaimedByLoggedInUser
                ? "Déjà réclamé" // If the logged-in user claimed the utility
                : isUtilityClaimed
                ? "Utilité déjà réclamée" // If some other user claimed the utility
                : "Réclamer l'utilité" // If the utility is not claimed
            }
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
            {
              // If isloggedUserNftHolder is true, the user is logged in, and the utility is not claimed by the logged-in user
              isloggedUserNftHolder &&
              loggedInUser &&
              !isClaimedByLoggedInUser ? (
                <Button
                  text={"Réclamer"}
                  style={ClaimButtonStyle.inlineStyle}
                  onClick={handleClaimClick}
                />
              ) : (
                // If isloggedUserNftHolder is false or the user is not logged in, show the error message
                (!isloggedUserNftHolder || !loggedInUser) && (
                  <p
                    style={{
                      color: "red",
                      fontWeight: "bold",
                      textAlign: "center",
                      border: "1px solid red",
                      borderRadius: "5px",
                      padding: "10px",
                      marginTop: "20px",
                    }}
                  >
                    Achetez un NFT de la collection pour réclamer cette
                    utilité
                  </p>
                )
              )
            }
          </div>
        </div>
      ) : (
        <div className="utility-pop-up-container">
          <div>
            <img src={validationLogo} alt="" />
          </div>
          <span className="utility-pop-up-title">
          L'utilité a bien été réclamé ! Veuillez vérifier vos mails !
          </span>
        </div>
      )}
    </>
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
