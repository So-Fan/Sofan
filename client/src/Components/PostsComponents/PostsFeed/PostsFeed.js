import React, { useState, useEffect } from "react";
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
  postFeedHomeStyle
}) {
  const [isPostClicked, setIsPostClicked] = useState(false);
  const [isModdleToggled, setIsModalToggled] = useState(false);
  const [commentsLengthPostsFeed, setCommentLengthPostsFeed] = useState();
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
          // pollTotalVote={pollTotalVote}
        />
      );
    }
  }
  console.log("id de postfeed --> ",id)
  // console.log(postCommentNumber);
  return (
    <>
      <div
        style={
          athleteProfilePageStyling
            ? { marginBottom: "18px" }
            : { marginTop: "60px" }
        }
        className="publication-container"
      >
        {lockPremiumContent && (
          <>
            <PremiumContentLocked />
          </>
        )}
        <div
          className="publication-content"
          style={lockPremiumContent ? { filter: "blur(17px)" } : {}}
        >
          {isDropdownClicked && <DropDownMenu id={id} />}
          {/* <DropDownMenu/> */}
          <div className="publication-head-container">
            <HeadOfPost
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
            />
          </div>
          <PostsDescription
            postFeedDescription="post-feed-description-resize"
            postDescription={postDescription}
          />
          {displayVote()}
          {/* Backend here */}
          <div className="publication-media">
            {/* <img src={attanasioBateau} alt="utilisateur" /> */}
            <img src={postPicture} alt="" />
          </div>
          {/* Backend here */}
          <LikesCommentsCounter
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
          />
          <div className="show-comments-button-publication">
            <Link onClick={(e) => handleClickShowComment(e)}>
              Voir{postCommentNumber > 1 ? " les" : ""}{" "}
              {postCommentNumber > 1
                ? postCommentNumber + " commentaires"
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
          />
        </div>
      </div>
      {isPostClicked && (
        <Modal
          isPostClicked={isPostClicked}
          setState={setIsPostClicked}
          style={{ top: "-44px", right: "2px" }}
          color="white"
        >
          {/* Faire passer les infos du post mais problème de timing avec un rendu d'etat trop rapide*/}
          <FullPagePost
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
            // postType={singlePostData.postType === "normal"}
          />
        </Modal>
      )}
    </>
  );
}

export default PostsFeed;
