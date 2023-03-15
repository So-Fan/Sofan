import React from "react";
import "./LaunchpadCollectionLive.css";
import LaunchpadCollectionLiveHeader from "../../Components/LaunchpadCollectionLiveHeader/LaunchpadCollectionLiveHeader";
import LaunchpadCollectionLiveUtilities from "../../Components/LaunchpadCollectionLiveUtilities/LaunchpadCollectionLiveUtilities";
import MoreAboutThisCollection from "../../Components/MoreAboutThisCollection/MoreAboutThisCollection";
import LaunchpadCollectionLiveMoreAboutCollection from "../../Components/LaunchpadCollectionLiveMoreAboutCollection/LaunchpadCollectionLiveMoreAboutCollection";
function LaunchpadCollectionLive() {
  const dataBackend = {
    header: [
      {
        creatorProfilePic:
          "https://www.vendeeglobe.org/medias/05/06/50614/alexia-barrier-c-462-560.jpg",
        creatorName: "Alexia Barrier",
        collectionName: "Explore the World with Alexia Barrier",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nulla tortor, vehicula ut viverra at, auctor at ipsum. Cras ornare et lorem vel tincidunt. Proin quis augue ac nibh faucibus molestie in at quam. Mauris massa tellus, sagittis eu molestie. ",
        mintLimit: 3,
      },
    ],
    utilities: [
      {
        title: "Meeting with Alexia",
        status: "Indisponible",
        description:
          "At the end of the Vendée Globe 2023, 15/400 of the holders of this NFT will have the chance to meet Alexia Barrier personally at the finish of the coursemaklemlakemazlkmalzkazemlkazemleakazlmekazelmaezkaz",
        date: "July 9th 2023",
      },
      {
        title: "3 online VIP live ",
        status: "Disponible",
        description:
          "Have access with all other members to 3 live important events during the entire competition, at three key times.",
        date: "July 9th / 15th / 28th 2023",
      },
      {
        title: "Alexia Barrier special merch",
        status: "Indisponible",
        description:
          "Receive your new collection t-shirt, signed by Alexia herself at the end of the race. The t-shirts will be sent 1 week after the end of the race.",
        date: "August 7th 2023",
      },
    ],
    moreAboutThisCollection: [
      {
        description:
          "This collection has a stamp, created from the imagination of Alexia Barrier and her passions, referring to events from her past that have shaped the person she has become. This collection has a stamp, created from the imagination of Alexia Barrier and her passions, referring to events from her past that have shaped the person she has become.",
      },
    ],
  };
  const dataRealTimeDb = {
    header: [
      {
        timer: "1d 2h 21m 35 s",
      },
    ],
  };
  const dataApi = {
    header: [
      {
        ethPrice: 0.5,
        eurPrice: 625.02,
        counterNftMinted: 405,
        totalNftMintable: 500,
      },
    ],
  };
  return (
    <section className="launchpad-collection-live-page-container">
      <LaunchpadCollectionLiveHeader
        //   dataBackend Firestore
        launchpadCollectionLiveHeader={true}
        creatorProfilePic={dataBackend.header[0].creatorProfilePic}
        creatorName={dataBackend.header[0].creatorName}
        collectionName={dataBackend.header[0].collectionName}
        description={dataBackend.header[0].description}
        minLimit={dataBackend.header[0].mintLimit}
        // dataBacken RealTimeDb
        timer={dataRealTimeDb.header[0].timer}
        // apiData
        nftPriceEth={dataApi.header[0].ethPrice}
        nftPriceEur={dataApi.header[0].eurPrice}
        counterNftMinted={dataApi.header[0].counterNftMinted}
        totalNftMintable={dataApi.header[0].totalNftMintable}
      />
      <div className="launchpad-collection-live-page-left-container">
        
          <LaunchpadCollectionLiveUtilities
            utilitiesArray={dataBackend.utilities}
          />
          <LaunchpadCollectionLiveMoreAboutCollection 
          moreAboutCollectionArray={dataBackend.moreAboutThisCollection}
          />
        
      </div>
    </section>
  );
}

export default LaunchpadCollectionLive;
