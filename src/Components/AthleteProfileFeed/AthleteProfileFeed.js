import React, {useState} from "react";
import PostsFeed from "../PostsComponents/PostsFeed/PostsFeed";
import "./AthleteProfileFeed.css";

function AthleteProfileFeed() {
const [isUserFan, setIsUserFan] = useState(true)

  return (
    <section className="athlete-profile-feed-container">
      <div className="athlete-profile-feed-free-container">
        <PostsFeed />
      </div>
      <div className="athlete-profile-feed-premium-container">
        <PostsFeed isUserFan={isUserFan}/>
        <PostsFeed isUserFan={isUserFan}/>
        <PostsFeed isUserFan={isUserFan}/>
      </div>
    </section>
  );
}

export default AthleteProfileFeed;
