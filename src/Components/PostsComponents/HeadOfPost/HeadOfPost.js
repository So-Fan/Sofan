import React from "react";
import "./HeadOfPost.css";
import DropDownButtonMenu from "../DropDownButtonMenu/DropDownButtonMenu";
import profilePicAttanasio from "../../../Assets/Image/profilepicattanasio.svg";

function HeadOfPost({
  dropDownMenuSize,
  headOfPostSizeLeft,
  headOfPostSizeRight,
  publicationTypeHeadOfPostPollPost,
  agePublicationPollPost,
  athleteNamePollPost,
  handleDropdownPostFeedClick,
  id,
}) {
  const athleteName = "Romain Attanasio"; // reçu du backend

  return (
    <div className="publication-head-container">
      <div className={`publication-head-left-container ${headOfPostSizeLeft}`}>
        {/* Backend here */}
        <div className="profilepic-athlete-publication">
          <img src={profilePicAttanasio} alt="profil utilisateur" />
        </div>
        {/* Backend here */}
        <div className={`athlete-name-publication ${athleteNamePollPost}`}>
          {athleteName}
        </div>
        {/* Backend here */}
        <div className={`age-publication ${agePublicationPollPost}`}>3h</div>
      </div>
      <div
        className={`publication-head-right-container ${headOfPostSizeRight}`}
      >
        {/* Backend here si contenu PREMIUM ou FREE */}
        <div
          className={`publication-type ${publicationTypeHeadOfPostPollPost}`}
        >
          Free
        </div>
        <DropDownButtonMenu
          handleDropdownPostFeedClick={handleDropdownPostFeedClick}
          dropDownMenuSize={dropDownMenuSize}
          id={id}
        />
      </div>
    </div>
  );
}

export default HeadOfPost;
