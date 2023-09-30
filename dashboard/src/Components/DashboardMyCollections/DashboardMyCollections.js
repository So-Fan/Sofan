import React from "react";
//import AthleteProfileNFTCollection from "../AthleteProfileNFTCollection/AthleteProfileNFTCollection";
import AthleteProfileNFTCollectionTemplate from "../AthleteProfileNFTCollection/AthleteProfileNFTCollectionTemplate/AthleteProfileNFTCollectionTemplate";
import "./DashboardMyCollections.css";
function DashboardMyCollections({
  dashBoardPageMarginDelete,
  dataBackend,
  nftsFromOwner,
}) {
  return (
    <section className="dashboard-my-collections-container">
      <div className="dashboard-my-collections-wrap">
        {nftsFromOwner?.map((collection, i, apiNftData) => (
          <div className="dashboard-my-collections-subwrap">
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
              dashboardMyCollectionsStyle={true}

            />
          </div>
        ))}

        {dataBackend.collections.length % 2 !== 0 && (
          <AthleteProfileNFTCollectionTemplate isTransparent={true} />
        )}
      </div>
    </section>
  );
}

export default DashboardMyCollections;
