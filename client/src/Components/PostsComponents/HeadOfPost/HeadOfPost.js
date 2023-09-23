import React, { useState, useEffect, useRef, useCallback } from "react";
import "./HeadOfPost.css";
import "./HeadOfPostNoMediaQueries.css";
import DropDownButtonMenu from "../DropDownButtonMenu/DropDownButtonMenu";
import profilePicAttanasio from "../../../Assets/Image/profilepicattanasio.svg";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../../../Configs/firebase";
import { useNavigate } from "react-router-dom";
import spinnerAnimation from "../../../Assets/Image/spinner-animation-small.svg";
import DropDownMenu from "../DropDownMenu/DropDownMenu";

function HeadOfPost({
  dropDownMenuSize,
  headOfPostSizeLeft,
  headOfPostSizeRight,
  publicationTypeHeadOfPostPollPost,
  agePublicationPollPost,
  athleteNamePollPost,
  // handleDropdownPostFeedClick,
  id,
  postCreatorId,
  //
  postName,
  postDate,
  postDateType,
  postType,
  fullPagePostHeadOfPostStyle,
  isMediaQueriesFullPagePostDisabled,
  handleClickCopyPostLink,
  fullPagePostPageStyle,
  loggedInUserId,
  isFullPagePostModalDisplay,
  fullPagePostModalStyle,
  userType,
}) {
  // const [isPostTypePremium, setIsPostTypePremium] = useState([
  //   postType
  // ]);
  const [postCreatorData, setPostCreatorData] = useState(null);
  const [dropdownStates, setDropdownStates] = useState({});
  const [dropDownStatesFullPagePostModal, setDropDownStatesFullPagePostModal] =
    useState();
  const navigate = useNavigate();
  // const handleDropdownPostFeedClick = (idPost) => {
  //   setDropdownStates((prev) => ({
  //     ...prev,
  //     [id]: !prev[idPost],
  //   }));
  // };
  const handleDropdownPostFeedClick = (id) => {
    // console.log("id:", id);
    if (isFullPagePostModalDisplay) {
      setDropDownStatesFullPagePostModal(!dropDownStatesFullPagePostModal);
    } else {
      setDropDownStatesFullPagePostModal(false);
      setDropdownStates((prev) => ({
        ...prev,
        [id]: !prev[id],
      }));
    }
  };
  useEffect(() => {
    function handleClickOutside(event) {
      const dropdownMenu = document.getElementById(`${id}`);
      const dropdownButton = document.getElementById(`${id}`);
      const dropdownMenuFullPagePost = document.getElementById(`${id}`);
      if (
        dropdownMenu &&
        dropdownButton &&
        !dropdownMenu.contains(event.target) &&
        !dropdownButton.contains(event.target)
      ) {
        setDropdownStates((prev) => ({
          ...prev,
          [id]: false,
        }));
      }
      if (event.target.className !== "dropdown-button-publication") {
        setDropDownStatesFullPagePostModal(false);
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [id, setDropdownStates]);
  const getPostCreatorData = async (uid) => {
    try {
      if (!uid) {
        console.log("UID is undefined or null");
        return null;
      }

      const userDocRef = doc(db, "users", uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        return userDoc.data();
      } else {
        // console.log("No such user!");
        return null;
      }
    } catch (error) {
      console.log("Error getting user data:", error);
    }
  };

  useEffect(() => {
    const fetchCreatorData = async () => {
      const data = await getPostCreatorData(postCreatorId);
      setPostCreatorData(data);
    };

    fetchCreatorData();
  }, [postCreatorId]);
  const redirectToAthleteProfile = useCallback(
    (postCreatorId) => {
      navigate(`/athleteprofile/${postCreatorData.id}`);
    },
    [navigate, postCreatorData]
  );
  postDate = formatDistanceToNow(postDate * 1000, {
    locale: fr,
    addSuffix: true,
  });
  postDate = postDate.replace("environ ", "");
  // console.log("postCreatorId --> ",postCreatorId)
  // console.log("loggedInUserId --> ",loggedInUserId)
  return (
    <div
      className={
        isMediaQueriesFullPagePostDisabled
          ? "publication-head-container-fullpagepost-no-media-queries"
          : fullPagePostHeadOfPostStyle
          ? "publication-head-container-fullpagepost"
          : "publication-head-container"
      }
    >
      <div
        className={
          isMediaQueriesFullPagePostDisabled
            ? `publication-head-left-container-no-media-queries ${headOfPostSizeLeft}-no-media-queries`
            : `publication-head-left-container ${headOfPostSizeLeft}`
        }
        onClick={redirectToAthleteProfile}
      >
        <div
          className={
            isMediaQueriesFullPagePostDisabled
              ? "profilepic-athlete-publication-no-media-queries"
              : "profilepic-athlete-publication"
          }
        >
          <img
            src={
              postCreatorData
                ? postCreatorData.profile_avatar
                : spinnerAnimation
            }
            alt="profil utilisateur"
          />
        </div>
        <div
          className={
            isMediaQueriesFullPagePostDisabled
              ? "profile-side-info-container-no-media-queries"
              : "profile-side-info-container"
          }
        >
          <div
            className={
              isMediaQueriesFullPagePostDisabled
                ? `athlete-name-publication-no-media-queries ${athleteNamePollPost}-no-media-queries`
                : `athlete-name-publication ${athleteNamePollPost}`
            }
          >
            {postCreatorData ? postCreatorData.display_name : "Chargement..."}
          </div>
          <div
            className={
              isMediaQueriesFullPagePostDisabled
                ? `age-publication-no-media-queries ${agePublicationPollPost}-no-media-queries`
                : `age-publication ${agePublicationPollPost}`
            }
          >
            {postDate}
          </div>
        </div>
      </div>
      <div
        className={
          isMediaQueriesFullPagePostDisabled
            ? `publication-head-right-container-no-media-queries ${headOfPostSizeRight}-no-media-queries`
            : `publication-head-right-container ${headOfPostSizeRight}`
        }
      >
        {/* Backend here si contenu PREMIUM ou FREE */}
        <div
          style={!postType ? {} : { visibility: "hidden" }}
          className={`publication-type ${publicationTypeHeadOfPostPollPost}`}
        >
          {postType ? <></> : <>Premium</>}
        </div>
        <DropDownButtonMenu
          handleDropdownPostFeedClick={handleDropdownPostFeedClick}
          dropDownMenuSize={dropDownMenuSize}
          id={id}
          fullPagePostModalStyle={fullPagePostModalStyle}
        />
        {dropdownStates[id] && (
          <>
            <DropDownMenu
              postCreatorId={postCreatorId}
              id={id}
              loggedInUserId={loggedInUserId}
              handleClickCopyPostLink={handleClickCopyPostLink}
              fullPagePostPageStyle={fullPagePostPageStyle}
              dropDownStatesFullPagePostModal={dropDownStatesFullPagePostModal}
              fullPagePostModalStyle={fullPagePostModalStyle} // à voir si ça créer des conflits de css
              userType={userType}
            />
          </>
        )}
        {dropDownStatesFullPagePostModal && (
          <>
            <DropDownMenu
              postCreatorId={postCreatorId}
              id={id}
              loggedInUserId={loggedInUserId}
              handleClickCopyPostLink={handleClickCopyPostLink}
              fullPagePostPageStyle={fullPagePostPageStyle}
              dropDownStatesFullPagePostModal={dropDownStatesFullPagePostModal}
              fullPagePostModalStyle={fullPagePostModalStyle}
              userType={userType}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default HeadOfPost;
