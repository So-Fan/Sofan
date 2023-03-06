import React from "react";
import "./NftCollectionOverview.css";
import meetingsLogo from "../../Assets/Image/meetings-logo.svg"
import liveLogo from "../../Assets/Image/live-logo.svg"
import merchLogo from "../../Assets/Image/merch-logo.svg"

function NftCollectionOverview() {
  return (
    <section className="nft-collection-overview-container">
      <div className="nft-collection-overview-utilities-container">
        <div className="nft-collection-overview-utilities-title">Utilities</div>
        <div className="nft-collection-overview-utilities-one">
            <div className="nft-collection-overview-utilities-one-header"></div>
            <div className="nft-collection-overview-utilities-one-description"></div>
            <div className="nft-collection-overview-utilities-one-date"></div>
        </div>
        <div className="nft-collection-overview-utilities-two"></div>
        <div className="nft-collection-overview-utilities-three"></div>
      </div>
    </section>
  );
}

export default NftCollectionOverview;
