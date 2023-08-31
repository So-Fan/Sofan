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
  knowMoreAboutAthleteDisplayName
}) {
  // console.log("blabla " + moreAboutAthleteDescription);
  // console.log(moreAbout)
  // console.log(moreAbout[0].fullName)
  return (
    <section className="nft-collection-more-about-athlete-container">
      <div className="nft-collection-more-about-athlete-title">
        En savoir + sur{" "}
        {launchpadCollectionLivePage ? (
          <>{knowMoreAboutAthleteDisplayName}</>
        ) : (
          <>{moreAbout[0].fullName}</>
        )}
      </div>
      <div className="nft-collection-more-about-athlete-wrap">
        <div className="nft-collection-more-about-athlete-picture-container">
          {launchpadCollectionLivePage ? (
            <>
              <img src={knowMoreAboutAthleteProfileAvatar} alt="photo athlete" />
            </>
          ) : (
            <>
              <img src={moreAbout[0].picture} alt="photo athlete" />
            </>
          )}
        </div>
        <div className="nft-collection-more-about-athlete-presentation-container">
          <div className="nft-collection-more-about-athete-sport-title">
            {knowMoreAboutAthleteSport}
          </div>
          <div className="nft-collection-more-about-athlete-name">
            {launchpadCollectionLivePage ? (
              <>{knowMoreAboutAthleteDisplayName}</>
            ) : (
              <>{moreAbout[0].fullName}</>
            )}
          </div>
          <div className="nft-collection-more-about-athlete-description">
            {launchpadCollectionLivePage ? (
              <>{knowMoreAboutAthleteDescription}</>
            ) : (
              <>{moreAbout[0].description}</>
            )}
          </div>
          <div className="nft-collection-more-about-athlete-fans-count">
            {launchpadCollectionLivePage ? (
              <>{moreAboutAthlete.fansNumber} fans</>
            ) : (
              <>{moreAbout[0].fansNumber} fans</>
            )}
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
