import React from "react";
import "./BannerAndProfilePic.css";
// import Banner from "../../Assets/Image/Banner.png";
// import profilePicUser from "../../Assets/Image/profilepicuser.png";

function BannerAndProfilePic({banner, profilePicture}) {
  const profilePicStyle = {
    backgroundImage: `url("${profilePicture}")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <>
      <section className="banner-and-profile-container">
        <div className="banner-container">
          <img src={banner} alt="banner image" />
          <div className="profile-pic-container" style={profilePicStyle}></div>
        </div>
      </section>
    </>
  );
}

export default BannerAndProfilePic;
