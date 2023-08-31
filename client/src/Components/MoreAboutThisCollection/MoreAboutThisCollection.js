import React from "react";
import "./MoreAboutThisCollection.css";

function MoreAboutThisCollection({
  moreAboutCollectionArray,
  knowMoreAboutCollection,
}) {
  return (
    <div className="nft-collection-overview-more-about-collection-container">
      <div className="nft-collection-overview-more-about-collection-title">
        En savoir + sur la collection
      </div>
      <div className="nft-collection-overview-more-about-collection-description">
        {knowMoreAboutCollection}
      </div>
    </div>
  );
}

export default MoreAboutThisCollection;
