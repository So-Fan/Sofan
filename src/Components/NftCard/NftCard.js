import React from "react";
import "./NftCard.css";
import NftCardTemplate from "./NftCardTemplate/NftCardTemplate";
const NftCard = ({userFrom}) => {
  return (
    <>
      <div className="NftCard-component">
        {userFrom?.map((nft) => (
          <NftCardTemplate to={`/user/nftcard/${nft.nftId}`} img={nft.img} athleteName={nft.athleteName} title={nft.nftTitle} id={nft.nftId} price={nft.nftPriceEth} bid={nft.bid} />
        ))}
      </div>
    </>
  );
};

export default NftCard;
