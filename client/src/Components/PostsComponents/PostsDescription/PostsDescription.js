import React from "react";
import "./PostsDescription.css";
function PostsDescription({
  postFeedDescription,
  postDescription,
  fullPagePostDescriptionStyle,
}) {
  return (
    <>
      {fullPagePostDescriptionStyle ? (
        <div className={`post-feed-description-fullpagepost ${postFeedDescription}`}>
          <p>{postDescription}</p>
        </div>
      ) : (
        <div className={`post-feed-description ${postFeedDescription}`}>
          <p>{postDescription}</p>
        </div>
      )}
    </>
  );
}

export default PostsDescription;
