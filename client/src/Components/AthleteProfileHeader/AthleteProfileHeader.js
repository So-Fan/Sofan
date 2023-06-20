import React, { useState, useEffect } from "react";
import "./AthleteProfileHeader.css";
import Checkmark from "../../Assets/Image/checkmark_profile.svg";
import Discord from "../../Assets/Image/discord.svg";
import Twitter from "../../Assets/Image/twitter.svg";
import Instagram from "../../Assets/Image/instagram.svg";
import Button from "../Button/Button";
function AthleteProfileHeader({
  userInfo,
  fansCounterApi,
  // setIsAthleteFollowersClicked,
  handleAthleteFollowersClick,
  handleAthleteSupportersClick,
  handleClickNftReceived,
  handleClicNftsAvailable,
  handlePalmaresButtonClick,
}) {
  const [isStoredUser, setIsStoredUser] = useState(false);
  // userInfo.followers = 300000; // fake data
  // Faire afficher le nombre dans un format K
  function convertNumberToDisplayFormat(number) {
    if (number < 1000) {
      return number.toString();
    } else {
      const thousand = Math.floor(number / 1000);
      const hundred = Math.round((number % 1000) / 100);

      if (hundred === 10) {
        return `${thousand + 1}k`;
      } else {
        return `${thousand}${hundred > 0 ? `.${hundred}` : ""}k`;
      }
    }
  }

  const storedUser = localStorage.getItem("loggedInUser");
  useEffect(() => {
    
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      console.log(userInfo);

      setIsStoredUser(parsedUser?.id === userInfo?.id);
    }
  }, [userInfo]);

  return (
    <div className="athleteprofileheader-component">
      <div className="athleteprofileheader-bannerandprofilepicture-wrap">
        <img src={userInfo?.profile_banner} alt="banner" />
        <div className="athleteprofileheader-profilepciture-wrap">
          <img src={userInfo?.profile_avatar} alt="profile" />
        </div>
      </div>
      <div className="athleteprofileheader-content-container">
        <div className="athleteprofileheader-content-wrap">
          <span className="athleteprofileheader-content-wrap-sport">
            {userInfo?.sport}
          </span>
          <div className="athleteprofileheader-content-wrap-namestatssocial-wrap">
            <div className="athleteprofileheader-content-wrap-namestatssocial-wrap-namestats">
              <span className="athleteprofileheader-content-wrap-namestatssocial-wrap-namestats-title">
                {userInfo?.display_name}
                <img src={Checkmark} alt="Checkmark" />
              </span>
              <div className="athleteprofileheader-content-wrap-namestatssocial-wrap-namestats-stats-wrap">
                <div className="athleteprofileheader-content-wrap-namestatssocial-wrap-namestats-stats-wrap-separation"></div>
                <div
                  className="athleteprofileheader-content-wrap-namestatssocial-wrap-namestats-stats-wrap-subwrap"
                  onClick={handleAthleteFollowersClick}
                >
                  <span>
                    {convertNumberToDisplayFormat(userInfo?.followers)}
                  </span>
                  <span>followers</span>
                </div>
                <div className="athleteprofileheader-content-wrap-namestatssocial-wrap-namestats-stats-wrap-separation"></div>
                <div
                  className="athleteprofileheader-content-wrap-namestatssocial-wrap-namestats-stats-wrap-subwrap"
                  onClick={handleAthleteSupportersClick}
                >
                  <span>{convertNumberToDisplayFormat(fansCounterApi)}</span>{" "}
                  {/* Possible de le récupérer depuis le backend également */}
                  <span>fans</span>
                </div>
                <div className="athleteprofileheader-content-wrap-namestatssocial-wrap-namestats-stats-wrap-separation"></div>
                <a
                  href="#athletes-nfts-availables"
                  onClick={handleClicNftsAvailable}
                >
                  <div className="athleteprofileheader-content-wrap-namestatssocial-wrap-namestats-stats-wrap-subwrap-last">
                    <span>{userInfo?.nftAvailable}</span>
                    <span>NFTs disponible</span>
                  </div>
                </a>
              </div>
            </div>
            <div className="athleteprofileheader-content-wrap-namestatssocial-wrap-social-container">
              {/* <div className="athleteprofileheader-content-wrap-namestatssocial-wrap-social-container-social">
                <a href={userInfo?.socials.discord} target="_blank">
                  <img src={Discord} alt="Discord" />
                </a>
                <a href={userInfo?.socials.twitter} target="_blank">
                  <img src={Twitter} alt="Twitter" />
                </a>
                <a href={userInfo?.socials.instagram} target="_blank">
                  <img src={Instagram} alt="Instagram" />
                </a>
              </div> */}
              {/* <div className="athleteprofileheader-content-wrap-namestatssocial-wrap-social-container-separation"></div> */}
              <Button
                onClick={handlePalmaresButtonClick}
                text={"Palmarès"}
                style={AthleteProfileHeaderPalmaresButton}
                hover="button-hover-props"
                active="button-active-props"
              />
            </div>
          </div>
          <div className="athleteprofileheader-content-container-description">
            {userInfo &&
              userInfo.bio &&
              (userInfo.bio.length > 250 ? (
                <textarea value={userInfo.bio} />
              ) : (
                userInfo.bio
              ))}
          </div>
          { !isStoredUser && <div className="athleteprofileheader-content-container-button-wrap">
            <Button
              text={"Devenir un fan"}
              style={AthleteProfileHeaderFanButton}
            />
            <Button
              className="athleteprofileheader-content-container-second-button"
              text={"Follow"}
              style={AthleteProfileHeaderFollowButton}
            />
          </div>}
        </div>
      </div>
    </div>
  );
}

export default AthleteProfileHeader;

const AthleteProfileHeaderPalmaresButton = {
  backgroundColor: "#F6D463",
  border: "1px solid #F6D463",
  width: "105px",
  height: "39px",
  borderRadius: "5px",
  fontFamily: "Britanica-Black",
  fontSize: "16px",
};
const AthleteProfileHeaderFanButton = {
  backgroundColor: "#F6D463",
  border: "1px solid #F6D463",
  width: "135px",
  height: "39px",
  borderRadius: "5px",
  fontFamily: "Britanica-Black",
  fontSize: "16px",
};
const AthleteProfileHeaderFollowButton = {
  backgroundColor: "#FFFFFF",
  border: "1px solid #000000",
  width: "85px",
  height: "39px",
  borderRadius: "5px",
  fontFamily: "Britanica-Black",
  fontSize: "16px",
};
