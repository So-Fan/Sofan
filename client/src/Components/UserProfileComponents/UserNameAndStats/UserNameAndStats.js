import React, { useState, useEffect } from "react";
import "./UserNameAndStats.css";

function UserNameAndStats({
  userNameAndStatsObject,
  nftsCollectedCounter,
  handleAthleteFollowingClick,
  handleAthleteSupportingClick,
  handleClickNftReceived,
  allUserInfo
}) {
  const [pluralNftCollected, setPluralNftCollected] = useState(false);
  // donne un effet smooth au click d'un #
  // function handleClick(event) {
  //   event.preventDefault();
  //   nftCardRef.current.scrollIntoView({
  //     behavior: "smooth",
  //     block: "start",
  //   });
  // }
  function handlePlural() {
    if (nftsCollectedCounter > 1) {
      setPluralNftCollected(true);
    } else {
      setPluralNftCollected(false);
    };
  }
// afin de faire afficher le pluriel une fois le nombre de nft collectés reçu
  useEffect(() => {
    handlePlural();
  }, [nftsCollectedCounter])
  
  return (
    <div className="username-and-stats-container">
      <div className="username-container-userpage">
        {allUserInfo?.username}
      </div>
      <div className="stats-user-container">
        <div className="line-separation-userprofile"></div>
        <div
          onClick={handleAthleteFollowingClick}
          className="following-athlete-container"
        >
          <div className="following-athlete-number">
            {userNameAndStatsObject?.followingAthletes}
          </div>
          <div className="following-athlete-title">
            <div id="athlete-title-userpage">Athletes</div>
            <span>following</span>
          </div>
        </div>
        <div className="line-separation-userprofile"></div>
        <div
          onClick={handleAthleteSupportingClick}
          className="athlete-supporting-container"
        >
          <div className="athlete-supporting-number">
            {userNameAndStatsObject?.athleteSupporting}
          </div>
          <div className="athlete-supporting-title">
            <div id="athlete-title-userpage">Athletes</div>
            <span>supporting</span>
          </div>
        </div>
        <div className="line-separation-userprofile"></div>

        <a
          className="counter-nft-owned-user-container-link-element"
          onClick={handleClickNftReceived}
          href="#nftcard-component"
        >
          {/* <Link className="counter-nft-owned-user-container-link-element" to="/dashboard"> */}
          <div className="counter-nft-owned-user-container">
            <div className="counter-nft-owned-user-number">
              {nftsCollectedCounter}
            </div>
            <div className="counter-nft-owner-user-title">
            NFT{pluralNftCollected ? <>s</>:<></>}
              
            </div>
          </div>
        </a>
        {/* </Link> */}
      </div>
    </div>
  );
}

export default UserNameAndStats;
