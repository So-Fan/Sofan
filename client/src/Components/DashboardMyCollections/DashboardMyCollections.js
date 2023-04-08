import React from "react";
import AthleteProfileNFTCollection from "../AthleteProfileNFTCollection/AthleteProfileNFTCollection";
import AthleteProfileNFTCollectionTemplate from "../AthleteProfileNFTCollection/AthleteProfileNFTCollectionTemplate/AthleteProfileNFTCollectionTemplate";
import "./DashboardMyCollections.css";
function DashboardMyCollections({dashBoardPageMarginDelete, dataBackend, nftsFromOwner}) {
  
  return (
    <section className="dashboard-my-collections-container">
      {nftsFromOwner?.map((collection, i,apiNftData) => (
        <AthleteProfileNFTCollectionTemplate 
        dashBoardPageMarginDelete={dashBoardPageMarginDelete}
        collectionData={collection} 
        //
        nftsFromOwnerPicture={apiNftData[i]?.contract?.openSea?.imageUrl}
        nftsFromOwnerNameCollectionName={apiNftData[i]?.contract?.name}
        nftsFromOwnerFloorPrice={
          apiNftData[i]?.contract?.openSea?.floorPrice
        }
        nftsFromOwnerTotalSupply={apiNftData[i]?.contract?.totalSupply}
        />
      ))}

      {dataBackend.collections.length % 2 !== 0 && (
        <AthleteProfileNFTCollectionTemplate isTransparent={true} />
      )}
    </section>
  );
}

export default DashboardMyCollections;
