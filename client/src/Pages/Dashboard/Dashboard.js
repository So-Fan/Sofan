import React, { useState } from "react";
import DashboardMyCollections from "../../Components/DashboardMyCollections/DashboardMyCollections";
import DashboardStats from "../../Components/DashboardStats/DashboardStats";
import DashboardSubMenu from "../../Components/DashboardSubMenu/DashboardSubMenu";
import DashboardMyCalendar from "../../Components/DashboardMyCalendar/DashboardMyCalendar";
import "./Dashboard.css";
function Dashboard() {
  const [isSubMenuClicked, setIsSubMenuClicked] = useState([
    true,
    false,
    false,
  ]);
  const dataBackend = {
    collections: [
      {
        banner: "https://i.imgur.com/2ybztrG.png",
        profilePicture: "https://i.imgur.com/zH10SHj.png",
        title: "THE VENDEE GLOBE 2022",
        nftNumber: "5405",
        nftPriceEth: "0.01",
      },
      {
        banner: "https://i.imgur.com/2ybztrG.png",
        profilePicture: "https://i.imgur.com/zH10SHj.png",
        title: "THE VENDEE GLOBE 2022",
        nftNumber: "5405",
        nftPriceEth: "0.01",
      },
      {
        banner: "https://i.imgur.com/2ybztrG.png",
        profilePicture: "https://i.imgur.com/zH10SHj.png",
        title: "THE VENDEE GLOBE 2022",
        nftNumber: "5405",
        nftPriceEth: "0.01",
      },
      {
        banner: "https://i.imgur.com/2ybztrG.png",
        profilePicture: "https://i.imgur.com/zH10SHj.png",
        title: "THE VENDEE GLOBE 2022",
        nftNumber: "5405",
        nftPriceEth: "0.01",
      },
      {
        banner: "https://i.imgur.com/2ybztrG.png",
        profilePicture: "https://i.imgur.com/zH10SHj.png",
        title: "THE VENDEE GLOBE 2022",
        nftNumber: "5405",
        nftPriceEth: "0.01",
      },
    ],
    events: [
      {
        background: "https://i.imgur.com/I66BDmh.png",
        title: "VIP MEETING WITH 1200 HOLDERS ",
        location: "Paris, France",
        date: "14 dec. 2022 - 9:00pm",
      },
      {
        background: "https://i.imgur.com/I66BDmh.png",
        title: "VIP MEETING WITH 1200 HOLDERS ",
        location: "Paris, France",
        date: "14 dec. 2022 - 9:00pm",
      },
      {
        background: "https://i.imgur.com/I66BDmh.png",
        title: "VIP MEETING WITH 1200 HOLDERS ",
        location: "Paris, France",
        date: "14 dec. 2022 - 9:00pm",
      },
      {
        background: "https://i.imgur.com/I66BDmh.png",
        title: "VIP MEETING WITH 1200 HOLDERS ",
        location: "Paris, France",
        date: "14 dec. 2022 - 9:00pm",
      },
      {
        background: "https://i.imgur.com/I66BDmh.png",
        title: "VIP MEETING WITH 1200 HOLDERS ",
        location: "Paris, France",
        date: "14 dec. 2022 - 9:00pm",
      },
      {
        background: "https://i.imgur.com/I66BDmh.png",
        title: "VIP MEETING WITH 1200 HOLDERS ",
        location: "Paris, France",
        date: "14 dec. 2022 - 9:00pm",
      },
      {
        background: "https://i.imgur.com/I66BDmh.png",
        title: "VIP MEETING WITH 1200 HOLDERS ",
        location: "Paris, France",
        date: "14 dec. 2022 - 9:00pm",
      },
      {
        background: "https://i.imgur.com/I66BDmh.png",
        title: "VIP MEETING WITH 1200 HOLDERS ",
        location: "Paris, France",
        date: "14 dec. 2022 - 9:00pm",
      },
      {
        background: "https://i.imgur.com/I66BDmh.png",
        title: "VIP MEETING WITH 1200 HOLDERS ",
        location: "Paris, France",
        date: "14 dec. 2022 - 9:00pm",
      },
      {
        background: "https://i.imgur.com/I66BDmh.png",
        title: "VIP MEETING WITH 1200 HOLDERS ",
        location: "Paris, France",
        date: "14 dec. 2022 - 9:00pm",
      },
      {
        background: "https://i.imgur.com/2ybztrG.png",
        title: "VIP MEETING WITH 1200 HOLDERS ",
        location: "Paris, France",
        date: "14 dec. 2022 - 9:00pm",
      },
    ],
  };
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
  return (
    <section className="dashboard-page-container">
      <div className="dashboard-page-wrap">
        <DashboardSubMenu
          setIsSubMenuClicked={setIsSubMenuClicked}
          isSubMenuClicked={isSubMenuClicked}
        />
            {isSubMenuClicked[0] && (
              <>
                <div className="dashboard-page-stats-container">
                  <DashboardStats 
                  dataApi={dataApi}
                  />
                </div>
              </>
            )}
        {isSubMenuClicked[1] && (
          <div className="dashboard-page-my-collections-container">
            <DashboardMyCollections
              dashBoardPageMarginDelete={true}
              dataBackend={dataBackend}
            />
          </div>
        )}
        <div></div>

        {isSubMenuClicked[2] && (
          <>
            <div className="dashboard-page-my-calendar-container">
              <DashboardMyCalendar 
              dashboardPageStyle={true}
              events={dataBackend.events}
              />
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default Dashboard;
