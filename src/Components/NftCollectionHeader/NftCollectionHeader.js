import React from "react";
import "./NftCollectionHeader.css";
import explorePicture from "../../Assets/Image/explorepicture.svg";
import DropDownButtonMenu from "../PostsComponents/DropDownButtonMenu/DropDownButtonMenu";

function NftCollectionHeader() {
  const dataBackendNftCollection = [
    {
      collectioName: "Explore the world with Alexia Barrier",
      nftNumber: "#390",
      creatorProfilePic:
        "https://www.vendeeglobe.org/medias/05/06/50614/alexia-barrier-c-462-560.jpg",
      creatorName: "Alexia Barrier",
      ownerName: "DonOfSomething",
      ownerProfilePic:
        "https://storage.googleapis.com/nftimagebucket/tokens/0x8a90cab2b38dba80c64b7734e58ee1db38b8992e/preview/8970.png",
    },
  ];
  return (
    <section className="nft-collection-header-container">
      <div className="nft-collection-header-picture">
        <img src={explorePicture} alt="" />
      </div>
      <div className="nft-collection-header-data-and-buy-module-container">
        <div className="nft-collection-header-data-and-buy-module-content">
          <div className="nft-collection-header-collection-name-and-number">
            <div className="nft-collection-header-collection-name-title">
              <p>{dataBackendNftCollection[0].collectioName}</p>
              <div className="nft-collection-header-dropdown-button">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
            <div className="nft-collection-header-nft-number">
              {dataBackendNftCollection[0].nftNumber}
            </div>
          </div>
        </div>
        <div className="nft-collection-header-owner-creator-container">
          <div className="nft-collection-header-owner-creator-wrap">
            <div>
              <img
                src={dataBackendNftCollection[0].creatorProfilePic}
                alt="Photo de profile Createur"
              />
            </div>
            <div className="nft-collection-header-owner-creator-title-and-name-creator">
              <span className="nft-collection-header-owner-creator-title-creator">
                Creator
              </span>
              <span className="nft-collection-header-owner-creator-name-creator">
                {dataBackendNftCollection[0].creatorName}
              </span>
            </div>
            <div>
              <img
                src={dataBackendNftCollection[0].ownerProfilePic}
                alt="Photo de profile Propriétaire"
              />
            </div>
            <div className="nft-collection-header-owner-creator-title-and-name-owner">
              <span className="nft-collection-header-owner-creator-title-owner">
                Owner
              </span>
              <span className="nft-collection-header-owner-creator-name-owner">
                {dataBackendNftCollection[0].ownerName}
              </span>
            </div>
          </div>
        </div>
        <div className="nft-collection-header-line-separation"></div>
        <div className="nft-collection-header-buy-module-container">
          <div className="nft-collection-header-buy-module-wrap">
            <div className="nft-collection-header-price-and-bid-container">
              <div className="nft-collection-header-price">

              </div>
              <div className="nft-collection-header-bid">

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NftCollectionHeader;
