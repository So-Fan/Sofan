import React from "react";
import { Link } from "react-router-dom";
import "./AthleteProfileNFTCollectionTemplate.css";
import "uuid";
const AthleteProfileNFTCollectionTemplate = ({
  collectionData,
  isTransparent,
  dashBoardPageMarginDelete,
  nftDataApi,
  collectionFloorPriceApiData,
  nftsFromOwnerNameCollectionName,
  nftsFromOwnerPicture,
  nftsFromOwnerFloorPrice,
  nftsFromOwnerTotalSupply,
}) => {
  return (
    <Link
      className="athleteprofilenftcollectiontemplate-component"
      style={
        isTransparent
          ? { visibility: "hidden" }
          : dashBoardPageMarginDelete
          ? { marginTop: "0px", marginBottom: "26px" }
          : {}
      }
    >
      <div className="athleteprofilenftcollectiontemplate-banner-wrap">
        <img src={nftsFromOwnerPicture} alt="banner" />
      </div>
      <div className="athleteprofilenftcollectiontemplate-content-wrap">
        <div className="athleteprofilenftcollectiontemplate-content-profilepicture-wrap">
          <img src={nftsFromOwnerPicture} alt="profile" />
        </div>
        <span className="athleteprofilenftcollectiontemplate-content">
          {nftsFromOwnerNameCollectionName}
        </span>
        <div className="athleteprofilenftcollectiontemplate-content">
          <span className="athleteprofilenftcollectiontemplate-content-nftnumber">
            {nftsFromOwnerTotalSupply} items
          </span>
          <span className="athleteprofilenftcollectiontemplate-content-nftprice">
            {nftsFromOwnerFloorPrice} ETH
          </span>
        </div>
      </div>
    </Link>
  );
};

export default AthleteProfileNFTCollectionTemplate;
