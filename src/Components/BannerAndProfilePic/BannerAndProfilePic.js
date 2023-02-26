import React from "react";
import "./BannerAndProfilePic.css";
import Banner from "../../Assets/Image/Banner.png";
import profilePicUser from "../../Assets/Image/profilepicuser.png";

function BannerAndProfilePic() {
  const profilePicStyle = {
    background: `url(${profilePicUser})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <>
      <section className="banner-and-profile-container">
        <div className="banner-container">
          <img src={Banner} alt="banner image" />
          {/* <div className="profile-pic-container" style={profilePicStyle}></div> */}
        </div>
        <div className="user-profile-pic">
          <img src={profilePicUser} alt="" />
        </div>
      </section>
    </>
  );
}

export default BannerAndProfilePic;
