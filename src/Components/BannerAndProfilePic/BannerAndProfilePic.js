import React from "react";
import Banner from "../../Assets/Image/Banner.png";

function BannerAndProfilePic() {
  return (
    <>
      <div className="banner-container">
        <img src={Banner} alt="banner image" />
      </div>
    </>
  );
}

export default BannerAndProfilePic;
