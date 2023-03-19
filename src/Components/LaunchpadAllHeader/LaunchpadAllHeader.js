import React from "react";
import Button from "../Button/Button";
import "./LaunchpadAllHeader.css";
const LaunchpadAllHeader = () => {
  const data = {
    launchpad: {
      background: "https://i.imgur.com/se736B0.png",
      profilePicture: "https://i.imgur.com/StsunkC.png",
      athlename: "Romain Attanasio",
      title: "Vendée Globe Final Tour",
      description:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout",
      nftNumber: "350",
      nftPrice: "0.31",
    },
  };
  return (
    <div className="launchpadallheader-component">
      <img src={data?.launchpad.background} alt="background" />
      <div className="launchpadallheader-data-container">
        <div className="launchpadallheader-data-wrap">
          <div className="launchpadallheader-data-wrap-img">
            <img src={data?.launchpad.profilePicture} alt="profile" />
          </div>
          <span className="launchpadallheader-data-wrap-athletename">
            by {data?.launchpad.athlename}
          </span>
          <span className="launchpadallheader-data-wrap-title">
            {data?.launchpad.title}
          </span>
          <span className="launchpadallheader-data-wrap-description">
            {data?.launchpad.description}
          </span>
          <span className="launchpadallheader-data-wrap-nft">
            {data?.launchpad.nftNumber} items - {data?.launchpad.nftPrice} ETH
          </span>
          <Button text="Discover" style={ButtonStyleLaunchpadAllHeader} />
        </div>
      </div>
    </div>
  );
};

export default LaunchpadAllHeader;

const ButtonStyleLaunchpadAllHeader = {
  width: "117px",
  height: "44px",
  background: "#F6D463",
  borderRadius: "5px",
  border: "transparent",
  fontFamily: 'Britanica-Heavy',
  fontSize: "20px",
};
