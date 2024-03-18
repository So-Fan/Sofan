import React from "react";
import "./MoreAboutThisCollection.css";

function MoreAboutThisCollection({
  moreAboutCollectionArray,
  knowMoreAboutCollection,
  isNftSinglePageDisplayHeader,
}) {
  return (
    <div
      // style={
      //   isNftSinglePageDisplayHeader
      //     ? { backgroundColor: "red", maxWidth: "100%", marginLeft: "25px" }
      //     : { maxWidth: "545px" }
      // }
      className={
        isNftSinglePageDisplayHeader
          ? "nft-collection-overview-more-about-collection-container-nft-single-page-header"
          : "nft-collection-overview-more-about-collection-container"
      }
    >
      {!isNftSinglePageDisplayHeader && (
        <div className="nft-collection-overview-more-about-collection-title">
          En savoir + sur la collection
        </div>
      )}
      <div
        className={
          isNftSinglePageDisplayHeader
            ? "nft-collection-overview-more-about-collection-description-nft-single-page-header"
            : "nft-collection-overview-more-about-collection-description"
        }
      >
        {knowMoreAboutCollection}
      </div>
    </div>
  );
}

export default MoreAboutThisCollection;
