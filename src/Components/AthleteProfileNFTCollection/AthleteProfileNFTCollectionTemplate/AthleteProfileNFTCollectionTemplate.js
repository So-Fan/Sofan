import React from "react";
import { Link } from "react-router-dom";
import "./AthleteProfileNFTCollectionTemplate.css";
import "uuid"
const AthleteProfileNFTCollectionTemplate = ({ collectionData, isTransparent,dashBoardPageMarginDelete, nftDataApi, collectionFloorPriceApiData }) => {
  
  return (
    <Link className="athleteprofilenftcollectiontemplate-component" style={isTransparent ? {visibility: "hidden"}: dashBoardPageMarginDelete ? {marginTop: "0px", marginBottom:"26px"}:{}}>
      <div className="athleteprofilenftcollectiontemplate-banner-wrap">
        <img src={collectionData?.banner} alt="banner" />
      </div>
      <div className="athleteprofilenftcollectiontemplate-content-wrap">
        <div className="athleteprofilenftcollectiontemplate-content-profilepicture-wrap">
          <img src={collectionData?.profilePicture} alt="profile" />
        </div>
        <span className="athleteprofilenftcollectiontemplate-content">{nftDataApi?.contract.name}</span>
        <div className="athleteprofilenftcollectiontemplate-content">
          <span className="athleteprofilenftcollectiontemplate-content-nftnumber">{collectionData?.nftNumber} items</span>
          <span className="athleteprofilenftcollectiontemplate-content-nftprice"> {collectionFloorPriceApiData } ETH</span>
        </div>
      </div>
    </Link>
  );
};

export default AthleteProfileNFTCollectionTemplate;
