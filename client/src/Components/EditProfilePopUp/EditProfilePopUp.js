import React, { useState } from "react";
import "./EditProfilePopUp.css";
// import previousArrow from "../../../Assets/Image/arrow-previous.svg";
import previousArrow from "../../Assets/Image/arrow-previous.svg";
import Img from "../../Assets/Image/img.svg";

function EditProfilePopUp() {
  const [croppedBanner, setCroppedBanner] = useState();
  const [bioText, setBioText] = useState("");
  const [bioTextLength, setBioTextLength] = useState(0);
  const [bioTextMaxLengthError, setBioTextMaxLengthError] = useState(false);
  const [bioTextMinimumLengthError, setBioTextMinimumLengthError] =
    useState(false);
  const [profileBio, setProfileBio] = useState("");

  // const handleBannerUpload = async (event) => {
  //   const file = event.target.files[0];
  //   console.log(file);
  //   if (file && file.type.substr(0, 5) === "image") {
  //     //const imagePath = file.name ? `user_profile/banners/`
  //     try {
  //       // Upload the file to Firebase Storage
  //       //shajeed
  //       const createdAt = new Date();
  //       const imagePath = `user_profile/banners/sofan_user_#${
  //         allUserInfo.id
  //       }#_banner_${createdAt.getTime()}_${file.name}`;
  //       const imageRef = ref(storage, imagePath);
  //       uploadBytes(imageRef, file).then(() => {
  //         getDownloadURL(ref(storage, imagePath)).then((url) => {
  //           updateBannerPath(allUserInfo.id, url);
  //         });
  //         console.log("Uploaded a blob or file!");
  //       });

  //       // TODO: Save the image URL to Firestore or perform any additional actions

  //       console.log("Image uploaded successfully!");
  //     } catch (error) {
  //       console.error("Error uploading image:", error);
  //     }

  //     setBanner(file);
  //   } else {
  //     console.log("File is not an image.");
  //   }
  // };
  const handleBioTextChange = (event) => {
    const text = event.target.value;
    setProfileBio(text);
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
  return (
    <div className="edit-profile-popup-container">
      <div className="edit-profile-popup-wrap">
        <div className="edit-profile-popup-title">
          Éditez votre profil
        </div>
        <div className="edit-profile-popup-banner-and-profile-pic">
          <div className="edit-profile-popup-banner-container">
            {croppedBanner && <img src={croppedBanner} alt="banner" />}
            <input
              type="file"
              accept="image/*"
              // onChange={handleBannerUpload}
              style={{ display: "none" }}
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="edit-profile-popup-banner-add-button"
            >
              <img src={Img} alt="BOUTON LOGO IMAGE AJOUTER BANNIERE" />
            </label>
          </div>
          <div className="edit-profile-popup-profile-pic-container">
            {/* {croppedAvatar && ( */}
            <>
              <img
                // src={croppedAvatar}
                className="edit-profile-popup-profile-pic"
                alt=""
              />
            </>
            {/* )} */}
            <label
              htmlFor="profile-pic-upload"
              className="edit-profile-popup-profile-pic-add-button"
              // onClick={handleDisplayPreview}
            >
              <img src={Img} alt="BOUTON LOGO IMAGE AJOUTER BANNIERE" />
              <input
                id="fileInput"
                // ref={profileInputPicRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                multiple={false}
                // onChange={handleProfileImageInputChange}
              />
            </label>
          </div>
        </div>
        <div className="">
ramiabdou
        {/* <input type="text" /> */}
        </div>
        <div className="edit-profile-popup-bio-title-and-length-limit">
          <div className="edit-profile-popup-bio-title">Bio</div>
          <div className="edit-profile-popup-">
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
          // onClick={handleSetupProfileNextButtonClick}
          className="signup-user-setup-profile-next-button"
          // disabled={!isProfileComplete} // Désactive le bouton si le profil n'est pas complet
        >
          Sauvegarder les changements
        </button>
      </div>
    </div>
  );
}

export default EditProfilePopUp;
