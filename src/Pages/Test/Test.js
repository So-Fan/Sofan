import React from 'react'
import AthleteProfileEvent from '../../Components/AthleteProfileEvent/AthleteProfileEvent'
import AthleteProfileHeader from '../../Components/AthleteProfileHeader/AthleteProfileHeader'
import AthleteProfileNFTCollection from '../../Components/AthleteProfileNFTCollection/AthleteProfileNFTCollection'
import AthleteProfileRanking from '../../Components/AthleteProfileRanking/AthleteProfileRanking'
import NotificationPopUp from '../../Components/Navbar/NotificationPopUp/NotificationPopUp'
import "./Test.css"
const Test = () => {
  return (
    <>
      <AthleteProfileEvent />
      <AthleteProfileHeader />
      <AthleteProfileRanking />
      <NotificationPopUp />
    </>
  )
}

export default Test
