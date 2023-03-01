import React, { useState, useEffect } from "react";
import PostsFeed from "../PostsComponents/PostsFeed/PostsFeed";
import "./AthleteProfileFeed.css";
import { v4 as uuidv4 } from 'uuid';

function AthleteProfileFeed() {
  const [isUserFan, setIsUserFan] = useState(false);
  const [lockPremiumContent, setLockPremiumContent]= useState(false)
    function handleDisplayPremiumContent() {
        // essayer de le rendre dynamique avec une boucle for
        if (isUserFan === false && postData.athlete[1].postType === "Premium") {
            setLockPremiumContent(true)
        } else if (isUserFan === true && postData.athlete[1].postType === "Premium"){
            setLockPremiumContent(false)
        } else if (postData.athlete[1].postType === "Free") {
            setLockPremiumContent(false)
        }
    }
useEffect(() => {
    handleDisplayPremiumContent();
}, [])

    
  const postData = {
    athlete: [
      {
        postDate: 3,
        postDateType: "h",
        postType: "Free",
      },
      {
        postDate: 1,
        postDateType: "d",
        postType: "Premium",
      },
      {
        postDate: 4,
        postDateType: "h",
        postType: "Premium",
      },
    ],

  };
  return (
    <section className="athlete-profile-feed-container">
        {/* mettre un système de tri par date */}
      <div className="athlete-profile-feed-free-container">
        <PostsFeed />
      </div>
      <div className="athlete-profile-feed-premium-container">
        {postData.athlete.map((post) => {
          return (
            <>
              <PostsFeed
               postDate={post.postDate} 
               postDateType={post.postDateType}
               lockPremiumContent={lockPremiumContent}
                // mettre un uuid après
               />
            </>
          );
        })}
      </div>
    </section>
  );
}

export default AthleteProfileFeed;
