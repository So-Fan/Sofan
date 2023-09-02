import React from "react";
import "./DropDownMenu.css";

function DropDownMenu({
  dropdownStates,
  id,
  handleClickCopyPostLink,
  fullPagePostPageStyle,
  postCreatorId,
  loggedInUserId,
  // dropDownStatesFullPagePostModal,
  fullPagePostModalStyle,
}) {
  // Backend here
  const isOwner = true;
  // console.log(loggedInUserId);
  return (
    <>
      <section
        id={id}
        style={
          fullPagePostPageStyle
            ? { top: "24%", right: "16%" }
            : fullPagePostModalStyle
            ? { top: "9%", right: "2%" }
            : dropdownStates && id && dropdownStates[id]
            ? {
                top: "95%",
                right: "-15%",
                width: "90px",
                fontSize: "12px",
                height: "80px",
              }
            : { top: "7%", right: "5%" }
        }
        className={
          fullPagePostPageStyle
            ? "dropdown-menu-container-fullpagepost-page"
            : "dropdown-menu-container"
        }
      >
        <ul id={id}>
          {/* {postCreatorId == loggedInUserId && ( */}
          <>
            <li>Supprimer</li>
            <div className="separation-line-dropdown-menu"></div>
          </>
          {/* )} */}
          <li onClick={() => handleClickCopyPostLink(id)}>Copier le lien</li>
          <div className="separation-line-dropdown-menu"></div>
          <a target="blank" href={`/athleteprofile/${postCreatorId}`}>
            <li>Voir le profil</li>
          </a>
        </ul>
      </section>
    </>
  );
}

export default DropDownMenu;
