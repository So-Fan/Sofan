import React, { useState } from "react";
import "./PostsFeed.css";
import HeadOfPost from "../HeadOfPost/HeadOfPost";
import PostsDescription from "../PostsDescription/PostsDescription";
import LikesCommentsCounter from "../LikesCommentsCounter/LikesCommentsCounter";
import AddCommentInput from "../AddCommentInput/AddCommentInput";
import DropDownMenu from "../DropDownMenu/DropDownMenu";
import FullPagePost from "../../../Pages/FullPagePost/FullPagePost";
import { Link } from "react-router-dom";

function PostsFeed() {
  const [modal, setModal] = useState(true);
  const [isDropDownButtonClicked, setIsDropDownButtonClicked] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };
  function displayDropDown() {
    if (isDropDownButtonClicked) {
      return (
        <DropDownMenu setIsDropDownButtonClicked={setIsDropDownButtonClicked} />
      );
    } else {
      return <></>;
    }
  }
  return (
    <>
      <div className="publication-container">
        {modal && (
          <div onClick={toggleModal} className="overlay-postfeed"></div>
        )}
        {modal && (
              <>
                <FullPagePost
                  modal={modal}
                  setModal={setModal}
                  toggleModal={toggleModal}
                />
              </>
            )}

        <div className="publication-content">
          {displayDropDown()}
          <div className="publication-head-container">
            <HeadOfPost
              isDropDownButtonClicked={isDropDownButtonClicked}
              setIsDropDownButtonClicked={setIsDropDownButtonClicked}
              dropDownMenuSize="dropdown-button-point-size-M"
              headOfPostSizeLeft="publication-head-left-container-size-pollpost"
              headOfPostSizeRight="publication-head-right-container-pollpost"
              publicationTypeHeadOfPostPollPost="publication-type-pollpost"
              athleteNamePollPost="athlete-name-publication-pollpost"
              agePublicationPollPost="age-publication-pollpost"
            />
          </div>
          <PostsDescription postFeedDescription="post-feed-description-resize" />
          {/* Backend here */}
          <div className="publication-media">MEDIA</div>
          {/* Backend here */}
          <LikesCommentsCounter
            likesCommentsContainerPublicationPollPost="likes-comments-container-publication-pollpost"
            likeButtonSizePollPost="logo-likes-pollpost"
            likesCounterPublicationPollPost="likes-counter-publication-pollpost"
            commentsCounterPublicationPollPost="comments-counter-publication-pollpost"
            commentPublicationPollPost="comments-publication-pollpost"
            likeButtonContainerPollPost="like-button-container-pollpost"
            logoCommentsPublicationPollPost="logo-comments-publication-pollpost"
          />
          <div onClick={toggleModal} className="show-comments-button-publication">
            <Link>Show 10 comments</Link>
            {/* {modal && (
              <>
                <FullPagePost
                  modal={modal}
                  setModal={setModal}
                  toggleModal={toggleModal}
                />
              </>
            )} */}
          </div>
          <div className="line-separation-comments-publication-container">
            <div className="line-separation-comments-publication"></div>
          </div>
          <AddCommentInput
            inputAddCommentContainer="input-comment-container-publication-pollpost"
            inputCommentElementsPollPost="input-comment-elements-pollpost"
            emojiCommentPublicationPollPost="emoji-comment-publication-pollpost"
            inputCommentPublicationPollPost="input-comment-publication-pollpost"
            publishButtonAddCommentPollPost="publish-comments-button-container-publication-pollpost"
          />
        </div>
      </div>
    </>
  );
}

export default PostsFeed;
