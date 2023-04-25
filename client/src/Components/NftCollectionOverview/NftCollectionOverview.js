import React from "react";
import "./NftCollectionOverview.css";
import UtilitiesComponent from "../UtilitiesComponent/UtilitiesComponent";
import { v4 as uuidv4 } from "uuid";
import NftCollectionLatestsBids from "../NftCollectionLatestsBids/NftCollectionLatestsBids";
import MoreAboutThisCollection from "../MoreAboutThisCollection/MoreAboutThisCollection"

function NftCollectionOverview({
  utilitiesArray,
  moreAboutCollectionArray,
  latestBidsArray,
  ethPrice
}) {
  return (
    <section className="nft-collection-overview-container">
      <div className="nft-collection-overview-utilities-container">
        <div className="nft-collection-overview-utilities-title">Utilités</div>
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
      <MoreAboutThisCollection
      moreAboutCollectionArray={moreAboutCollectionArray}
      />
      <NftCollectionLatestsBids
      latestBidsArray={latestBidsArray}
      ethPrice={ethPrice}
      />
    </section>
  );
}

export default NftCollectionOverview;
