import React from "react";
import "./AthleteProfileNFTCollectionTemplate.css";
const AthleteProfileNFTCollectionTemplate = ({ eventData }) => {
  return (
    <div className="athleteprofilenftcollectiontemplate-component">
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
    </div>
  );
};

export default AthleteProfileNFTCollectionTemplate;
