import React, { useState, useEffect, memo } from "react";
import "./AthleteProfileHeader.css";
import settingsLogo from "../../Assets/Image/settings-logo.svg";
import Checkmark from "../../Assets/Image/checkmark_profile.svg";
import Discord from "../../Assets/Image/discord.svg";
import Twitter from "../../Assets/Image/twitter.svg";
import Instagram from "../../Assets/Image/instagram.svg";
import Button from "../Button/Button";
import { useParams } from "react-router-dom";
import useUserCollection from "../../contexts/UserContext/useUserCollection";
import Modal from "../Modal/Modal";
import PopUpEditProfile from "../PopUpEditProfile/PopUpEditProfile";
import AthleteFollowersFansPopUp from "../TemplatePopUp/AthleteFollowersFansPopUp/AthleteFollowersFansPopUp";
import AthleteProfileRanking from "../AthleteProfileRanking/AthleteProfileRanking";
import { db } from "../../Configs/firebase";
import {
  getDoc,
  doc,
  collection,
  updateDoc,
  setDoc,
  onSnapshot,
} from "firebase/firestore";

const MemoPopUpEditProfile = memo(PopUpEditProfile, (prevProps, nextProps) => {
  if (prevProps.allUserInfo === nextProps.allUserInfo) {
    return true;
  }
  return false;
});

function AthleteProfileHeader({
  userInfo,
  fansCounterApi,
  handleClicNftsAvailable,
  setIsProfileSubMenuButtonClicked,
  palmaresData,
  availableNftCount,
}) {
  const [isStoredUser, setIsStoredUser] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [totalFollowers, setTotalFollowers] = useState(0);

  const { id } = useParams();
  const { loggedInUser } = useUserCollection();
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

  const handleFollowClick = async (e) => {
    e.preventDefault();

    if (!loggedInUser) {
      console.log("Please log in first");
      return;
    }

    //console.log(loggedInUser.display_name, " Trying to follow/unfollow!");

    try {
      // Reference to the athlete_data document for the specific user
      const athleteDataRef = doc(
        db,
        "users",
        userInfo.id,
        "athlete_data",
        userInfo.id
      );

      // Get the current athlete data
      const athleteDataSnap = await getDoc(athleteDataRef);

      // If the athlete_data document doesn't exist, create it first with initial values
      if (!athleteDataSnap.exists()) {
        await setDoc(athleteDataRef, {
          followers: [],
        });
      }

      // Get the current athlete data again to ensure we have the most recent data
      const updatedAthleteDataSnap = await getDoc(athleteDataRef);
      const data = updatedAthleteDataSnap.data();

      if (!data) {
        console.error("Failed to retrieve athlete data after creation!");
        return;
      }

      const followers = data.followers || [];

      // Add or remove the logged-in user's ID from the followers array
      if (followers.includes(loggedInUser.id)) {
        followers.splice(followers.indexOf(loggedInUser.id), 1);
      } else {
        followers.push(loggedInUser.id);
      }

      // Update the followers array in Firestore
      await updateDoc(athleteDataRef, { followers });

      // Optionally update the local state if you are managing followers locally
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!userInfo?.id) return;

    const athleteDataRef = doc(
      db,
      "users",
      userInfo.id,
      "athlete_data",
      userInfo.id
    );

    const unsubscribe = onSnapshot(athleteDataRef, (snapshot) => {
      const data = snapshot.data();
      if (data && data.followers) {
        // Update the following status ONLY if there's a logged-in user
        if (loggedInUser?.id) {
          setIsFollowing(data.followers.includes(loggedInUser.id));
        }
        // Always update the total followers count
        setTotalFollowers(data.followers.length);
      }
    });

    return () => unsubscribe();
  }, [db, userInfo?.id, loggedInUser?.id]);

  const storedUser = localStorage.getItem("loggedInUser");
  useEffect(() => {
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      // console.log(userInfo);

      setIsStoredUser(parsedUser?.id === userInfo?.id);
    }
  }, [userInfo]);
  // console.log(userInfo)
  //console.log(fansCounterApi);

  const [isSettingsAthletePageClicked, setSettingsAthletePageClicked] =
    useState(false);
  const [isAthleteFollowersClicked, setIsAthleteFollowersClicked] =
    useState(false);
  const [isAthleteSupportersClicked, setIsAthleteSupportersClicked] =
    useState(false);
  const [isPalmaresButtonClicked, setIsPalmaresButtonClicked] = useState(false);

  function handleAthleteFollowersClick(e) {
    e.preventDefault();
    setIsAthleteFollowersClicked(true);
  }
  function handleAthleteSupportersClick(e) {
    e.preventDefault();
    setIsAthleteSupportersClicked(true);
  }
  function handlePalmaresButtonClick(e) {
    e.preventDefault();
    setIsPalmaresButtonClicked(true);
  }
  function handleSettingsAthletePageClick() {
    setSettingsAthletePageClicked(true);
  }
  function redirectToNftCollection() {
    setIsProfileSubMenuButtonClicked([
      false,
      false,
      false,
      false,
      false,
      true,
      false,
    ]);
  }
  return (
    <>
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
                    <span>{convertNumberToDisplayFormat(totalFollowers)}</span>
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
                      <span>{availableNftCount}</span>
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
                {id == loggedInUser?.id && (
                  <div
                    onClick={handleSettingsAthletePageClick}
                    className="athleteprofileheader-content-settings-button"
                  >
                    <img src={settingsLogo} alt="" />
                  </div>
                )}
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
            {!isStoredUser && (
              <div className="athleteprofileheader-content-container-button-wrap">
                <Button
                  onClick={redirectToNftCollection}
                  text={"Devenir un fan"}
                  style={AthleteProfileHeaderFanButton}
                />
                <Button
                  className="athleteprofileheader-content-container-second-button"
                  text={isFollowing ? "Ne plus suivre" : "Suivre"}
                  style={AthleteProfileHeaderFollowButton}
                  onClick={(e) => handleFollowClick(e)}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      {isSettingsAthletePageClicked && (
        <Modal
          dynamicPositionPopUpMargin={`${window.scrollY}px`}
          setState={setSettingsAthletePageClicked}
          style={{ right: "5%", top: "18px" }}
        >
          <MemoPopUpEditProfile
            allUserInfo={userInfo} // c'est mathéo qui a set ça à toi de vérifier Saajeed
          />
        </Modal>
      )}
      {/* {isAthleteFollowersClicked && (
        <Modal
          dynamicPositionPopUpMargin={`${-94 + window.scrollY}px`}
          setState={setIsAthleteFollowersClicked}
          style={{
            display: "none",
          }}
        >
          <AthleteFollowersFansPopUp
            isAthleteFollowersClicked={isAthleteFollowersClicked}
          />
        </Modal>
      )}
      {isAthleteSupportersClicked && (
        <Modal
          dynamicPositionPopUpMargin={`${-94 + window.scrollY}px`}
          setState={setIsAthleteSupportersClicked}
          style={{
            display: "none",
          }}
        >
          <AthleteFollowersFansPopUp
            isAthleteSupportersClicked={isAthleteSupportersClicked}
          />
        </Modal>
      )} */}
      {isPalmaresButtonClicked && (
        <Modal
          dynamicPositionPopUpMargin={`${window.scrollY}px`}
          setState={setIsPalmaresButtonClicked}
          style={{ display: "none" }}
        >
          <AthleteProfileRanking
            isPalmaresButtonClicked={isPalmaresButtonClicked}
            palmaresData={palmaresData}
          />
        </Modal>
      )}
    </>
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
