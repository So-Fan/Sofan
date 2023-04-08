import React, { useState, useEffect } from "react";
import DashboardMyCollections from "../../Components/DashboardMyCollections/DashboardMyCollections";
import DashboardStats from "../../Components/DashboardStats/DashboardStats";
import DashboardSubMenu from "../../Components/DashboardSubMenu/DashboardSubMenu";
import DashboardMyCalendar from "../../Components/DashboardMyCalendar/DashboardMyCalendar";
import { Network, Alchemy } from "alchemy-sdk";
import "./Dashboard.css";
function Dashboard() {
  const [isSubMenuClicked, setIsSubMenuClicked] = useState([
    true,
    false,
    false,
  ]);
  const [ethPrice, setEthPrice] = useState();
  const [nftsFromOwner, setNftsFromOwner] = useState([]);
  const settings = {
    apiKey: "34lcNFh-vbBqL9ignec_nN40qLHVOfSo",
    network: Network.ETH_MAINNET,
    maxRetries: 10,
  };
  const alchemy = new Alchemy(settings);
  // get Nfts from Owner and Contracts
  async function getNftsForOwner() {
    // we select all the nfts hold by an address for a specific collection
    const nftsFromOwner = await alchemy.nft.getNftsForOwner(
      "0xf2018871debce291588B4034DBf6b08dfB0EE0DC",
      {
        contractAddresses: [
          "0x34d85c9CDeB23FA97cb08333b511ac86E1C4E258", // Otherdead collection
          "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d", // BAYC collection
        ],
      } // filter
    );
    // const nftsSale = await alchemy.nft.getFloorPrice(
    //   "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d" // BAYC collection
    // );
    setNftsFromOwner(nftsFromOwner?.ownedNfts);
    // console.log(nftsFromOwner)
  }
  // API Coingecko --> Get ETH price
  useEffect(() => {
    getNftsForOwner();
    fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=eur"
    )
      .then((response) => response.json())
      .then((data) => setEthPrice(data.ethereum.eur))
      .catch((error) => console.log(error));
  }, []);
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
  // console.log(ethPrice)

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
              <DashboardStats dataApi={dataApi} ethPrice={ethPrice} />
            </div>
          </>
        )}
        {isSubMenuClicked[1] && (
          <div className="dashboard-page-my-collections-container">
            <DashboardMyCollections
              dashBoardPageMarginDelete={true}
              dataBackend={dataBackend}
              //
              nftsFromOwner={nftsFromOwner}
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
