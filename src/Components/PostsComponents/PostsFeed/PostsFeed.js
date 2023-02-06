import React from "react";
import "./PostsFeed.css";
import HeadOfPost from "../HeadOfPost/HeadOfPost";
import PublicationDescription from "../PostsDescription/PostsDescription";
import LikesCommentsCounter from "../LikesCommentsCounter/LikesCommentsCounter";
import AddCommentInput from "../AddCommentInput/AddCommentInput";
import DefaultCss from "../../../Configs/DefaultCss";
import FullPagePost from "../../../Pages/FullPagePost/FullPagePost"
import AppModal from "../../AppModal/AppModal";

function PostsFeed() {
  const [modalShow, setModalShow] = React.useState(false);
  // const handleChange = (e) => {};
  return (
    <>
      <div className="publication-container">
        <div className="publication-content">
          <div className="publication-head-container">
            {/* Choose size with: 
              - "dropdown-button-point-size"
            */}
            <HeadOfPost dropDownMenuSize="dropdown-button-point-size-M" />
          </div>
          <PublicationDescription />
          {/* Backend here */}
          <div className="publication-media">MEDIA</div>
          {/* Backend here */}
          <LikesCommentsCounter />
          <div className="show-comments-button-publication">
            <button style={DefaultCss.buttons} onClick={() => setModalShow(true)}>
              Show 10 comments
            </button>
          </div>
          <div className="line-separation-comments-publication"></div>
          <AddCommentInput />
        </div>
      </div>
      <AppModal ModalClass="rami-modal" size="xl" show={modalShow} onHide={() => setModalShow(false)}>
        <FullPagePost />
      </AppModal>
    </>
  );
}

export default PostsFeed;