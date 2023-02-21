import React from "react";
import BannerAndProfilePic from "../../Components/BannerAndProfilePic/BannerAndProfilePic";
import UserActivity from "../../Components/UserActivity/UserActivity";
import UserNameAndStats from "../../Components/UserNameAndStats/UserNameAndStats";
import UserProfileDescription from "../../Components/UserProfileDescription/UserProfileDescription";
import "./UserProfilePage.css";

function UserProfilePage() {
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
            <UserActivity />
          </div>
        </div>
      </section>
    </>
  );
}

export default UserProfilePage;
