import React from "react";
import NftCollectionHeader from "../NftCollectionHeader/NftCollectionHeader";
import "./LaunchpadCollectionLiveHeader.css";
function LaunchpadCollectionLiveHeader() {
  const dataBackend = {
    header: [
      {
        creatorProfilePic:
          "https://www.vendeeglobe.org/medias/05/06/50614/alexia-barrier-c-462-560.jpg",
        creatorName: "Alexia Barrier",
        collectionName: "Explore the World with Alexia Barrier",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nulla tortor, vehicula ut viverra at, auctor at ipsum. Cras ornare et lorem vel tincidunt. Proin quis augue ac nibh faucibus molestie in at quam. Mauris massa tellus, sagittis eu molestie. ",
      },
    ],
  };
  const dataApi ={
    header: [
        {
            ethPrice: 0.5,
            eurPrice: 625.02
        },
    ]
  }
  return (
    <section className="launchpad-collection-live-header-container">
      <NftCollectionHeader
        launchpadCollectionLiveHeader={true}
        creatorProfilePic={dataBackend.header[0].creatorProfilePic}
        creatorName={dataBackend.header[0].creatorName}
        collectionName={dataBackend.header[0].collectionName}
        description={dataBackend.header[0].description}
        nftPriceEth={dataApi.header[0].ethPrice}
        nftPriceEur={dataApi.header[0].eurPrice}
      />
    </section>
  );
}

export default LaunchpadCollectionLiveHeader;
