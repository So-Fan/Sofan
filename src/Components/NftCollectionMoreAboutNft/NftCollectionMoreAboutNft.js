import React from "react";
import NftCardTemplate from "../NftCard/NftCardTemplate/NftCardTemplate";
import "./NftCollectionMoreAboutNft.css";
import { v4 as uuidv4 } from "uuid";
function NftCollectionMoreAboutNft({ nftCard }) {
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
          {nftCard.map((element) => (
            <NftCardTemplate
              key={uuidv4()}
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
