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
  //
  postName,
  postDate,
  postDateType,
  postType
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
          {postName}
        </div>
        {/* Backend here */}
        {/* Import date backend data with props from home to here and from every page */}
        <div className={`age-publication ${agePublicationPollPost}`}>{postDate}{postDateType}</div>
      </div>
      <div
        className={`publication-head-right-container ${headOfPostSizeRight}`}
      >
        {/* Backend here si contenu PREMIUM ou FREE */}
        <div
          className={`publication-type ${publicationTypeHeadOfPostPollPost}`}
        >
          {postType}
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
