import React from "react";
import "./PostsDescription.css";
import "./PostDescriptionNoMediaQueries.css";
function PostsDescription({
  postFeedDescription,
  postDescription,
  fullPagePostDescriptionStyle,
  isMediaQueriesFullPagePostDisabled,
}) {
  return (
    <>
      {fullPagePostDescriptionStyle ? (
        <div
          className={
            isMediaQueriesFullPagePostDisabled
              ? `post-feed-description-fullpagepost-no-media-queries ${postFeedDescription}-no-media-queries`
              : `post-feed-description-fullpagepost ${postFeedDescription}`
          }
        >
          <p>{postDescription}</p>
        </div>
      ) : (
        <div
          className={
            isMediaQueriesFullPagePostDisabled
              ? `post-feed-description-no-media-queries ${postFeedDescription}-no-media-queries`
              : `post-feed-description ${postFeedDescription}`
          }
        >
          <p>{postDescription}</p>
        </div>
      )}
    </>
  );
}

export default PostsDescription;
