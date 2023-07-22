import React, { useState, useRef, useEffect, useCallback } from "react";
import Modal from "../Modal/Modal";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "../LoginSignupPopUp/SetupProfile/CanvasUtils";
import {
    db,
    storage,
    ref,
    uploadBytes,
    getDownloadURL,
  } from "../../Configs/firebase";
  import {
    collection,
    addDoc,
    updateDoc,
    query,
    where,
    getDocs,
  } from "firebase/firestore";
  import previousArrow from "../../Assets/Image/arrow-previous.svg";
import Img from "../../Assets/Image/img.svg";
import "./PopUpEditProfile.css"

// afficher les infos de la bdd en provenance de la page user/athlete

const PopUpEditProfile = ({
  handleSaveProfile,
  handleEditProfilePreviousStep,
  allUserInfo,
  setProfileBio,
}) => {
  const [bioText, setBioText] = useState("");
  const [bioTextLength, setBioTextLength] = useState(0);
  const [bioTextMaxLengthError, setBioTextMaxLengthError] = useState(false);
  const [bioTextMinimumLengthError, setBioTextMinimumLengthError] =
    useState(false);
  const profileInputPicRef = useRef(null);

  const [banner, setBanner] = useState();
  const [previewBanner, setPreviewBanner] = useState();

  const [profile, setProfile] = useState();
  const [previewProfile, setPreviewProfile] = useState();

  const [currentlyCroppingBanner, setCurrentlyCroppingBanner] = useState(false);
  const [currentlyCroppingAvatar, setCurrentlyCroppingAvatar] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState();
  const [croppedBanner, setCroppedBanner] = useState();
  const [croppedAvatar, setCroppedAvatar] = useState();

  useEffect(() => {
    if (!banner) return;
    // setCurrentlyCropping(true);
    let tmp = URL.createObjectURL(banner);
    setPreviewBanner(tmp);
    setCurrentlyCroppingBanner(true);
    URL.revokeObjectURL(banner);
    setBanner();
  }, [banner]);
  // tambouriner le crop easy
  useEffect(() => {
    if (!profile) return;
    let tmp = URL.createObjectURL(profile);
    setPreviewProfile(tmp);
    setCurrentlyCroppingAvatar(true);
    URL.revokeObjectURL(profile);
    setProfile();
  }, [profile]);

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


  const handleBannerUpload = async (event) => {
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
        uploadBytes(imageRef, file).then(() => {
          getDownloadURL(ref(storage, imagePath)).then((url) => {
            updateBannerPath(allUserInfo.id, url);
          });
          console.log("Uploaded a blob or file!");
        });

        // TODO: Save the image URL to Firestore or perform any additional actions

        console.log("Image uploaded successfully!");
      } catch (error) {
        console.error("Error uploading image:", error);
      }
      setBanner(file);
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
        uploadBytes(imageRef, file).then(() => {
          getDownloadURL(ref(storage, imagePath)).then((url) => {
            updateAvatarPath(allUserInfo.id, url);
          });
          console.log("Uploaded a blob or file!");
        });

        console.log("Image uploaded successfully!");
      } catch (error) {
        console.error("Error uploading image:", error);
      }
      setProfile(file);
    } else {
      console.log("profile is not an image.");
    }
  };

  function handleDisplayPreview() {
    profileInputPicRef.current.click();
    console.log("click detecté");
  }
  const handleBioTextChange = (event) => {
    const text = event.target.value;
    // setProfileBio(text);
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
    <Modal style={{top: "20px", right: "20px"}}>
      {currentlyCroppingBanner ? (
        <>
          <div className="popup-edit-profile-cropeasy-container">
            <div className="popup-edit-profile-cropeasy-container-wrap">
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
          <div className="popup-edit-profile-cropeasy-container">
            <div className="popup-edit-profile-cropeasy-container-wrap">
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
        <div className="popup-edit-profile-wrap">
          <div
            onClick={handleEditProfilePreviousStep}
            className="popup-edit-profile-previous-step"
          >
            <img src={previousArrow} alt="" />
          </div>
          <div className="popup-edit-profile-title">
            Créez votre profil
          </div>
          <div className="popup-edit-profile-banner-and-profile-pic">
            <div className="popup-edit-profile-banner-container">
              {croppedBanner && <img src={croppedBanner} alt="banner" />}
              <input
                type="file"
                accept="image/*"
                onChange={handleBannerUpload}
                style={{ display: "none" }}
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="popup-edit-profile-banner-add-button"
              >
                <img src={Img} alt="BOUTON LOGO IMAGE AJOUTER BANNIERE" />
              </label>
            </div>
            <div className="popup-edit-profile-profile-pic-container">
              {croppedAvatar && (
                <>
                  <img
                    src={croppedAvatar}
                    className="popup-edit-profile-profile-pic"
                    alt=""
                  />
                </>
              )}
              <label
                htmlFor="profile-pic-upload"
                className="popup-edit-profile-profile-pic-add-button"
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
          <div className="popup-edit-profile-bio-title-and-length-limit">
            <div className="popup-edit-profile-bio-title">Bio</div>
            <div className="popup-edit-profile-length-limit">
              {" "}
              {bioTextLength}/250
            </div>
          </div>
          <div className="popup-edit-profile-bio-container">
            <textarea
              className="popup-edit-profile-bio"
              style={bioTextMaxLengthError ? { borderColor: "red" } : {}}
              name=""
              value={bioText}
              onChange={handleBioTextChange}
            ></textarea>
            {bioTextMaxLengthError && (
              <div className="popup-edit-profile-bio-error">
                Votre bio dépasse la limite des 250 charactères maximum.
              </div>
            )}
            {bioTextMinimumLengthError && (
              <div className="popup-edit-profile-bio-error">
                Votre bio doit faire au moins 50 charactères.
              </div>
            )}
          </div>
          <button
            onClick={handleSaveProfile}
            className="popup-edit-profile-next-button"
            disabled={!isProfileComplete} // Désactive le bouton si le profil n'est pas complet
          >
            Sauvegarder
          </button>
        </div>
      )}
      </Modal>
    </>
  );
};

export default PopUpEditProfile;
