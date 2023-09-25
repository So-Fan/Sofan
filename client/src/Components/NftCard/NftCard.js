import React, { useRef } from "react";
import "./NftCard.css";
import NftCardTemplate from "./NftCardTemplate/NftCardTemplate";
import { v4 as uuidv4 } from "uuid";
const NftCard = ({
  userFrom,
  nftsFromOwner,
  isNftSpam,
  nftCardRef,
  hidePrice,
  isNftCollectionPage,
  nftsFromCollection
}) => {
  // console.log(userFrom?.length % 4);
  console.log(userFrom)
  console.log("nftsFromCollection --> ",nftsFromCollection)
  return (
    <>
      {isNftCollectionPage ? (
        <>
          <>
            <div
              ref={nftCardRef}
              id="nftcard-component"
              className="nftcard-component"
            >
              {nftsFromCollection?.map((nft, i, apiNftData) => (
                <>
                  {isNftSpam ? (
                    <></>
                  ) : (
                    <>
                      {/* {console.log(nft)} */}
                      <NftCardTemplate
                        key={uuidv4()}
                        hidePrice={hidePrice}
                        to={`/nftsingle/${nft.contract.address}/${nft.tokenId}`}
                        athleteName={nft.athleteName}
                        // nftsFromOwner={nftsFromOwner[i]}
                        nftsFromOwnerImage={apiNftData[i]?.media[0]?.gateway}
                        nftsFromOwnerNameCollection={
                          apiNftData[i]?.contract?.name
                        }
                        nftsFromOwnerFloorPrice={
                          apiNftData[i]?.contract?.openSea?.floorPrice
                        }
                        nftsFromOwnerIdNft={apiNftData[i]?.tokenId}
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
              {userFrom?.length % 4 === 3 && (
                <NftCardTemplate isTransparent={true} />
              )}
            </div>
          </>
        </>
      ) : (
        <>
          <div
            ref={nftCardRef}
            id="nftcard-component"
            className="nftcard-component"
          >
            {nftsFromOwner?.map((nft, i, apiNftData) => (
              <>
                {isNftSpam ? (
                  <></>
                ) : (
                  <>
                    {/* {console.log(nft)} */}
                    <NftCardTemplate
                      key={uuidv4()}
                      hidePrice={hidePrice}
                      to={`/nftsingle/${nft.contract.address}/${nft.tokenId}`}
                      athleteName={nft.athleteName}
                      // nftsFromOwner={nftsFromOwner[i]}
                      nftsFromOwnerImage={apiNftData[i]?.media[0]?.gateway}
                      nftsFromOwnerNameCollection={
                        apiNftData[i]?.contract?.name
                      }
                      nftsFromOwnerFloorPrice={
                        apiNftData[i]?.contract?.openSea?.floorPrice
                      }
                      nftsFromOwnerIdNft={apiNftData[i]?.tokenId}
                      isNftSpam={isNftSpam}
                    />
                  </>
                )}
              </>
            ))}
            {nftsFromCollection?.length % 4 === 1 && (
              <>
                <NftCardTemplate isTransparent={true} />
                <NftCardTemplate isTransparent={true} />
                <NftCardTemplate isTransparent={true} />
              </>
            )}
            {nftsFromCollection?.length % 4 === 2 && (
              <>
                <NftCardTemplate isTransparent={true} />
                <NftCardTemplate isTransparent={true} />
              </>
            )}
            {nftsFromCollection?.length % 4 === 3 && (
              <NftCardTemplate isTransparent={true} />
            )}
          </div>
        </>
      )}
    </>
  );
};

export default NftCard;
