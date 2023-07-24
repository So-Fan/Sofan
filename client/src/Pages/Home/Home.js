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
import { collection, getDocs } from "firebase/firestore";

function Home({ setData, data, setIsDropdownClicked, isLogged, handleNotificationPopup, setIsNotificationButtonClicked, isNotificationButtonClicked }) {
  const [isCreatePostButtonClicked, setIsCreatePostButtonClicked] =
    useState(false);
  const [isPostClicked, setIsPostClicked] = useState(false);
  const [isUserFan, setIsUserFan] = useState(false);
  const [lockPremiumContent, setLockPremiumContent] = useState(false);
  const [isSuggestionSeeMoreButtonClicked, setIsSuggestSeeMoreButtonClicked] =
    useState(false);
  function handleAthleteSuggestionClick(e) {
    setIsSuggestSeeMoreButtonClicked(true);
  }
  function handleDisplayPremiumContent(i) {
    if (isUserFan === false && data[i]?.postType === "Premium") {
      return true;
    } else if (isUserFan === true && data[i]?.postType === "Premium") {
      return false;
    } else if (data[i]?.postType === "Free") {
      return false;
    }
  }
  useEffect(() => {
    // simulate fake post data from backend
    const dataBackend = [
      {
        id: 0,
        postName: "Romain Attanasio",
        postDate: 5,
        postDateType: "h",
        postType: "Free",
        postDescription:
          "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
        pollFirstChoice: "Barrier",
        pollSecondChoice: "Attanasio",
        pollThirdChoice: "John",
        pollFourthChoice: "Arthur",
        postPicture:
          "https://cdn-s-www.ledauphine.com/images/84EBA6B9-E83A-4FAA-8FC7-0768BD511F98/NW_raw/romain-attanasio-au-moment-de-boucler-le-vendee-globe-au-debut-de-l-annee-2017-1585955674.jpg",
        postLikeNumber: 29,
        postCommentNumber: 10,
        pollFirstChoiceNumber: 570,
        pollSecondChoiceNumber: 98,
        pollThirdChoiceNumber: 120,
        pollFourthChoiceNumber: 302,
        pollTotalVote: 0,
        pollDate: 1,
        pollDateType: "day",
      },
      {
        id: 1,
        postName: "Alexia Barrier",
        postDate: 2,
        postDateType: "d",
        postType: "Premium",
        postDescription:
          "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",

        postPicture:
          "https://cdn-s-www.ledauphine.com/images/84EBA6B9-E83A-4FAA-8FC7-0768BD511F98/NW_raw/romain-attanasio-au-moment-de-boucler-le-vendee-globe-au-debut-de-l-annee-2017-1585955674.jpg",
        pollFirstChoice: "Barrier",
        pollSecondChoice: "Attanasio",
        pollThirdChoice: "John",
        pollFourthChoice: "Arthur",
        postLikeNumber: 29,
        postCommentNumber: 10,
        pollFirstChoiceNumber: 570,
        pollSecondChoiceNumber: 98,
        pollThirdChoiceNumber: 120,
        pollFourthChoiceNumber: 302,
        pollTotalVote: 0,
        pollDate: 0,
        pollDateType: "day",
      },
      {
        id: 2,
        postName: "Romain Attanasio",
        postDate: 3,
        postDateType: "h",
        postType: "Free",
        postDescription:
          "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
        postPicture:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Romain_Attanasio_Vend%C3%A9e_Globe.jpg/280px-Romain_Attanasio_Vend%C3%A9e_Globe.jpg",
        pollFirstChoice: "Barrier",
        pollSecondChoice: "Attanasio",
        pollThirdChoice: "John",
        pollFourthChoice: "Arthur",
        postLikeNumber: 29,
        postCommentNumber: 10,
        pollFirstChoiceNumber: 570,
        pollSecondChoiceNumber: 98,
        pollThirdChoiceNumber: 120,
        pollFourthChoiceNumber: 302,
        pollTotalVote: 0,
        pollDate: 1,
        pollDateType: "day",
      },
      {
        id: 3,
        postName: "Alexia Barrier",
        postDate: 2,
        postDateType: "y",
        postType: "Free",
        postDescription:
          "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
        pollFirstChoice: "Barrier",
        pollSecondChoice: "Attanasio",
        pollThirdChoice: "John",
        pollFourthChoice: "Arthur",
        postPicture: "",
        postLikeNumber: 29,
        postCommentNumber: 10,
        pollFirstChoiceNumber: 570,
        pollSecondChoiceNumber: 98,
        pollThirdChoiceNumber: 120,
        pollFourthChoiceNumber: 302,
        pollTotalVote: 0,
        pollDate: 1,
        pollDateType: "day",
      },
      {
        id: 4,
        postName: "Romain Attanasio",
        postDate: 3,
        postDateType: "h",
        postType: "Free",
        postDescription:
          "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
        pollFirstChoice: "Barrier",
        pollSecondChoice: "Attanasio",
        pollThirdChoice: "John",
        pollFourthChoice: "Arthur",
        postPicture: "",
        postLikeNumber: 29,
        postCommentNumber: 10,
        pollFirstChoiceNumber: 570,
        pollSecondChoiceNumber: 98,
        pollThirdChoiceNumber: 120,
        pollFourthChoiceNumber: 302,
        pollTotalVote: 2456,
        pollDate: 1,
        pollDateType: "day",
      },
      {
        id: 5,
        postName: "Alexia Barrier",
        postDate: 2,
        postDateType: "d",
        postType: "Premium",
        postDescription:
          "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
        pollFirstChoice: "Barrier",
        pollSecondChoice: "Attanasio",
        pollThirdChoice: "John",
        pollFourthChoice: "Arthur",
        postPicture: "",
        postLikeNumber: 29,
        postCommentNumber: 10,
        pollFirstChoiceNumber: 570,
        pollSecondChoiceNumber: 98,
        pollThirdChoiceNumber: 120,
        pollFourthChoiceNumber: 302,
        pollTotalVote: 2456,
        pollDate: 1,
        pollDateType: "day",
      },
      {
        id: 6,
        postName: "Romain Attanasio",
        postDate: 9,
        postDateType: "h",
        postType: "Free",
        postDescription:
          "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
        postPicture: "",
        pollFirstChoice: "Barrier",
        pollSecondChoice: "Attanasio",
        pollThirdChoice: "John",
        pollFourthChoice: "Arthur",
        postLikeNumber: 29,
        postCommentNumber: 10,
        pollFirstChoiceNumber: 570,
        pollSecondChoiceNumber: 98,
        pollThirdChoiceNumber: 120,
        pollFourthChoiceNumber: 302,
        pollTotalVote: 2456,
        pollDate: 1,
        pollDateType: "day",
      },
      {
        id: 7,
        postName: "Romain Attanasio",
        postDate: 3,
        postDateType: "h",
        postType: "Free",
        postDescription:
          "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
        postPicture: "",
        pollFirstChoice: "Barrier",
        pollSecondChoice: "Attanasio",
        pollThirdChoice: "John",
        pollFourthChoice: "Arthur",
        postLikeNumber: 29,
        postCommentNumber: 10,
        pollFirstChoiceNumber: 570,
        pollSecondChoiceNumber: 98,
        pollThirdChoiceNumber: 120,
        pollFourthChoiceNumber: 302,
        pollTotalVote: 2456,
        pollDate: 1,
        pollDateType: "day",
      },
      {
        id: 8,
        postName: "Romain Attanasio",
        postDate: 3,
        postDateType: "h",
        postType: "Free",
        postDescription:
          "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
        pollFirstChoice: "Barrier",
        pollSecondChoice: "Attanasio",
        pollThirdChoice: "John",
        pollFourthChoice: "Arthur",
        postPicture: "",
        postLikeNumber: 29,
        postCommentNumber: 10,
        pollFirstChoiceNumber: 570,
        pollSecondChoiceNumber: 98,
        pollThirdChoiceNumber: 120,
        pollFourthChoiceNumber: 302,
        pollTotalVote: 2456,
        pollDate: 1,
        pollDateType: "day",
      },
      {
        id: 9,
        postName: "Romain Attanasio",
        postDate: 3,
        postDateType: "h",
        postType: "Premium",
        postDescription:
          "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
        pollFirstChoice: "Barrier",
        pollSecondChoice: "Attanasio",
        pollThirdChoice: "John",
        pollFourthChoice: "Arthur",
        postPicture: "",
        postLikeNumber: 29,
        postCommentNumber: 10,
        pollFirstChoiceNumber: 570,
        pollSecondChoiceNumber: 98,
        pollThirdChoiceNumber: 120,
        pollFourthChoiceNumber: 302,
        pollTotalVote: 2456,
        pollDate: 1,
        pollDateType: "day",
      },
    ];
    for (let i = 0; i < dataBackend.length; i++) {
      dataBackend[i] = { ...dataBackend[i], ...{ isDropdownClicked: false } };
      // console.log(dataBackend[i].postType)
      // console.log(lockPremiumContent);
    }
    setData(dataBackend);
  }, [setData]);

  const [feedPost, setFeedPost] = useState([]);
  const feedPostCollectionRef = collection(db, "feed_post");

  useEffect(() => {
    const getEvents = async () => {
      const data = await getDocs(feedPostCollectionRef);
      setFeedPost(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getEvents();
  }, []);

  console.log(feedPost);

  // function displayFullPagePost() {
  //   return (
  //     <>
  //       <FullPagePost postType={data.postType} />;
  //     </>
  //   );
  // }

  // setTimeout(() => {

  // }, 10);
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
  const [postStates, setPostStates] = useState({});
  return (
    <>
      <section className="home-component">
        <div
          className="home-left-container"
          style={
            isLogged  && isLogged.account_type != 'free'
              ? { height: "686px", maxHeight: "686px" }
              : { maxHeight: "646px" }
          }
        >
          <div
            className="home-navlink-create-post-wrap"
            style={isLogged && isLogged.account_type != 'free' ? { height: "138px" } : { height: "64px" }}
          >
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
            {isLogged && isLogged.account_type != 'free' && (
              <Button
                createPostButtonclassName="button-component-create-post"
                style={CreatePostButtonStyle.inlineStyle}
                customMediaQueries={CreatePostButtonStyle.customMediaQueries}
                text="Create a post"
                onClick={handleCreatePostClick}
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
            {data?.map((post, index) => {
              return (
                <PostsFeed
                  key={uuidv4()}
                  id={post.id}
                  // Backend data
                  postName={post.postName}
                  postDate={post.postDate}
                  postDateType={post.postDateType}
                  postType={post.postType}
                  postDescription={post.postDescription}
                  postPicture={post.postPicture}
                  postLikeNumber={post.postLikeNumber}
                  postCommentNumber={post.postCommentNumber}
                  //  Backend poll data
                  pollFirstChoice={post.pollFirstChoice}
                  pollSecondChoice={post.pollSecondChoice}
                  pollThirdChoice={post.pollThirdChoice}
                  pollFourthChoice={post.pollFourthChoice}
                  pollFirstChoiceNumber={post.pollFirstChoiceNumber}
                  pollSecondChoiceNumber={post.pollSecondChoiceNumber}
                  pollThirdChoiceNumber={post.pollThirdChoiceNumber}
                  pollFourthChoiceNumber={post.pollFourthChoiceNumber}
                  pollDate={post.pollDate}
                  pollDateType={post.pollDateType}
                  pollTotalVote={post.pollTotalVote}
                  // states and functions
                  isDropdownClicked={post.isDropdownClicked}
                  handleDropdownPostFeedClick={handleDropdownPostFeedClick}
                  setIsPostClicked={setIsPostClicked}
                  isPostClicked={isPostClicked}
                  lockPremiumContent={handleDisplayPremiumContent(index)}
                />
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
          style={{ top: "-44px", right: "2px" }}
          color="white"
        >
          {/* Faire passer les infos du post mais problème de timing avec un rendu d'etat trop rapide*/}
          <FullPagePost postType={data.postType} />
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
          <NotificationPopUp 
          notificationPopUpComponent={true}
          />
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
