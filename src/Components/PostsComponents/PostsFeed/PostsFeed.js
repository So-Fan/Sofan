import React, { useState } from "react";
import "./PostsFeed.css";
import HeadOfPost from "../HeadOfPost/HeadOfPost";
import PublicationDescription from "../PostsDescription/PostsDescription";
import LikeButton from "../LikeButton/LikeButton";
function PostsFeed() {

  const handleChange = (e) => {};
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
          <div className="likes-comments-container-publication">
            <div className="likes-publication">
              <LikeButton/>
              <div className="likes-counter-publication">29 likes</div>
            </div>
            <div className="comments-publication">
              <div className="logo-comments-publication">
                <svg
                  width="21"
                  height="20"
                  viewBox="0 0 21 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.94654 18.4088L0.789196 19.5551L1.93549 14.3977C1.18058 12.9857 0.786785 11.4088 0.789196 9.80768C0.789196 4.42421 5.1531 0.0603027 10.5366 0.0603027C15.9201 0.0603027 20.284 4.42421 20.284 9.80768C20.284 15.1912 15.9201 19.5551 10.5366 19.5551C8.93543 19.5575 7.35856 19.1637 5.94654 18.4088ZM6.22921 16.3492L6.86571 16.6903C7.995 17.2938 9.25616 17.6083 10.5366 17.6056C12.0789 17.6056 13.5865 17.1483 14.8689 16.2914C16.1512 15.4346 17.1507 14.2167 17.7409 12.7918C18.3311 11.3669 18.4855 9.79904 18.1847 8.28639C17.8838 6.77374 17.1411 5.38429 16.0505 4.29373C14.96 3.20318 13.5705 2.4605 12.0579 2.15961C10.5452 1.85873 8.97733 2.01315 7.55245 2.60336C6.12757 3.19356 4.9097 4.19304 4.05286 5.4754C3.19601 6.75776 2.73867 8.2654 2.73867 9.80768C2.73867 11.108 3.05546 12.3595 3.65493 13.4785L3.99511 14.1151L3.35666 16.9876L6.22921 16.3492Z"
                    fill="black"
                  />
                </svg>
              </div>
              {/* Backend here */}
              <div className="comments-counter-publication">10 comments</div>
            </div>
          </div>
          {/* Backend here */}
          <div className="show-comments-button-publication">
            Show 10 comments
          </div>
          <div className="line-separation-comments-publication"></div>
          <div className="input-comment-container-publication">
            <div className="input-comment-elements">
              <div className="emoji-comment-publication">
                <a href="">
                  <svg
                    width="25"
                    height="24"
                    viewBox="0 0 25 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.7194 0.175049C9.55602 0.17847 6.52317 1.43664 4.2863 3.67351C2.04944 5.91037 0.791263 8.94323 0.787842 12.1066C1.38442 27.916 24.0544 27.909 24.651 12.1066C24.6476 8.94323 23.3894 5.91037 21.1526 3.67351C18.9157 1.43664 15.8828 0.17847 12.7194 0.175049V0.175049ZM12.7194 22.0496C10.0833 22.0467 7.55591 20.9982 5.69187 19.1342C3.82783 17.2701 2.77933 14.7428 2.77644 12.1066C3.27359 -1.06584 22.1653 -1.06186 22.6624 12.1066C22.6595 14.7428 21.611 17.2701 19.747 19.1342C17.8829 20.9982 15.3556 22.0467 12.7194 22.0496ZM7.74793 9.62089C7.74793 9.22533 7.90507 8.84597 8.18477 8.56627C8.46447 8.28657 8.84382 8.12944 9.23938 8.12944C9.63494 8.12944 10.0143 8.28657 10.294 8.56627C10.5737 8.84597 10.7308 9.22533 10.7308 9.62089C10.7308 10.0164 10.5737 10.3958 10.294 10.6755C10.0143 10.9552 9.63494 11.1123 9.23938 11.1123C8.84382 11.1123 8.46447 10.9552 8.18477 10.6755C7.90507 10.3958 7.74793 10.0164 7.74793 9.62089ZM14.708 9.62089C14.708 9.22533 14.8652 8.84597 15.1449 8.56627C15.4246 8.28657 15.8039 8.12944 16.1995 8.12944C16.595 8.12944 16.9744 8.28657 17.2541 8.56627C17.5338 8.84597 17.6909 9.22533 17.6909 9.62089C17.6909 10.0164 17.5338 10.3958 17.2541 10.6755C16.9744 10.9552 16.595 11.1123 16.1995 11.1123C15.8039 11.1123 15.4246 10.9552 15.1449 10.6755C14.8652 10.3958 14.708 10.0164 14.708 9.62089ZM18.5281 15.6284C17.9439 16.6584 17.1004 17.5176 16.0814 18.1208C15.0625 18.7239 13.9034 19.05 12.7194 19.0667C11.5346 19.0502 10.3747 18.7242 9.35473 18.1211C8.33476 17.5179 7.49019 16.6587 6.90477 15.6284C6.79906 15.4634 6.74446 15.2709 6.74784 15.0749C6.75121 14.879 6.81241 14.6884 6.92375 14.5272C7.03508 14.3659 7.19159 14.2411 7.3736 14.1685C7.55562 14.0959 7.75503 14.0787 7.94679 14.1191C9.47571 14.6951 11.087 15.0227 12.7194 15.0895C14.3492 15.0219 15.9577 14.6943 17.4841 14.1191C17.676 14.0782 17.8757 14.095 18.0581 14.1674C18.2405 14.2398 18.3973 14.3646 18.5089 14.526C18.6206 14.6873 18.6819 14.8781 18.6854 15.0743C18.6888 15.2705 18.6341 15.4633 18.5281 15.6284Z"
                      fill="black"
                    />
                  </svg>
                </a>
              </div>
              <input
                placeholder="Add a comment"
                className="input-comment-publication"
                type="text"
                onChange={handleChange}
              />
              <div className="publish-comments-button-container-publication">
                <a href="">
                  {/* Backend here */}
                  <button>Publish</button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostsFeed;
