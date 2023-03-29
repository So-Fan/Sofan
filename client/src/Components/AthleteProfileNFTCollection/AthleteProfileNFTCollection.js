import React, { useEffect, useState } from "react";
import "./AthleteProfileNFTCollection.css";
import AthleteProfileNFTCollectionTemplate from "./AthleteProfileNFTCollectionTemplate/AthleteProfileNFTCollectionTemplate";
import { v4 as uuidv4 } from "uuid";
const AthleteProfileNFTCollection = ({dataCollections, nftDataApi, collectionFloorPriceApiData, nftsFromOwner}) => {
  //  console.log(nftsFromOwner[0]?.contract?.openSea?.imageUrl)  
  return (
    <div className="athleteprofilenftcollection-component">
      {/* fetch data from backend for mapping them after */}
      {nftsFromOwner?.map((collection, i,apiNftData) => (
        <AthleteProfileNFTCollectionTemplate 
        nftsFromOwnerPicture={apiNftData[i]?.contract?.openSea?.imageUrl}
        nftsFromOwnerNameCollectionName={apiNftData[i]?.contract?.name}
        nftsFromOwnerFloorPrice={
          apiNftData[i]?.contract?.openSea?.floorPrice
        }
        nftsFromOwnerTotalSupply={apiNftData[i]?.contract?.totalSupply}
        // mettre le nombre de nft de la collection correspondante
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
