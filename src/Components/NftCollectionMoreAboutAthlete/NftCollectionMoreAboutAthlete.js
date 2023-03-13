import React, { useState } from "react";
import "./NftCollectionMoreAboutAthlete.css";

function NftCollectionMoreAboutAthlete() {
  const backendDataNftCollection = {
    moreAbout: [
      {
        picture: "https://i.imgur.com/Z7rHdVv.png",
        sportTitle: "Skipper",
        fullName: "Alexia Barrier",
        description:
          "Alexia Barrier is a French professional sailor and skipper. She has competed in several sailing races, including the Solitaire du Figaro and the Vendée Globe. She is the first woman to have completed the Vendée Globe solo non-stop race, finishing in 16th place. She is also the founder of the Sail & Help association, which promotes environmental protection and education through sailing.",
        fansNumber: 121023,
      },
    ],
  };

  return (
    <section className="nft-collection-more-about-athlete-container">
        <div className="nft-collection-more-about-athlete-title">
            More about the athlete
        </div>
      <div className="nft-collection-more-about-athlete-wrap">
        <div className="nft-collection-more-about-athlete-picture-container">
          <img
            src={backendDataNftCollection.moreAbout[0].picture}
            alt="photo athlete"
          />
        </div>
        <div className="nft-collection-more-about-athlete-presentation-container">
          <div className="nft-collection-more-about-athete-sport-title">
            Skipper
          </div>
          <div className="nft-collection-more-about-athlete-name">
            {backendDataNftCollection.moreAbout[0].fullName}
          </div>
          <div className="nft-collection-more-about-athlete-description">
            {backendDataNftCollection.moreAbout[0].description}
          </div>
          <div className="nft-collection-more-about-athlete-fans-count">
            {backendDataNftCollection.moreAbout[0].fansNumber} fans
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
