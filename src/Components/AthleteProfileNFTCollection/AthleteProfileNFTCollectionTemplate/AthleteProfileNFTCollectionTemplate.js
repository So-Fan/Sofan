import React from "react";
import { Link } from "react-router-dom";
import "./AthleteProfileNFTCollectionTemplate.css";
const AthleteProfileNFTCollectionTemplate = ({ eventData, isTransparent }) => {
  return (
    <Link className="athleteprofilenftcollectiontemplate-component" style={isTransparent && {visibility: "hidden"}}>
      <div className="athleteprofilenftcollectiontemplate-banner-wrap">
        <img src={eventData?.banner} alt="banner" />
      </div>
      <div className="athleteprofilenftcollectiontemplate-content-wrap">
        <div className="athleteprofilenftcollectiontemplate-content-profilepicture-wrap">
          <img src={eventData?.profilePicture} alt="profile" />
        </div>
        <span className="athleteprofilenftcollectiontemplate-content">{eventData?.title}</span>
        <div className="athleteprofilenftcollectiontemplate-content">
          <span className="athleteprofilenftcollectiontemplate-content-nftnumber">{eventData?.nftNumber} items</span>
          <span className="athleteprofilenftcollectiontemplate-content-nftprice">{eventData?.nftPriceEth} ETH</span>
        </div>
      </div>
    </Link>
  );
};

export default AthleteProfileNFTCollectionTemplate;
