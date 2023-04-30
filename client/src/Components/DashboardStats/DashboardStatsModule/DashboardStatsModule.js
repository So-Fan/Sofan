import React, {useState, useEffect } from "react";
import "./DashboardStatsModule.css";
function DashboardStatsModule({
  nftsSoldThisMonth,
  nftsSoldPercent,
  totalNftSold,
  arrowDisplay,
  toggleColor,
  displayPlus,
  //
  moduleRevenueEth,
  revenueEthLastMonth,
  revenueEurLastMonth,
  revenueEth,
  totaRevenueEth,
  revenueEthPercent,
  //
  moduleRevenueEur,
  revenueEur,
  totalRevenueEur,
  revenueEurPercent,
  ethPrice,
  ethPricePriceConverted,
  tooltipText
}) {
  // console.log(ethPricePriceConverted)
    // let calcul = totaRevenueEth * 2;
    // // console.log(calcul)
    // const [priceCalculated, setPriceCalculated]= useState()
    
    // useEffect(() => {
    //   let ethPriceConverted = (ethPrice * totaRevenueEth).toLocaleString('fr-FR', { maximumFractionDigits: 1 });
    //   setPriceCalculated(ethPriceConverted)
    //   // console.log(ethPriceConverted)
    // }, [])
    // console.log(priceCalculated)
  
  return (
    <div className="dashboard-stats-module">
      <div className="dashboard-stats-module-number-and-square">
        <div
          style={
            moduleRevenueEth
              ? { fontSize: "30px" }
              : moduleRevenueEur
              ? { fontSize: "30px" }
              : {}
          }
          className="dashboard-stats-module-number"
        >
          {moduleRevenueEth ? (
            <>{totaRevenueEth} ETH</>
          ) : (
            <>
              {moduleRevenueEur ? (
                <>{ethPricePriceConverted} €</>
              ) : (
                <>{totalNftSold}</>
              )}
            </>
          )}
        </div>
        <div className="dashboard-stats-module-square"></div>
      </div>
      <div className="dashboard-stats-module-title-and-logo">
        <div className="dashboard-stats-module-title">
          {moduleRevenueEth ? (
            <>CA réalisé</>
          ) : moduleRevenueEur ? (
            <>CA réalisé</>
          ) : (
            <>NFTs vendus</>
          )}
        </div>
        <div title={tooltipText} className="dashboard-stats-module-logo">
          <p>?</p>
        </div>
      </div>
      <div className="dashboard-stats-module-progress-container">
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
      </div>
    </div>
  );
}

export default DashboardStatsModule;
