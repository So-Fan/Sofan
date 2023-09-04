import React, { useState, useEffect } from "react";
import "./PostsComments.css";
import "./PostsCommentsNoMediaQueries.css";
import profilePicFan from "../../../Assets/Image/profilepicmbappecomments.svg";
import LikeButton from "../LikeButton/LikeButton";
import DropDownButtonMenu from "../DropDownButtonMenu/DropDownButtonMenu";
import dropDownImage from "../../../Assets/Image/dropdown.svg";
import DropDownMenu from "../DropDownMenu/DropDownMenu";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
function PostsComments({
  likeButtonSizePollPost,
  postId,
  loggedInUserId,
  setIsPostClicked,
  isPostClicked,
  likeButtonSize,
  isDropDownMenuCommentClicked,
  setIsDropDownMenuCommentClicked,
  comments,
  commentId,
  setDropdownStates,
  dropdownStates,
  isMediaQueriesFullPagePostDisabled,
  userId,
  displayName,
  commentText,
  profileAvatar,
  timeStampComment,
  likesCounter,
}) {
  // Si l'athlete ou un admin ou le proprietaire du compte est connecté il peut voir le menu dropdown
  const [isAdminLogged, setIsAdminLogged] = useState();
  const [isAthleteLogged, setIsAthleteLogged] = useState();
  const [isCommentsOwnerLogged, setisCommentsOwnerLogged] = useState(true);
  const [isCommentLiked, setIsCommentLiked] = useState(false);
  const [isLikesPlural, setIsLikePlural] = useState(false);
  const navigate = useNavigate();
  function handleCommentLike() {
    setIsCommentLiked(!isCommentLiked);
  }
  const handleSizeWidth = () => {
    if (likeButtonSize === "likeButton-M-size") {
      return 22;
    } else if (likeButtonSize === "likeButton-S-size") {
      return 15;
    }
  };
  const handleSizeHeight = () => {
    if (likeButtonSize === "likeButton-M-size") {
      return 19;
    } else if (likeButtonSize === "likeButton-S-size") {
      return 13;
    }
  };
  function handleDropDownMenuClick(commentId) {
    setDropdownStates((prevState) => ({
      ...prevState,
      [commentId]: !prevState[commentId],
    }));
    console.log(dropdownStates);
  }
  function redirectToProfileFromComment(e) {
    // mettre une condition si le commentaire viens d'un utilisateur ou d'un athlete il faut changer le path
    navigate(`/userprofile/`);
  }
  timeStampComment = formatDistanceToNow(timeStampComment * 1000, {
    locale: fr,
    addSuffix: true,
  });
  timeStampComment = timeStampComment.replace("environ ", "");
  useEffect(() => {
    if (likesCounter > 1) {
      setIsLikePlural(true);
    } else {
      setIsLikePlural(false);
    }
  }, [likesCounter]);
// console.log(userId);
  return (
    <>
      <div
        className={
          isMediaQueriesFullPagePostDisabled
            ? "posts-comments-component-container-no-media-queries"
            : "posts-comments-component-container"
        }
      >
        <div
          className={
            isMediaQueriesFullPagePostDisabled
              ? "posts-comments-component-profile-pic-container-no-media-queries"
              : "posts-comments-component-profile-pic-container"
          }
          onClick={redirectToProfileFromComment}
        >
          <img src={profileAvatar} alt="AVATAR PROFIL PHOTO" />
        </div>
        <div
          className={
            isMediaQueriesFullPagePostDisabled
              ? "posts-comments-component-right-container-no-media-queries"
              : "posts-comments-component-right-container"
          }
        >
          <div
            className={
              isMediaQueriesFullPagePostDisabled
                ? "posts-comments-component-username-and-comments-container-no-media-queries"
                : "posts-comments-component-username-and-comments-container"
            }
          >
            <div
              className={
                isMediaQueriesFullPagePostDisabled
                  ? "posts-comments-component-username-no-media-queries"
                  : "posts-comments-component-username"
              }
              onClick={redirectToProfileFromComment}
            >
              {displayName}
            </div>
            <div
              className={
                isMediaQueriesFullPagePostDisabled
                  ? "posts-comments-component-comments-no-media-queries"
                  : "posts-comments-component-comments"
              }
            >
              {commentText}
            </div>
          </div>
          <div
            className={
              isMediaQueriesFullPagePostDisabled
                ? "posts-comments-component-comments-like-and-timestamp-no-media-queries"
                : "posts-comments-component-comments-like-and-timestamp"
            }
          >
            <div
              className={
                isMediaQueriesFullPagePostDisabled
                  ? "posts-comments-component-comments-like-counter-no-media-queries"
                  : "posts-comments-component-comments-like-counter"
              }
            >
              {likesCounter} like{isLikesPlural && "s"}
            </div>
            <div
              className={
                isMediaQueriesFullPagePostDisabled
                  ? "posts-comments-component-comments-timestamp-no-media-queries"
                  : "posts-comments-component-comments-timestamp"
              }
            >
              {timeStampComment}
            </div>
          </div>
        </div>
        <div
          className={
            isMediaQueriesFullPagePostDisabled
              ? "posts-comments-component-comments-like-button-and-dropdown-no-media-queries"
              : "posts-comments-component-comments-like-button-and-dropdown"
          }
        >
          {isAdminLogged || isAthleteLogged || isCommentsOwnerLogged ? (
            <>
              <div
                id="id-posts-comments-component-comments-like-button-and-dropdown"
                onClick={() => handleDropDownMenuClick(commentId)}
                className={
                  isMediaQueriesFullPagePostDisabled
                    ? "posts-comments-component-comments-dropdown-no-media-queries"
                    : "posts-comments-component-comments-dropdown"
                }
              >
                <img
                  id="id-posts-comments-component-comments-like-button-and-dropdown"
                  src={dropDownImage}
                  alt="MENU DEROULANT COMMENTAIRE"
                />
                {dropdownStates[commentId] && (
                  <>
                    <DropDownMenu
                      dropdownStates={dropdownStates}
                      commentId={commentId}
                      isDropDownMenuCommentClicked={
                        isDropDownMenuCommentClicked
                      }
                      isAdminLogged={isAdminLogged}
                      isAthleteLogged={isAthleteLogged}
                      isCommentsOwnerLogged={isCommentsOwnerLogged}
                    />
                  </>
                )}
              </div>
            </>
          ) : (
            <></>
          )}
          <div
            className={
              isMediaQueriesFullPagePostDisabled
                ? "posts-comments-component-comments-like-button-no-media-queries"
                : "posts-comments-component-comments-like-button"
            }
          >
            LIKE
          </div>
        </div>
      </div>
    </>
  );
}

export default PostsComments;
