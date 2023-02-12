import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./PostsFeed.css";
import HeadOfPost from "../HeadOfPost/HeadOfPost";
import PostsDescription from "../PostsDescription/PostsDescription";
import LikesCommentsCounter from "../LikesCommentsCounter/LikesCommentsCounter";
import AddCommentInput from "../AddCommentInput/AddCommentInput";
import FullPagePost from "../../../Pages/FullPagePost/FullPagePost";

function PostsFeed() {
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };
  const callToggleModal = () => {
    toggleModal();
  };

  return (
    <>
      <div className="publication-container">
        <div className="publication-content">
          {displayDropDown()}
          <div className="publication-head-container">
            <HeadOfPost dropDownMenuSize="dropdown-button-point-size-M" />
          </div>
          <PostsDescription
          postFeedDescription="post-feed-description-resize"
          />
          {/* Backend here */}
          <div className="publication-media">MEDIA</div>
          {/* Backend here */}
          <LikesCommentsCounter callToggleModal={callToggleModal} />
          <div className="show-comments-button-publication">
            <Link onClick={toggleModal}>Show 10 comments</Link>
            {modal && (
              <>
                <FullPagePost
                  modal={modal}
                  setModal={setModal}
                  toggleModal={toggleModal}
                />
              </>
            )}
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
