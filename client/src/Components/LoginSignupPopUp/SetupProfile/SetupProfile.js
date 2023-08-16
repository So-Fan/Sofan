import React, { useState, useEffect, useRef, useCallback } from "react";
import "./SetupProfile.css";
import previousArrow from "../../../Assets/Image/arrow-previous.svg";
import Img from "../../../Assets/Image/img.svg";
import handleKeyDown from "../../../Utils/enterKeyboardValidForm";
import CropEasy from "../../CropEasy/CropEasy";
import Web3 from "web3";
import useEth from "../../../contexts/EthContext/useEth";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "./CanvasUtils";

function SetupProfile({
  preview,
  handleSetupProfileNextButtonClick,
  handleSetupProfileAddLaterClick,
  handleSetupProfilePreviousStep,
  allUserInfo,
  setProfileBio,
  croppedBanner,
  setCroppedBanner,
  croppedAvatar,
  setCroppedAvatar,
  retrievedBanner,
  setRetrievedBanner,
  retrievedAvatar,
  setRetrievedAvatar,
  banner,
  setBanner,
  profile,
  setProfile,
}) {
  const [bioText, setBioText] = useState("");
  const [bioTextLength, setBioTextLength] = useState(0);
  const [bioTextMaxLengthError, setBioTextMaxLengthError] = useState(false);
  const [bioTextMinimumLengthError, setBioTextMinimumLengthError] =
    useState(false);
  const profileInputPicRef = useRef(null);


  const [previewBanner, setPreviewBanner] = useState();


  const [previewProfile, setPreviewProfile] = useState();

  const [currentlyCroppingBanner, setCurrentlyCroppingBanner] = useState(false);
  const [currentlyCroppingAvatar, setCurrentlyCroppingAvatar] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState();

  useEffect(() => {
    if (!retrievedBanner) return;
    // setCurrentlyCropping(true);
    let tmp = URL.createObjectURL(retrievedBanner);
    setPreviewBanner(tmp);
    setCurrentlyCroppingBanner(true);
    URL.revokeObjectURL(retrievedBanner);
  }, [retrievedBanner]);
  // tambouriner le crop easy
  useEffect(() => {
    if (!retrievedAvatar) return;
    let tmp = URL.createObjectURL(retrievedAvatar);
    setPreviewProfile(tmp);
    setCurrentlyCroppingAvatar(true);
    URL.revokeObjectURL(retrievedAvatar);
  }, [retrievedAvatar]);

  function handleDisplayPreview() {
    profileInputPicRef.current.click();
    console.log("click detecté");
  }
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
  function checkProfileCompletion(preview, bioText) {
    const hasBanner = !!preview; // Vérifie si la bannière est présente
    const hasProfilePic = !!preview; // Vérifie si la photo de profil est présente
    const hasValidBio = bioText.length >= 50 && bioText.length <= 250; // Vérifie si la bio a entre 50 et 250 caractères
    return hasBanner && hasProfilePic && hasValidBio;
  }
  
  const isProfileComplete = true; // Faire une fonction qui trigger l'upload et qui return true
  //  checkProfileCompletion(preview, bioText);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedBanner = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        previewBanner,
        croppedAreaPixels
      );
      console.log("donee", { croppedImage });
      let newCroppedBanner = new File([croppedImage], "Bonjour");
      setCroppedBanner(croppedImage);
      setCurrentlyCroppingBanner(false);
    } catch (e) {
      console.error(e);
    }
  }, [previewBanner, croppedAreaPixels]);

  const showCroppedAvatar = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        previewProfile,
        croppedAreaPixels
      );
      console.log("donee", { croppedImage });
      setCroppedAvatar(croppedImage);
      setCurrentlyCroppingAvatar(false);
    } catch (e) {
      console.error(e);
    }
  }, [previewProfile, croppedAreaPixels]);

  return (
    <>
      {currentlyCroppingBanner ? (
        <>
          <div className="signup-user-setup-profile-cropeasy-container">
            <div className="signup-user-setup-profile-cropeasy-container-wrap">
              <Cropper
                image={previewBanner}
                zoom={zoom}
                crop={crop}
                aspect={46 / 11}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>
            <div className="controls">
              <input
                type="range"
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                aria-labelledby="Zoom"
                onChange={(e) => {
                  setZoom(e.target.value);
                }}
                className="zoom-range"
              />
              <button onClick={showCroppedBanner}>Show results</button>
            </div>
            {/* <div className="result"><img src={croppedBanner} alt="" /></div> */}
          </div>
        </>
      ) : currentlyCroppingAvatar ? (
        <>
          <div className="signup-user-setup-profile-cropeasy-container">
            <div className="signup-user-setup-profile-cropeasy-container-wrap">
              <Cropper
                image={previewProfile}
                zoom={zoom}
                crop={crop}
                cropShape="round"
                showGrid={false}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>
            <div className="controls">
              <input
                type="range"
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                aria-labelledby="Zoom"
                onChange={(e) => {
                  setZoom(e.target.value);
                }}
                className="zoom-range"
              />
              <button onClick={showCroppedAvatar}>Show results</button>
            </div>
            {/* <div className="result"><img src={croppedAvatar} alt="" /></div> */}
          </div>
        </>
      ) : (
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
            <div className="signup-user-setup-profile-banner-container">
              {croppedBanner && <img src={croppedBanner} alt="banner" />}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setRetrievedBanner(e.target.files[0])}
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
            <div className="signup-user-setup-profile-profile-pic-container">
              {croppedAvatar && (
                <>
                  <img
                    src={croppedAvatar}
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
                  onChange={(e) => setRetrievedAvatar(e.target.files[0])}
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
              onKeyDown={(e) =>
                handleKeyDown(e, handleSetupProfileNextButtonClick)
              }
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
            // disabled={!isProfileComplete} // Désactive le bouton si le profil n'est pas complet
            disabled={bioText.length < 50 || bioText.length > 250} 
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
      )}
    </>
  );
}

export default SetupProfile;
