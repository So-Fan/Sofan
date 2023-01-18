import React from "react";
import "./PostsComments.css";
import profilePicFan from "../../../Assets/Image/profilepicmbappecomments.svg";
function PostsComments() {
  return (
    <div className="posts-comments-container">
      <div className="profilepic-fan-posts-comments">
        <img src={profilePicFan} alt="" />
      </div>
      <div className="fan-username-posts-comments">DonOfSomething</div>
      PostsComments
    </div>
  );
}

export default PostsComments;
