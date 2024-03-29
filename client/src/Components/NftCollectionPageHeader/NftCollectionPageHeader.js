import React, { useState, useEffect } from "react";
import "./NftCollectionPageHeader.css";
import Checkmark from "../../Assets/Image/checkmark_profile.svg";
import Discord from "../../Assets/Image/discord.svg";
import Twitter from "../../Assets/Image/twitter.svg";
import Instagram from "../../Assets/Image/instagram.svg";
import { Link } from "react-router-dom";
// import { useLocation } from "react-router-dom";
// import { collection, query, where, getDocs } from "firebase/firestore";
// import { db } from "../../Configs/firebase";
const NftCollectionPageHeader = ({
  collectionInfo,
  collectionFloorPriceApiData,
  ethPrice,
  hidePrice,
  collectionBackendData,
  athleteDisplayName,
  totalOwnersForContract,
  collectionAddress,
}) => {
  // console.log("collectionAddress --> ", collectionAddress);
  // let floorPriceEur = collectionFloorPriceApiData * ethPrice
  let floorPriceEur = (collectionFloorPriceApiData * ethPrice).toLocaleString(
    "fr-FR",
    { maximumFractionDigits: 2 }
  );
  // console.log("totalOwnersForContract --> ",totalOwnersForContract?.owners.length)
  // to={`/collectionlive/${collectionBackendData[0]?.athlete_id}/${collectionAddress}`}
  return (
    <div className="nftcollectionheader-component">
      <div className="nftcollectionheader-bannerandprofilepicture-wrap">
        {collectionBackendData[0]?.collection_banner ? (
          <>
            <img
              src={collectionBackendData[0]?.collection_banner}
              alt="banner"
            />
          </>
        ) : (
          <>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/sofan-app.appspot.com/o/user_profile%2Fdefault_banner%2FbannerUserProfile.png?alt=media&token=5e614810-d6e1-49c1-bb42-e1905f068a1a"
              alt="banner"
            />
          </>
        )}
        <div className="nftcollectionheader-profilepicture-wrap">
          {collectionBackendData[0]?.collection_avatar ? (
            <>
              <img
                src={collectionBackendData[0]?.collection_avatar}
                alt="profile"
              />
            </>
          ) : (
            <div className="nftcollectionheader-profilepicture-no-img"></div>
          )}
        </div>
      </div>
      <div className="nftcollectionheader-content-container">
        <div className="nftcollectionheader-content-wrap">
          <Link
            className="nftcollectionheader-content-wrap-redirection-button"
            to={`/collectionlive/${collectionBackendData[0]?.athlete_id}/${collectionAddress}`}
          >
            Mint un NFT !
          </Link>
          <Link
            to={`/athleteprofile/${collectionBackendData[0]?.athlete_id}`}
            style={{ textDecoration: "none" }}
            className="nftcollectionheader-content-subwrap"
          >
            <span className="nftcollectionheader-content-wrap-sport">
              par {athleteDisplayName[0]?.display_name}
            </span>
          </Link>
          <div className="nftcollectionheader-content-wrap-namestatssocial-wrap">
            <div className="nftcollectionheader-content-wrap-namestatssocial-wrap-namestats">
              <span className="nftcollectionheader-content-wrap-namestatssocial-wrap-namestats-title">
                {collectionBackendData[0]?.collection_title}
                <img src={Checkmark} alt="Checkmark" />
              </span>
            </div>
            <div className="nftcollectionheader-content-wrap-namestatssocial-wrap-social-container">
              {/* <div className="nftcollectionheader-content-wrap-namestatssocial-wrap-social-container-social">
                <a
                  href={collectionInfo?.socials.discord}
                  target="_blank"
                >
                  <img src={Discord} alt="Discord" />
                </a>
                <a
                  href={collectionInfo?.socials.twitter}
                  target="_blank"
                >
                  <img src={Twitter} alt="Twitter" />
                </a>
                <a
                  href={collectionInfo?.socials.instagram}
                  target="_blank"
                >
                  <img src={Instagram} alt="Instagram" />
                </a>
              </div> */}
            </div>
          </div>
          <div className="nftcollectionheader-content-container-descriptionn">
            {collectionBackendData[0]?.collection_description}
          </div>
          <div className="nftcollectionheader-content-wrap-stats-container">
            {hidePrice ? (
              <></>
            ) : (
              <>
                <div className="nftcollectionheader-content-wrap-stats-wrap nftcollectionheader-content-wrap-stats-wrap-1">
                  <span className="nftcollectionheader-content-wrap-stats-wrap-value">
                    {floorPriceEur}€
                  </span>
                  <span className="nftcollectionheader-content-wrap-stats-wrap-name">
                    Floor price
                  </span>
                </div>
                <div className="nftcollectionheader-content-wrap-stats-wrap nftcollectionheader-content-wrap-stats-wrap-2">
                  <span className="nftcollectionheader-content-wrap-stats-wrap-value">
                    {collectionInfo?.AveragePrice} ETH
                  </span>
                  <span className="nftcollectionheader-content-wrap-stats-wrap-name">
                    Average price
                  </span>
                </div>
              </>
            )}

            <div className="nftcollectionheader-content-wrap-stats-wrap nftcollectionheader-content-wrap-stats-wrap-3">
              <span className="nftcollectionheader-content-wrap-stats-wrap-value">
                {totalOwnersForContract?.owners.length}
              </span>
              <span className="nftcollectionheader-content-wrap-stats-wrap-name">
                Détenteurs
              </span>
            </div>
            {hidePrice ? (
              <></>
            ) : (
              <>
                <div className="nftcollectionheader-content-wrap-stats-wrap">
                  <span className="nftcollectionheader-content-wrap-stats-wrap-value">
                    {collectionInfo?.Volume} ETH
                  </span>
                  <span className="nftcollectionheader-content-wrap-stats-wrap-name">
                    Total Volume
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NftCollectionPageHeader;

// const AthleteProfileHeaderPalmaresButton = {
//     backgroundColor: "#F6D463",
//     border: "1px solid #F6D463",
//     width: "105px",
//     height: "39px",
//     borderRadius: "5px",
//     fontFamily: "Britanica-Black",
//     fontSize: "16px",
//   };
//   const AthleteProfileHeaderFanButton = {
//     backgroundColor: "#F6D463",
//     border: "1px solid #F6D463",
//     width: "135px",
//     height: "39px",
//     borderRadius: "5px",
//     fontFamily: "Britanica-Black",
//     fontSize: "16px",
//   };
//   const AthleteProfileHeaderFollowButton = {
//     backgroundColor: "#FFFFFF",
//     border: "1px solid #000000",
//     width: "85px",
//     height: "39px",
//     borderRadius: "5px",
//     fontFamily: "Britanica-Black",
//     fontSize: "16px",
//   };
