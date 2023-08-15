import React, { useState } from "react";
import "./FullPagePost.css";
import HeadOfPost from "../../Components/PostsComponents/HeadOfPost/HeadOfPost";
import LikesCommentsCounter from "../../Components/PostsComponents/LikesCommentsCounter/LikesCommentsCounter";
import PostsDescription from "../../Components/PostsComponents/PostsDescription/PostsDescription";
import PostsComments from "../../Components/PostsComponents/PostsComments/PostsComments";
import AddCommentInput from "../../Components/PostsComponents/AddCommentInput/AddCommentInput";
import mediaPostAttanasio from "../../Assets/Image/mediapostattanasio.svg";
import { Link } from "react-router-dom";

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
  isPostClicked,
  setIsPostClicked,
}) {
  const image = [
    {
      img: "https://cdn-s-www.ledauphine.com/images/84EBA6B9-E83A-4FAA-8FC7-0768BD511F98/NW_raw/romain-attanasio-au-moment-de-boucler-le-vendee-globe-au-debut-de-l-annee-2017-1585955674.jpg",
    },
  ];
  const [isDropDownMenuCommentClicked, setIsDropDownMenuCommentClicked] =
    useState();
  const [dropdownStates, setDropdownStates] = useState({});

  function handleClickOutsideDropDownMenuComments(e) {
    if (
      e.target.id !==
      "id-posts-comments-component-comments-like-button-and-dropdown"
    ) {
      setDropdownStates({});
    }
  }
  const dataComments = [
    {
      id: 1590395,
      comments:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dumm…",
    },
    {
      id: 2593509509,
      comments:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dumm…",
    },
    {
      id: 353095309,
      comments:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dumm…",
    },
    {
      id: 3539873095309,
      comments:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dumm…",
    },
    {
      id: 4539873098765309,
      comments:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dumm…",
    },
    {
      id: 473098765309,
      comments:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dumm…",
    },
    {
      id: 44093904090,
      comments:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dumm…",
    },
  ];
  // console.log(dataComments[0]?.comments)
  return (
    <>
      <div
        onClick={handleClickOutsideDropDownMenuComments}
        className="fullpagepost-container"
      >
        <div className="post-container-fullpagepost">
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
          <div className="desc-likes-comments-container-fullpagepost">
            <div className="bloc-content-fullpagepost">
              <div
                className="headofpost-container-fullpagepost"
                id="dropdown-medium"
              >
                <HeadOfPost
                  setPostStates={setPostStates}
                  postName={postName}
                  //
                  dropDownMenuSize="dropdown-button-point-size-M"
                  // headOfPostSizeLeft="publication-head-left-container-size-pollpost"
                  // headOfPostSizeRight="publication-head-right-container-pollpost"
                  publicationTypeHeadOfPostPollPost="publication-type-pollpost"
                  athleteNamePollPost="athlete-name-publication-pollpost"
                  agePublicationPollPost="age-publication-pollpost"
                  // handleDropdownPostFeedClick={handleDropdownPostFeedClick}
                  id={id}
                  postCreatorId={postCreatorId}
                  //
                  postDate={postDate}
                  postDateType={postDateType}
                  postType={postType}
                  fullPagePostHeadOfPostStyle={true}
                />
              </div>
              <PostsDescription
                fullPagePostDescriptionStyle={true}
                postDescription={postDescription}
                postFeedDescription="post-feed-description-resize-fullpage"
              />
              <div className="likes-comments-counter-container-fullpagepost">
                <LikesCommentsCounter
                  postId={id}
                  postLikes={postLikes}
                  postCommentNumber={postCommentNumber}
                  loggedInUserId={loggedInUserId}
                  likeButtonSize={"likeButton-S-size"}
                  isPostClicked={isPostClicked}
                  setIsPostClicked={setIsPostClicked}
                  fullPagePostLikesCommentsCounterStyle={true}
                />
              </div>
              <div className="separation-line-fullpagepost"></div>
              <div className="comments-container-fullpagepost">
                {dataComments.map((comments, i) => {
                  return (
                    <>
                      <PostsComments
                        comments={comments.comments}
                        commentId={comments.id}
                        setIsDropDownMenuCommentClicked={
                          setIsDropDownMenuCommentClicked
                        }
                        isDropDownMenuCommentClicked={
                          isDropDownMenuCommentClicked
                        }
                        loggedInUserId={loggedInUserId}
                        dropdownStates={dropdownStates}
                        setDropdownStates={setDropdownStates}
                      />
                    </>
                  );
                })}
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
