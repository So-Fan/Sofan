import React, { useState } from "react";
import "./UserNameAndStats.css";
function UserNameAndStats() {
  const userNameAndStatsObject = {
    athletesFollowing: 145,
    athletesSupporting: 15,
    nftOwned: 159,
  };
  return (
    <div className="username-and-stats-container">
      <div className="username-container-userpage">Gr3goir3</div>
      <div className="stats-user-container">
        <div className="line-separation-userprofile"></div>
        <div className="following-athlete-container">
          <div className="following-athlete-number">
            {userNameAndStatsObject.athletesFollowing}
          </div>
          <div className="following-athlete-title">
            <div id="athlete-title-userpage">Athletes</div>
            <span>following</span>
          </div>
        </div>
        <div className="line-separation-userprofile"></div>
        <div className="athlete-supporting-container">
          <div className="athlete-supporting-number">
            {userNameAndStatsObject.athletesSupporting}
          </div>
          <div className="athlete-supporting-title">
            <div id="athlete-title-userpage">Athletes</div>
            <span>supporting</span>
          </div>
        </div>
        <div className="line-separation-userprofile"></div>
        <div className="counter-nft-owned-user-container">
          <div className="counter-nft-owned-user-number">
            {userNameAndStatsObject.nftOwned}
          </div>
          <div className="counter-nft-owner-user-title">NFT</div>
        </div>
      </div>
    </div>
  );
}

export default UserNameAndStats;
