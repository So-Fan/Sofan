import React, { useEffect, useState } from "react";
import "./AthleteProfileNFTCollection.css";
import AthleteProfileNFTCollectionTemplate from "./AthleteProfileNFTCollectionTemplate/AthleteProfileNFTCollectionTemplate";
const AthleteProfileNFTCollection = ({dataCollections}) => {
  
  return (
    <div className="athleteprofilenftcollection-component">
      {dataCollections?.map((collection) => (
        <AthleteProfileNFTCollectionTemplate collectionData={collection} />
      ))}
      {dataCollections?.length % 2 !== 0 && <AthleteProfileNFTCollectionTemplate isTransparent={true} />}
    </div>
  );
};

export default AthleteProfileNFTCollection;
