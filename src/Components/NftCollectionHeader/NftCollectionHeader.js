import React from "react";
import "./NftCollectionHeader.css";
import explorePicture from "../../Assets/Image/explorepicture.svg";
import DropDownButtonMenu from "../PostsComponents/DropDownButtonMenu/DropDownButtonMenu";

function NftCollectionHeader() {
  return (
    <section className="nft-collection-header-container">
      <div className="nft-collection-header-picture">
        <img src={explorePicture} alt="" />
      </div>
      <div className="nft-collection-header-data-and-buy-module-container">
        <div className="nft-collection-header-data-and-buy-module-content">
          <div className="nft-collection-header-collection-name-and-number">
            <div className="nft-collection-header-collection-name-title">
              <p>Explore the world with Alexia Barrier</p>
              <div>
                <span></span>
                <span></span>
                <span></span>
                {/* <button
                  // onClick={handleDropdownPostFeedClick}
                  className="nft-collection-header-dropdown-menu-button-container"
                >
                  <div className="nft-collection-header-dropdown-button-publication">
                    <div className="nft-collection-header-dropdown-button-point"></div>
                    <div className="nft-collection-header-dropdown-button-point"></div>
                    <div className="nft-collection-header-dropdown-button-point"></div>
                  </div>
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NftCollectionHeader;
