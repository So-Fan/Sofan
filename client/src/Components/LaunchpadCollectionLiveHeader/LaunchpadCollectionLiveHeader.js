import React from "react";
import NftCollectionHeader from "../NftCollectionHeader/NftCollectionHeader";
import "./LaunchpadCollectionLiveHeader.css";
function LaunchpadCollectionLiveHeader({
  collectionName,
  nftNumber,
  creatorName,
  creatorProfilePic,
  description,
  ownerName,
  ownerProfilePic,
  //
  nftPriceEth,
  nftPriceEur,
  nftBidEth,
  nftBifEur,
  //
  launchpadCollectionLiveHeader,
  //
  minLimit,
  timer,
  counterNftMinted,
  totalNftMintable,
  //
  collectionNameApi,
  collectionDescriptionApi,
  nftPicture,
  // Coingecko API
  ethPrice,
  // function for display mint popup
  handleMintButtonClick,
  // Infura API
  nftCollectionMaxItems
}) {
  return (
    <section className="launchpad-collection-live-header-container">
      <NftCollectionHeader
        //   dataBackend Firestore
        launchpadCollectionLiveHeader={launchpadCollectionLiveHeader}
        creatorProfilePic={creatorProfilePic}
        creatorName={creatorName}
        collectionName={collectionName}
        description={description}
        minLimit={minLimit}
        // dataBacken RealTimeDb
        timer={timer}
        // fake apiData
        nftPriceEth={nftPriceEth}
        nftPriceEur={nftPriceEur}
        counterNftMinted={counterNftMinted}
        totalNftMintable={nftCollectionMaxItems}
        //
        collectionNameApi={collectionNameApi}
        collectionDescriptionApi={collectionDescriptionApi}
        nftPicture={nftPicture}
        //
        ethPrice={ethPrice}
        //
        handleMintButtonClick={handleMintButtonClick}
      />
    </section>
  );
}

export default LaunchpadCollectionLiveHeader;
