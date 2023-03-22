import React, { useEffect, useState } from "react";
import "./AthleteProfileNFTCollection.css";
import AthleteProfileNFTCollectionTemplate from "./AthleteProfileNFTCollectionTemplate/AthleteProfileNFTCollectionTemplate";
import { v4 as uuidv4 } from "uuid";
const AthleteProfileNFTCollection = ({dataCollections, nftDataApi, collectionFloorPriceApiData}) => {
  // console.log(nftData.ownedNfts)  
  return (
    <div className="athleteprofilenftcollection-component">
      {/* fetch data from backend for mapping them after */}
      {dataCollections?.map((collection, i) => (
        <AthleteProfileNFTCollectionTemplate 
        key={uuidv4()}
        collectionFloorPriceApiData={collectionFloorPriceApiData}
        nftDataApi={
          nftDataApi?.ownedNfts[i]} collectionData={collection} />
      ))}
      {dataCollections?.length % 2 !== 0 && <AthleteProfileNFTCollectionTemplate isTransparent={true} />} 
    </div>
  );
};

export default AthleteProfileNFTCollection;
