import React from "react";
import NftCollectionHeader from "../NftCollectionHeader/NftCollectionHeader";
import "./LaunchpadCollectionLiveHeader.css";
function LaunchpadCollectionLiveHeader({
  collectionName,
  nftNumber,
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
  // Firebase backend
  athleteId,
  creatorProfilePic,
  creatorName,
  description,
  // Coingecko API
  ethPrice,
  // function for display mint popup
  handleMintButtonClick,
  // Infura API
  nftCollectionMaxItems,
}) {
  console.log(description)
  return (
    <section className="launchpad-collection-live-header-container">
      <NftCollectionHeader
        //   dataBackend Firestore
        athleteId={athleteId}
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
