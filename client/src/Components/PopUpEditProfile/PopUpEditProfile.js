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
import "./PopUpEditProfile.css";
import greenCross from "../../Assets/Image/greencross-offers.svg";
import redCross from "../../Assets/Image/redcross-offers.svg";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";
import { ImageUrlToFile } from "../../Utils/fileFunctions";
// import LoadingAnimation from "../LoadingEllipsisAnimation/LoadingAnimation";

// afficher les infos de la bdd en provenance de la page user/athlete + J'ai mis en commentaire les mêmes fonctions liés au backend que dans signup garde ce que tu as à garder et supprime le reste
// handleSaveProfile sert à push croppedBanner et croppedAvatar sur la bdd
// allUserInfo est en parametre car j'imagine que tu charges ça dans atheleteProfilePage ou userProfilePage

const PopUpEditProfile = ({
  // handleEditProfilePreviousStep,
  allUserInfo,
  // setProfileBio,
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
  const [retrievedBanner, setRetrievedBanner] = useState();
  const [retrievedAvatar, setRetrievedAvatar] = useState();
  const [loadingEditProfile, setLoadingEditProfile] = useState();
  const [validationEditProfile, setValidationEditProfile] = useState();
  const [errorEditProfile, setErrorEditProfile] = useState(false);
  const [
    isProfileEditPopupHasModifications,
    setIsProfileEditPopupHasModifications,
  ] = useState(false);
  
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

  function handlePreviousStepCroppClick() {
    setCurrentlyCroppingAvatar(false);
    setCurrentlyCroppingBanner(false);
  }
  const handleBannerUpload = async (file, croppedImage) => {
    console.log(file);
    if (file && file.type.substr(0, 5) === "image") {
      try {
        let newFile = await ImageUrlToFile(croppedImage, file.name);
        // Upload the file to Firebase Storage
        const createdAt = new Date();
        const imagePath = `user_profile/banners/sofan_user_#${
          allUserInfo.id
        }#_banner_${createdAt.getTime()}_${file.name}`;
        const imageRef = ref(storage, imagePath);
        uploadBytes(imageRef, newFile).then(() => {
          getDownloadURL(ref(storage, imagePath)).then((url) => {
            updateBannerPath(allUserInfo.id, url);
          });
          console.log("Uploaded a blob or file!");
        });

        console.log("Image uploaded successfully!");
      } catch (error) {
        console.error("Error uploading image:", error);
      }
      setBanner(file);
    } else {
      console.log("File is not an image.");
    }
  };

  const handleAvatarUpload = async (file, croppedImage) => {
    // Access the selected file(s) using fileInputRef.current.files
    // Process the files as needed
    if (file && file.type.substr(0, 5) === "image") {
      try {
        let newFile = await ImageUrlToFile(croppedImage, file.name);
        const createdAt = new Date();
        const imagePath = `user_profile/avatars/sofan_user_#${
          allUserInfo.id
        }#_avatar_${createdAt.getTime()}_${file.name}`;
        const imageRef = ref(storage, imagePath);
        uploadBytes(imageRef, newFile).then(() => {
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

  
  // console.log(allUserInfo);
  const handleProfileImageInputChange = () => {
    // Access the selected file(s) using fileInputRef.current.files
    const file = profileInputPicRef.current.files[0];
    // Process the files as needed
    if (file && file.type.substr(0, 5) === "image") {
      // try {
      //   //shajeed
      //   const createdAt = new Date();
      //   const imagePath = `user_profile/avatars/sofan_user_#${
      //     allUserInfo.id
      //   }#_avatar_${createdAt.getTime()}_${file.name}`;
      //   const imageRef = ref(storage, imagePath);
      //   uploadBytes(imageRef, file).then(() => {
      //     getDownloadURL(ref(storage, imagePath)).then((url) => {
      //       updateAvatarPath(allUserInfo.id, url);
      //     });
      //     console.log("Uploaded a blob or file!");
      //   });

      //   console.log("Image uploaded successfully!");
      // } catch (error) {
      //   console.error("Error uploading image:", error);
      // }
      setProfile(file);
    } else {
      console.log("profile is not an image.");
    }
  };

  // function handleDisplayPreview() {
  //   profileInputPicRef.current.click();
  //   console.log("click detecté");
  // }

  const handleBioTextChange = (event) => {
    const text = event.target.value;
    // console.log(text)
    // setProfileBio(text);
    // if (text === "") {
    //   setBioText(allUserInfo?.bio);
    // } else {
    setBioText(text);
    // }
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
  useEffect(() => {
    allUserInfo?.bio && setBioTextLength(allUserInfo?.bio.length);
  }, []);

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

  async function handleSaveProfile() {
    setLoadingEditProfile(true);
    try {
      handleBannerUpload(retrievedBanner, croppedBanner);
      handleAvatarUpload(retrievedAvatar, croppedAvatar);
    } catch (err) {
      console.error("Upload Image error Line 790: ", err);
    }

    try {
      const q = query(
        collection(db, "users"),
        where("id", "==", allUserInfo.id)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          const userRef = doc.ref;
          const updatedData = { bio: bioText ? bioText : "" };

          updateDoc(userRef, updatedData)
            .then(() => {
              console.log("Bio updated successfully!");
            })
            .catch((error) => {
              console.error("Error updating Bio:", error);
            });
        });
      } else {
        console.log("No user found");
      }
    } catch (err) {
      console.error(err);
      throw err;
    }

  }
  useEffect(() => {
    if (loadingEditProfile === true) {
      setTimeout(() => {
        setLoadingEditProfile(false);
        if (errorEditProfile) {
          setErrorEditProfile(true);
        } else {
          setValidationEditProfile(true);
        }
      }, 500);
    }
  }, [loadingEditProfile]);

  // profilePicture={allUserInfo?.profile_avatar}
  // console.log(allUserInfo?.profile_avatar);
  // console.log(croppedAvatar);
  useEffect(() => {
    console.log("trigered");
    if (
      // (bioText.length < 50 || bioText.length > 250) &&
      croppedAvatar !== undefined ||
      croppedBanner !== undefined
    ) {
      setIsProfileEditPopupHasModifications(true);
    } else {
      setIsProfileEditPopupHasModifications(false);
    }
    if (bioTextLength > 50 && bioTextLength < 251) {
      setIsProfileEditPopupHasModifications(true);
    }
  }, [bioText, croppedAvatar, croppedBanner]);

  return (
    <>
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
            <div className="popup-edit-profile-cropeasy-input-and-button-container">
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
              <button onClick={showCroppedBanner}>Valider</button>
            </div>
            {/* <div className="result"><img src={croppedBanner} alt="" /></div> */}
          </div>
        </>
      ) : currentlyCroppingAvatar ? (
        <>
          <div className="popup-edit-profile-cropeasy-container">
            <img
              onClick={handlePreviousStepCroppClick}
              className="popup-edit-profile-cropeasy-previous-step"
              src={previousArrow}
              alt="ETAP PRECEDENTE BOUTON"
            />
            <div className="popup-edit-profile-cropeasy-title">
              Redimensionnez votre image
            </div>

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
                style={{
                  containerStyle: { borderRadius: "10px" },
                  mediaStyle: { width: "80%" },
                  cropAreaStyle: {},
                }}
                // classes={{containerClassName : "popup-edit-profile-cursor-container", mediaClassName: "", cropAreaClassName: ""}}
              />
            </div>
            <div className="controls-setup-profile popup-edit-profile-cropeasy-input-and-button-container">
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
              <button onClick={showCroppedAvatar}>Valider</button>
            </div>
            {/* <div className="result"><img src={croppedAvatar} alt="" /></div> */}
          </div>
        </>
      ) : loadingEditProfile ? (
        <>
          <div className="popup-edit-profile-animation-wrap">
            <LoadingAnimation />
          </div>
        </>
      ) : validationEditProfile ? (
        <>
          <div className="popup-edit-profile-validation-container">
            <img src={greenCross} alt="LOGO VALIDATION" />
            <p className="popup-edit-profile-validation-message">
              Votre profil a bien été mis à jour.
            </p>
          </div>
        </>
      ) : errorEditProfile ? (
        <>
          <div className="popup-edit-profile-error-container">
            <img src={redCross} alt="LOGO ERREUR" />
            <p className="popup-edit-profile-error-message">
              Oops quelque chose s'est mal passé. Veuillez réessayer...
            </p>
          </div>
        </>
      ) : (
        <div className="popup-edit-profile-wrap">
          <div
            // onClick={handleEditProfilePreviousStep}
            className="popup-edit-profile-previous-step"
          >
            {/* <img src={previousArrow} alt="FLECHE ETAPE" /> */}
          </div>
          <div className="popup-edit-profile-title">Créez votre profil</div>
          <div className="popup-edit-profile-banner-and-profile-pic">
            <div className="popup-edit-profile-banner-container">
              {croppedBanner ? (
                <img src={croppedBanner} alt="banner" />
              ) : (
                <>
                  <img
                    src={allUserInfo?.profile_banner}
                    className="popup-edit-profile-profile-pic"
                    alt="Profile banner"
                  />
                </>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setRetrievedBanner(e.target.files[0])}
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
              {croppedAvatar ? (
                <>
                  <img
                    src={croppedAvatar}
                    className="popup-edit-profile-profile-pic"
                    alt=""
                  />
                </>
              ) : (
                <>
                  <img
                    src={allUserInfo?.profile_avatar}
                    className="popup-edit-profile-profile-pic"
                    alt=""
                  />
                </>
              )}
              <label
                htmlFor="profile-pic-upload"
                className="popup-edit-profile-profile-pic-add-button"
                //onClick={handleDisplayPreview}
              >
                <img src={Img} alt="BOUTON LOGO IMAGE AJOUTER BANNIERE" />
                <input
                  id="profile-pic-upload"
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
              defaultValue={allUserInfo?.bio}
              // value={allUserInfo?.bio}
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
            disabled={isProfileEditPopupHasModifications === false}
          >
            Sauvegarder les changements
          </button>
        </div>
      )}
    </>
  );
};

export default PopUpEditProfile;
