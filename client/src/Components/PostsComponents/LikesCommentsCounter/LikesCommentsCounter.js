import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LikeButton from "../LikeButton/LikeButton";
import "./LikesCommentsCounter.css";
import "./LikesCommentsCounterNoMediaQueries.css";
function LikesCommentsCounter({
  likesCommentsContainerPublicationPollPost,
  likesCounterPublicationPollPost,
  commentsCounterPublicationPollPost,
  commentPublicationPollPost,
  likeButtonSizePollPost,
  likeButtonContainerPollPost,
  logoCommentsPublicationPollPost,
  postLikeNumber,
  postCommentNumber,
  postId,
  loggedInUserId,
  postLikes,
  setIsPostClicked,
  isPostClicked,
  fullPagePostLikesCommentsCounterStyle,
  isMediaQueriesFullPagePostDisabled,
  fullPagePostModalStyle,
  fullPagePostPageStyle,
  commentCounterIncrementLocal
}) {
  const [pluralLikes, setPluralLikes] = useState();
  useEffect(() => {
    if (postLikes > 1) {
      setPluralLikes(true);
    } else {
      setPluralLikes(false);
    }
  }, []);

  // postLikes + commentCounterIncrementLocal
  return (
    <div
      className={
        isMediaQueriesFullPagePostDisabled
          ? `likes-comments-container-publication-fullpagepost-no-media-queries ${likesCommentsContainerPublicationPollPost}-no-media-queries`
          : fullPagePostLikesCommentsCounterStyle
          ? `likes-comments-container-publication-fullpagepost ${likesCommentsContainerPublicationPollPost}`
          : `likes-comments-container-publication ${likesCommentsContainerPublicationPollPost}`
      }
    >
      <div
        className={
          isMediaQueriesFullPagePostDisabled
            ? `like-button-container-no-media-queries ${likeButtonContainerPollPost}-no-media-queries`
            : `like-button-container ${likeButtonContainerPollPost}`
        }
      >
        <LikeButton
          setIsPostClicked={setIsPostClicked}
          isPostClicked={isPostClicked}
          likeButtonSizePollPost={likeButtonSizePollPost}
          likeButtonSize={"likeButton-M-size"}
          postId={postId}
          loggedInUserId={loggedInUserId}
          isMediaQueriesFullPagePostDisabled={
            isMediaQueriesFullPagePostDisabled
          }
          fullPagePostModalStyle={fullPagePostModalStyle}
          fullPagePostPageStyle={fullPagePostPageStyle}
          // likeButtonContainerPollPost={likeButtonContainerPollPost}
        />
        <div
          className={
            isMediaQueriesFullPagePostDisabled
              ? `likes-counter-publication-no-media-queries ${likesCounterPublicationPollPost}-no-media-queries`
              : `likes-counter-publication ${likesCounterPublicationPollPost}`
          }
        >
          <Link onClick={setIsPostClicked}>
            {postLikes} like{pluralLikes && "s"}
          </Link>
        </div>
      </div>
      <div
        className={
          isMediaQueriesFullPagePostDisabled
            ? `comments-publication-no-media-queries ${commentPublicationPollPost}-no-media-queries`
            : fullPagePostModalStyle || fullPagePostPageStyle
            ? `comments-publication-fullpagepost-modal-and-page ${commentPublicationPollPost}`
            : `comments-publication ${commentPublicationPollPost}`
        }
      >
        <div
          className={
            isMediaQueriesFullPagePostDisabled
              ? `logo-comments-publication-no-media-queries ${logoCommentsPublicationPollPost}-no-media-queries`
              : fullPagePostModalStyle || fullPagePostPageStyle
              ? `logo-comments-publication-fullpagepost-modal-and-page ${logoCommentsPublicationPollPost}`
              : `logo-comments-publication ${logoCommentsPublicationPollPost}`
          }
        >
          <svg
            width="21"
            height="20"
            viewBox="0 0 21 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.94654 18.4088L0.789196 19.5551L1.93549 14.3977C1.18058 12.9857 0.786785 11.4088 0.789196 9.80768C0.789196 4.42421 5.1531 0.0603027 10.5366 0.0603027C15.9201 0.0603027 20.284 4.42421 20.284 9.80768C20.284 15.1912 15.9201 19.5551 10.5366 19.5551C8.93543 19.5575 7.35856 19.1637 5.94654 18.4088ZM6.22921 16.3492L6.86571 16.6903C7.995 17.2938 9.25616 17.6083 10.5366 17.6056C12.0789 17.6056 13.5865 17.1483 14.8689 16.2914C16.1512 15.4346 17.1507 14.2167 17.7409 12.7918C18.3311 11.3669 18.4855 9.79904 18.1847 8.28639C17.8838 6.77374 17.1411 5.38429 16.0505 4.29373C14.96 3.20318 13.5705 2.4605 12.0579 2.15961C10.5452 1.85873 8.97733 2.01315 7.55245 2.60336C6.12757 3.19356 4.9097 4.19304 4.05286 5.4754C3.19601 6.75776 2.73867 8.2654 2.73867 9.80768C2.73867 11.108 3.05546 12.3595 3.65493 13.4785L3.99511 14.1151L3.35666 16.9876L6.22921 16.3492Z"
              fill="black"
            />
          </svg>
        </div>
        {/* Backend here */}
        <div
          className={
            isMediaQueriesFullPagePostDisabled
              ? `comments-counter-publication-no-media-queries ${commentsCounterPublicationPollPost}-no-media-queries`
              : `comments-counter-publication ${commentsCounterPublicationPollPost}`
          }
        >
          <Link onClick={setIsPostClicked}>
            {postCommentNumber + commentCounterIncrementLocal} comments
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LikesCommentsCounter;
