import React, { useState } from "react";
import "./PostsFeed.css";
import HeadOfPost from "../HeadOfPost/HeadOfPost";
import PostsDescription from "../PostsDescription/PostsDescription";
import LikesCommentsCounter from "../LikesCommentsCounter/LikesCommentsCounter";
import AddCommentInput from "../AddCommentInput/AddCommentInput";
import DropDownMenu from "../DropDownMenu/DropDownMenu";
import attanasioBateau from "../../../Assets/Image/romain.jpeg";

function PostsFeed({isDropDownButtonClicked, setIsDropDownButtonClicked}) {
  function displayDropDown() {
    if (isDropDownButtonClicked) {
      return <DropDownMenu setIsDropDownButtonClicked={setIsDropDownButtonClicked} />;
    } else {
      return <></>;
    }
  }
  return (
    <>
      <div className="publication-container">
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
          <PostsDescription
          postFeedDescription="post-feed-description-resize"
          />
          {/* Backend here */}
          <div className="publication-media">
            <img src={attanasioBateau} alt="IMAGE" />
            </div>
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
          <div className="show-comments-button-publication">
            Show 10 comments
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
