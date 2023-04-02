import React from "react";
import "./FullPagePost.css";
import HeadOfPost from "../../Components/PostsComponents/HeadOfPost/HeadOfPost";
import LikesCommentsCounter from "../../Components/PostsComponents/LikesCommentsCounter/LikesCommentsCounter";
import PostsDescription from "../../Components/PostsComponents/PostsDescription/PostsDescription";
import PostsComments from "../../Components/PostsComponents/PostsComments/PostsComments";
import AddCommentInput from "../../Components/PostsComponents/AddCommentInput/AddCommentInput";
import mediaPostAttanasio from "../../Assets/Image/mediapostattanasio.svg";
import { Link } from "react-router-dom";

function FullPagePost({ postType }) {
  const image = [
    {
      img: "https://cdn-s-www.ledauphine.com/images/84EBA6B9-E83A-4FAA-8FC7-0768BD511F98/NW_raw/romain-attanasio-au-moment-de-boucler-le-vendee-globe-au-debut-de-l-annee-2017-1585955674.jpg",
    },
  ];

  image[0]?.img && console.log("oui");
  return (
    <>
      <div className="fullpagepost-container">
        <div className="post-container-fullpagepost">
          {image[0]?.img && (
            <>
              <div className="media-fullpagepost">
                <img
                  className="img-fullpagepost"
                  src={image[0]?.img}
                  alt="Post"
                />
              </div>
            </>
          )}
          <div className="desc-likes-comments-container-fullpagepost">
            <div className="bloc-content-fullpagepost">
              <div
                className="headofpost-container-fullpagepost"
                id="dropdown-medium"
              >
                <HeadOfPost
                  dropDownMenuSize="dropdown-button-point-size-M"
                  postType={postType}
                />
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
