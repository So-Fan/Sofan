import React from "react";
import { Link } from "react-router-dom";
import "./NftCardTemplate.css";
const NftCardTemplate = ({
  to,
  athleteName,
  isTransparent,
  fontStyle,
  nftsFromOwner,
  nftsFromOwnerIdNft,
  nftsFromOwnerNameCollection,
  nftsFromOwnerFloorPrice,
  nftsFromOwnerImage,
  nftsFromOwnerNameCollectionName,
  nftsFromOwnerPicture,
  // nftsFromOwnerFloorPrice,
  nftsFromOwnerTotalSupply,
  hidePrice,
}) => {
  // console.log(nftsFromOwner)
  return (
    <Link
      to={to}
      className="nftcardtemplate-component"
      style={isTransparent && { visibility: "hidden" }}
    >
      <div className="nftcardtemplate-image-wrap">
        {nftsFromOwnerImage ? <img src={nftsFromOwnerImage} alt="NFT" />: <div className="nftcardtemplate-when-no-image">PAS D'IMAGE</div>}
      </div>
      <div className="nftcardtemplate-container-content">
        <span className="nftcardtemplate-container-content-athletename">
          {athleteName}
        </span>
        <span
          className={`nftcardtemplate-container-content-title ${fontStyle}`}
        >
          <p>{nftsFromOwnerNameCollection}</p>#{nftsFromOwnerIdNft}
        </span>
        {hidePrice ? (
          <></>
        ) : (
          <>
            <div className="nftcardtemplate-container-content-price-wrap">
              <div className="nftcardtemplate-container-content-price-subwrap">
                <span className="nftcardtemplate-container-content-price-subwrap-text">
                  Price
                </span>
                <span className="nftcardtemplate-container-content-price-subwrap-price">
                  {nftsFromOwnerFloorPrice} ETH
                </span>
              </div>
              <div className="nftcardtemplate-container-content-price-subwrap">
                <span className="nftcardtemplate-container-content-price-subwrap-text">
                  Highest bid
                </span>
                <span className="nftcardtemplate-container-content-price-subwrap-price">
                  {/* {bid} ETH */}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </Link>
  );
};

export default NftCardTemplate;
