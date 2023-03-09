import React from 'react'
import NftCollectionHeader from '../../Components/NftCollectionHeader/NftCollectionHeader'
import NftCollectionSubMenu from '../../Components/NftCollectionSubMenu/NftCollectionSubMenu'
import "./NftSingle.css"
const NftSingle = () => {
  return (
    // <div>
    <section className="nft-single-collection-page-container">
      <NftCollectionHeader/>
      <div className="nft-single-collection-page-left-container">
      <NftCollectionSubMenu/>
      </div>
    </section>
    //
  )
}

export default NftSingle
