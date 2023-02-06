import React from "react";
import "./PostsFeed.css";
import HeadOfPost from "../HeadOfPost/HeadOfPost";
import PublicationDescription from "../PostsDescription/PostsDescription";
import LikesCommentsCounter from "../LikesCommentsCounter/LikesCommentsCounter";
import AddCommentInput from "../AddCommentInput/AddCommentInput";
import AppModal from "../../AppModal/AppModal";

function PostsFeed() {
  // const handleChange = (e) => {};
  return (
    <>
      <div className="publication-container">
        <div className="publication-content">
          <div className="publication-head-container">
            {/* Choose size with: 
              - "dropdown-button-point-size"
            */}
            <HeadOfPost dropDownMenuSize="dropdown-button-point-size-M" />
          </div>
          <PublicationDescription />
          {/* Backend here */}
          <div className="publication-media">MEDIA</div>
          {/* Backend here */}
          <LikesCommentsCounter />
          <div className="show-comments-button-publication">
            Show 10 comments
          </div>
          <div className="line-separation-comments-publication"></div>
          <AddCommentInput />
        </div>
      </div>
        <AppModal/>
    </>
  );
}

export default PostsFeed;