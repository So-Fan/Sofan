import React, { useState, useEffect } from "react";
import PostsFeed from "../PostsComponents/PostsFeed/PostsFeed";
import "./AthleteProfileFeed.css";
import { v4 as uuidv4 } from "uuid";

function AthleteProfileFeed({ dataPosts, athleteProfilePageStyling }) {
  console.log(dataPosts);
  // console.log(athleteProfileFeedPageStyling)
  const [isUserFan, setIsUserFan] = useState(false);
  const [lockPremiumContent, setLockPremiumContent] = useState(false);

  function handleDisplayPremiumContent(i) {
    if (isUserFan === false && dataPosts[i]?.postType === "Premium") {
      setLockPremiumContent(true);
      // return true;
    } else if (isUserFan === true && dataPosts[i]?.postType === "Premium") {
      setLockPremiumContent(false);
      // return ;
    } else if (dataPosts[i]?.postType === "Free") {
      setLockPremiumContent(false);
      // return ;
    }
  }
  handleDisplayPremiumContent();
  function separatorPremiumFree() {
    const freePosts = dataPosts?.filter((post) => post.postType === "Free");
    const premiumPosts = dataPosts?.filter(
      (post) => post.postType === "Premium"
    );
    return { freePosts, premiumPosts };
  }
  const { freePosts, premiumPosts } = separatorPremiumFree();
  // Tri des posts par ordre croissant de postDate
  // A trier par type de date (month, hours ...)
  dataPosts?.sort((a, b) => a.postDate - b.postDate);

  return (
    <section className="athlete-profile-feed-container">
      <div className="athlete-profile-feed-free-container">
        {freePosts?.map((post) => {
          return (
            <PostsFeed
            athleteProfilePageStyling={athleteProfilePageStyling}
              key={uuidv4()}
              postDate={post.postDate}
              postDateType={post.postDateType}
              postType={post.postType}
              postName={post.postName}
              postPicture={post.postPicture}
              postDescription={post.postDescription}
              postLikeNumber={post.postLikeNumber}
              postCommentNumber={post.postCommentNumber}
            />
          );
        })}
      </div>
      <div className="athlete-profile-feed-premium-container">
        {premiumPosts?.map((post, index) => {
          return (
            <PostsFeed
            athleteProfilePageStyling={athleteProfilePageStyling}
              key={uuidv4()}
              postDate={post.postDate}
              postDateType={post.postDateType}
              postType={post.postType}
              postName={post.postName}
              postDescription={post.postDescription}
              postLikeNumber={post.postLikeNumber}
              postCommentNumber={post.postCommentNumber}
              lockPremiumContent={handleDisplayPremiumContent}
            />
          );
        })}
      </div>
    </section>
  );
}

export default AthleteProfileFeed;
