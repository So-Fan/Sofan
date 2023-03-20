import React from "react";
import AthleteProfileNFTCollection from "../AthleteProfileNFTCollection/AthleteProfileNFTCollection";
import AthleteProfileNFTCollectionTemplate from "../AthleteProfileNFTCollection/AthleteProfileNFTCollectionTemplate/AthleteProfileNFTCollectionTemplate";
import "./DashboardMyCollections.css";
function DashboardMyCollections({dashBoardPageMarginDelete, dataBackend}) {
  
  return (
    <section className="dashboard-my-collections-container">
      {dataBackend?.collections.map((collection) => (
        <AthleteProfileNFTCollectionTemplate 
        dashBoardPageMarginDelete={dashBoardPageMarginDelete}
        collectionData={collection} />
      ))}

      {dataBackend.collections.length % 2 !== 0 && (
        <AthleteProfileNFTCollectionTemplate isTransparent={true} />
      )}
    </section>
  );
}

export default DashboardMyCollections;
