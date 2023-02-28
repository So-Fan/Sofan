import React from 'react'
import "./NftCardTemplate.css"
import { Link } from "react-router-dom";
const NftCardTemplate = ({ to, img, athleteName, title, id, price, bid }) => {
  return (
    <Link to={to} className="nftcard-component">
      <img src={img} alt="NFT" />
      <div className="nftcard-text-container">
        <div className="nftcard-text-wrap">
          <div className="nftcard-text-header">
            <span className="nftcard-text-name">{athleteName}</span>
            <span className="nftcard-text-title">{title} {id}</span>
          </div>
          <div className="nftcard-text-info-wrap">
            <div className="nftcard-text-info-subwrap">
              <span className="nftcard-text-info-category">Prix</span>
              <span className="nftcard-text-info-price">{price} ETH</span>
            </div>
            <div className="nftcard-text-info-subwrap">
              <span className="nftcard-text-info-category">Highest bid</span>
              <span className="nftcard-text-info-price">{bid} ETH</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default NftCardTemplate
