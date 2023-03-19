import React from 'react'
import "./LaunchpadAllLiveLaunchesTemplate.css"
import Button from "../../Button/Button";
const LaunchpadAllLiveLaunchesTemplate = ({background, profilePicture, athleteName, title, nftLength, nftPrice}) => {
   
  return (
    <div className="launchpadalllivelaunchestemplate-component">
      <img src={background} alt="background" />
      <div className="launchpadalllivelaunchestemplate-data-container">
        <div className="launchpadalllivelaunchestemplate-data-container-live-wrap">
            <div></div>
            <span>live</span>
        </div>
        <div className="launchpadalllivelaunchestemplate-data-wrap">
          <div className="launchpadalllivelaunchestemplate-data-wrap-img">
            <img src={profilePicture} alt="profile" />
          </div>
          <span className="launchpadalllivelaunchestemplate-data-wrap-athletename">
            by {athleteName}
          </span>
          <span className="launchpadalllivelaunchestemplate-data-wrap-title">
            {title}
          </span>
          <span className="launchpadalllivelaunchestemplate-data-wrap-nft">
            {nftLength} items - {nftPrice} ETH
          </span>
          <Button text="Discover" style={ButtonStyleLaunchpadAllLiveLaunchesTemplate} />
        </div>
      </div>
    </div>
  )
}

export default LaunchpadAllLiveLaunchesTemplate
const ButtonStyleLaunchpadAllLiveLaunchesTemplate = {
    width: "117px",
    height: "44px",
    background: "#F6D463",
    borderRadius: "5px",
    border: "transparent",
    fontFamily: 'Britanica-Heavy',
    fontSize: "20px",
  };