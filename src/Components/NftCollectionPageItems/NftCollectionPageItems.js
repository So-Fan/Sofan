import React, {useState} from 'react'
import "./NftCollectionPageItems.css"
import NftCollectionMoreAboutNft from '../NftCollectionMoreAboutNft/NftCollectionMoreAboutNft'

function NftCollectionPageItems() {
    // var adaptToNftCollectionPageItems = true
    const [adaptTitleToNftCollectionPageItems, setAdaptToNftCollectionPageItems] = useState(true)
    
  return (
    <>
    <div className='nft-collection-page-items-container'>

    <NftCollectionMoreAboutNft
    adaptTitleToNftCollectionPageItems={adaptTitleToNftCollectionPageItems}
    
    />
    </div>
    </>
  )
}

export default NftCollectionPageItems