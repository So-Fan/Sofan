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
  where,
  limit,
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
  const [isCopyPostLinkClicked, setIsCopyPostLinkClicked] = useState(false);
  const [copyPostAnimationHide, setCopyPostAnimationHide] = useState(false);
  function handleAthleteSuggestionClick(e) {
    setIsSuggestSeeMoreButtonClicked(true);
  }
  const [displayPollPost, setDisplayPollPost] = useState(false);
  const [suggestionsAthletes, setSuggestionsAthletes] = useState([]);
  const suggestionCollectionAthlete = collection(db, "users");
  const [commentCounts, setCommentCounts] = useState({});
  const [commentCounterIncrementLocal, setCommentCounterIncrementLocal] =
    useState(0);
  const [athletesFollowing, setAthletesFollowing] = useState([]);

  function handleDisplayPremiumContent(i) {
    if (isUserFan === false && dataPost[i]?.visibility === false) {
      return true;
    } else if (isUserFan === true && dataPost[i]?.visibility === false) {
      return false;
    } else if (dataPost[i]?.visibility === true) {
      return false;
    }
  }
  const getCommentCount = async (postId) => {
    const commentsRef = collection(db, `feed_post/${postId}/post_comments`);
    const q = query(commentsRef, where("status", "==", true));

    const querySnapshot = await getDocs(q);
    const commentCount = querySnapshot.size;

    setCommentCounts((prevState) => ({ ...prevState, [postId]: commentCount }));
  };

  useEffect(() => {
    setIsLoading(true);

    const feedPostCollectionRef = collection(db, "feed_post");
    const q = query(
      feedPostCollectionRef,
      where("status", "==", true),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const feedData = [];
      querySnapshot.forEach((doc) => {
        feedData.push({ ...doc.data(), id: doc.id, isDropdownClicked: false });
      });
      setPostData(feedData);
      setIsLoading(false);
      feedData.forEach((post) => {
        getCommentCount(post.id);
      });
    });
    // Return the unsubscribe function to ensure this listener is removed when the component is unmounted
    return () => unsubscribe();
  }, []);

  // retrouver les athletes suivis
  console.log(loggedInUser);
  useEffect(() => {
    const userIdToFind = loggedInUser?.id;

    const usersRef = collection(db, "users");
    const q = query(usersRef, where("account_type", "==", "athlete"));

    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
      const foundAthletes = [];
      for (let doc of querySnapshot.docs) {
        const athleteId = doc.id;
        const userData = doc.data();

        // Accéder à la collection athlete_data pour l'athlète spécifique
        const athleteDataRef = collection(
          db,
          "users",
          athleteId,
          "athlete_data"
        );

        // Récupérer le document
        const athleteDataSnapshot = await getDocs(athleteDataRef);
        athleteDataSnapshot.forEach((doc) => {
          if (doc.exists) {
            const athleteData = doc.data();
            if (
              athleteData &&
              athleteData.followers &&
              athleteData.followers.includes(userIdToFind)
            ) {
              foundAthletes.push({
                athleteId,
                profile_avatar: userData.profile_avatar,
                username: userData.username,
              });
            }
          }
        });
      }
      setAthletesFollowing(foundAthletes);
    });

    return () => unsubscribe();
  }, [loggedInUser]);

  // console.log(athletesFollowing);

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

  // console.log(isLogged?.account_type);
  useEffect(() => {
    async function getSuggestionsAthletes() {
      // Create a query against the collection
      const q = query(
        suggestionCollectionAthlete,
        where("account_type", "==", "athlete"),
        limit(4)
      );

      const data = await getDocs(q);
      setSuggestionsAthletes(
        data.docs.map((doc) => {
          const docData = doc.data();
          return {
            display_name: docData.display_name,
            profile_avatar: docData.profile_avatar,
            sport: docData.sport,
            id: doc.id, // Include the document ID if needed
          };
        })
      );
    }
    getSuggestionsAthletes();
  }, []);
  // console.log(isLogged)
  function handleClickCopyPostLink(postId) {
    navigator.clipboard.writeText(`https://staging.sofan.app/post/${postId}`);
    console.log(postId);
    setIsCopyPostLinkClicked(true);
    // const timeOutAnimationCopyClicked =
    setTimeout(() => {
      setCopyPostAnimationHide(true);
    }, 5000);
    // clearTimeout(timeOutAnimationCopyClicked);
    // const timeOutHideCopyClicked =
    setTimeout(() => {
      setIsCopyPostLinkClicked(false);
      setCopyPostAnimationHide(false);
    }, 5700);
    // clearTimeout(timeOutHideCopyClicked);
  }
  console.log(athletesFollowing.length);

  return (
    <>
      <section className="home-component">
        <div
          className="home-left-container"
          style={
            isLogged?.account_type === "athlete"
              ? { height: "686px", maxHeight: "686px" }
              : athletesFollowing.length === 0
              ? { height: "398px" }
              : { maxHeight: "646px" }
            // athletesFollowing.length === 0 ? {}: {}
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
            {
              // isLogged === true &&
              // isLogged !== undefined &&
              isLogged && isLogged.account_type !== "free" && (
                <Button
                  createPostButtonclassName="button-component-create-post"
                  style={CreatePostButtonStyle.inlineStyle}
                  customMediaQueries={CreatePostButtonStyle.customMediaQueries}
                  text="Créer une publication"
                  onClick={handleCreatePostClick}
                  hover="button-hover-props"
                  active="button-active-props"
                />
              )
            }
          </div>
          <FavAthlete athletesFollowing={athletesFollowing} />
          {athletesFollowing.length === 0 && <>
          <div className="home-left-separation-line">
          </div>
          </>}
          <FeedSuggestions
            handleAthleteSuggestionClick={handleAthleteSuggestionClick}
            suggestionsAthletes={suggestionsAthletes}
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
                      postDate={post.createdAt.seconds}
                      postDescription={post.text}
                      postLikes={post.likes ? post.likes.length : 0}
                      // postCommentNumber={post?.comments?.length}
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
                      handleClickCopyPostLink={handleClickCopyPostLink}
                      postFeedHomeStyle={true}
                      postCommentNumber={commentCounts[post.id] || 0}
                      userType={loggedInUser?.account_type}
                      commentCounterIncrementLocal={
                        commentCounterIncrementLocal
                      }
                      setCommentCounterIncrementLocal={
                        setCommentCounterIncrementLocal
                      }
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
          <AthleteSuggestPopUp suggestionsAthletes={suggestionsAthletes} />
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
      {isCopyPostLinkClicked && (
        <>
          <div
            className={
              copyPostAnimationHide
                ? "home-post-link-copied-hide"
                : "home-post-link-copied"
            }
          >
            Copié dans le presse-papier !
          </div>
        </>
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
