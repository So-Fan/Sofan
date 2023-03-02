import React from 'react'
import AthleteProfileEvent from '../../Components/AthleteProfileEvent/AthleteProfileEvent'
import AthleteProfileHeader from '../../Components/AthleteProfileHeader/AthleteProfileHeader'
import AthleteProfileNFTCollection from '../../Components/AthleteProfileNFTCollection/AthleteProfileNFTCollection'
import AthleteProfileRanking from '../../Components/AthleteProfileRanking/AthleteProfileRanking'
import NotificationPopUp from '../../Components/Navbar/NotificationPopUp/NotificationPopUp'
import "./Test.css"
import React, { useState } from "react";
import AthleteProfileNFTCollection from "../../Components/AthleteProfileNFTCollection/AthleteProfileNFTCollection";
import ProfileSubMenu from "../../Components/ProfileSubMenu/ProfileSubMenu";
import "./Test.css";
const Test = () => {
  const [isAthleteProfileSubMenuClicked, setIsAthleteProfileSubMenuClicked] =
    useState([false, false, false, false, true, false, false]);
  
  return (
    <>
      <AthleteProfileEvent />
      <AthleteProfileHeader />
      <AthleteProfileRanking />
      <NotificationPopUp />
      <AthleteProfileRanking />
      <ProfileSubMenu
        isPageAthlete={true}
        isProfileSubMenuButtonClicked={isAthleteProfileSubMenuClicked}
        setIsProfileSubMenuButtonClicked={setIsAthleteProfileSubMenuClicked}
      />
    </>
  );
};

export default Test;
