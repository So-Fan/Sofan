import React, { useState, useEffect } from "react";
import "./HeadOfPost.css";
import DropDownButtonMenu from "../DropDownButtonMenu/DropDownButtonMenu";
import profilePicAttanasio from "../../../Assets/Image/profilepicattanasio.svg";
import { formatDistanceToNow } from 'date-fns'
import { fr } from 'date-fns/locale';

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
  postType,
}) {
  // const [isPostTypePremium, setIsPostTypePremium] = useState([
  //   postType
  // ]);

  const athleteName = "Romain Attanasio"; // reçu du backend

  const redirectToAthleteProfile = () => {
    window.location.href = "/athleteprofile";
  };  
  postDate = formatDistanceToNow(postDate * 1000, { 
    locale: fr,
    addSuffix: true,
  })
   postDate = postDate.replace('environ ', '');

  return (
    <div className="publication-head-container">
      <div
        className={`publication-head-left-container ${headOfPostSizeLeft}`}
        onClick={redirectToAthleteProfile}
      >
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
        <div className={`age-publication ${agePublicationPollPost}`}>
          {postDate}
          {postDateType}
        </div>
      </div>
      <div
        className={`publication-head-right-container ${headOfPostSizeRight}`}
      >
        {/* Backend here si contenu PREMIUM ou FREE */}
        <div style={postType == false ? {} : {visibility: "hidden"}}
          className={`publication-type ${publicationTypeHeadOfPostPollPost}`}
        >
          {postType ? <></> : <>Premium</>}
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
