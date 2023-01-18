import React from "react";
import "./FullPagePost.css";
import DropDownButtonMenu from "../../Components/DropDownButtonMenu/DropDownButtonMenu";
import HeadOfPost from "../../Components/PostsComponents/HeadOfPost/HeadOfPost";
import PublicationDescription from "../../Components/PostsComponents/PostsDescription/PostsDescription";
import PostsComments from "../../Components/PostsComponents/PostsComments/PostsComments";

function FullPagePost() {
  return (
    <section className="fullpagepost-container">
      <div className="post-container-fullpagepost">
        <div className="media-fullpagepost">IMG</div>
        <div className="desc-likes-comments-container-fullpagepost">
          <div className="bloc-content-fullpagepost">
            <div className="headofpost-container">
              <HeadOfPost dropDownMenuSize="dropdown-button-point-size-M" />
            </div>
            <PublicationDescription />
            <div className="separation-line-fullpagepost"></div>
            <PostsComments/>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FullPagePost;
