import React from 'react'
import "./MoreAboutThisCollection.css"

function MoreAboutThisCollection({moreAboutCollectionArray}) {
  return (
    <div className="nft-collection-overview-more-about-collection-container">
        <div className="nft-collection-overview-more-about-collection-title">
          En savoir + sur la collection
        </div>
        <div className="nft-collection-overview-more-about-collection-description">
          {moreAboutCollectionArray.map((element) => element.description)}
        </div>
      </div>
  )
}

export default MoreAboutThisCollection