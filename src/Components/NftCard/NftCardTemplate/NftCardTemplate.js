import React from 'react'
import { Link } from 'react-router-dom'
import "./NftCardTemplate.css"
const NftCardTemplate = ({ to, img, athleteName, title, id, price, bid, isTransparent, ethPriceFromApi, ethBidFromApi}) => {
  console.log("NftCard Template ethPriceFrom Api -->  "+ethPriceFromApi)
  
  return (
    <Link to={`/${athleteName}/nft/${to}`} className='nftcardtemplate-component' style={isTransparent && {visibility: "hidden"}}>
      <div className='nftcardtemplate-image-wrap'>
        <img src={img} alt="NFT" />
      </div>
      <div className='nftcardtemplate-container-content'>
        <span className='nftcardtemplate-container-content-athletename'>{athleteName}</span>
        <span className='nftcardtemplate-container-content-title'>{title} {id}</span>
        <div className='nftcardtemplate-container-content-price-wrap'>
            <div className='nftcardtemplate-container-content-price-subwrap'>
                <span className='nftcardtemplate-container-content-price-subwrap-text'>Price</span>
                <span className='nftcardtemplate-container-content-price-subwrap-price'>{ethPriceFromApi} ETH</span>
            </div>
            <div className='nftcardtemplate-container-content-price-subwrap'>
                <span className='nftcardtemplate-container-content-price-subwrap-text'>Highest bid</span>
                <span className='nftcardtemplate-container-content-price-subwrap-price'>{ethBidFromApi} ETH</span>
            </div>
        </div>
      </div>
    </Link>
  )
}

export default NftCardTemplate
