import React from "react";
import { Link } from "react-router-dom";
import "./NftCardTemplate.css";
const NftCardTemplate = ({
  to,
  img,
  athleteName,
  title,
  id,
  price,
  bid,
  isTransparent,
  fontStyle,
  nftsFromOwner,
  nftsFromOwnerIdNft,
  nftsFromOwnerNameCollection,
  nftsFromOwnerFloorPrice,
  nftsFromOwnerImage
}) => {
  
  return (
    <Link
      to={`/${athleteName}/nft/${to}`}
      className="nftcardtemplate-component"
      style={isTransparent && { visibility: "hidden" }}
    >
      <div className="nftcardtemplate-image-wrap">
        <img src={nftsFromOwnerImage} alt="NFT" />
      </div>
      <div className="nftcardtemplate-container-content">
        <span className="nftcardtemplate-container-content-athletename">
          {athleteName}
        </span>
        <span className={`nftcardtemplate-container-content-title ${fontStyle}`}>
          <p>{nftsFromOwnerNameCollection}</p>#{nftsFromOwnerIdNft}
        </span>
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
      </div>
    </Link>
  );
};

export default NftCardTemplate;
