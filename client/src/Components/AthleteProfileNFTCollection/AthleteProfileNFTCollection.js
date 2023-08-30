import React, { useEffect, useState } from "react";
import "./AthleteProfileNFTCollection.css";
import AthleteProfileNFTCollectionTemplate from "./AthleteProfileNFTCollectionTemplate/AthleteProfileNFTCollectionTemplate";
import { v4 as uuidv4 } from "uuid";
import { db } from "../../Configs/firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
  limit,
  getDocs,
  getDoc,
  addDoc
} from "firebase/firestore";
const AthleteProfileNFTCollection = ({
  dataCollections,
  nftDataApi,
  collectionFloorPriceApiData,
  nftsFromOwner,
  athletesNftsAvailable,
  hidePrice,
  athleteId,
}) => {
  const [
    athleteProfilePageNftCollectionsData,
    setAthleteProfilePageNftCollectionsData,
  ] = useState();
  //  console.log(nftsFromOwner[0]?.contract?.openSea?.imageUrl)
  const launchpadCollectionLive = collection(db, "nft_collections");
  // console.log(athleteId)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(
          launchpadCollectionLive,
          where("athlete_id", "==", `${athleteId}`)
        );
        getDocs(q)
          .then((querySnapshot) => {
            const data = [];
            querySnapshot.forEach((doc) => {
              data.push(doc.data());
            });
            console.log(data);
            setAthleteProfilePageNftCollectionsData(data);
            // Now you have the filtered data
          })
          .catch((error) => {
            // Handle errors
            console.error(error);
          });
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, [athleteId]); // Dépendance à 'athleteId' pour recalculer si l'athleteId change
  const multiplyDocuments = async () => {
    const feedLaunchpadRef = collection(db, "nft_collections");
    const snapshot = await getDocs(feedLaunchpadRef);

    let totalDocs = snapshot.size; // Nombre actuel de documents dans la collection
    let addedDocs = 0; // Nombre de documents ajoutés lors de cette opération

    snapshot.forEach(async (doc) => {
      // Clone le document 3 fois ou jusqu'à ce que le total atteigne 10
      for (let i = 0; i < 3; i++) {
        if (totalDocs + addedDocs >= 10) {
          console.log("Limite de 10 documents atteinte.");
          return; // Sortir de la boucle si la limite est atteinte
        }
        await addDoc(feedLaunchpadRef, doc.data());
        addedDocs++; // Incrémente le compteur de documents ajoutés
      }
    });

    console.log("Documents multipliés.");
  };
  // multiplyDocuments();
  return (
    <div
      ref={athletesNftsAvailable}
      id="athletes-nfts-availables"
      className="athleteprofilenftcollection-component"
    >
      {/* fetch data from backend for mapping them after */}
      {athleteProfilePageNftCollectionsData?.map(
        (collection, i, athleteProfilePageNftCollection) => (
          <AthleteProfileNFTCollectionTemplate
            athleteId={athleteId}
            hidePrice={hidePrice}
            nftsFromOwnerPicture={athleteProfilePageNftCollection[i]?.collection_avatar}
            nftsFromOwnerBanner={athleteProfilePageNftCollection[i]?.collection_banner}
            nftsFromOwnerNameCollectionName={athleteProfilePageNftCollection[i]?.collection_title}
            nftsFromOwnerFloorPrice={
              athleteProfilePageNftCollection[i]?.contract?.openSea?.floorPrice
            }
            nftsFromOwnerTotalSupply={athleteProfilePageNftCollection[i]?.nft_collection_limit}
            // mettre le nombre de nft de la collection correspondante
            key={uuidv4()}
            collectionFloorPriceApiData={collectionFloorPriceApiData}
            nftDataApi={nftDataApi?.ownedNfts[i]}
            collectionData={collection}
            athleteProfilePageNftCollectionsAddress={athleteProfilePageNftCollectionsData[i]?.collection_address}
          />
        )
      )}
      {dataCollections?.length % 2 !== 0 && (
        <AthleteProfileNFTCollectionTemplate isTransparent={true} />
      )}
    </div>
  );
};

export default AthleteProfileNFTCollection;
