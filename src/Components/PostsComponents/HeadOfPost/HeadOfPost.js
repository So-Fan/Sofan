import React, { useState } from "react";
import "./HeadOfPost.css";
import DropDownButtonMenu from "../../DropDownButtonMenu/DropDownButtonMenu";
import profilePicAttanasio from "../../../Assets/image/profilepicattanasio.svg";

function HeadOfPost({
  dropDownMenuSize,
  headOfPostSizeLeft,
  headOfPostSizeRight,
  publicationTypeHeadOfPostPollPost,
  agePublicationPollPost,
  athleteNamePollPost,
}) {
  const [athleteName, setAthleteName] = useState("Romain Attanasio"); // A supprimer quand data reçu du Backend

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
        <DropDownButtonMenu dropDownMenuSize={dropDownMenuSize} />
      </div>
    </div>
  );
}

export default HeadOfPost;
