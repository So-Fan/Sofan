import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import FeedSideNavLink from "../../Components/FeedSideNavLink/FeedSideNavLink";
import FavAthlete from "../../Components/FavAthlete/FavAthlete";
import FeedSuggestions from "../../Components/FeedSuggestions/FeedSuggestions";
import PostsFeed from "../../Components/PostsComponents/PostsFeed/PostsFeed";
import FeedEvent from "../../Components/EventComponent/FeedEvent";
import FeedLaunchpad from "../../Components/FeedLaunchpad/FeedLaunchpad";
import World from "../../Assets/Image/world.svg";
import Star from "../../Assets/Image/star.svg";
function Home() {
  return (
    <>
      <section className="home-component">
        <div className="home-left-container">
          <div className="home-feedsidenavlink-wrap">
            <FeedSideNavLink
              href="/"
              svg={World}
              alt="world"
              title="Découverte"
              imgWidth="20px"
              gap="11px"
            />
            <FeedSideNavLink
              href="/"
              svg={Star}
              alt="world"
              title="Abonnements"
              imgWidth="22.83px"
              gap="8.59px"
            />
          </div>
          <FavAthlete />
          <FeedSuggestions />
        </div>
        <div className="home-center-container">
          <PostsFeed />
          <PostsFeed />
          <PostsFeed />
          <PostsFeed />
          <PostsFeed />
          <PostsFeed />
          <PostsFeed />
          <PostsFeed />
          <PostsFeed />
          <PostsFeed />
          <PostsFeed />
        </div>
        <div className="home-right-container">
          <FeedEvent />
          <FeedLaunchpad />
        </div>
      </section>
    </>
  );
}

export default Home;
