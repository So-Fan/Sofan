import React from 'react'
import "./FeedLaunchpad.css"
import { Link } from 'react-router-dom'
import FeedLaunchpadTemplate from './FeedLaunchpadTemplate/FeedLaunchpadTemplate'
import DataLaunchpad from "./fakedata/dataLaunchpad.json"
import { v4 as uuidv4 } from "uuid";
const FeedLaunchpad = () => {
  return (
    <div className='feedlaunchpad-component'>
      <div className='feedlaunchpad-header-container'>
        <span className='feedlaunchpad-header-title'>Launchpad</span>
        <Link to='/Launchpad' className='feedlaunchpad-header-button'>voir plus</Link>
      </div>
      {DataLaunchpad.launchpads.map((launchpad) => (
        <FeedLaunchpadTemplate key={uuidv4()} title={launchpad.title} athlete={launchpad.athlete} img={launchpad.img} athleteProfilePicture={launchpad.athleteProfilePicture} id={launchpad.id} />
      ))}
    </div>
  )
}

export default FeedLaunchpad
