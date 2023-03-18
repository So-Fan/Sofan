import React from "react";
import AthleteProfileNFTCollection from "../AthleteProfileNFTCollection/AthleteProfileNFTCollection";
import AthleteProfileNFTCollectionTemplate from "../AthleteProfileNFTCollection/AthleteProfileNFTCollectionTemplate/AthleteProfileNFTCollectionTemplate";
import "./DashboardMyCollections.css";
function DashboardMyCollections() {
  const dataBackend = {
    collections: [
      {
        banner: "https://i.imgur.com/2ybztrG.png",
        profilePicture: "https://i.imgur.com/zH10SHj.png",
        title: "THE VENDEE GLOBE 2022",
        nftNumber: "5405",
        nftPriceEth: "0.01",
      },
      {
        banner: "https://i.imgur.com/2ybztrG.png",
        profilePicture: "https://i.imgur.com/zH10SHj.png",
        title: "THE VENDEE GLOBE 2022",
        nftNumber: "5405",
        nftPriceEth: "0.01",
      },
      {
        banner: "https://i.imgur.com/2ybztrG.png",
        profilePicture: "https://i.imgur.com/zH10SHj.png",
        title: "THE VENDEE GLOBE 2022",
        nftNumber: "5405",
        nftPriceEth: "0.01",
      },
      {
        banner: "https://i.imgur.com/2ybztrG.png",
        profilePicture: "https://i.imgur.com/zH10SHj.png",
        title: "THE VENDEE GLOBE 2022",
        nftNumber: "5405",
        nftPriceEth: "0.01",
      },
      {
        banner: "https://i.imgur.com/2ybztrG.png",
        profilePicture: "https://i.imgur.com/zH10SHj.png",
        title: "THE VENDEE GLOBE 2022",
        nftNumber: "5405",
        nftPriceEth: "0.01",
      },
    ],
  };
  return (
    <section className="dashboard-my-collections-container">
      {dataBackend?.collections.map((collection) => (
        <AthleteProfileNFTCollectionTemplate collectionData={collection} />
      ))}

      {dataBackend.collections.length % 2 !== 0 && (
        <AthleteProfileNFTCollectionTemplate isTransparent={true} />
      )}
    </section>
  );
}

export default DashboardMyCollections;
