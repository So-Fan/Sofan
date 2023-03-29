import React, { useState } from "react";
import "./NftCollectionPageSubMenu.css"
import ProfileSubMenu from "../ProfileSubMenu/ProfileSubMenu";

function NfCollectionPageSubMenu() {
  const [isProfileSubMenuButtonClicked, setIsProfileSubMenuButtonClicked] =
    useState([true, false, false, false]);
  function displayCategory() {
    if (isProfileSubMenuButtonClicked[0] === true) {
      return "test true";
    } else if (isProfileSubMenuButtonClicked === false) {
      return "test false";
    }
  }
  return (
    <section className="nft-collection-page-submenu-container">
      <ProfileSubMenu
        isProfileSubMenuButtonClicked={isProfileSubMenuButtonClicked}
        setIsProfileSubMenuButtonClicked={setIsProfileSubMenuButtonClicked}
        isNftCollectionPage={true}
      />
    </section>
  );
}

export default NfCollectionPageSubMenu;
