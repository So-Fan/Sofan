import React, { useState, useEffect, memo } from "react";
import "./PostsFeed.css";
import HeadOfPost from "../HeadOfPost/HeadOfPost";
import PostsDescription from "../PostsDescription/PostsDescription";
import LikesCommentsCounter from "../LikesCommentsCounter/LikesCommentsCounter";
import AddCommentInput from "../AddCommentInput/AddCommentInput";
import DropDownMenu from "../DropDownMenu/DropDownMenu";
import attanasioBateau from "../../../Assets/Image/romain.jpeg";
import FullPagePost from "../../../Pages/FullPagePost/FullPagePost";
import { Link } from "react-router-dom";
import Modal from "../../Modal/Modal";
import PremiumContentLocked from "../../PremiumContentLocked/PremiumContentLocked";
import PollPost from "../PollPost/PollPost";
const MemoHeadOfPost = memo(HeadOfPost, (prevProps, nextProps) => {
  if (prevProps === nextProps) {
    // console.log("les props du post n'ont pas changés");
    return true;
  }
  // console.log("les props du post ont changés");
  return false;
});
const MemoDescription = memo(PostsDescription, (prevProps, nextProps) => {
  if (prevProps === nextProps) {
    // console.log("les props du post n'ont pas changés");
    return true;
  }
  // console.log("les props du post ont changés");
  return false;
});
const MemoLikesCommentsCounter = memo(
  LikesCommentsCounter,
  (prevProps, nextProps) => {
    if (prevProps === nextProps) {
      // console.log("les props du post n'ont pas changés");
      return true;
    }
    // console.log("les props du post ont changés");
    return false;
  }
);
function PostsFeed({
  handleDropdownPostFeedClick,
  isDropdownClicked,
  handleClickCopyPostLink,
  id,
  lockPremiumContent,
  // postName,
  postDate,
  postDateType,
  postType,
  postDescription,
  postLikes,
  postPicture,
  postCommentNumber,
  postCreatorId,
  //
  pollDateType,
  // pollFirstChoice,
  // pollSecondChoice,
  // pollThirdChoice,
  // pollFourthChoice,
  // pollDate,
  // pollVoteNumbers,
  // pollTotalVote,
  pollFirstChoiceNumber,
  pollSecondChoiceNumber,
  pollThirdChoiceNumber,
  pollFourthChoiceNumber,
  athleteProfilePageStyling,
  // setPostStates,
  loggedInUser,
  polldata,
  // singlePostData,
  postFeedHomeStyle,
  userType,
  setCommentCounterIncrementLocal,
  commentCounterIncrementLocal,
  pixelScrolledAthleteProfilePage,
  likesCounterIncrementLocal,
  setLikesCounterIncrementLocal,
}) {
  const [isPostClicked, setIsPostClicked] = useState(false);
  const [isModdleToggled, setIsModalToggled] = useState(false);
  const [commentsLengthPostsFeed, setCommentLengthPostsFeed] = useState();
  // const [commentCounterIncrementLocal, setCommentCounterIncrementLocal] =
  //   useState(0);
  function handleClickShowComment(e) {
    e.preventDefault();
    setIsPostClicked(true);
  }
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
          pollFirstChoiceNumber={pollFirstChoiceNumber}
          pollSecondChoiceNumber={pollSecondChoiceNumber}
          pollThirdChoiceNumber={pollThirdChoiceNumber}
          pollFourthChoiceNumber={pollFourthChoiceNumber}
          // pollDate={pollDate}
          pollDateType={pollDateType}
          postId={id}
          loggedInUser={loggedInUser}
          polldata={polldata}
          // pollTotalVote={pollTotalVote}
        />
      );
    }
  }
  // console.log("id de postfeed --> ",id)
  // console.log(postCommentNumber);
  //console.log(postPicture);
  // useEffect(() => {

  // }, [])

  return (
    <>
      <div
        style={
          athleteProfilePageStyling
            ? { marginBottom: "18px"}
            : { marginTop: "60px"}
        }
        className="publication-container"
      >
        {postCreatorId === loggedInUser?.id ? (
          <></>
        ) : (
          <>
            {lockPremiumContent && (
              <>
                <PremiumContentLocked postCreatorId={postCreatorId} />
              </>
            )}
          </>
        )}
        <div
          className="publication-content"
          style={
            postCreatorId === loggedInUser?.id
              ? {}
              : lockPremiumContent
              ? { filter: "blur(17px)" }
              : {}
          }
        >
          {isDropdownClicked && <DropDownMenu id={id} />}
          {/* <DropDownMenu/> */}
          <div className="publication-head-container">
            <MemoHeadOfPost
              // setPostStates={setPostStates}
              //
              dropDownMenuSize="dropdown-button-point-size-M"
              headOfPostSizeLeft="publication-head-left-container-size-pollpost"
              headOfPostSizeRight="publication-head-right-container-pollpost"
              publicationTypeHeadOfPostPollPost="publication-type-pollpost"
              athleteNamePollPost="athlete-name-publication-pollpost"
              agePublicationPollPost="age-publication-pollpost"
              id={id}
              postCreatorId={postCreatorId}
              //
              postDate={postDate}
              postDateType={postDateType}
              postType={postType}
              //
              handleDropdownPostFeedClick={handleDropdownPostFeedClick}
              handleClickCopyPostLink={handleClickCopyPostLink}
              loggedInUserId={loggedInUser?.id}
              userType={userType}
              lockPremiumContent={lockPremiumContent}
            />
          </div>
          <MemoDescription
            postFeedDescription="post-feed-description-resize"
            postDescription={postDescription}
          />
          {displayVote()}
          {/* Backend here */}
          <div
            className="publication-media"
            onClick={() => setIsPostClicked(true)}
          >
            {/* <img src={attanasioBateau} alt="utilisateur" /> */}
            {postPicture && <img src={postPicture} alt="post media" />}
          </div>
          {/* Backend here */}
          <MemoLikesCommentsCounter
            likesCommentsContainerPublicationPollPost="likes-comments-container-publication-pollpost"
            likeButtonSizePollPost="logo-likes-pollpost"
            likesCounterPublicationPollPost="likes-counter-publication-pollpost"
            commentsCounterPublicationPollPost="comments-counter-publication-pollpost"
            commentPublicationPollPost="comments-publication-pollpost"
            likeButtonContainerPollPost="like-button-container-pollpost"
            logoCommentsPublicationPollPost="logo-comments-publication-pollpost"
            setIsPostClicked={setIsPostClicked}
            postLikes={postLikes}
            postCommentNumber={postCommentNumber}
            postId={id}
            loggedInUserId={loggedInUser?.id}
            commentCounterIncrementLocal={commentCounterIncrementLocal}
            likesCounterIncrementLocal={likesCounterIncrementLocal}
            setLikesCounterIncrementLocal={setLikesCounterIncrementLocal}
          />
          <div className="show-comments-button-publication">
            <Link onClick={(e) => handleClickShowComment(e)}>
              Voir
              {postCommentNumber + commentCounterIncrementLocal > 1
                ? " les"
                : ""}{" "}
              {postCommentNumber + commentCounterIncrementLocal > 1
                ? postCommentNumber +
                  commentCounterIncrementLocal +
                  " commentaires"
                : "commentaire(s)"}
            </Link>
          </div>

          <div className="line-separation-comments-publication-container">
            <div className="line-separation-comments-publication"></div>
          </div>
          <AddCommentInput
            inputAddCommentContainer="input-comment-container-publication-pollpost"
            inputCommentElementsPollPost="input-comment-elements-pollpost"
            emojiCommentPublicationPollPost="emoji-comment-publication-pollpost"
            inputCommentPublicationPollPost="input-comment-publication-pollpost"
            publishButtonAddCommentPollPost="publish-comments-button-container-publication-pollpost"
            postFeedHomeStyle={postFeedHomeStyle}
            loggedInUser={loggedInUser}
            postId={id}
            setCommentCounterIncrementLocal={setCommentCounterIncrementLocal}
            commentCounterIncrementLocal={commentCounterIncrementLocal}
          />
        </div>
      </div>
      {isPostClicked && (
        <Modal
          isPostClicked={isPostClicked}
          setState={setIsPostClicked}
          style={{ top: "-44px", right: "2px" }}
          color="white"
          dynamicPositionPopUpMargin={`${window.scrollY}px`}
        >
          {/* Faire passer les infos du post mais problème de timing avec un rendu d'etat trop rapide*/}
          <FullPagePost
            key={id}
            id={id}
            postType={postType}
            postDate={postDate}
            loggedInUser={loggedInUser}
            // postDateType={postDateType}
            // setPostStates={setPostStates}
            // postName={postName}
            postCreatorId={postCreatorId}
            postPicture={postPicture}
            postDescription={postDescription}
            loggedInUserId={loggedInUser?.id}
            postLikes={postLikes}
            postCommentNumber={postCommentNumber}
            polldata={polldata}
            // pollDate={pollDate}
            // pollDateType={pollDateType}
            // pollTotalVote={pollTotalVote}
            isPostClicked={isPostClicked}
            setIsPostClicked={setIsPostClicked}
            handleDropdownPostFeedClick={handleDropdownPostFeedClick}
            isDropdownClicked={isDropdownClicked}
            handleClickCopyPostLink={handleClickCopyPostLink}
            isFullPagePostModalDisplay={true}
            fullPagePostModalStyle={true}
            setCommentLengthPostsFeed={setCommentLengthPostsFeed}
            userType={userType}
            commentCounterIncrementLocal={commentCounterIncrementLocal}

            // postType={singlePostData.postType === "normal"}
          />
        </Modal>
      )}
    </>
  );
}

export default PostsFeed;
