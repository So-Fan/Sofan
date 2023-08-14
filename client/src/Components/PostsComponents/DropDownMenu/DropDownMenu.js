import React from "react";
import "./DropDownMenu.css";

function DropDownMenu({
  isDropDownMenuCommentClicked,
  dropdownStates,
  commentId,
  isAdminLogged,
  isAthleteLogged,
  isCommentsOwnerLogged,
}) {
  // Backend here
  const isOwner = true;

  return (
    <>
      <section
      id={commentId}
        style={
          dropdownStates[commentId]
            ? {
                top: "95%",
                right: "-15%",
                width: "90px",
                fontSize: "12px",
                height: "80px",
              }
            : { top: "7%", right: "5%" }
        }
        className="dropdown-menu-container"
      >
        <ul>
          {isOwner && (
            <>
              <a href="/" id="link-dropdown-menu">
                <li>Supprimer</li>
              </a>
              {/* <div className="separation-line-dropdown-menu"></div>
              <a href="/" id="link-dropdown-menu">
                <li>Modifier la publication</li>
              </a> */}
              <div className="separation-line-dropdown-menu"></div>
            </>
          )}
          <a href="/" id="link-dropdown-menu">
            <li>Copier le lien</li>
          </a>
          <div className="separation-line-dropdown-menu"></div>
          <a href="/athleteprofile" id="link-dropdown-menu">
            <li>Voir le profil</li>
          </a>
        </ul>
      </section>
    </>
  );
}

export default DropDownMenu;
