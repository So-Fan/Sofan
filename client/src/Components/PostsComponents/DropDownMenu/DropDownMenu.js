import React from "react";
import "./DropDownMenu.css";

function DropDownMenu({
  isDropDownMenuCommentClicked,
  dropdownStates,
  id,
  isAdminLogged,
  isAthleteLogged,
  isCommentsOwnerLogged,
  handleClickCopyPostLink
}) {
  // Backend here
  const isOwner = true;
  console.log(id)
  return (
    <>
      <section
      id={id}
        style={
          dropdownStates && id && dropdownStates[id]
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
        <ul id={id}>
          {isOwner && (
            <>
              {/* <li href="/" id={id}> */}
                <li>Supprimer</li>
              {/* </li> */}
              {/* <div className="separation-line-dropdown-menu"></div>
              <li href="/" id="link-dropdown-menu">
                <li>Modifier la publication</li>
              </li> */}
              <div className="separation-line-dropdown-menu"></div>
            </>
          )}
          {/* <li href="/" id={id}> */}
            <li onClick={()=>handleClickCopyPostLink(id)}>Copier le lien</li>
          {/* </li> */}
          <div className="separation-line-dropdown-menu"></div>
          {/* <li href="/athleteprofile" id={id}> */}
            <li>Voir le profil</li>
          {/* </li> */}
        </ul>
      </section>
    </>
  );
}

export default DropDownMenu;
