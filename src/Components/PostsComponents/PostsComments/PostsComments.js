import React from "react";
import "./PostsComments.css";
import profilePicFan from "../../../Assets/Image/profilepicmbappecomments.svg";
import LikeButton from "../LikeButton/LikeButton";
function PostsComments() {
  return (
    <>
      <>
        <div className="posts-comments-container">
          <div className="all-elements-of-comments">
            <div className="profilepic-fan-posts-comments">
              <img src={profilePicFan} alt="" />
            </div>
            <div className="fan-username-and-comments">
              <div className="fan-username-posts-comments">DonOfSomething</div>
              <div className="fan-comments-posts">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dumm…
              </div>
            </div>
          </div>
          <div className="like-posts-comments">
            <LikeButton />
          </div>
        </div>
      </>
    </>
  );
}

export default PostsComments;
