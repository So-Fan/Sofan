import React, { useState } from "react";
import DashboardMyCollections from "../../Components/DashboardMyCollections/DashboardMyCollections";
import DashboardSubMenu from "../../Components/DashboardSubMenu/DashboardSubMenu";
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
  };
  return (
    <section className="dashboard-page-container">
      <DashboardSubMenu
        setIsSubMenuClicked={setIsSubMenuClicked}
        isSubMenuClicked={isSubMenuClicked}
      />
      {isSubMenuClicked[1] &&
      <DashboardMyCollections
      dashBoardPageMarginDelete={true}
      dataBackend={dataBackend}
      />
    }
    </section>
  );
}

export default Dashboard;
