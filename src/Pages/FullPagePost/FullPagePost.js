import React from "react";
import "./FullPagePost.css";
import HeadOfPost from "../../Components/PostsComponents/HeadOfPost/HeadOfPost";
import LikesCommentsCounter from "../../Components/PostsComponents/LikesCommentsCounter/LikesCommentsCounter";
import PublicationDescription from "../../Components/PostsComponents/PostsDescription/PostsDescription";
import PostsComments from "../../Components/PostsComponents/PostsComments/PostsComments";
import AddCommentInput from "../../Components/PostsComponents/AddCommentInput/AddCommentInput";

function FullPagePost() {
  return (
    <section className="fullpagepost-container">
      <div className="post-container-fullpagepost">
        <div className="media-fullpagepost">IMG</div>
        <div className="desc-likes-comments-container-fullpagepost">
          <div className="bloc-content-fullpagepost">
            <div className="headofpost-container">
              <HeadOfPost dropDownMenuSize="dropdown-button-point-size-M" />
            </div>
            <PublicationDescription />
            <div className="likes-comments-counter-container-fullpagepost">
              <LikesCommentsCounter />
            </div>
            <div className="separation-line-fullpagepost"></div>
            <PostsComments />
            <PostsComments />
            <PostsComments />
            <PostsComments />
            <div className="add-comment-input-container-fullpagepost">
              <AddCommentInput />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FullPagePost;
