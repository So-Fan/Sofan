import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./PostsFeed.css";
import HeadOfPost from "../HeadOfPost/HeadOfPost";
import PublicationDescription from "../PostsDescription/PostsDescription";
import LikesCommentsCounter from "../LikesCommentsCounter/LikesCommentsCounter";
import AddCommentInput from "../AddCommentInput/AddCommentInput";
import FullPagePost from "../../../Pages/FullPagePost/FullPagePost";

function PostsFeed() {
  const [modal, setModal] = useState(true);
  const toggleModal = (e) => {
    // e.preventDefault();
    setModal(!modal);
    console.log(e.currentTarget);
  };

  return (
    <>
      <div className="publication-container">
        <div className="publication-content">
          <div className="publication-head-container">
            <HeadOfPost dropDownMenuSize="dropdown-button-point-size-M" />
          </div>
          <PublicationDescription />
          {/* Backend here */}
          <div className="publication-media">MEDIA</div>
          {/* Backend here */}
          <LikesCommentsCounter />
          <div className="show-comments-button-publication">
            <Link onClick={toggleModal}>Show 10 comments</Link>
            {modal && (
              <>
                {/* <div className="modal-component-postfeed"> */}
                <FullPagePost
                  modal={modal}
                  setModal={setModal}
                  toggleModal={toggleModal}
                />
                {/* </div> */}
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
