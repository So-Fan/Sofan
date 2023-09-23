import React, { useEffect, useState, memo, useMemo, useCallback } from "react";
import "./Home.css";
// import FeedSideNavLink from "../../Components/FeedSideNavLink/FeedSideNavLink";
import FavAthlete from "../../Components/FavAthlete/FavAthlete";
import FeedSuggestions from "../../Components/FeedSuggestions/FeedSuggestions";
import PostsFeed from "../../Components/PostsComponents/PostsFeed/PostsFeed";
import FeedEvent from "../../Components/EventComponent/FeedEvent";
import FeedLaunchpad from "../../Components/FeedLaunchpad/FeedLaunchpad";
// import World from "../../Assets/Image/world.svg";
// import Star from "../../Assets/Image/star.svg";
import Button from "../../Components/Button/Button";
import CreationPostPoll from "../../Components/CreationPostPoll/CreationPostPoll";
import Modal from "../../Components/Modal/Modal";
// import FullPagePost from "../FullPagePost/FullPagePost";
import { v4 as uuidv4 } from "uuid";
// import AthleteFollowingSupportingPopUp from "../../Components/TemplatePopUp/AthleteFollowingSupportingPopUp/AthleteFollowingSupportingPopUp";
import AthleteSuggestPopUp from "../../Components/TemplatePopUp/AthleteSuggestPopUp/AthleteSuggestPopUp";
import NotificationPopUp from "../../Components/Navbar/NotificationPopUp/NotificationPopUp";
import { db } from "../../Configs/firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  getDocs,
  getDoc,
  doc,
  where,
  limit,
} from "firebase/firestore";
import { Network, Alchemy, NftFilters } from "alchemy-sdk";
const MemoPostsFeed = memo(PostsFeed, (prevProps, nextProps) => {
  // si les props ont changés
  if (prevProps === nextProps) {
    console.log("les props du post n'ont pas changés");
    return true;
  }
  console.log("les props du post ont changés");
  return false;
});
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
  const [athleteNftInfo, setAthleteNftInfo] = useState([]);
  const [nftsFromOwner, setNftsFromOwner] = useState([]);
  const [currentProfileUserWallet, setCurrentProfileUserWallet] = useState("");
  const [athletesSupportingData, setAthletesSupportingData] = useState([]);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
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
  }, [loggedInUser]);

  // retrouver les athletes suivis
  useEffect(() => {
    const userIdToFind = loggedInUser?.id;

    const usersRef = collection(db, "users");
    const q1 = query(usersRef, where("account_type", "==", "athlete"));

    const unsubscribe1 = onSnapshot(q1, async (querySnapshot) => {
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
    // setIsLoading(true);

    // const feedPostCollectionRef = collection(db, "feed_post");
    // const q2 = query(
    //   feedPostCollectionRef,
    //   where("status", "==", true),
    //   orderBy("createdAt", "desc")
    // );

    // const unsubscribe2 = onSnapshot(q2, (querySnapshot) => {
    //   const feedData = [];
    //   querySnapshot.forEach((doc) => {
    //     feedData.push({ ...doc.data(), id: doc.id, isDropdownClicked: false });
    //   });
    //   setPostData(feedData);
    //   setIsLoading(false);
    //   feedData.forEach((post) => {
    //     getCommentCount(post.id);
    //   });
    // });
    // Return the unsubscribe function to ensure this listener is removed when the component is unmounted
    return () => {
      unsubscribe1();
      // unsubscribe2();
    };
  }, [loggedInUser]);

  // retrouver les athlete supportés

  const handleDropdownPostFeedClick = useCallback(
    (e) => {
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
    },
    [dataPost, setIsDropdownClicked, setPostData]
  );
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
  // Api Alchemy setup
  const settings = {
    apiKey: "34lcNFh-vbBqL9ignec_nN40qLHVOfSo",
    network: Network.ETH_GOERLI,
    maxRetries: 10,
  };
  const alchemy = new Alchemy(settings);
  useEffect(() => {
    // get Nfts from Owner and Contracts
    async function getNftsForOwner() {
      let arraySofanCollection = [];
      let nftCollectionInfo = [];
      const q = query(collection(db, "nft_collections"));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          const nftcollectionInfo = doc.data();
          arraySofanCollection.push(nftcollectionInfo.collection_address);
          nftCollectionInfo.push(nftcollectionInfo);
        });
      } else {
        console.log("No collection found");
      }
      // Collecting all unique user IDs
      const uniqueUserIds = [
        ...new Set(nftCollectionInfo.map((item) => item.athlete_id)),
      ];

      // Fetching all users in one go
      const qUsers = query(
        collection(db, "users"),
        where("id", "in", uniqueUserIds)
      );
      const usersQuerySnapshot = await getDocs(qUsers);
      const usersData = usersQuerySnapshot.docs.map((doc) => doc.data());
      // console.log(usersData);

      // Now you can use usersData to get display_name or any other info

      let currentProfileWalletAddresses;
      if (isLogged?.metamask) {
        currentProfileWalletAddresses = isLogged.metamask;
        setCurrentProfileUserWallet(isLogged.metamask);
      } else if (isLogged?.web3auth) {
        currentProfileWalletAddresses = isLogged.web3auth;
        setCurrentProfileUserWallet(isLogged.web3auth);
      }
      // console.log(currentProfileWalletAddresses);

      try {
        const nftsFromOwner = await alchemy.nft.getNftsForOwner(
          currentProfileWalletAddresses,
          {
            contractAddresses: arraySofanCollection,
          }
        );
        let athletesSupportingArray = [];
        for (let i = 0; i < nftsFromOwner.ownedNfts.length; i++) {
          const elementFromAlchemy = nftsFromOwner.ownedNfts[i];
          for (let a = 0; a < nftCollectionInfo.length; a++) {
            const elementFromNftCollectionInfo = nftCollectionInfo[a];
            for (let b = 0; b < usersData.length; b++) {
              const elementFromUserData = usersData[b];
              if (
                elementFromAlchemy.contract.address ===
                  elementFromNftCollectionInfo.collection_address.toLowerCase() &&
                elementFromUserData.id ===
                  elementFromNftCollectionInfo.athlete_id
              ) {
                nftsFromOwner.ownedNfts[i] = {
                  ...nftsFromOwner.ownedNfts[i],
                  athleteName: elementFromUserData.display_name,
                  profileAvatar: elementFromUserData.profile_avatar,
                  athlete_id: elementFromUserData.id,
                };
                if (
                  !athletesSupportingArray.includes(
                    elementFromUserData.display_name
                  )
                ) {
                  athletesSupportingArray.push({
                    display_name: elementFromUserData.display_name,
                    profile_avatar: elementFromUserData.profile_avatar,
                    athlete_id: elementFromUserData.id,
                  });
                }
              }
            }
          }
        }
        function removeDuplicatesBy(keyFn, array) {
          const mySet = new Set();
          return array.filter((x) => {
            const key = keyFn(x);
            const isNew = !mySet.has(key);
            if (isNew) mySet.add(key);
            return isNew;
          });
        }
        const uniqueAthleteSupportingArray = removeDuplicatesBy(
          (x) => x.athlete_id,
          athletesSupportingArray
        );
        setAthletesSupportingData(uniqueAthleteSupportingArray);
        // setAthletesSupportingData(athletesSupportingArray);
        setNftsFromOwner(nftsFromOwner?.ownedNfts);
        // console.log("yess", nftsFromOwner);
      } catch (error) {
        console.error(error);
      }
    }
    getNftsForOwner();
  }, [isLogged]);
  // console.log("nftsFromOwner --> ",nftsFromOwner, "athletesSupportingData --> ",athletesSupportingData)
  // console.log(athletesSupportingData);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // useMemo
  // console.log(athletesFollowing)
  const modalStyle = useMemo(() => ({ top: "24px", right: "20px" }), []);
  return (
    <>
      <section className="home-component">
        <div
          className="home-left-container"
          style={
            isLogged?.account_type === "athlete"
              ? windowWidth < 950
                ? { height: "500px" }
                : { height: "726px", maxHeight: "726px" }
              : athletesFollowing.length === 0 &&
                athletesSupportingData.length === 0
              ? { height: "398px" }
              : { maxHeight: "552px" }
            // athletesFollowing.length === 0 ? {}: {}
          }
        >
          <div
            className="home-navlink-create-post-wrap"
            style={
              isLogged?.account_type === "athlete"
                ? { height: "0px" }
                : { height: "0px" }
            }
          >
            {/* <div className="home-feedsidenavlink-wrap">
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
            </div> */}
            {
              // isLogged === true &&
              // isLogged !== undefined &&
              isLogged?.account_type === "athlete" && (
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
          {/* {isSupportingOrFollowingAthlete && (
            <>
              <div className="home-left-separation-line"></div>
            </>
          )} */}
          <FavAthlete
            athletesSupportingData={athletesSupportingData}
            athletesFollowing={athletesFollowing}
          />
          <FeedSuggestions
            handleAthleteSuggestionClick={handleAthleteSuggestionClick}
            suggestionsAthletes={suggestionsAthletes}
            athletesSupportingData={athletesSupportingData}
          />
          <div
            style={
              loggedInUser?.account_type === "free"
                ? { paddingTop: "15px" }
                : {}
            }
            className="home-legals-mentions-container"
          >
            <a target="_blank" href="/mentions-legales">
              © 2023 Sofan
            </a>{" "}
            Tout droits réservés
          </div>
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
                    <MemoPostsFeed
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
        <Modal setState={setIsCreatePostButtonClicked} style={modalStyle}>
          <CreationPostPoll userId={loggedInUser.id} />
        </Modal>
      )}
      {isSuggestionSeeMoreButtonClicked && (
        <Modal setState={setIsSuggestSeeMoreButtonClicked} style={modalStyle}>
          <AthleteSuggestPopUp suggestionsAthletes={suggestionsAthletes} />
        </Modal>
      )}
      {isNotificationButtonClicked && (
        <Modal setState={setIsNotificationButtonClicked} style={modalStyle}>
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
