import React from "react";
import BannerAndProfilePic from "../../Components/BannerAndProfilePic/BannerAndProfilePic";
import UserNameAndStats from "../../Components/UserNameAndStats/UserNameAndStats";
import "./UserProfilePage.css";

function UserProfilePage() {
  return (
    <>
      <section className="userprofilepage-container">
        <div className="userheader-container">
          <BannerAndProfilePic />
          <div className="username-stats-description">
            <UserNameAndStats />
            <div className="user-description-container">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
              posuere tellus vehicula leo iaculis luctus. Ut vulputate elit
              risus, eget faucibus justo consectetur in.
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default UserProfilePage;
