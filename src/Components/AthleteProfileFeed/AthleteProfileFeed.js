import React, { useState, useEffect } from "react";
import PostsFeed from "../PostsComponents/PostsFeed/PostsFeed";
import "./AthleteProfileFeed.css";
import { v4 as uuidv4 } from 'uuid';

function AthleteProfileFeed() {
  const [isUserFan, setIsUserFan] = useState(false);
  const [lockPremiumContent, setLockPremiumContent]= useState(false);

  function handleDisplayPremiumContent() {
    if (isUserFan === false && postData.athlete[1].postType === "Premium") {
      setLockPremiumContent(true);
    } else if (isUserFan === true && postData.athlete[1].postType === "Premium"){
      setLockPremiumContent(false);
    } else if (postData.athlete[1].postType === "Free") {
      setLockPremiumContent(false);
    }
  }

  useEffect(() => {
    handleDisplayPremiumContent();
  }, []);

  const postData = {
    athlete: [
      {
        postDate: 37,
        postDateType: "min",
        postType: "Premium",
      },
      {
        postDate: 2,
        postDateType: "h",
        postType: "Free",
      },
      {
        postDate: 3,
        postDateType: "h",
        postType: "Free",
      },
      {
        postDate: 4,
        postDateType: "h",
        postType: "Premium",
      },
      {
        postDate: 9,
        postDateType: "d",
        postType: "Premium",
      },
    ],
  };
  function separatorPremiumFree() {
    const freePosts = postData.athlete.filter(post => post.postType === "Free");
    const premiumPosts = postData.athlete.filter(post => post.postType === "Premium");
    return {freePosts, premiumPosts};
  }
  const { freePosts, premiumPosts } = separatorPremiumFree();
  // Tri des posts par ordre croissant de postDate
  // A trier par type de date (month, hours ...)
  postData.athlete.sort((a, b) => a.postDate - b.postDate);

  return (
    <section className="athlete-profile-feed-container">
    <div className="athlete-profile-feed-free-container">
      {freePosts.map((post) => {
        return (
          <PostsFeed
            key={uuidv4()}
            postDate={post.postDate}
            postDateType={post.postDateType}
            postType={post.postType}
          />
        );
      })}
    </div>
    <div className="athlete-profile-feed-premium-container">
      {premiumPosts.map((post) => {
        return (
          <PostsFeed
            key={uuidv4()}
            postDate={post.postDate}
            postDateType={post.postDateType}
            postType={post.postType}
            lockPremiumContent={lockPremiumContent}
          />
        );
      })}
    </div>
  </section>
  );
}

export default AthleteProfileFeed;
