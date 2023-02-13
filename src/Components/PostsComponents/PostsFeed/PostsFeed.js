import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./PostsFeed.css";
import HeadOfPost from "../HeadOfPost/HeadOfPost";
import PostsDescription from "../PostsDescription/PostsDescription";
import LikesCommentsCounter from "../LikesCommentsCounter/LikesCommentsCounter";
import AddCommentInput from "../AddCommentInput/AddCommentInput";
import FullPagePost from "../../../Pages/FullPagePost/FullPagePost";
import DropDownMenu from "../DropDownMenu/DropDownMenu";

function PostsFeed() {
  const [isDropDownButtonClicked, setIsDropDownButtonClicked] = useState(false);
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };
  const callToggleModal = () => {
    toggleModal();
  };
  function displayDropDown() {
    if (isDropDownButtonClicked) {
      return <DropDownMenu setIsDropDownButtonClicked={setIsDropDownButtonClicked} />;
    } else {
      return <></>;
    }
  }

  return (
    <>
      <div className="publication-container">
        <div className="publication-content">
          {displayDropDown()}
          <div className="publication-head-container">
          <HeadOfPost
              isDropDownButtonClicked={isDropDownButtonClicked}
              setIsDropDownButtonClicked={setIsDropDownButtonClicked}
              dropDownMenuSize="dropdown-button-point-size-M"
              headOfPostSizeLeft="publication-head-left-container-size-pollpost"
              headOfPostSizeRight="publication-head-right-container-pollpost"
              publicationTypeHeadOfPostPollPost="publication-type-pollpost"
              athleteNamePollPost="athlete-name-publication-pollpost"
              agePublicationPollPost="age-publication-pollpost"
            />
          </div>
          <PostsDescription
          postFeedDescription="post-feed-description-resize"
          />
          {/* Backend here */}
          <div className="publication-media">MEDIA</div>
          {/* Backend here */}
          <LikesCommentsCounter callToggleModal={callToggleModal} />
          <div className="show-comments-button-publication">
            <Link onClick={toggleModal}>Show 10 comments</Link>
            {modal && (
              <>
                <FullPagePost
                  modal={modal}
                  setModal={setModal}
                  toggleModal={toggleModal}
                />
              </>
            )}
          </div>
          <div className="line-separation-comments-publication"></div>
          <AddCommentInput />
        </div>
      </div>
    </>
  );
}

export default PostsFeed;
