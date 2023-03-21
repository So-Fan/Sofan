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
}) {
  // const dataBackend = {
  //   header: [
  //     {
  //       creatorProfilePic:
  //         "https://www.vendeeglobe.org/medias/05/06/50614/alexia-barrier-c-462-560.jpg",
  //       creatorName: "Alexia Barrier",
  //       collectionName: "Explore the World with Alexia Barrier",
  //       description:
  //         "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nulla tortor, vehicula ut viverra at, auctor at ipsum. Cras ornare et lorem vel tincidunt. Proin quis augue ac nibh faucibus molestie in at quam. Mauris massa tellus, sagittis eu molestie. ",
  //     mintLimit: 3,
  //       },
  //   ],
  // };
  // const dataRealTimeDb = {
  //   header: [
  //       {
  //           timer: "1d 2h 21m 35 s"
  //       },
  //   ]
  // }
  // const dataApi ={
  //   header: [
  //       {
  //           ethPrice: 0.5,
  //           eurPrice: 625.02,
  //           counterNftMinted: 405,
  //           totalNftMintable: 500,
  //       },
  //   ]
  // }
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
        // apiData
        nftPriceEth={nftPriceEth}
        nftPriceEur={nftPriceEur}
        counterNftMinted={counterNftMinted}
        totalNftMintable={totalNftMintable}
      />
    </section>
  );
}

export default LaunchpadCollectionLiveHeader;
