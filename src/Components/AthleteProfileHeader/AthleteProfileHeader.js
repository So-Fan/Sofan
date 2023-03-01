import React, { useState, useEffect } from "react";
import "./AthleteProfileHeader.css";
import Checkmark from "../../Assets/Image/checkmark_profile.svg";
import Discord from "../../Assets/Image/discord.svg";
import Twitter from "../../Assets/Image/twitter.svg";
import Instagram from "../../Assets/Image/instagram.svg";
import Button from "../Button/Button";
const AthleteProfileHeader = () => {
  const [dataAthleteProfilePageConcat, setDataAthleteProfilePageConcat] =
    useState(); // data vienne du composant athlete profile

  useEffect(() => {
    const data = {
      user: {
        username: "Romain Attanasio",
        fan: "150",
        followers: "300",
        nftAvailable: "138",
        sport: "Skipper",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris posuere tellus vehicula leo iaculis luctus. Ut vulputate elit risus, eget faucibus justo consectetur in.",
        socials: {
          discord: "https://discord.com",
          twitter: "https://twitter.com",
          instagram: "https://instagram.com",
        },
        banner: "https://i.imgur.com/6ozImSk.png",
        profilePicture: "https://i.imgur.com/StsunkC.png",
      },
    };
    setDataAthleteProfilePageConcat(data);
  }, []);
  return (
    <div className="athleteprofileheader-component">
      <div className="athleteprofileheader-bannerandprofilepicture-wrap">
        <img src={dataAthleteProfilePageConcat?.user.banner} alt="banner" />
        <div className="athleteprofileheader-profilepciture-wrap">
          <img
            src={dataAthleteProfilePageConcat?.user.profilePicture}
            alt="profile"
          />
        </div>
      </div>
      <div className="athleteprofileheader-content-container">
        <div className="athleteprofileheader-content-wrap">
          <span className="athleteprofileheader-content-wrap-sport">
            {dataAthleteProfilePageConcat?.user.sport}
          </span>
          <div className="athleteprofileheader-content-wrap-namestatssocial-wrap">
            <div className="athleteprofileheader-content-wrap-namestatssocial-wrap-namestats">
              <span className="athleteprofileheader-content-wrap-namestatssocial-wrap-namestats-title">
                {dataAthleteProfilePageConcat?.user.username}
                <img src={Checkmark} alt="Checkmark" />
              </span>
              <div className="athleteprofileheader-content-wrap-namestatssocial-wrap-namestats-stats-wrap">
                <div className="athleteprofileheader-content-wrap-namestatssocial-wrap-namestats-stats-wrap-separation"></div>
                <div className="athleteprofileheader-content-wrap-namestatssocial-wrap-namestats-stats-wrap-subwrap">
                  <span>{dataAthleteProfilePageConcat?.user.fan}</span>
                  <span>fans</span>
                </div>
                <div className="athleteprofileheader-content-wrap-namestatssocial-wrap-namestats-stats-wrap-separation"></div>
                <div className="athleteprofileheader-content-wrap-namestatssocial-wrap-namestats-stats-wrap-subwrap">
                  <span>{dataAthleteProfilePageConcat?.user.followers}</span>
                  <span>followers</span>
                </div>
                <div className="athleteprofileheader-content-wrap-namestatssocial-wrap-namestats-stats-wrap-separation"></div>
                <div className="athleteprofileheader-content-wrap-namestatssocial-wrap-namestats-stats-wrap-subwrap-last">
                  <span>{dataAthleteProfilePageConcat?.user.nftAvailable}</span>
                  <span>NFTs disponible</span>
                </div>
              </div>
            </div>
            <div className="athleteprofileheader-content-wrap-namestatssocial-wrap-social-container">
              <div className="athleteprofileheader-content-wrap-namestatssocial-wrap-social-container-social">
                <a
                  href={dataAthleteProfilePageConcat?.user.socials.discord}
                  target="_blank"
                >
                  <img src={Discord} alt="Discord" />
                </a>
                <a
                  href={dataAthleteProfilePageConcat?.user.socials.twitter}
                  target="_blank"
                >
                  <img src={Twitter} alt="Twitter" />
                </a>
                <a
                  href={dataAthleteProfilePageConcat?.user.socials.instagram}
                  target="_blank"
                >
                  <img src={Instagram} alt="Instagram" />
                </a>
              </div>
              <div className="athleteprofileheader-content-wrap-namestatssocial-wrap-social-container-separation"></div>
              <Button
                text={"Palmarès"}
                style={AthleteProfileHeaderPalmaresButton}
              />
            </div>
          </div>
          <div className="athleteprofileheader-content-container-description">
            {dataAthleteProfilePageConcat?.user.description}
          </div>
          <div className="athleteprofileheader-content-container-button-wrap">
            <Button text={"Devenir un fan"} style={AthleteProfileHeaderFanButton} />
            <Button text={"Follow"} style={AthleteProfileHeaderFollowButton} />
          </div>
        </div>
      </div>
    </div>
  );
};

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
