import React, { useState, useEffect } from "react";
import meetingsLogo from "../../Assets/Image/meetings-logo.svg";
import liveLogo from "../../Assets/Image/live-logo.svg";
import merchLogo from "../../Assets/Image/merch-logo.svg";
import "./UtilitiesComponent.css";

function UtilitiesComponent({
  utilitiesTitle,
  utilitiesStatus,
  utilitiesDescription,
  utilitiesDate,
  launchpadCollectionLiveUtilities,
}) {
  const [status, setStatus] = useState();
  function displayStatusColor() {
    if (utilitiesStatus === "Disponible") {
      setStatus(true);
    } else if (utilitiesStatus === "Indisponible") {
      setStatus(false);
    }
  }

  //   console.log(utilitiesStatus)
  useEffect(() => {
    const test = () => displayStatusColor();
    test();
  }, []);
  // console.log(status);
  return (
    <div className="nft-collection-overview-utilities-one-container">
      <div className="nft-collection-overview-utilities-one-wrap">
        <div className="nft-collection-overview-utilities-one-header">
          <div className="nft-collection-overview-one-header-logo">
            <img src={meetingsLogo} alt="logo contrepartie rencontre fan" />
          </div>
          <div className="nft-collection-overview-one-header-title">
            {utilitiesTitle}
          </div>
          {launchpadCollectionLiveUtilities ? (
            <></>
          ) : (
            <>
              <div className="nft-collection-overview-one-header-status">
                <div
                  className={
                    status
                      ? "nft-collectin-overview-one-header-status-color-available"
                      : "nft-collectin-overview-one-header-status-color-unavailable"
                  }
                ></div>
                <div className="nft-collection-overview-one-header-status-text">
                  {utilitiesStatus}
                </div>
              </div>
            </>
          )}
        </div>
        <div className="nft-collection-overview-utilities-one-description">
          {utilitiesDescription}
        </div>
        <div className="nft-collection-overview-utilities-one-date">
          Date de l'utilité: {utilitiesDate}
        </div>
      </div>
    </div>
  );
}

export default UtilitiesComponent;
