import React from "react";
import "./NftCard.css";
import NftCardTemplate from "./NftCardTemplate/NftCardTemplate";
import { v4 as uuidv4 } from "uuid";
const NftCard = ({ userFrom, nftsFromOwner, isNftSpam }) => {
  // console.log(userFrom?.length % 4);
  setTimeout(() => {
    // console.log("C'est UserFrom --> " + userFrom);
  }, 900);
  return (
    <>
      <div className="nftcard-component">
        {nftsFromOwner?.map((nft, i, apiNftData) => (
          <>
            {isNftSpam ? (
              <></>
            ) : (
              <>
                <NftCardTemplate
                key={uuidv4()}
                  to={`/user/nftcard/${apiNftData[i]?.tokenId}`}
                  img={nft.img}
                  athleteName={nft.athleteName}
                  title={nft.nftTitle}
                  id={nft.nftId}
                  price={nft.nftPriceEth}
                  bid={nft.bid}
                  // nftsFromOwner={nftsFromOwner[i]}
                  nftsFromOwnerImage={apiNftData[i]?.media[0]?.gateway}
                  nftsFromOwnerFloorPrice={apiNftData[i]?.contract?.openSea?.floorPrice}
                  nftsFromOwnerIdNft={apiNftData[i]?.tokenId}
                  nftsFromOwnerNameCollection={apiNftData[i]?.contract?.name}
                  isNftSpam={isNftSpam}
                />
              </>
            )}
          </>
        ))}
        {userFrom?.length % 4 === 1 && (
          <>
            <NftCardTemplate isTransparent={true} />
            <NftCardTemplate isTransparent={true} />
            <NftCardTemplate isTransparent={true} />
          </>
        )}
        {userFrom?.length % 4 === 2 && (
          <>
            <NftCardTemplate isTransparent={true} />
            <NftCardTemplate isTransparent={true} />
          </>
        )}
        {userFrom?.length % 4 === 3 && <NftCardTemplate isTransparent={true} />}
      </div>
    </>
  );
};

export default NftCard;