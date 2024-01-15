import React from "react";
import "./NftCollectionOverview.css";
import UtilitiesComponent from "../UtilitiesComponent/UtilitiesComponent";
import { v4 as uuidv4 } from "uuid";
import NftCollectionLatestsBids from "../NftCollectionLatestsBids/NftCollectionLatestsBids";
import MoreAboutThisCollection from "../MoreAboutThisCollection/MoreAboutThisCollection";

function NftCollectionOverview({
  utilitiesArray,
  knowMoreAboutCollection,
  latestBidsArray,
  ethPrice,
  loggedInUser,
  currentAthleteCollectionCreator,
  collectionNameApi,
  currentTokenIdOwner
}) {

  return (
    <section className="nft-collection-overview-container">
      <div className="nft-collection-overview-utilities-container">
        <div className="nft-collection-overview-utilities-title">Utilités</div>
        {utilitiesArray.map((utility) => (
          <UtilitiesComponent
            key={uuidv4()}
            utility={utility}
            loggedInUser={loggedInUser}
            utilityId={utility?.id}
            utilityTitle={utility?.title}
            utilityStatus={utility?.claimed_status}
            utilityDescription={utility?.description}
            utilityDate={utility?.date ? new Date(utility.date.seconds * 1000).toDateString() : 'N/A'}
            launchpadCollectionLiveUtilities={true}
            collectionOwner={currentAthleteCollectionCreator}
            collectionNameApi={collectionNameApi}
            currentTokenIdOwner={currentTokenIdOwner}
          />
        ))}
      </div>
      {/* <div className="nft-collection-overview-price-evolution-container">
        <div className="nft-collection-overview-price-evolution-title">
          Price evolution
        </div>
        <div className="nft-collection-overview-price-evolution-chart"></div>
      </div> */}
      <MoreAboutThisCollection
        knowMoreAboutCollection={knowMoreAboutCollection}
      />
      {/* <NftCollectionLatestsBids
        latestBidsArray={latestBidsArray}
        ethPrice={ethPrice}
      /> */}
    </section>
  );
}

export default NftCollectionOverview;
