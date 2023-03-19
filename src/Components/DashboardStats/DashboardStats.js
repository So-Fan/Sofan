import React, { useState, useEffect } from "react";
import "./DashboardStats.css";
import greenArrow from "../../Assets/Image/green-arrow.svg";
import redArrow from "../../Assets/Image/red-arrow.svg";

function DashboardStats() {
  const [toggleColor, setToggleColor] = useState("");
  const [arrowDisplay, setArrowDisplay] = useState();
  // Repenser le design car beaucoup d'éléments en moins
  // - Nb de NFT restant à vendre au total
  // - Nbr de NFT vendys total et par collection
  // - CA généré au total et par collection
  const dataApi = {
    statsNfts: [
      {
        nftSoldLastMonth: 18,
        nftSold: 19,
        // nftMintable: 40,
      },
    ],
  };
  const nftsSoldThisMonth = dataApi.statsNfts[0].nftSold;
  const nftsSoldPercent = (
    ((nftsSoldThisMonth - dataApi.statsNfts[0].nftSoldLastMonth) /
      dataApi.statsNfts[0].nftSoldLastMonth) *
    100
  ).toFixed(2);
  function toggleNegativePositiveStyle() {
    if (nftsSoldPercent > 0) {
      setToggleColor("#85D87E");
      setArrowDisplay(greenArrow);
    } else if (nftsSoldPercent < 0) {
      setToggleColor("#EE4D4D");
      setArrowDisplay(redArrow);
    }
  }
  useEffect(() => {
    toggleNegativePositiveStyle();
  }, []);
  function displayPlus() {
    if (toggleColor === "#85D87E") {
      return "+";
    }
  }
  return (
    <section className="dashboard-stats-container">
      <div className="dashboard-stats-rectangle">
        <div className="dashboard-stats-nft-left-to-sell">
          <div className="dashboard-stats-nft-left-to-sell-number-and-square">
            <div className="dashboard-stats-nft-left-to-sell-number">12</div>
            <div className="dashboard-stats-nft-left-to-sell-square"></div>
          </div>
          <div className="dashboard-stats-nft-left-to-sell-title-and-logo">
            <div className="dashboard-stats-nft-left-to-sell-title">
              NFTs vendus
            </div>
            <div className="dashboard-stats-nft-left-to-sell-logo">
              <p>?</p>
            </div>
          </div>
          <div className="dashboard-stats-nft-left-to-sell-progress-container">
            <div className="dashboard-stats-nft-left-to-sell-progress-arrow-logo">
              <img src={arrowDisplay} alt="FLÊCHE VERTE" />
            </div>
            <div
              style={{ color: toggleColor }}
              className="dashbpard-stats-nft-left-to-sell-progress-number"
            >
              {nftsSoldThisMonth}
            </div>
            <div
              style={{ color: toggleColor }}
              className="dashbpard-stats-nft-left-to-sell-progress-percent"
            >
              {displayPlus()}
              {nftsSoldPercent}% this month
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DashboardStats;
