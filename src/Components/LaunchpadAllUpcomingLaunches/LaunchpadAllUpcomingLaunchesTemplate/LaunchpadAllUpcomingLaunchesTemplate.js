import React from 'react'
import "./LaunchpadAllUpcomingLaunchesTemplate.css"
import Button from "../../Button/Button";
const LaunchpadAllUpcomingLaunchesTemplate = ({background, profilePicture, athleteName, title, nftLength, nftPrice, date}) => {
  return (
    <div className="launchpadallupcominglaunchesTemplate-component">
    <img src={background} alt="background" />
    <div className="launchpadallupcominglaunchesTemplate-data-container">
      {/* <div className="launchpadallupcominglaunchesTemplate-data-container-live-wrap">
          <div></div>
          <span>live</span>
      </div> */}
      <div className="launchpadallupcominglaunchesTemplate-data-wrap">
        <div className="launchpadallupcominglaunchesTemplate-data-wrap-img">
          <img src={profilePicture} alt="profile" />
        </div>
        <span className="launchpadallupcominglaunchesTemplate-data-wrap-athletename">
          by {athleteName}
        </span>
        <span className="launchpadallupcominglaunchesTemplate-data-wrap-title">
          {title}
        </span>
        <span className="launchpadallupcominglaunchesTemplate-data-wrap-nft">
          {nftLength} items - {nftPrice} ETH
        </span>
        <div className='launchpadallupcominglaunchesTemplate-data-wrap-hour-wrap'>
            <div>
                <span>{date?.days}</span>
                <span>jours</span>
            </div>
            <div>
                <span>{date?.hours}</span>
                <span>heures</span>
            </div>
            <div>
                <span>{date?.minutes}</span>
                <span>min</span>
            </div>
            <div>
                <span>{date?.seconds}</span>
                <span>sec</span>
            </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default LaunchpadAllUpcomingLaunchesTemplate
