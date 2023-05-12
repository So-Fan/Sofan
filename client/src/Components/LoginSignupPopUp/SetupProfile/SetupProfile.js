import React, { useRef } from "react";
import "./SetupProfile.css";
import previousArrow from "../../../Assets/Image/arrow-previous.svg";
import Img from "../../../Assets/Image/img.svg";

function SetupProfile() {
  const imageRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.substr(0, 5) === "image") {
      const reader = new FileReader();
      reader.onloadend = function (e) {
        if (imageRef.current) {
          imageRef.current.style.backgroundImage = `url(${e.target.result})`;
        }
      };
      reader.readAsDataURL(file);
    } else {
      console.log("File is not an image.");
    }
  };

  return (
    <div className="signup-user-setup-profile-wrap">
      <div className="signup-user-setup-profile-previous-step">
        <img src={previousArrow} alt="" />
      </div>
      <div className="signup-user-setup-profile-title">SetupProfile</div>
      <div className="signup-user-setup-profile-banner-and-profile-pic">
        <div
          className="signup-user-setup-profile-banner-container"
          ref={imageRef}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: "none" }}
            id="image-upload"
          />
          <label htmlFor="image-upload" className="signup-user-setup-profile-banner-add-button">
            <img src={Img} alt="BOUTON LOGO IMAGE AJOUTER BANNIERE" />
          </label>
        </div>
      </div>
    </div>
  );
}

export default SetupProfile;
