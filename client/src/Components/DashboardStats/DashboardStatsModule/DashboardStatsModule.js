import React, { useState, useEffect } from "react";
import "./DashboardStatsModule.css";
function DashboardStatsModule({
  moduleRevenueEth,
  moduleRevenueEur,
  totalNftSaled,
  totalEthFormatted,
  totalUsdcFormatted,
  tooltipText,
}) {
  return (
    <div className="dashboard-stats-module">
      <div className="dashboard-stats-module-number-and-square">
        <div
          style={
            moduleRevenueEth
              ? { fontSize: "30px", marginTop: "10px" }
              : moduleRevenueEur
              ? { fontSize: "30px" }
              : {}
          }
          className="dashboard-stats-module-number"
        >
          {moduleRevenueEth ? (
            <>{totalEthFormatted} ETH</>
          ) : (
            <>
              {moduleRevenueEur ? (
                <>{totalUsdcFormatted} €</>
              ) : (
                <>{totalNftSaled}</>
              )}
            </>
          )}
        </div>
        <div className="dashboard-stats-module-square"></div>
      </div>
      <div className="dashboard-stats-module-title-and-logo">
        <div
          style={moduleRevenueEth && { marginTop: "35px" }}
          className="dashboard-stats-module-title"
        >
          {moduleRevenueEth ? (
            <>CA réalisé</>
          ) : moduleRevenueEur ? (
            <>CA réalisé</>
          ) : (
            <>NFTs vendus</>
          )}
        </div>
        <div
          title={tooltipText}
          style={moduleRevenueEth && { marginTop: "35px" }}
          className="dashboard-stats-module-logo"
        >
          <p>?</p>
        </div>
      </div>
      {/* <div className="dashboard-stats-module-progress-container">
        <div className="dashboard-stats-module-progress-arrow-logo">
          <img src={arrowDisplay} alt="FLÊCHE VERTE" />
        </div>
        <div
          style={{ color: toggleColor }}
          className="dashboard-stats-module-progress-number"
        >
          {moduleRevenueEth ? (
            <>{revenueEth}</>
          ) : moduleRevenueEur ? (
            <>{revenueEur}</>
          ) : (
            <>{nftsSoldThisMonth}</>
          )}
        </div>
        <div
          style={{ color: toggleColor }}
          className="dashboard-stats-module-progress-percent"
        >
          {displayPlus()}
          {moduleRevenueEth ? (
            <>{revenueEthPercent}</>
          ) : moduleRevenueEur ? (
            <>{revenueEurPercent}</>
          ) : (
            <>{nftsSoldPercent}</>
          )}
          % ce mois
        </div>
      </div> */}
    </div>
  );
}

export default DashboardStatsModule;
