import React from "react";
import "./NftCard.css";
import NftCardTemplate from "./NftCardTemplate/NftCardTemplate";
const NftCard = ({ userFrom, nftsFromOwner, isNftSpam }) => {
  // console.log(userFrom?.length % 4);
  setTimeout(() => {
    // console.log("C'est UserFrom --> " + userFrom);
  }, 900);
  // console.log(nftsFromOwner)

  return (
    <>
      <div className="nftcard-component">
        {userFrom?.map((nft, i, apiNftsFromContract) => (
          <>
            {isNftSpam ? (
              <></>
            ) : (
              <>
                <NftCardTemplate
                  to={`/user/nftcard/${nft.nftId}`}
                  img={nft.img}
                  athleteName={nft.athleteName}
                  title={nft.nftTitle}
                  id={nft.nftId}
                  price={nft.nftPriceEth}
                  bid={nft.bid}
                  nftsFromOwner={nftsFromOwner[i]}
                  isNftSpam={isNftSpam}
                />
              {/* {console.log(nftsFromOwner)} */}
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
