import React from "react";
import "./NftCollectionProperties.css";
import { v4 as uuidv4 } from "uuid";
function NftCollectionProperties() {
  const dataBackenProperties = {
    properties: [
      {
        typeProperty: "BACKGROUND",
        property: "Mountains",
        rarity: 10,
      },
      {
        typeProperty: "BOAT",
        property: "Brown",
        rarity: 10,
      },
      {
        typeProperty: "ANIMAL",
        property: "Dog",
        rarity: 2,
      },
      {
        typeProperty: "ACCESSORY",
        property: "Backpack",
        rarity: 5,
      },
      {
        typeProperty: "OUTFIT",
        property: "Aventure",
        rarity: 15,
      },
      {
        typeProperty: "HAIR",
        property: "Brown",
        rarity: 20,
      },
    ],
  };
  return (
    <section className="nft-collection-properties-container">
      {dataBackenProperties.properties.map((element) => (
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
