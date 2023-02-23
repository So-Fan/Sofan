import React, { useState } from "react";
import BannerAndProfilePic from "../../Components/BannerAndProfilePic/BannerAndProfilePic";
import FormulatedOffers from "../../Components/UserProfileComponents/FormulatedOffers/FormulatedOffers";
import UserActivity from "../../Components/UserProfileComponents/UserActivity/UserActivity";
import UserNameAndStats from "../../Components/UserProfileComponents/UserNameAndStats/UserNameAndStats";
import UserProfileDescription from "../../Components/UserProfileComponents/UserProfileDescription/UserProfileDescription";
import "./UserProfilePage.css";

function UserProfilePage() {
  const [isNftCollectedClicked, setIsNftCollectedClicked] = useState(false);
  const [isActivityClicked, setIsActivityClicked] = useState(false);
  const [isFormulatedOffersClicked, setIsFormulatedOffersClicked] =
    useState(true);
  const stateCategory = [
    isNftCollectedClicked,
    isActivityClicked,
    isFormulatedOffersClicked,
  ];
  function displayCategory() {
    if (stateCategory[0] === true) {
      return "NFT Collectés";
    } else if (stateCategory[1] === true) {
      return <UserActivity />;
    } else if (stateCategory[2] === true) {
      return <FormulatedOffers />;
    }
  }
  return (
    <>
      <section className="userprofilepage-container">
        <div className="userheader-container">
          <BannerAndProfilePic />
          <div className="user-content-activity-nft">
            <div className="username-and-stats-component">
              <UserNameAndStats />
            </div>
            <div className="userprofile-description-component">
              <UserProfileDescription />
            </div>
            {displayCategory()}
          </div>
        </div>
      </section>
    </>
  );
}

export default UserProfilePage;
