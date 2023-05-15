import React, { useState, useEffect, useRef } from "react";
import "./SetupProfile.css";
import previousArrow from "../../../Assets/Image/arrow-previous.svg";
import Img from "../../../Assets/Image/img.svg";

function SetupProfile({
  setIsModalSignupUserCropImageClicked,
  preview,
  handleSetupProfileNextButtonClick,
  handleSetupProfileAddLaterClick,
}) {
  // const [src, setSrc1] = useState(null);
  // const [preview, setPreview] = useState(null);
  const [displayImageCrop, setDisplayImageCrop] = useState(false);
  const [pixelScrolledPopUpSignupUser, setPixelScrolledPopUpSignupUser] =
    useState();
  const [bioText, setBioText] = useState("");
  const [bioTextLength, setBioTextLength] = useState(0);
  const [bioTextMaxLengthError, setBioTextMaxLengthError] = useState(false);
  const [bioTextMinimumLengthError, setBioTextMinimumLengthError] =
    useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const imageRef = useRef(null);
  const profilePicRef = useRef(null);

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

  function handleDisplayPreview() {
    console.log("click detecté");
    setDisplayImageCrop(true);
    setIsModalSignupUserCropImageClicked(true);
  }
  const handlePixelScrolledPopUpSignupUser = () => {
    setPixelScrolledPopUpSignupUser(window.scrollY);
  };
  const handleBioTextChange = (event) => {
    const text = event.target.value;
    setBioText(text);
    setBioTextLength(text.length);
    if (text.length > 250) {
      setBioTextMaxLengthError(true);
    } else if (text.length < 50) {
      setBioTextMinimumLengthError(true);
    } else {
      setBioTextMaxLengthError(false);
      setBioTextMinimumLengthError(false);
    }
  };
  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleBlur = () => {
    setIsFocused(false);
  };
  function checkProfileCompletion(preview, bioText) {
    const hasBanner = !!preview; // Vérifie si la bannière est présente
    const hasProfilePic = !!preview; // Vérifie si la photo de profil est présente
    const hasValidBio = bioText.length >= 50 && bioText.length <= 250; // Vérifie si la bio a entre 50 et 250 caractères

    return hasBanner && hasProfilePic && hasValidBio;
  }
  const isProfileComplete = checkProfileCompletion(preview, bioText);

  return (
    <>
      <div className="signup-user-setup-profile-wrap">
        <div className="signup-user-setup-profile-previous-step">
          <img src={previousArrow} alt="" />
        </div>
        <div className="signup-user-setup-profile-title">
          Créez votre profil
        </div>
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
            <label
              htmlFor="image-upload"
              className="signup-user-setup-profile-banner-add-button"
            >
              <img src={Img} alt="BOUTON LOGO IMAGE AJOUTER BANNIERE" />
            </label>
          </div>
          <div
            className="signup-user-setup-profile-profile-pic-container"
            style={{ backgroundImage: `url(${preview})` }}
            ref={profilePicRef}
          >
            {preview && (
              <>
                <img
                  src={preview}
                  className="signup-user-setup-profile-profile-pic"
                  alt=""
                />
              </>
            )}
            <label
              htmlFor="profile-pic-upload"
              className="signup-user-setup-profile-profile-pic-add-button"
              onClick={handleDisplayPreview}
            >
              <img src={Img} alt="BOUTON LOGO IMAGE AJOUTER BANNIERE" />
            </label>
          </div>
        </div>
        <div className="signup-user-setup-profile-bio-title-and-length-limit">
          <div className="signup-user-setup-profile-bio-title">Bio</div>
          <div className="signup-user-setup-profile-length-limit">
            {" "}
            {bioTextLength}/250
          </div>
        </div>
        <div className="signup-user-setup-profile-bio-container">
          <textarea
            className="signup-user-setup-profile-bio"
            style={bioTextMaxLengthError ? { borderColor: "red" } : {}}
            name=""
            value={bioText}
            onChange={handleBioTextChange}
          ></textarea>
          {bioTextMaxLengthError && (
            <div className="signup-user-setup-profile-bio-error">
              Votre bio dépasse la limite des 250 charactères maximum.
            </div> 
          )}
          {bioTextMinimumLengthError && (
            <div className="signup-user-setup-profile-bio-error">
              Votre bio doit faire au moins 50 charactères.
            </div>
          )}
        </div>
        <button
          onClick={handleSetupProfileNextButtonClick}
          className="signup-user-setup-profile-next-button"
          disabled={!isProfileComplete} // Désactive le bouton si le profil n'est pas complet
        >
          Suivant
        </button>
        <button
          onClick={handleSetupProfileAddLaterClick}
          className="signup-user-setup-profile-add-later-button"
        >
          Ajouter plus tard
        </button>
        <div className="signup-user-setup-profile-progress-bar-container">
          <div
            style={{ width: "50%" }}
            className="signup-user-setup-profile-progress-bar"
          ></div>
        </div>
      </div>
    </>
  );
}

export default SetupProfile;
