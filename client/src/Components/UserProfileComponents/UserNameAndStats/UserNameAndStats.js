import React, { useState } from "react";
import "./UserNameAndStats.css";
function UserNameAndStats({userNameAndStatsObject, nftsCollectedCounter}) {

  return (
    <div className="username-and-stats-container">
      <div className="username-container-userpage">{userNameAndStatsObject?.username}</div>
      <div className="stats-user-container">
        <div className="line-separation-userprofile"></div>
        <div className="following-athlete-container">
          <div className="following-athlete-number">
            {userNameAndStatsObject?.followingAthletes}
          </div>
          <div className="following-athlete-title">
            <div id="athlete-title-userpage">Athletes</div>
            <span>following</span>
          </div>
        </div>
        <div className="line-separation-userprofile"></div>
        <div className="athlete-supporting-container">
          <div className="athlete-supporting-number">
            {userNameAndStatsObject?.athleteSupporting}
          </div>
          <div className="athlete-supporting-title">
            <div id="athlete-title-userpage">Athletes</div>
            <span>supporting</span>
          </div>
        </div>
        <div className="line-separation-userprofile"></div>
        <div className="counter-nft-owned-user-container">
          <div className="counter-nft-owned-user-number">
            {nftsCollectedCounter}
          </div>
          <div className="counter-nft-owner-user-title">NFT</div>
        </div>
      </div>
    </div>
  );
}

export default UserNameAndStats;
