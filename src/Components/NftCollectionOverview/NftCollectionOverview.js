import React from "react";
import "./NftCollectionOverview.css";
import UtilitiesComponent from "../UtilitiesComponent/UtilitiesComponent";
import { v4 as uuidv4 } from "uuid";
import NftCollectionLatestsBids from "../NftCollectionLatestsBids/NftCollectionLatestsBids";

function NftCollectionOverview({
  utilitiesArray,
  moreAboutCollectionArray,
  latestBidsArray,
}) {
  return (
    <section className="nft-collection-overview-container">
      <div className="nft-collection-overview-utilities-container">
        <div className="nft-collection-overview-utilities-title">Utilities</div>
        {utilitiesArray.map((element) => (
          <UtilitiesComponent
            key={uuidv4()}
            utilitiesTitle={element.title}
            utilitiesStatus={element.status}
            utilitiesDescription={element.description}
            utilitiesDate={element.date}
          />
        ))}
      </div>
      <div className="nft-collection-overview-price-evolution-container">
        <div className="nft-collection-overview-price-evolution-title">
          Price evolution
        </div>
        <div className="nft-collection-overview-price-evolution-chart"></div>
      </div>
      <div className="nft-collection-overview-more-about-collection-container">
        <div className="nft-collection-overview-more-about-collection-title">
          More about this collection
        </div>
        <div className="nft-collection-overview-more-about-collection-description">
          {moreAboutCollectionArray.map((element) => element.description)}
        </div>
      </div>
      <NftCollectionLatestsBids
      latestBidsArray={latestBidsArray}
      />
    </section>
  );
}

export default NftCollectionOverview;
