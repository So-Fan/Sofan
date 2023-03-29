import React, { useState } from "react";
import "./NftCollectionSubMenu.css";
function NftCollectionSubMenu({handleClickSubMenuButton, isSubMenuClicked}) {

  return (
    <div className="nft-collection-submenu-container">
      <div
        onClick={handleClickSubMenuButton}
        className={
          isSubMenuClicked[0]
            ? "nft-collection-submenu-button-clicked"
            : "nft-collection-submenu-button"
        }
      >
        Overview
      </div>
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
      <div
        onClick={handleClickSubMenuButton}
        className={
          isSubMenuClicked[2]
            ? "nft-collection-submenu-button-clicked"
            : "nft-collection-submenu-button"
        }
      >
        Bids
      </div>
      <div
        onClick={handleClickSubMenuButton}
        className={
          isSubMenuClicked[3]
            ? "nft-collection-submenu-button-clicked"
            : "nft-collection-submenu-button"
        }
      >
        Activity
      </div>
    </div>
  );
}

export default NftCollectionSubMenu;
