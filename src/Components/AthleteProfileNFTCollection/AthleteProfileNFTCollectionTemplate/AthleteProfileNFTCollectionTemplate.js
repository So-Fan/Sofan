import React from "react";
import { Link } from "react-router-dom";
import "./AthleteProfileNFTCollectionTemplate.css";
const AthleteProfileNFTCollectionTemplate = ({ collectionData, isTransparent,dashBoardPageMarginDelete }) => {
  console.log(collectionData)
  return (
    <Link className="athleteprofilenftcollectiontemplate-component" style={isTransparent ? {visibility: "hidden"}: dashBoardPageMarginDelete ? {marginTop: "0px", marginBottom:"26px"}:{}}>
      <div className="athleteprofilenftcollectiontemplate-banner-wrap">
        <img src={collectionData?.banner} alt="banner" />
      </div>
      <div className="athleteprofilenftcollectiontemplate-content-wrap">
        <div className="athleteprofilenftcollectiontemplate-content-profilepicture-wrap">
          <img src={collectionData?.profilePicture} alt="profile" />
        </div>
        <span className="athleteprofilenftcollectiontemplate-content">{collectionData?.title}</span>
        <div className="athleteprofilenftcollectiontemplate-content">
          <span className="athleteprofilenftcollectiontemplate-content-nftnumber">{collectionData?.nftNumber} items</span>
          <span className="athleteprofilenftcollectiontemplate-content-nftprice">{collectionData?.nftPriceEth} ETH</span>
        </div>
      </div>
    </Link>
  );
};

export default AthleteProfileNFTCollectionTemplate;
