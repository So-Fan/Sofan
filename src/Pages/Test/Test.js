import React, { useState } from "react";
import AthleteProfileNFTCollection from "../../Components/AthleteProfileNFTCollection/AthleteProfileNFTCollection";
import ProfileSubMenu from "../../Components/ProfileSubMenu/ProfileSubMenu";
import "./Test.css";
const Test = () => {
  const [isAthleteProfileSubMenuClicked, setIsAthleteProfileSubMenuClicked] =
    useState([false, false, false, false, true, false, false]);
  
  return (
    <>
      <ProfileSubMenu
        isPageAthlete={true}
        isProfileSubMenuButtonClicked={isAthleteProfileSubMenuClicked}
        setIsProfileSubMenuButtonClicked={setIsAthleteProfileSubMenuClicked}
      />
    </>
  );
};

export default Test;
