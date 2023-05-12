import React, { useRef, useState } from "react";
import "./SetupProfile.css";
import previousArrow from "../../../Assets/Image/arrow-previous.svg";
import Img from "../../../Assets/Image/img.svg";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

function SetupProfile() {
  const imageRef = useRef(null);
  const previewImageRef = useRef(null);

  const [crop, setCrop] = useState({
    unit: "%",
    width: 50,
    aspect: 4.153,
  });
  const [originalImage, setOriginalImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.substr(0, 5) === "image") {
      const reader = new FileReader();
      reader.onloadend = function (e) {
        setOriginalImage(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      console.log("File is not an image.");
    }
  };

  const handleCropComplete = (crop, croppedAreaPixels) => {
    const canvas = document.createElement("canvas");
    const outputWidth = croppedAreaPixels.width;
    const outputHeight = outputWidth / crop.aspect;
    canvas.width = outputWidth;
    canvas.height = outputHeight;
    const ctx = canvas.getContext("2d");
    const image = new Image();
    image.src = originalImage;
    image.onload = () => {
      ctx.drawImage(
        image,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        outputWidth,
        outputHeight
      );
      const croppedImageBase64 = canvas.toDataURL();
      setCroppedImage(croppedImageBase64);
    };
  };

  return (
    <>
      <div className="signup-user-setup-profile-wrap">
        <div className="signup-user-setup-profile-previous-step">
          <img src={previousArrow} alt="" />
        </div>
        <div className="signup-user-setup-profile-title">SetupProfile</div>
        <div className="signup-user-setup-profile-banner-and-profile-pic">
          <div
            className="signup-user-setup-profile-banner-container"
            ref={previewImageRef}
          >
            <label
              htmlFor="image-upload"
              className="signup-user-setup-profile-banner-add-button"
            >
              <img src={Img} alt="BOUTON LOGO IMAGE AJOUTER BANNIERE" />
            </label>
            <img
              className="signup-user-setup-profile-banner-cutted"
              ref={imageRef}
              src={croppedImage}
              alt="Profile Banner"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }}
              id="image-upload"
            />
          </div>
        </div>
        {originalImage && (
          <ReactCrop
            src={originalImage}
            crop={crop}
            onChange={(newCrop) => setCrop(newCrop)}
            onComplete={handleCropComplete}
          />
        )}
      </div>
    </>
  );
}

export default SetupProfile;
