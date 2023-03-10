import React from "react";
import "./FullPagePost.css";
import HeadOfPost from "../../Components/PostsComponents/HeadOfPost/HeadOfPost";
import LikesCommentsCounter from "../../Components/PostsComponents/LikesCommentsCounter/LikesCommentsCounter";
import PostsDescription from "../../Components/PostsComponents/PostsDescription/PostsDescription";
import PostsComments from "../../Components/PostsComponents/PostsComments/PostsComments";
import AddCommentInput from "../../Components/PostsComponents/AddCommentInput/AddCommentInput";
import mediaPostAttanasio from "../../Assets/Image/mediapostattanasio.svg";
import { Link } from "react-router-dom";

function FullPagePost() {

  return (
    <>
      <div
        className="fullpagepost-container"
      >
        <div className="post-container-fullpagepost">
          <div className="media-fullpagepost">
            <img className="img-fullpagepost" src={mediaPostAttanasio} alt="Post" />
          </div>
          <div className="desc-likes-comments-container-fullpagepost">
            <div className="bloc-content-fullpagepost">
              <div
                className="headofpost-container-fullpagepost"
                id="dropdown-medium"
              >
                <HeadOfPost dropDownMenuSize="dropdown-button-point-size-M" />
              </div>
              <div
                className="headofpost-container-fullpagepost"
                id="dropdown-small"
              >
                <HeadOfPost dropDownMenuSize="dropdown-button-point-size-S" />
              </div>
              <PostsDescription postFeedDescription="post-feed-description-resize-fullpage" />
              <div className="likes-comments-counter-container-fullpagepost">
                <LikesCommentsCounter likeButtonSize={"likeButton-S-size"} />
              </div>
              <div className="separation-line-fullpagepost"></div>
              <div className="comments-container-fullpagepost">
                <PostsComments />
                <PostsComments />
                <div id="responsive-display-toggle-comments-fullpagepost3">
                  <PostsComments />
                </div>
                <div id="responsive-display-toggle-comments-fullpagepost2">
                  <PostsComments />
                </div>
                <div id="responsive-display-toggle-comments-fullpagepost1">
                  <PostsComments />
                </div>
              </div>
              <div className="separation-line-fullpagepost"></div>
              <div className="add-comment-input-container-fullpagepost">
                <AddCommentInput />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FullPagePost;
