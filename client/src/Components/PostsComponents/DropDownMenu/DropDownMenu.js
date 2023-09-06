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
  userType,
  userId,
  isPostsCommentsDisplay,
}) {
  // Backend here
  const isOwner = true;
  // console.log(loggedInUserId);
  console.log(
   "", postCreatorId,
    loggedInUserId)
  return (
    <>
      <section
        id={id}
        style={
          fullPagePostPageStyle
            ? { top: "25%", right: "12.5%" }
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
          {isPostsCommentsDisplay ? (
            <>
              <li onClick={() => handleClickCopyPostLink(userId, userType)}>
                Copier le lien
              </li>
            </>
          ) : (
            <>
              <li onClick={() => handleClickCopyPostLink(id)}>
                Copier le lien
              </li>
            </>
          )}
          <div className="separation-line-dropdown-menu"></div>
          <a
            target="blank"
            href={
              userType === "athlete"
                ? `/athleteprofile/${postCreatorId}`
                : `/userprofile/${userId}`
            }
          >
            <li>Voir le profil</li>
          </a>
        </ul>
      </section>
    </>
  );
}

export default DropDownMenu;
