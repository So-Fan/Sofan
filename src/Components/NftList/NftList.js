import React from 'react'
import "./NftList.css"
import explorePicture from "../../Assets/Image/explorepicture.svg"
function NftList() {
  return (
    // Backend here
    <div className="user-nft-transfer-container">
        <div>Mint</div>
        <div className="user-nft-picture-and-title">
          <img src={explorePicture} alt="nft picture" />
          <div className="collection-name-nft-id-user-activity">
            <span>Explore the World with Alexia...</span>
            <span>#393</span>
          </div>
        </div>
        <div className="nft-price-user-activity">
          <div className="nftc-price-eth-user-activity">0.50 ETH</div>
          <div className="nft-price-eur-user-activity">692.04€</div>
        </div>
        <div className="nft-quantity-user-activity">1</div>
        <div className="nft-from-user-activity">Alexia Barrier</div>
        <div className="nft-to-user-activity">Gr3goir3</div>
        <div className="nft-date-transfer-user-activity">1 hour ago</div>
      </div>
  )
}

export default NftList