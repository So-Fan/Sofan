import React from "react";
import "./NftCollectionProperties.css";
import { v4 as uuidv4 } from "uuid";
function NftCollectionProperties({properties}) {

  return (
    <section className="nft-collection-properties-container">
      {properties.map((element) => (
        <div
          key={uuidv4()}
          className="nft-collection-properties-card-container"
        >
          <div className="nft-collection-properties-card-type-property">
            {element.typeProperty}
          </div>
          <div className="nft-collection-properties-card-property">
            {element.property}
          </div>
          <div className="nft-collection-properties-card-rarity">
            {element.rarity}% have this
          </div>
        </div>
      ))}
    </section>
  );
}

export default NftCollectionProperties;
