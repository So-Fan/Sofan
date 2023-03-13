import React from "react";
import NftCard from "../NftCard/NftCard";
import NftCardTemplate from "../NftCard/NftCardTemplate/NftCardTemplate";
import "./NftCollectionMoreAboutNft.css";
function NftCollectionMoreAboutNft() {
  const dataBackendNftCollectionMoreAboutNft = {
    nftCard: [
      {
        nftImage:
          "https://i.seadn.io/gcs/files/dac49567c59c19147360a378c38b485d.jpg?w=500&auto=format",
        collectionName: "Explore the World with Alexia Barrier",
        nftId: 390,
        ethPrice: 0.61,
        highestBidEth: 0.03,
      },
      {
        nftImage:
          "https://i.seadn.io/gcs/files/dac49567c59c19147360a378c38b485d.jpg?w=500&auto=format",
        collectionName: "Explore the World with Alexia Barrier",
        nftId: 390,
        ethPrice: 0.61,
        highestBidEth: 0.03,
      },
      {
        nftImage:
          "https://i.seadn.io/gcs/files/dac49567c59c19147360a378c38b485d.jpg?w=500&auto=format",
        collectionName: "Explore the World with Alexia Barrier",
        nftId: 390,
        ethPrice: 0.61,
        highestBidEth: 0.03,
      },
      {
        nftImage:
          "https://i.seadn.io/gcs/files/dac49567c59c19147360a378c38b485d.jpg?w=500&auto=format",
        collectionName: "Explore the World with Alexia Barrier",
        nftId: 390,
        ethPrice: 0.61,
        highestBidEth: 0.03,
      },
    ],
  };
  return (
    <section className="nft-collection-more-about-nft-container">
      <div className="nft-collection-more-about-nft-wrap">
        <div className="nft-collection-more-about-nft-title-and-button">
          <div className="nft-collection-more-about-nft-title">
            More about the NFT collection
          </div>
          <div className="nft-collection-more-about-title-button">
            <button>Voir tout</button>
          </div>
        </div>
        <div className="nft-collection-more-about-nft-card-container">
          {dataBackendNftCollectionMoreAboutNft.nftCard.map((element) => (
            <NftCardTemplate
            fontStyle="nftcardtemplate-container-content-title-props"
              img={element.nftImage}
              title={element.collectionName}
              id={element.nftId}
              price={element.ethPrice}
              bid={element.highestBidEth}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default NftCollectionMoreAboutNft;
