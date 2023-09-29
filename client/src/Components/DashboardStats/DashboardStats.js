import React, { useState, useEffect } from "react";
import "./DashboardStats.css";
import greenArrow from "../../Assets/Image/green-arrow.svg";
import redArrow from "../../Assets/Image/red-arrow.svg";
import DashboardStatsModule from "./DashboardStatsModule/DashboardStatsModule";

function DashboardStats({ data }) {
  // const [toggleColor, setToggleColor] = useState("");
  // const [arrowDisplay, setArrowDisplay] = useState();

  // const nftsSoldThisMonth = dataApi?.stats[0].nftSold;
  // const nftsSoldPercent = (
  //   ((nftsSoldThisMonth - dataApi?.stats[0].nftSoldLastMonth) /
  //     dataApi?.stats[0].nftSoldLastMonth) *
  //   100
  // ).toFixed(2);
  // // Module Revenue
  // const revenueEthPercent = (
  //   ((dataApi?.stats[1].revenueEth - dataApi?.stats[1].revenueEthLastMonth) /
  //     dataApi?.stats[1].revenueEthLastMonth) *
  //   100
  // ).toFixed(2);
  // const revenueEurPercent = (
  //   ((dataApi?.stats[1].revenueEur - dataApi?.stats[1].revenueEurLastMonth) /
  //     dataApi?.stats[1].revenueEurLastMonth) *
  //   100
  // ).toFixed(2);

  // function toggleNegativePositiveStyle() {
  //   if (nftsSoldPercent > 0) {
  //     setToggleColor("#85D87E");
  //     setArrowDisplay(greenArrow);
  //   } else if (nftsSoldPercent < 0) {
  //     setToggleColor("#EE4D4D");
  //     setArrowDisplay(redArrow);
  //   }
  // }
  // useEffect(() => {
  //   toggleNegativePositiveStyle();
  // }, []);
  // function displayPlus() {
  //   if (toggleColor === "#85D87E") {
  //     return "+";
  //   }
  // }
  // let ethPricePriceConverted = (
  //   dataApi?.stats[1].totaRevenueEth * ethPrice
  // ).toLocaleString("fr-FR", { maximumFractionDigits: 1 });
  // let ethLastMonthEvolutionPriceConverted = (
  //   dataApi?.stats[1].revenueEthLastMonth * ethPrice
  // ).toLocaleString("fr-FR", { maximumFractionDigits: 1 });
  // console.log(ethLastMonthEvolutionPriceConverted)
  return (
    <section className="dashboard-stats-container">
      <div className="dashboard-stats-rectangle">
        <DashboardStatsModule
          totalNftSaled={data?.totalNftSaled}
          tooltipText="Nombre total de NFTs vendus"
        />
        <div className="dashboard-stats-separation-line"></div>
        <DashboardStatsModule
          moduleRevenueEth={true}
          totalEthFormatted={data?.totalEthFormatted}
          tooltipText="CA total réalisé en Ethereum"
        />
        <div className="dashboard-stats-separation-line"></div>
        <DashboardStatsModule
          moduleRevenueEur={true}
          totalUsdcFormatted={data?.totalUsdcFormatted}
          tooltipText="CA Total réalisé en Euros"
        />
        <div className="dashboard-stats-separation-line"></div>
        <div style={{ visibility: "hidden" }}>
          <DashboardStatsModule moduleRevenueEur={true} />
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
