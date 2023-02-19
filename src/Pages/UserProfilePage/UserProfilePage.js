import React from "react";
import BannerAndProfilePic from "../../Components/BannerAndProfilePic/BannerAndProfilePic";
import UserNameAndStats from "../../Components/UserNameAndStats/UserNameAndStats";
import UserProfileDescription from "../../Components/UserProfileDescription/UserProfileDescription";
import "./UserProfilePage.css";

function UserProfilePage() {
  return (
    <>
      <section className="userprofilepage-container">
        <div className="userheader-container">
          <BannerAndProfilePic />
          <div className="username-stats-description">
            <UserNameAndStats />
            <UserProfileDescription/>
          </div>
        </div>
      </section>
    </>
  );
}

export default UserProfilePage;
