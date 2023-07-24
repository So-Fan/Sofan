import React, { useState } from "react";
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
  id,
  setIsPostClicked,
  isPostClicked,
  lockPremiumContent,
  postName,
  postDate,
  postDateType,
  postType,
  postDescription,
  postLikeNumber,
  postPicture,
  postCommentNumber,
  //
  pollDateType,
  pollFirstChoice,
  pollSecondChoice,
  pollThirdChoice,
  pollFourthChoice,
  pollDate,
  pollVoteNumbers,
  pollTotalVote,
  pollFirstChoiceNumber,
  pollSecondChoiceNumber,
  pollThirdChoiceNumber,
  pollFourthChoiceNumber,
  athleteProfilePageStyling,
  setPostStates
}) {
  
  function handleClickShowComment(e) {
    e.preventDefault();
    setIsPostClicked(true);
  }
  const [isModdleToggled, setIsModalToggled] = useState(false);
  function displayVote() {
    if (pollTotalVote < 1) {
      return;
    } else if (pollTotalVote > 1) {
      return (
        <PollPost
          pollFirstChoice={pollFirstChoice}
          pollSecondChoice={pollSecondChoice}
          pollThirdChoice={pollThirdChoice}
          pollFourthChoice={pollFourthChoice}
          pollFirstChoiceNumber={pollFirstChoiceNumber}
          pollSecondChoiceNumber={pollSecondChoiceNumber}
          pollThirdChoiceNumber={pollThirdChoiceNumber}
          pollFourthChoiceNumber={pollFourthChoiceNumber}
          pollDate={pollDate}
          pollDateType={pollDateType}
          pollTotalVote={pollTotalVote}
        />
      );
    }
  }
  postCommentNumber = 1
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
          {isDropdownClicked && <DropDownMenu />}
          <div className="publication-head-container">
            <HeadOfPost
            setPostStates={setPostStates}
              postName={postName}
              //
              dropDownMenuSize="dropdown-button-point-size-M"
              headOfPostSizeLeft="publication-head-left-container-size-pollpost"
              headOfPostSizeRight="publication-head-right-container-pollpost"
              publicationTypeHeadOfPostPollPost="publication-type-pollpost"
              athleteNamePollPost="athlete-name-publication-pollpost"
              agePublicationPollPost="age-publication-pollpost"
              handleDropdownPostFeedClick={handleDropdownPostFeedClick}
              id={id}
              //
              postDate={postDate}
              postDateType={postDateType}
              postType={postType}
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
            postLikeNumber={postLikeNumber}
            postCommentNumber={postCommentNumber}
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
          />
        </div>
      </div>
    </>
  );
}

export default PostsFeed;
