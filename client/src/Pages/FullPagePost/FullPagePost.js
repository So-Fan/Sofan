import React, { useState, useEffect } from "react";
import "./FullPagePost.css";
import "./FullPagePostNoMediaQueries.css";
import HeadOfPost from "../../Components/PostsComponents/HeadOfPost/HeadOfPost";
import LikesCommentsCounter from "../../Components/PostsComponents/LikesCommentsCounter/LikesCommentsCounter";
import PostsDescription from "../../Components/PostsComponents/PostsDescription/PostsDescription";
import PostsComments from "../../Components/PostsComponents/PostsComments/PostsComments";
import AddCommentInput from "../../Components/PostsComponents/AddCommentInput/AddCommentInput";
import PollPost from "../../Components/PostsComponents/PollPost/PollPost";
import DropDownMenu from "../../Components/PostsComponents/DropDownMenu/DropDownMenu";
import { v4 as uuidv4 } from "uuid";
import { db } from "../../Configs/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

function FullPagePost({
  id,
  postType,
  postDate,
  postPicture,
  setPostStates,
  postName,
  postCreatorId,
  postDateType,
  postDescription,
  loggedInUserId,
  postLikes,
  postCommentNumber,
  polldata,
  pollDate,
  // pollDateType,
  pollTotalVote,
  isPostClicked,
  setIsPostClicked,
  fullPagePostPageStyle,
  handleClickCopyPostLink,
  isDropdownClicked,
  isFullPagePostModalDisplay,
  // handleDropdownPostFeedClick,
  fullPagePostModalStyle,
  loggedInUser,
  setCommentLengthPostsFeed,
}) {
  const [
    isMediaQueriesFullPagePostDisabled,
    setIstMediaQueriesFullPagePostDisabled,
  ] = useState();
  const image = [
    {
      img: "https://cdn-s-www.ledauphine.com/images/84EBA6B9-E83A-4FAA-8FC7-0768BD511F98/NW_raw/romain-attanasio-au-moment-de-boucler-le-vendee-globe-au-debut-de-l-annee-2017-1585955674.jpg",
    },
  ];
  const [isDropDownMenuCommentClicked, setIsDropDownMenuCommentClicked] =
    useState();
  const [dropdownStates, setDropdownStates] = useState({});
  const [comments, setComments] = useState([]);

  function handleClickOutsideDropDownMenuComments(e) {
    if (
      e.target.id !==
      "id-posts-comments-component-comments-like-button-and-dropdown"
    ) {
      setDropdownStates({});
    }
  }

  useEffect(() => {
    const commentsRef = collection(db, `feed_post/${id}/post_comments`);
    const q = query(commentsRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const comments = [];
      querySnapshot.forEach((doc) => {
        const commentData = doc.data();
        commentData.commentId = doc.id;
        comments.push(commentData);
      });
      setComments(comments);
    });

    return () => {
      unsubscribe();
    };
  }, [id]);

  useEffect(() => {
    if (postPicture) {
      setIstMediaQueriesFullPagePostDisabled(false);
      console.log("media querie doit devenir false");
    } else {
      setIstMediaQueriesFullPagePostDisabled(true);
      console.log("media querie doit devenir true");
    }
  }, []);
  function displayVote() {
    if (
      polldata?.choices[0].text === "" &&
      polldata?.choices[1].text === "" &&
      polldata?.choices[2].text === "" &&
      polldata?.choices[3].text === ""
    ) {
      return;
    } else if (
      polldata?.choices[0].text !== "" &&
      polldata?.choices[1].text !== ""
    ) {
      return (
        <PollPost
          pollFirstChoice={polldata?.choices[0].text}
          pollSecondChoice={polldata?.choices[1].text}
          pollThirdChoice={polldata?.choices[2].text}
          pollFourthChoice={polldata?.choices[3].text}
          pollTotalVote={pollTotalVote}
        />
      );
    }
  }
  // console.log("id:", id);
  function handleDropdownPostFeedClick() {
    // console.log("je m'appelle rami");
  }
  setCommentLengthPostsFeed(comments.length);
  function handleClickCopyPostLink(userId, userType) {
    userType === "athlete"
      ? navigator.clipboard.writeText(
          `https://staging.sofan.app/athleteprofile/${userId}`
        )
      : navigator.clipboard.writeText(
          `https://staging.sofan.app/userprofile/${userId}`
        );
  }
  // console.log(comments)
  return (
    <>
      <div
        onClick={handleClickOutsideDropDownMenuComments}
        className={
          isMediaQueriesFullPagePostDisabled
            ? "fullpagepost-container-no-media-queries"
            : "fullpagepost-container"
        }
      >
        <div
          className={
            isMediaQueriesFullPagePostDisabled
              ? "post-container-fullpagepost-no-media-queries"
              : "post-container-fullpagepost"
          }
          style={
            fullPagePostPageStyle
              ? {
                  boxShadow: "0px 0px 12px rgba(0, 0, 0, 0.2)",
                  border: "solid 2px #f6d463",
                  borderRadius: "10px",
                }
              : {}
          }
        >
          {postPicture && (
            <>
              <div className="media-fullpagepost">
                <img
                  className="img-fullpagepost"
                  src={postPicture}
                  alt="Post"
                />
              </div>
            </>
          )}
          <div
            className={
              isMediaQueriesFullPagePostDisabled
                ? "desc-likes-comments-container-fullpagepost-no-media-queries"
                : "desc-likes-comments-container-fullpagepost"
            }
            style={
              polldata?.choices[0].text !== "" &&
              polldata?.choices[1].text !== ""
                ? { paddingBottom: "20px" }
                : {}
            }
          >
            <div
              className={
                isMediaQueriesFullPagePostDisabled
                  ? "bloc-content-fullpagepost-no-media-queries"
                  : "bloc-content-fullpagepost"
              }
            >
              {isDropdownClicked && <DropDownMenu id={id} />}
              <div
                className={
                  isMediaQueriesFullPagePostDisabled
                    ? "headofpost-container-fullpagepost-no-media-queries"
                    : "headofpost-container-fullpagepost"
                }
                id="dropdown-medium"
              >
                <HeadOfPost
                  fullPagePostPageStyle={fullPagePostPageStyle}
                  setPostStates={setPostStates}
                  postName={postName}
                  //
                  dropDownMenuSize="dropdown-button-point-size-M"
                  // headOfPostSizeLeft="publication-head-left-container-size-pollpost"
                  // headOfPostSizeRight="publication-head-right-container-pollpost"
                  publicationTypeHeadOfPostPollPost="publication-type-pollpost"
                  athleteNamePollPost="athlete-name-publication-pollpost"
                  agePublicationPollPost="age-publication-pollpost"
                  handleDropdownPostFeedClick={handleDropdownPostFeedClick}
                  id={id}
                  postCreatorId={postCreatorId}
                  loggedInUserId={loggedInUserId}
                  //
                  postDate={postDate}
                  postDateType={postDateType}
                  postType={postType}
                  fullPagePostHeadOfPostStyle={true}
                  isMediaQueriesFullPagePostDisabled={
                    isMediaQueriesFullPagePostDisabled
                  }
                  handleClickCopyPostLink={handleClickCopyPostLink}
                  isFullPagePostModalDisplay={isFullPagePostModalDisplay}
                  fullPagePostModalStyle={fullPagePostModalStyle}
                />
              </div>
              <PostsDescription
                fullPagePostDescriptionStyle={true}
                postDescription={postDescription}
                postFeedDescription="post-feed-description-resize-fullpage"
                isMediaQueriesFullPagePostDisabled={
                  isMediaQueriesFullPagePostDisabled
                }
              />
              {displayVote()}
              <div
                className={
                  isMediaQueriesFullPagePostDisabled
                    ? "likes-comments-counter-container-fullpagepost-no-media-queries"
                    : "likes-comments-counter-container-fullpagepost"
                }
              >
                <LikesCommentsCounter
                  postId={id}
                  postLikes={postLikes}
                  postCommentNumber={postCommentNumber}
                  loggedInUserId={loggedInUserId}
                  likeButtonSize={"likeButton-S-size"}
                  isPostClicked={isPostClicked}
                  setIsPostClicked={setIsPostClicked}
                  fullPagePostLikesCommentsCounterStyle={true}
                  isMediaQueriesFullPagePostDisabled={
                    isMediaQueriesFullPagePostDisabled
                  }
                  fullPagePostModalStyle={fullPagePostModalStyle}
                  fullPagePostPageStyle={fullPagePostPageStyle}
                />
              </div>
              <div
                className={
                  isMediaQueriesFullPagePostDisabled
                    ? "separation-line-fullpagepost-no-media-queries"
                    : "separation-line-fullpagepost"
                }
              ></div>
              <div
                className={
                  isMediaQueriesFullPagePostDisabled
                    ? "comments-container-fullpagepost-no-media-queries"
                    : "comments-container-fullpagepost"
                }
              >
                {comments.map((comment, i) => {
                  return (
                    <>
                      <PostsComments
                        userId={comment.userId}
                        userType={comment.userType}
                        postCreatorId={postCreatorId}
                        displayName={comment.display_name}
                        commentText={comment.comment}
                        profileAvatar={comment.profile_avatar}
                        // comment={comment.comment}
                        timeStampComment={comment.createdAt.seconds}
                        likesCounter={comment?.likes.length}
                        commentId={comment.commentId}
                        setIsDropDownMenuCommentClicked={
                          setIsDropDownMenuCommentClicked
                        }
                        isDropDownMenuCommentClicked={
                          isDropDownMenuCommentClicked
                        }
                        loggedInUserId={loggedInUserId}
                        dropdownStates={dropdownStates}
                        setDropdownStates={setDropdownStates}
                        isMediaQueriesFullPagePostDisabled={
                          isMediaQueriesFullPagePostDisabled
                        }
                        handleClickCopyPostLink={handleClickCopyPostLink}
                      />
                    </>
                  );
                })}
              </div>
              <div
                className={
                  isMediaQueriesFullPagePostDisabled
                    ? "separation-line-fullpagepost-no-media-queries"
                    : "separation-line-fullpagepost"
                }
              ></div>
              <div
                className={
                  isMediaQueriesFullPagePostDisabled
                    ? "add-comment-input-container-fullpagepost-no-media-queries"
                    : "add-comment-input-container-fullpagepost"
                }
              >
                <AddCommentInput
                  isMediaQueriesFullPagePostDisabled={
                    isMediaQueriesFullPagePostDisabled
                  }
                  postId={id}
                  loggedInUser={loggedInUser}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FullPagePost;
