import React, {useState} from "react";
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
function PostsFeed({handleDropdownPostFeedClick, isDropdownClicked, id, setIsPostClicked, isPostClicked}) {

  // const [modal, setModal] = useState(false);

  // const callToggleModal = () => {
  //   toggleModal();
  // };
  // const toggleModal = () => {
  //   setModal(!modal);
  // };

  const [isModdleToggled, setIsModalToggled] = useState(false)

  return (
    <>
    
      <div className="publication-container">
        {/* {modal && (
          <div onClick={toggleModal} className="overlay-postfeed"></div>
        )}
        {modal && (
          <>
            <FullPagePost
              modal={modal}
              setModal={setModal}
              toggleModal={toggleModal}
            />
          </>
        )} */}

        <div className="publication-content">
          {isDropdownClicked && <DropDownMenu />}
          <div className="publication-head-container">
            <HeadOfPost
              dropDownMenuSize="dropdown-button-point-size-M"
              headOfPostSizeLeft="publication-head-left-container-size-pollpost"
              headOfPostSizeRight="publication-head-right-container-pollpost"
              publicationTypeHeadOfPostPollPost="publication-type-pollpost"
              athleteNamePollPost="athlete-name-publication-pollpost"
              agePublicationPollPost="age-publication-pollpost"
              handleDropdownPostFeedClick={handleDropdownPostFeedClick}
              id={id}
            />
          </div>
          <PostsDescription postFeedDescription="post-feed-description-resize" />
          {/* Backend here */}
          <div className="publication-media">
            <img src={attanasioBateau} alt="utilisateur" />
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
            // callToggleModal={callToggleModal}
          />
          <div
            // onClick={toggleModal}
            className="show-comments-button-publication"
          >
            
              <Link onClick={() => setIsPostClicked(true)}>Show 10 comments</Link>
            
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
