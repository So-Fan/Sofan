import React, {useState} from "react";
import BannerAndProfilePic from "../BannerAndProfilePic/BannerAndProfilePic";
import UserNameAndStats from "./UserNameAndStats/UserNameAndStats";
import UserProfileDescription from "./UserProfileDescription/UserProfileDescription";
import UserActivity from "./UserActivity/UserActivity";
import FormulatedOffers from "./FormulatedOffers/FormulatedOffers";
import "./UserProfileComponents.css"

const UserProfileComponents = () => {
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
  );
};

export default UserProfileComponents;
