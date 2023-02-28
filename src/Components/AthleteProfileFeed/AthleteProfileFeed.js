import React from "react";
import PostsFeed from "../PostsComponents/PostsFeed/PostsFeed";
import "./AthleteProfileFeed.css";
function AthleteProfileFeed() {
    
  return (
    <section className="athlete-profile-feed-container">
      <div className="athlete-profile-feed-free-container">
        <PostsFeed />
      </div>
      <div className="athlete-profile-feed-premium-container">
        <PostsFeed />
      </div>
    </section>
  );
}

export default AthleteProfileFeed;
