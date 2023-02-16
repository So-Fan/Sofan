import React, { useEffect } from "react";
import "./Home.css";
import FeedSideNavLink from "../../Components/FeedSideNavLink/FeedSideNavLink";
import FavAthlete from "../../Components/FavAthlete/FavAthlete";
import FeedSuggestions from "../../Components/FeedSuggestions/FeedSuggestions";
import PostsFeed from "../../Components/PostsComponents/PostsFeed/PostsFeed";
import FeedEvent from "../../Components/EventComponent/FeedEvent";
import FeedLaunchpad from "../../Components/FeedLaunchpad/FeedLaunchpad";
import World from "../../Assets/Image/world.svg";
import Star from "../../Assets/Image/star.svg";
function Home({ setData, data, setIsDropdownClicked }) {
  

  useEffect(() => {
    // simulate fake post data from backend
    const dataBackend = [
      {
        id: 0,
        name: "Romain Attanasio",
      },
      {
        id: 1,
        name: "Romain Attanasio",
      },
      {
        id: 2,
        name: "Romain Attanasio",
      },
      {
        id: 3,
        name: "Romain Attanasio",
      },
      {
        id: 4,
        name: "Romain Attanasio",
      },
      {
        id: 5,
        name: "Romain Attanasio",
      },
      {
        id: 6,
        name: "Romain Attanasio",
      },
      {
        id: 7,
        name: "Romain Attanasio",
      },
      {
        id: 8,
        name: "Romain Attanasio",
      },
      {
        id: 9,
        name: "Romain Attanasio",
      },
    ];
    for (let i = 0; i < dataBackend.length; i++) {
      dataBackend[i] = { ...dataBackend[i], ...{ isClicked: false } };
    }
    setData(dataBackend);
  }, [setData]);

  const handleDropdownPostFeedClick = (e) => {
    for (let i = 0; i < data.length; i++) {
      if (
        parseInt(e.currentTarget.id) === data[i].id &&
        data[i].isClicked === false
      ) {
        const newData = [...data];
        newData[i].isClicked = true;
        setData(newData);
        setIsDropdownClicked(true)
      } 
    }
  };
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
          {data?.map((post) => {
            return (
              <PostsFeed
                id={post.id}
                isClicked={post.isClicked}
                handleDropdownPostFeedClick={handleDropdownPostFeedClick}
              />
            );
          })}
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
