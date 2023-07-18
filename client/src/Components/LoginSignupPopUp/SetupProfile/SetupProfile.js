import React, { useState, useEffect, useRef } from "react";
import "./SetupProfile.css";
import previousArrow from "../../../Assets/Image/arrow-previous.svg";
import Img from "../../../Assets/Image/img.svg";
import { db, storage, ref, uploadBytes } from "../../../Configs/firebase";
import {
  collection,
  addDoc,
  updateDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import UserContext from "../../../UserContext";

function SetupProfile({
  setIsModalSignupUserCropImageClicked,
  preview,
  handleSetupProfileNextButtonClick,
  handleSetupProfileAddLaterClick,
  handleSetupProfilePreviousStep,
  allUserInfo,
  setProfileBio,
  ProfileBio,
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
  const [loggedUser, setLoggedUser] = useState(null);
  const imageRef = useRef(null);
  const profilePicRef = useRef(null);
  const profileInputPicRef = useRef(null);

  const [banner, setBanner] = useState();
  const [previewBanner, setPreviewBanner] = useState()

  const updateBannerPath = async (uid, path) => {
    try {
      const q = query(collection(db, "users"), where("id", "==", uid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          const userRef = doc.ref;
          const updatedData = { profile_banner: path };

          updateDoc(userRef, updatedData)
            .then(() => {
              console.log("Banner path updated successfully!");
            })
            .catch((error) => {
              console.error("Error updating banner path:", error);
            });
        });
      } else {
        console.log("No user found");
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const updateAvatarPath = async (uid, path) => {
    try {
      const q = query(collection(db, "users"), where("id", "==", uid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          const userRef = doc.ref;
          const updatedData = { profile_avatar: path };

          updateDoc(userRef, updatedData)
            .then(() => {
              console.log("Avatar path updated successfully!");
            })
            .catch((error) => {
              console.error("Error updating Avatar path:", error);
            });
        });
      } else {
        console.log("No user found");
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  useEffect(() => {
    if (!banner) return;
    let tmp = URL.createObjectURL(banner);
    setPreviewBanner(tmp);
    URL.revokeObjectURL(banner)
    setBanner();
  }, [banner])

  const handleBannerUpload = async (event) => {
    // Check if a user is Logged in
    // const storedUser = localStorage.getItem("loggedInUser");
    // if (storedUser) {
    //   const loggedInUser = JSON.parse(storedUser);
    //   setLoggedUser(loggedInUser);
    // }

    const file = event.target.files[0];
    console.log(file);
    if (file && file.type.substr(0, 5) === "image") {
      //const imagePath = file.name ? `user_profile/banners/`
      try {
        // Upload the file to Firebase Storage
        //shajeed
        const createdAt = new Date();
        const imagePath = `user_profile/banners/sofan_user_#${
          allUserInfo.id
        }#_banner_${createdAt.getTime()}_${file.name}`;
        const imageRef = ref(storage, imagePath);
        uploadBytes(imageRef, file).then((snapshot) => {
          updateBannerPath(allUserInfo.id, imagePath);
          console.log(snapshot);
          console.log("Uploaded a blob or file!");
        });

        // Get the download URL of the uploaded image
        //const imageUrl = await imageRef.getDownloadURL();

        // Set the background image using FileReader
        // Saajeed
        // const reader = new FileReader();
        // reader.onloadend = function (e) {
        //   if (imageRef.current) {
        //     imageRef.current.style.backgroundImage = `${file}`;
        //   }
        // };
        // reader.readAsDataURL(file);
        // fin saajeed
        // TODO: Save the image URL to Firestore or perform any additional actions

        console.log("Image uploaded successfully!");
      } catch (error) {
        console.error("Error uploading image:", error);
      }
      setBanner(file)
    } else {
      console.log("File is not an image.");
    }
  };

  const handleProfileImageInputChange = () => {
    // Access the selected file(s) using fileInputRef.current.files
    const file = profileInputPicRef.current.files[0];
    // Process the files as needed
    if (file && file.type.substr(0, 5) === "image") {

      try {
        
        //shajeed
        const createdAt = new Date();
        const imagePath = `user_profile/avatars/sofan_user_#${
          allUserInfo.id
        }#_avatar_${createdAt.getTime()}_${file.name}`;
        const imageRef = ref(storage, imagePath);
        uploadBytes(imageRef, file).then((snapshot) => {
          updateAvatarPath(allUserInfo.id, imagePath);
          console.log("Uploaded a blob or file!");
        });

        console.log("Image uploaded successfully!");
      } catch (error) {
        console.error("Error uploading image:", error);
      }


    } else {
      console.log("profile is not an image.");
    }
  };

  function handleDisplayPreview() {
    profileInputPicRef.current.click();
    console.log("click detecté");
    //console.log(profilePicRef);
    setDisplayImageCrop(true);
    setIsModalSignupUserCropImageClicked(true);
  }
  const handlePixelScrolledPopUpSignupUser = () => {
    setPixelScrolledPopUpSignupUser(window.scrollY);
  };
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
        <div
          onClick={handleSetupProfilePreviousStep}
          className="signup-user-setup-profile-previous-step"
        >
          <img src={previousArrow} alt="" />
        </div>
        <div className="signup-user-setup-profile-title">
          Créez votre profil
        </div>
        <div className="signup-user-setup-profile-banner-and-profile-pic">
          {previewBanner ? 
          <div
          className="signup-user-setup-profile-banner-container"
          ref={imageRef}
        >
          <img src={previewBanner} alt="banner" id="image-upload"/>
          {/* <input
            type="file"
            accept="image/*"
            onChange={handleBannerUpload}
            style={{ display: "none" }}
            id="image-upload"
          /> */}
          <label
            htmlFor="image-upload"
            className="signup-user-setup-profile-banner-add-button"
          >
          <img src={Img} alt="BOUTON LOGO IMAGE AJOUTER BANNIERE" />
          </label>
        </div>
          : 
          <div
            className="signup-user-setup-profile-banner-container"
            ref={imageRef}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleBannerUpload}
              style={{ display: "none" }}
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="signup-user-setup-profile-banner-add-button"
            >
            <img src={Img} alt="BOUTON LOGO IMAGE AJOUTER BANNIERE" />
            </label>
          </div>}
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
              <input
                id="fileInput"
                ref={profileInputPicRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                multiple={false}
                onChange={handleProfileImageInputChange}
              />
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
