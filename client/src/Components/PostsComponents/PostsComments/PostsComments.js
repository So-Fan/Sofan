import React, { useState } from "react";
import "./PostsComments.css";
import profilePicFan from "../../../Assets/Image/profilepicmbappecomments.svg";
import LikeButton from "../LikeButton/LikeButton";
import DropDownButtonMenu from "../DropDownButtonMenu/DropDownButtonMenu";
import dropDownImage from "../../../Assets/Image/dropdown.svg";
import DropDownMenu from "../DropDownMenu/DropDownMenu";
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
}) {
  // Si l'athlete ou un admin ou le proprietaire du compte est connecté il peut voir le menu dropdown
  const [isAdminLogged, setIsAdminLogged] = useState();
  const [isAthleteLogged, setIsAthleteLogged] = useState();
  const [isCommentsOwnerLogged, setisCommentsOwnerLogged] = useState(true);
  const [isCommentLiked, setIsCommentLiked] = useState(false);
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

  return (
    <>
      <div className="posts-comments-component-container">
        <div className="posts-comments-component-profile-pic-container">
          <img src={profilePicFan} alt="" />
        </div>
        <div className="posts-comments-component-right-container">
          <div className="posts-comments-component-username-and-comments-container">
            <div className="posts-comments-component-username">
              DonOfSomething
            </div>
            <div className="posts-comments-component-comments">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dumm…
            </div>
          </div>
          <div className="posts-comments-component-comments-like-and-timestamp">
            <div className="posts-comments-component-comments-like-counter">
              12 likes
            </div>
            <div className="posts-comments-component-comments-timestamp">
              28min
            </div>
          </div>
        </div>
        <div className="posts-comments-component-comments-like-button-and-dropdown">
          {isAdminLogged || isAthleteLogged || isCommentsOwnerLogged ? (
            <>
              <div
                id="id-posts-comments-component-comments-like-button-and-dropdown"
                onClick={() => handleDropDownMenuClick(commentId)}
                className="posts-comments-component-comments-dropdown"
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
          <div className="posts-comments-component-comments-like-button">
            LIKE
          </div>
        </div>
      </div>
    </>
  );
}

export default PostsComments;
