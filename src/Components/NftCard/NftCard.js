import React from "react";
import "./NftCard.css";
import NftCardTemplate from "./NftCardTemplate/NftCardTemplate";
const NftCard = ({ userFrom }) => {
  console.log(userFrom?.length % 4);
  setTimeout(() => {
    
    console.log("C'est UserFrom --> "+userFrom)
  }, 900);
  return (
    <>
      <div className="nftcard-component">
        {userFrom?.map((nft) => (
          <NftCardTemplate
            to={`/user/nftcard/${nft.nftId}`}
            img={nft.img}
            athleteName={nft.athleteName}
            title={nft.nftTitle}
            id={nft.nftId}
            price={nft.nftPriceEth}
            bid={nft.bid}
          />
        ))}
      {userFrom?.length % 4 === 1 && <><NftCardTemplate isTransparent={true}/><NftCardTemplate isTransparent={true}/><NftCardTemplate isTransparent={true}/></>}
      {userFrom?.length % 4 === 2 && <><NftCardTemplate isTransparent={true}/><NftCardTemplate isTransparent={true}/></>}
      {userFrom?.length % 4 === 3 && <NftCardTemplate isTransparent={true}/>}
      </div>
    </>
  );
};

export default NftCard;
