import "./AthleteProfileNFTCollectionTemplate.css";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../../../Configs/firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
  limit,
  getDocs,
  getDoc,
} from "firebase/firestore";
import "uuid";
const AthleteProfileNFTCollectionTemplate = ({
  collectionData,
  isTransparent,
  dashBoardPageMarginDelete,
  nftDataApi,
  collectionFloorPriceApiData,
  nftsFromOwnerNameCollectionName,
  nftsFromOwnerPicture,
  nftsFromOwnerBanner,
  nftsFromOwnerFloorPrice,
  nftsFromOwnerTotalSupply,
  hidePrice,
  dashboardMyCollectionsStyle,
  athleteId,
  athleteProfilePageNftCollectionsAddress,
}) => {
  // const launchpadCollectionLive = collection(db, "nft_collections");
  // // console.log(athleteId)
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const q = query(
  //         launchpadCollectionLive,
  //         where("athlete_id", "==", `${athleteId}`)
  //       );
  //       getDocs(q)
  //         .then((querySnapshot) => {
  //           const data = [];
  //           querySnapshot.forEach((doc) => {
  //             data.push(doc.data());
  //           });
  //           console.log(data);
  //           // Now you have the filtered data
  //         })
  //         .catch((error) => {
  //           // Handle errors
  //           console.error(error);
  //         });
  //     } catch (error) {
  //       console.log("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, [athleteId]); // Dépendance à 'athleteId' pour recalculer si l'athleteId change
  return (
    <Link
      to={`/collectionlive/${athleteId}/${athleteProfilePageNftCollectionsAddress}`}
      className="athleteprofilenftcollectiontemplate-component"
      style={
        isTransparent
          ? { visibility: "hidden" }
          : dashBoardPageMarginDelete
          ? { marginTop: "0px", marginBottom: "26px" }
          : {}
      }
    >
      <div className="athleteprofilenftcollectiontemplate-banner-wrap">
        <img src={nftsFromOwnerBanner} alt="banner" />
      </div>
      <div className="athleteprofilenftcollectiontemplate-content-wrap">
        <div className="athleteprofilenftcollectiontemplate-content-profilepicture-wrap">
          <img src={nftsFromOwnerPicture} alt="profile" />
        </div>
        <span className="athleteprofilenftcollectiontemplate-content">
          {nftsFromOwnerNameCollectionName}
        </span>
        <div className="athleteprofilenftcollectiontemplate-content">
          <span className="athleteprofilenftcollectiontemplate-content-nftnumber">
            {nftsFromOwnerTotalSupply} items
          </span>
          {hidePrice ? (
            <></>
          ) : (
            <>
              <span className="athleteprofilenftcollectiontemplate-content-nftprice">
                {nftsFromOwnerFloorPrice} ETH
              </span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};

export default AthleteProfileNFTCollectionTemplate;
