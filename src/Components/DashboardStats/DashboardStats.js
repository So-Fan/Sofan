import React from "react";
import "./DashboardStats.css";
function DashboardStats() {
  // Repenser le design car beaucoup d'éléments en moins
  // - Nb de NFT restant à vendre au total
  // - Nbr de NFT vendys total et par collection
  // - CA généré au total et par collection
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
              <span>NFTs restants</span>
            </div>
            <div className="dashboard-stats-nft-left-to-sell-logo">
              <p>?</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DashboardStats;
