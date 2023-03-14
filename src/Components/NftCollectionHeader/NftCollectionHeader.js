import React from "react";
import "./NftCollectionHeader.css";
import explorePicture from "../../Assets/Image/explorepicture.svg";
import DropDownButtonMenu from "../PostsComponents/DropDownButtonMenu/DropDownButtonMenu";

function NftCollectionHeader({
  collectionName,
  nftNumber,
  creatorName,
  creatorProfilePic,
  description,
  ownerName,
  ownerProfilePic,
  //
  nftPriceEth,
  nftPriceEur,
  nftBidEth,
  nftBifEur,
  //
  launchpadCollectionLiveHeader,
  //
  minLimit,
  timer,
  counterNftMinted,
  totalNftMintable,
}) {
  const nftMintedCalculated = (counterNftMinted / totalNftMintable) * 100;
  console.log(nftMintedCalculated);
  return (
    <section className="nft-collection-header-container">
      <div className="nft-collection-header-picture">
        {launchpadCollectionLiveHeader && <><button className="launchpad-collection-live-button-container">Explorer la collection</button></>}
        <img src={explorePicture} alt="IMAGE NFT" />
      </div>
      {launchpadCollectionLiveHeader ? (
        <>
          <div className="launchpad-collection-live-header-right-container">
            <div className="launchpad-collection-live-header-right-wrap">
              <div className="launchpad-collection-live-header-right-creator-pic-and-usernamme">
                <div>
                  <img
                    src={creatorProfilePic}
                    alt="Photo de profile Createur"
                  />
                </div>
                <div>by {creatorName}</div>
              </div>
              <div className="launchpad-collection-live-header-right-collection-name">
                {collectionName}
              </div>
              <div className="launchpad-collection-live-header-right-collection-description">
                {description}
              </div>
              <div className="launchpad-collection-live-header-right-line-separation"></div>
              <div className="launchpad-collection-live-header-right-price-container">
                <div className="launchpad-collection-live-header-right-eth-price">
                  {nftPriceEth} ETH
                </div>
                <div className="launchpad-collection-live-header-right-eur-price">
                  {nftPriceEur}€
                </div>
              </div>
              <div className="launchpad-collection-live-header-right-mint-module-container">
                <div className="launchpad-collection-live-header-right-mint-module-timer-and-limit">
                  <div className="launchpad-collection-live-header-right-mint-module-timer">
                    End in {timer}
                  </div>
                  <div className="launchpad-collection-live-header-right-mint-module-limit">
                    Limit {minLimit} per wallet
                  </div>
                </div>
                <div className="launchpad-collection-live-header-right-mint-module-progress-bar-background">
                  <div
                    style={{ width: `${nftMintedCalculated}%` }}
                    className="launchpad-collection-live-header-right-mint-module-progress-bar"
                  ></div>
                </div>
                <div className="launchpad-collection-live-header-right-mint-module-total-minted">
                  <div className="launchpad-collection-live-header-right-mint-module-total-minted-title">
                    Total minted
                  </div>
                  <div className="launchpad-collection-live-header-right-mint-module-total-minted-number">
                    {counterNftMinted} / {totalNftMintable}
                  </div>
                </div>
                <div className="launchpad-collection-live-header-right-mint-module-mint-button-container">
                  <button className="launchpad-collection-live-header-right-mint-module-mint-button">Mint now</button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="nft-collection-header-data-and-buy-module-container">
            <div className="nft-collection-header-data-and-buy-module-content">
              <div className="nft-collection-header-collection-name-and-number">
                <div className="nft-collection-header-collection-name-title">
                  <p>{collectionName}</p>
                  <div className="nft-collection-header-dropdown-button">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
                <div className="nft-collection-header-nft-number">
                  #{nftNumber}
                </div>
              </div>
            </div>
            <div className="nft-collection-header-owner-creator-container">
              <div className="nft-collection-header-owner-creator-wrap">
                <div>
                  <img
                    src={creatorProfilePic}
                    alt="Photo de profile Createur"
                  />
                </div>
                <div className="nft-collection-header-owner-creator-title-and-name-creator">
                  <span className="nft-collection-header-owner-creator-title-creator">
                    Creator
                  </span>
                  <span className="nft-collection-header-owner-creator-name-creator">
                    {creatorName}
                  </span>
                </div>
                <div>
                  <img
                    src={ownerProfilePic}
                    alt="Photo de profile Propriétaire"
                  />
                </div>
                <div className="nft-collection-header-owner-creator-title-and-name-owner">
                  <span className="nft-collection-header-owner-creator-title-owner">
                    Owner
                  </span>
                  <span className="nft-collection-header-owner-creator-name-owner">
                    {ownerName}
                  </span>
                </div>
              </div>
            </div>
            <div className="nft-collection-header-line-separation"></div>
            <div className="nft-collection-header-buy-module-container">
              <div className="nft-collection-header-buy-module-wrap">
                <div className="nft-collection-header-price-and-bid-container">
                  <div className="nft-collection-header-price-container">
                    <div className="nft-collection-header-price-wrap">
                      <span className="nft-collection-header-title-price">
                        Price
                      </span>
                      <span className="nft-collection-header-eth-price">
                        {nftPriceEth} ETH
                      </span>
                      <span className="nft-collection-header-eur-price">
                        {nftPriceEur} €
                      </span>
                    </div>
                  </div>
                  <div className="nft-collection-header-bid-container">
                    <div className="nft-collection-header-bid-wrap">
                      <span className="nft-collection-header-title-bid">
                        Highest bid
                      </span>
                      <span className="nft-collection-header-eth-bid">
                        {nftBidEth} ETH
                      </span>
                      <span className="nft-collection-header-eur-bid">
                        {nftBifEur} €
                      </span>
                    </div>
                  </div>
                </div>
                <div className="nft-collection-header-buttons-container">
                  <div className="nft-collection-header-buy-button">
                    Buy NFT
                  </div>
                  <div className="nft-collection-header-bid-button">
                    Place a bid
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default NftCollectionHeader;
