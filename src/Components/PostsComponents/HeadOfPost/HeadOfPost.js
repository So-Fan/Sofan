import React, { useState } from "react";
import "./HeadOfPost.css";
import DropDownButtonMenu from "../../DropDownButtonMenu/DropDownButtonMenu";
import profilePicAttanasio from "../../../Assets/Image/profilepicattanasio.svg"

function HeadOfPost({ dropDownMenuSize, headOfPostSize, publicationTypeHeadOfPostSize }) {
  const [athleteName, setAthleteName] = useState("Romain Attanasio");

  return (
    <div className="publication-head-container">
      <div className={`publication-head-left-container ${headOfPostSize}`}>
        {/* Backend here */}
        <div className="profilepic-athlete-publication"><img src={profilePicAttanasio} alt="" /></div>
        {/* Backend here */}
        <div className="athlete-name-publication">{athleteName}</div>
        {/* Backend here */}
        <div className="age-publication">3h</div>
      </div>
      <div className="publication-head-right-container">
        {/* Backend here si contenu PREMIUM ou FREE */}
        <div className={`publication-type ${publicationTypeHeadOfPostSize}`}>Free</div>
        <DropDownButtonMenu dropDownMenuSize={dropDownMenuSize} />
      </div>
    </div>
  );
}

export default HeadOfPost;