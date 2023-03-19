import React, { useState } from "react";
import "./DashboardSubMenu.css";

function DashboardSubMenu() {
  const [isSubMenuClicked, setIsSubMenuClicked] = useState([
    true,
    false,
    false,
  ]);

  function handleClick(index) {
    setIsSubMenuClicked(
      isSubMenuClicked.map((value, i) => (i === index ? true : false))
    );
  }

  return (
    <>
      <div className="dashboard-submenu-container">
        <div>
          <div
            style={isSubMenuClicked[0] ? { backgroundColor: "#f6d463" } : {}}
            onClick={() => handleClick(0)}
            className="dashboard-submenu-stats-button"
          >
            <span>Statistiques</span>
          </div>
          <div
            style={isSubMenuClicked[1] ? { backgroundColor: "#f6d463" } : {}}
            onClick={() => handleClick(1)}
            className="dashboard-submenu-my-collections-button"
          >
            <span>Mes collections</span>
          </div>
          <div
            style={isSubMenuClicked[2] ? { backgroundColor: "#f6d463" } : {}}
            onClick={() => handleClick(2)}
            className="dashboard-submenu-my-calendar-button"
          >
            <span>Mon calendrier</span>
          </div>
        </div>
      <div className="dashboard-submenu-line-separation"></div>
      </div>
    </>
  );
}

export default DashboardSubMenu;
