import React from "react";
import "./NftCollectionOverview.css";
import meetingsLogo from "../../Assets/Image/meetings-logo.svg";
import liveLogo from "../../Assets/Image/live-logo.svg";
import merchLogo from "../../Assets/Image/merch-logo.svg";

function NftCollectionOverview() {
  return (
    <section className="nft-collection-overview-container">
      <div className="nft-collection-overview-utilities-container">
        <div className="nft-collection-overview-utilities-title">Utilities</div>
        <div className="nft-collection-overview-utilities-one">
          <div className="nft-collection-overview-utilities-one-wrap">
            <div className="nft-collection-overview-utilities-one-header">
              <div className="nft-collection-overview-one-header-logo">
                <img src={meetingsLogo} alt="logo contrepartie rencontre fan" />
              </div>
              <div className="nft-collection-overview-one-header-title">
                Meeting with Alexia
              </div>
              <div className="nft-collection-overview-one-header-status">
                <div className="nft-collectin-overview-one-header-status-color"></div>
                <div className="nft-collection-overview-one-header-status-text">
                  Available
                </div>
              </div>
            </div>
            <div className="nft-collection-overview-utilities-one-description">
              At the end of the Vendée Globe 2023, 15/400 of the holders of this
              NFT will have the chance to meet Alexia Barrier personally at the
              finish of the
              coursemaklemlakemazlkmalzkazemlkazemleakazlmekazelmaezkaz
            </div>
            <div className="nft-collection-overview-utilities-one-date">
              Date of the utility : July 9th 2023
            </div>
          </div>
        </div>
        <div className="nft-collection-overview-utilities-two"></div>
        <div className="nft-collection-overview-utilities-three"></div>
      </div>
    </section>
  );
}

export default NftCollectionOverview;
