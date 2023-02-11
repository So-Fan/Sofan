import React from "react";
import "./FullPagePost.css";
import HeadOfPost from "../../Components/PostsComponents/HeadOfPost/HeadOfPost";
import LikesCommentsCounter from "../../Components/PostsComponents/LikesCommentsCounter/LikesCommentsCounter";
import PostsDescription from "../../Components/PostsComponents/PostsDescription/PostsDescription";
import PostsComments from "../../Components/PostsComponents/PostsComments/PostsComments";
import AddCommentInput from "../../Components/PostsComponents/AddCommentInput/AddCommentInput";
import mediaPostAttanasio from "../../Assets/Image/mediapostattanasio.svg";

function FullPagePost({ modal, setModal, toggleModal }) {
  // const [modal, setModal] = useState(true);
  // const toggleModal = (e) => {
  //   e.preventDefault();
  //   setModal(!modal);
  //   console.log("bonjour");
  // };

  // {/* <>
  //   {modal ? (
  //     <>
  //       <div onClick={toggleModal} className="overlay-postfeed"></div>
  //     </>
  //   ) : (
  //     <> </>
  //   )}
  // </> */}
  function detectingClick(e) {
    if (e.target.className === "fullpagepost-container") {
      console.log("la classe est bien fullpagepost-container");
      setModal(false);
    }
  }
  return (
    <>
      {modal && (
        <>
          <div onClick={toggleModal} className="overlay-postfeed"></div>
          <div onClick={detectingClick} className="fullpagepost-container">
            <div onClick={toggleModal} className="cancel-fullpagepost">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 0 10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20ZM10 18C12.1217 18 14.1566 17.1571 15.6569 15.6569C17.1571 14.1566 18 12.1217 18 10C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 12.1217 2.84285 14.1566 4.34315 15.6569C5.84344 17.1571 7.87827 18 10 18ZM10 8.586L12.828 5.757L14.243 7.172L11.414 10L14.243 12.828L12.828 14.243L10 11.414L7.172 14.243L5.757 12.828L8.586 10L5.757 7.172L7.172 5.757L10 8.586Z"
                  fill="white"
                />
              </svg>
            </div>
            <div className="post-container-fullpagepost">
              <div className="media-fullpagepost">
                <img
                  className="img-fullpagepost"
                  src={mediaPostAttanasio}
                  alt=""
                />
              </div>
              <div className="desc-likes-comments-container-fullpagepost">
                <div className="bloc-content-fullpagepost">
                  <div className="headofpost-container" id="dropdown-medium">
                    <HeadOfPost dropDownMenuSize="dropdown-button-point-size-M" />
                  </div>
                  <div className="headofpost-container" id="dropdown-small">
                    <HeadOfPost dropDownMenuSize="dropdown-button-point-size-S" />
                  </div>
                  <PostsDescription />
                  <div className="likes-comments-counter-container-fullpagepost">
                    <LikesCommentsCounter
                      likeButtonSize={"likeButton-S-size"}
                    />
                  </div>
                  <div className="separation-line-fullpagepost"></div>
                  <div className="comments-container-fullpagepost">
                    <PostsComments />
                    <PostsComments />
                    <div id="responsive-display-toggle-comments-fullpagepost3">
                      <PostsComments />
                    </div>
                    <div id="responsive-display-toggle-comments-fullpagepost2">
                      <PostsComments />
                    </div>
                    <div id="responsive-display-toggle-comments-fullpagepost1">
                      <PostsComments />
                    </div>
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
      )}
    </>
  );
}

export default FullPagePost;
