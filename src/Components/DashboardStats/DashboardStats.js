import React, { useState, useEffect } from "react";
import "./DashboardStats.css";
import greenArrow from "../../Assets/Image/green-arrow.svg";
import redArrow from "../../Assets/Image/red-arrow.svg";
import DashboardStatsModule from "./DashboardStatsModule/DashboardStatsModule";

function DashboardStats() {
  const [toggleColor, setToggleColor] = useState("");
  const [arrowDisplay, setArrowDisplay] = useState();
  // const [moduleStats, setModuleStats] = useState({
  //   nftSoldsDisplay: false,
  //   revenueDisplay: false,
  // });
  // Repenser le design car beaucoup d'éléments en moins
  // - Nb de NFT restant à vendre au total
  // - Nbr de NFT vendys total et par collection
  // - CA généré au total et par collection
  const dataApi = {
    stats: [
      {
        nftSoldLastMonth: 18,
        nftSold: 19,
        totalNftSold: 40,
      },
      {
        revenueEthLastMonth: 2.29,
        revenueEurLastMonth: 2498.32,
        revenueEth: 3.02,
        totaRevenueEth: 8.59,
        revenueEur: 4542.19,
        totalRevenueEur: 12987.9,
      },
    ],
  };
  // Module NFT Sold
  const nftsSoldThisMonth = dataApi.stats[0].nftSold;
  const nftsSoldPercent = (
    ((nftsSoldThisMonth - dataApi.stats[0].nftSoldLastMonth) /
      dataApi.stats[0].nftSoldLastMonth) *
    100
  ).toFixed(2);
  // Module Revenue
  const revenueEthPercent = (
    ((dataApi.stats[1].revenueEth - dataApi.stats[1].revenueEthLastMonth) /
      dataApi.stats[1].revenueEthLastMonth) *
    100
  ).toFixed(2);
  const revenueEurPercent = (
    ((dataApi.stats[1].revenueEur - dataApi.stats[1].revenueEurLastMonth) /
      dataApi.stats[1].revenueEurLastMonth) *
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
        <DashboardStatsModule
          moduleStats={true}
          nftsSoldThisMonth={nftsSoldThisMonth}
          nftsSoldPercent={nftsSoldPercent}
          totalNftSold={dataApi.stats[0].totalNftSold}
          arrowDisplay={arrowDisplay}
          toggleColor={toggleColor}
          displayPlus={displayPlus}
        />
        <div className="dashboard-stats-separation-line"></div>
        <DashboardStatsModule
          moduleRevenueEth={true}
          revenueEthLastMonth={dataApi.stats[1].revenueEthLastMonth}
          revenueEurLastMonth={dataApi.stats[1].revenueEurLastMonth}
          revenueEth={dataApi.stats[1].revenueEth}
          totaRevenueEth={dataApi.stats[1].totaRevenueEth}
          revenueEur={dataApi.stats[1].revenueEur}
          totalRevenueEur={dataApi.stats[1].totalRevenueEur}
          revenueEthPercent={revenueEthPercent}
          revenueEurPercent={revenueEurPercent}
          //
          arrowDisplay={arrowDisplay}
          toggleColor={toggleColor}
          displayPlus={displayPlus}
        />
        <div className="dashboard-stats-separation-line"></div>
        <DashboardStatsModule
          moduleRevenueEur={true}
          revenueEurLastMonth={dataApi.stats[1].revenueEurLastMonth}
          revenueEur={dataApi.stats[1].revenueEur}
          totalRevenueEur={dataApi.stats[1].totalRevenueEur}
          revenueEurPercent={revenueEurPercent}
          //
          arrowDisplay={arrowDisplay}
          toggleColor={toggleColor}
          displayPlus={displayPlus}
        />
        <div className="dashboard-stats-separation-line"></div>
        <div style={{ visibility: "hidden" }}>
          <DashboardStatsModule
            moduleRevenueEur={true}
            revenueEurLastMonth={dataApi.stats[1].revenueEurLastMonth}
            revenueEur={dataApi.stats[1].revenueEur}
            totalRevenueEur={dataApi.stats[1].totalRevenueEur}
            revenueEurPercent={revenueEurPercent}
            //
            arrowDisplay={arrowDisplay}
            toggleColor={toggleColor}
            displayPlus={displayPlus}
          />
        </div>
      </div>
      <div className="dashboard-stats-middle-container">
        <div className="dashboard-stats-middle-ranking">
          RANKING STATS SOON...
        </div>
        <div className="dashboard-stats-middle-market-cap">
          MARKET CAP CHARTS & STATS SOON...
        </div>
      </div>
      <div className="dashboard-stats-rectangle-bottom">MORE STATS SOON...</div>
    </section>
  );
}

export default DashboardStats;
