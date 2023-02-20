import React, { useEffect, useState } from "react";
import "./Home.css";
import FeedSideNavLink from "../../Components/FeedSideNavLink/FeedSideNavLink";
import FavAthlete from "../../Components/FavAthlete/FavAthlete";
import FeedSuggestions from "../../Components/FeedSuggestions/FeedSuggestions";
import PostsFeed from "../../Components/PostsComponents/PostsFeed/PostsFeed";
import FeedEvent from "../../Components/EventComponent/FeedEvent";
import FeedLaunchpad from "../../Components/FeedLaunchpad/FeedLaunchpad";
import World from "../../Assets/Image/world.svg";
import Star from "../../Assets/Image/star.svg";
import Button from "../../Components/Button/Button";
import CreationPostPoll from "../../Components/CreationPostPoll/CreationPostPoll";
import Modal from "../../Components/Modal/Modal";
import FullPagePost from "../FullPagePost/FullPagePost";
function Home({ setData, data, setIsDropdownClicked, isLogged }) {
  const [isCreatePostButtonClicked, setIsCreatePostButtonClicked] =
    useState(false);
  const [isPostClicked, setIsPostClicked] = useState(false);
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
      dataBackend[i] = { ...dataBackend[i], ...{ isDropdownClicked: false } };
    }
    setData(dataBackend);
  }, [setData]);

  const handleDropdownPostFeedClick = (e) => {
    for (let i = 0; i < data.length; i++) {
      if (
        parseInt(e.currentTarget.id) === data[i].id &&
        data[i].isDropdownClicked === false
      ) {
        const newData = [...data];
        newData[i].isDropdownClicked = true;
        setData(newData);
        setIsDropdownClicked(true);
      }
    }
  };

  const handleCreatePostClick = () => {
    setIsCreatePostButtonClicked(true);
  };
  return (
    <>
      {/* <Modal style={{top: "0px"}} color="white">
        <FullPagePost />
      </Modal> */}
      {/* <FullPagePost /> */}
      <section className="home-component">
        <div className="home-left-container">
          <div className="home-navlink-create-post-wrap">
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
            {isLogged && (
              <Button
                style={CreatePostButtonStyle.inlineStyle}
                customMediaQueries={CreatePostButtonStyle.customMediaQueries}
                text="Create a post"
                onClick={handleCreatePostClick}
              />
            )}
          </div>
          <FavAthlete />
          <FeedSuggestions />
        </div>
        <div className="home-center-container">
          <div>
            {data?.map((post) => {
              return (
                <>
                  <PostsFeed
                    id={post.id}
                    isDropdownClicked={post.isDropdownClicked}
                    handleDropdownPostFeedClick={handleDropdownPostFeedClick}
                    setIsPostClicked={setIsPostClicked}
                    isPostClicked={isPostClicked}
                  />
                  
                </>
              );
            })}
          </div>
        </div>
        <div className="home-right-container">
          <FeedEvent />
          <FeedLaunchpad />
        </div>
      </section>
      {isCreatePostButtonClicked && (
        <Modal
          setState={setIsCreatePostButtonClicked}
          style={{ top: "24px", right: "20px" }}
        >
          <CreationPostPoll />
        </Modal>
      )}
      {isPostClicked && (
        <Modal
        setState={setIsPostClicked}
        style={{top: "-24px", right: "2px"}}
        color="white"
        >
          <FullPagePost />
        </Modal>
      )}
    </>
  );
}

export default Home;

const CreatePostButtonStyle = {
  inlineStyle: {
    backgroundColor: "#F6D463",
    border: "transparent",
    borderRadius: "10px",
    width: "284px",
    minHeight: "54px",
    fontFamily: "Britanica-Heavy",
    fontSize: "20px",
  },
  customMediaQueries:
    "@media (max-width: 950px) { .button-component { max-width: 250px; }}@media (max-width: 900px) {.button-component {max-width: 220px; } } @media (max-width: 860px){.button-component {max-width: 200px;}}@media (max-width: 840px){.button-component {max-width: 183px;}}",
};
