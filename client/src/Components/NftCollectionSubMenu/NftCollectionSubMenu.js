import React, {useEffect, useState } from "react";
import "./NftCollectionSubMenu.css";
function NftCollectionSubMenu({handleClickSubMenuButton, isSubMenuClicked,isNftPropertiesExist, setIsNftPropertiesExist,nftsPropertiesCounter}) {
// connecter un etat pour verifier si la data de properties existe. Si non mettre en display none
// const [isNftPropertiesExist, setIsNftPropertiesExist] = useState(false);

// pour l'instant manuellement disable car les premiers nfts seront des photos (pas de propriétés)
nftsPropertiesCounter = 0
useEffect(() => {
  if (nftsPropertiesCounter >= 1) {
    setIsNftPropertiesExist(true);
    console.log("oijoijoij");
  } else {
    setIsNftPropertiesExist(false);
  }
}, [nftsPropertiesCounter]);

  return (
    <div 
    style={isNftPropertiesExist ? {}: {width: "465px"}}
    className="nft-collection-submenu-container">
      <div
        onClick={handleClickSubMenuButton}
        className={
          isSubMenuClicked[0]
            ? "nft-collection-submenu-button-clicked"
            : "nft-collection-submenu-button"
        }
      >
        Vu d'ensemble
      </div>
      {isNftPropertiesExist ? <>
        <div
        onClick={handleClickSubMenuButton}
        className={
          isSubMenuClicked[1]
            ? "nft-collection-submenu-button-clicked"
            : "nft-collection-submenu-button"
        }
      >
        Properties
      </div>
      </>: 
      
      <></>}
      
      <div
        onClick={handleClickSubMenuButton}
        className={
          isSubMenuClicked[2]
            ? "nft-collection-submenu-button-clicked"
            : "nft-collection-submenu-button"
        }
      >
        Offres
      </div>
      <div
        onClick={handleClickSubMenuButton}
        className={
          isSubMenuClicked[3]
            ? "nft-collection-submenu-button-clicked"
            : "nft-collection-submenu-button"
        }
      >
        Activité
      </div>
    </div>
  );
}

export default NftCollectionSubMenu;
