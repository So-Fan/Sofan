import React, { useState } from "react";
import "./NftCollectionMoreAboutAthlete.css";
import { Link } from "react-router-dom";

function NftCollectionMoreAboutAthlete({
  moreAbout,
  launchpadCollectionLivePage,
  moreAboutAthlete,
  knowMoreAboutAthleteDescription,
  athleteId,
  knowMoreAboutAthleteSport,
  knowMoreAboutAthleteProfileAvatar,
  knowMoreAboutAthleteDisplayName,
  knowMoreAboutAthleteFanNumber,
}) {
  // console.log("blabla " + moreAboutAthleteDescription);
  // console.log(moreAbout)
  // console.log(moreAbout[0].fullName)
  return (
    <section className="nft-collection-more-about-athlete-container">
      <div className="nft-collection-more-about-athlete-title">
        En savoir + sur {knowMoreAboutAthleteDisplayName}
      </div>
      <div className="nft-collection-more-about-athlete-wrap">
        <div className="nft-collection-more-about-athlete-picture-container">
          <img src={knowMoreAboutAthleteProfileAvatar} alt="photo athlete" />
        </div>
        <div className="nft-collection-more-about-athlete-presentation-container">
          <div className="nft-collection-more-about-athete-sport-title">
            {knowMoreAboutAthleteSport}
          </div>
          <div className="nft-collection-more-about-athlete-name">
            {knowMoreAboutAthleteDisplayName}
          </div>
          <div className="nft-collection-more-about-athlete-description">
            {knowMoreAboutAthleteDescription}
          </div>
          <div className="nft-collection-more-about-athlete-fans-count">
            {knowMoreAboutAthleteFanNumber} fans
          </div>
          <Link
            className="nft-collection-more-about-athlete-view-profile-button"
            to={`/athleteprofile/${athleteId}`}
            target="_blank"
          >
            Voir le profil
          </Link>
        </div>
      </div>
    </section>
  );
}

export default NftCollectionMoreAboutAthlete;
