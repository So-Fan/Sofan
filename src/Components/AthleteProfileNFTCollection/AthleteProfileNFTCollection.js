import React, { useEffect, useState } from "react";
import "./AthleteProfileNFTCollection.css";
import AthleteProfileNFTCollectionTemplate from "./AthleteProfileNFTCollectionTemplate/AthleteProfileNFTCollectionTemplate";
import { v4 as uuidv4 } from "uuid";
const AthleteProfileNFTCollection = ({dataCollections, nftDataApi}) => {
  // console.log(nftData.ownedNfts)  
  return (
    <div className="athleteprofilenftcollection-component">
      {dataCollections?.map((collection, i) => (
        <AthleteProfileNFTCollectionTemplate 
        key={uuidv4()}
        nftDataApi={
          nftDataApi?.ownedNfts[i]} collectionData={collection} />
      ))}
      {dataCollections?.length % 2 !== 0 && <AthleteProfileNFTCollectionTemplate isTransparent={true} />} 
    </div>
  );
};

export default AthleteProfileNFTCollection;
