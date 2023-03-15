import React, { useState } from "react";
import "./NftCollectionMoreAboutAthlete.css";

function NftCollectionMoreAboutAthlete({moreAbout}) {

  return (
    <section className="nft-collection-more-about-athlete-container">
        <div className="nft-collection-more-about-athlete-title">
            More about the athlete
        </div>
      <div className="nft-collection-more-about-athlete-wrap">
        <div className="nft-collection-more-about-athlete-picture-container">
          <img
            src={moreAbout[0].picture}
            alt="photo athlete"
          />
        </div>
        <div className="nft-collection-more-about-athlete-presentation-container">
          <div className="nft-collection-more-about-athete-sport-title">
            Skipper
          </div>
          <div className="nft-collection-more-about-athlete-name">
            {moreAbout[0].fullName}
          </div>
          <div className="nft-collection-more-about-athlete-description">
            {moreAbout[0].description}
          </div>
          <div className="nft-collection-more-about-athlete-fans-count">
            {moreAbout[0].fansNumber} fans
          </div>
          <button className="nft-collection-more-about-athlete-view-profile-button">
            See the profile
          </button>
        </div>
      </div>
    </section>
  );
}

export default NftCollectionMoreAboutAthlete;
