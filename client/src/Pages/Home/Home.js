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
import { v4 as uuidv4 } from "uuid";
import AthleteFollowingSupportingPopUp from "../../Components/TemplatePopUp/AthleteFollowingSupportingPopUp/AthleteFollowingSupportingPopUp";
import AthleteSuggestPopUp from "../../Components/TemplatePopUp/AthleteSuggestPopUp/AthleteSuggestPopUp";
import NotificationPopUp from "../../Components/Navbar/NotificationPopUp/NotificationPopUp";
import { db } from "../../Configs/firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  getDocs,
} from "firebase/firestore";

function Home({
  loggedInUser,
  setPostData,
  dataPost,
  isDropdownClicked,
  setIsDropdownClicked,
  isLogged,
  handleNotificationPopup,
  setIsNotificationButtonClicked,
  isNotificationButtonClicked,
}) {
  const [isCreatePostButtonClicked, setIsCreatePostButtonClicked] =
    useState(false);
  const [isPostClicked, setIsPostClicked] = useState(false);
  const [isUserFan, setIsUserFan] = useState(false);
  const [lockPremiumContent, setLockPremiumContent] = useState(false);
  const [isSuggestionSeeMoreButtonClicked, setIsSuggestSeeMoreButtonClicked] =
    useState(false);
  const [isLoading, setIsLoading] = useState(true);
  function handleAthleteSuggestionClick(e) {
    setIsSuggestSeeMoreButtonClicked(true);
  }
  const [displayPollPost,setDisplayPollPost ] = useState(false)
  function handleDisplayPremiumContent(i) {
    if (isUserFan === false && dataPost[i]?.visibility === false) {
      return true;
    } else if (isUserFan === true && dataPost[i]?.visibility === false) {
      return false;
    } else if (dataPost[i]?.visibility === true) {
      return false;
    }
  }
 
  useEffect(() => {
    setIsLoading(true);

    const feedPostCollectionRef = collection(db, "feed_post"); // Make sure to set your collection name
    const q = query(feedPostCollectionRef, orderBy("createdAt", "desc")); // Order by 'createdAt' in descending order

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const feedData = [];
      querySnapshot.forEach((doc) => {
        feedData.push({ ...doc.data(), id: doc.id, isDropdownClicked: false });
      });
      setPostData(feedData);
      setIsLoading(false);
    });

    // Return the unsubscribe function to ensure this listener is removed when the component is unmounted
    return () => unsubscribe();
  }, []);

  const handleDropdownPostFeedClick = (e) => {
    for (let i = 0; i < dataPost.length; i++) {
      if (
        e.currentTarget.id === dataPost[i].id &&
        dataPost[i].isDropdownClicked === false
      ) {
        console.log(e.currentTarget.id);
        console.log(dataPost[i].id);
        const newData = [...dataPost];
        newData[i].isDropdownClicked = true;
        setPostData(newData);
        setIsDropdownClicked(true);
      }
    }
  };
  const handleCreatePostClick = () => {
    setIsCreatePostButtonClicked(true);
  };

  console.log(isLogged?.account_type)
  return (
    <>
      <section className="home-component">
        <div
          className="home-left-container"
          style={
            isLogged?.account_type === "athlete" 
              ? { height: "686px", maxHeight: "686px" }
              : { maxHeight: "646px" }
          }
        >
          <div
            className="home-navlink-create-post-wrap"
            style={
              isLogged?.account_type === "athlete"
                ? { height: "138px" }
                : { height: "64px" }
            }
          >
            <div className="home-feedsidenavlink-wrap">
              <FeedSideNavLink
                href="/launchpad"
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
            {isLogged === true && isLogged !== undefined  && isLogged?.account_type !== "free" && (
              <Button
                createPostButtonclassName="button-component-create-post"
                style={CreatePostButtonStyle.inlineStyle}
                customMediaQueries={CreatePostButtonStyle.customMediaQueries}
                text="Create a post"
                onClick={handleCreatePostClick}
                hover="button-hover-props"
                active="button-active-props"
              />
            )}
          </div>
          <FavAthlete />
          <FeedSuggestions
            handleAthleteSuggestionClick={handleAthleteSuggestionClick}
          />
        </div>
        <div className="home-center-container">
          <div>
            {isLoading ? (
              <>
                <div className="lds-ripple">
                  <div></div>
                  <div></div>
                </div>
              </>
            ) : (
              <>
                {dataPost?.map((post, index) => {
                  // console.log(post.isDropdownClicked)
                  // console.log(data);
                  return (
                    <PostsFeed
                      key={uuidv4()}
                      id={post.id}
                      singlePostData={post}
                      postName="Rami Abdou"
                      postDate={post.createdAt.seconds}
                      postDescription={post.text}
                      postLikes={post.likes ? post.likes.length : 0}
                      postCommentNumber={post?.comments?.length}
                      postType={post.visibility}
                      postPicture={post.imagePath}
                      postCreatorId={post.userId}
                      loggedInUser={loggedInUser}
                      polldata={post.pollData}
                      //setIsPostClicked={setIsPostClicked}
                      setIsPostClicked={setIsPostClicked}
                      lockPremiumContent={handleDisplayPremiumContent(index)}
                      handleDropdownPostFeedClick={handleDropdownPostFeedClick}
                      isDropdownClicked={isDropdownClicked}
                    />
                  );
                })}
              </>
            )}
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
          <CreationPostPoll userId={loggedInUser.id} />
        </Modal>
      )}
      {isSuggestionSeeMoreButtonClicked && (
        <Modal
          setState={setIsSuggestSeeMoreButtonClicked}
          style={{ top: "24px", right: "20px" }}
        >
          <AthleteSuggestPopUp />
        </Modal>
      )}
      {isNotificationButtonClicked && (
        <Modal
          setState={setIsNotificationButtonClicked}
          style={{ top: "24px", right: "20px" }}
        >
          <NotificationPopUp notificationPopUpComponent={true} />
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
