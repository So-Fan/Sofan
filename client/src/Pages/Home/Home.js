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
// import { Network, Alchemy, NftFilters } from "alchemy-sdk";

import Web3 from "web3";
import useToggleNetwork from "../../contexts/ToggleNetwork/useToggleNetwork";
const MemoPostsFeed = memo(PostsFeed, (prevProps, nextProps) => {
  // si les props ont changés
  if (prevProps === nextProps) {
    // console.log("les props du post n'ont pas changés");
    return true;
  }
  // console.log("les props du post ont changés");
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
  // const [isUserFan, setIsUserFan] = useState(false);
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
  const [likesCounterIncrementLocal, setLikesCounterIncrementLocal] =
    useState();
  const [athletesFollowing, setAthletesFollowing] = useState([]);
  const [athleteNftInfo, setAthleteNftInfo] = useState([]);
  const [nftsFromOwner, setNftsFromOwner] = useState([]);
  const [currentProfileUserWallet, setCurrentProfileUserWallet] = useState("");
  const [athletesSupportingData, setAthletesSupportingData] = useState([]);
  const { alchemy } = useToggleNetwork();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isAthleteAlreadyTested, setIsAthleteAlreadyTested] = useState([]);
  async function handleDisplayPremiumContent(i) {
    // console.log("enter");
    let isUserFan = false;
    // console.log(dataPost);
    // // Récuperer du dataPost l'id de l'athlete
    // // console.log(dataPost[i].userId);
    // // Vérifier si l'id de l'athlete à déja ete testé
    // // si déjà tester alors return le status stocké en mémoire
    // for (let j = 0; j < isAthleteAlreadyTested.length; j++) {
    //   const element = isAthleteAlreadyTested[j];
    //   console.log(element);
    //   if (element.id === dataPost[j].userId) {
    //     console.log("Athlete already tested. EXIT.");
    //     return element.isUserFan;
    //   }
    // }
    // // sinon
    // // requête firebase vers nft_collection where id == id
    // const q = query(
    //   collection(db, "nft_collections"),
    //   where("athlete_id", "==", dataPost[i].userId)
    // );
    // const querySnapshot = await getDocs(q);

    // let tempAllAthleteCollection = [];
    // if (!querySnapshot.empty) {
    //   querySnapshot.forEach((doc) => {
    //     const tempNftcollectionInfo = doc.data();
    //     tempAllAthleteCollection.push(tempNftcollectionInfo);
    //   });
    // } else {
    //   console.log("No collection found");
    // }
    // // Pour chacune des collections vérifier si le loggedin user possède au moins 1 nft
    // // sdk alchemy gets owner for contract, comparer si l'addresse du loggedin user est include dans le result
    // // break dès que une comparaison est true
    // // let isFind = false;
    // for (let a = 0; a < tempAllAthleteCollection.length; a++) {
    //   const element = tempAllAthleteCollection[a];
    //   if (isUserFan === true) {
    //     console.log("I break !");
    //     break;
    //   }
    //   const allAthleteCollectionOwners = await alchemy.nft.getOwnersForContract(
    //     element.collection_address
    //   );
    //   // console.log(allAthleteCollectionOwners.owners);
    //   for (let b = 0; b < allAthleteCollectionOwners.owners.length; b++) {
    //     const elementFromAlchemy = allAthleteCollectionOwners.owners[b];
    //     if (
    //       elementFromAlchemy.toLowerCase() ===
    //         loggedInUser?.metamask?.toLowerCase() ||
    //       elementFromAlchemy.toLowerCase() ===
    //         loggedInUser?.web3auth?.toLowerCase()
    //     ) {
    //       console.log("I found a new fan !");
    //       isUserFan = true;
    //     }
    //   }
    // }
    // console.log(isAthleteAlreadyTested);
    // setIsAthleteAlreadyTested((prevState) => [
    //   ...prevState,
    //   { id: dataPost[i].userId, isUserFan: isUserFan },
    // ]);
    // Gardez en mémoire l'id de l'athlete testé et le status de l'user
    if (isUserFan === false && dataPost[i]?.visibility === false) {
      // console.log("pas fan et post privé");
      return true;
    } else if (isUserFan === true && dataPost[i]?.visibility === false) {
      // console.log("Fan et post privé");
      return false;
    } else if (dataPost[i]?.visibility === true) {
      // console.log("post public");
      return false;
    }
  }
  const [isUserFanArray, setIsUserFanArray] = useState([]);
  useEffect(() => {
    // Désactiver le scroll au chargement
    window.scrollTo(0, 0);
    // Réactiver le scroll
  }, []);
  useEffect(() => {
    // console.log("Hello");
    // console.log(dataPost);
    // console.log(loggedInUser);
    if (
      dataPost &&
      loggedInUser
      // && (loggedInUser?.metamask || loggedInUser?.web3auth)
    ) {
      // 1 for loop de data post
      // Await nft collections where id === element.athlete id
      //  recuperer le wallet du loggedinUser
      // 2 options : call balanceOf de chacun des smart contract ou getOwnersForContract alchemy
      // SC
      // si = 0 alors on continue la boucle
      // si > 0 alors stop la boucle
      // on push dans le tableau un objet
      // A la toute fin on set un state
      // dans le mapping de data post on change pour si etat exist alors etat[i]
      const feedDataFromAlchemyAndFirebase = async () => {
        let tempIsUserFanArray = [];
        for (let i = 0; i < dataPost.length; i++) {
          let isUserFan = false;
          const postElement = dataPost[i];
          const q = query(
            collection(db, "nft_collections"),
            where("athlete_id", "==", postElement.userId)
          );
          const querySnapshot = await getDocs(q);

          let tempAllAthleteCollection = [];
          if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
              const tempNftcollectionInfo = doc.data();
              tempAllAthleteCollection.push(tempNftcollectionInfo);
            });
          } else {
          }

          let currentUserWallet;
          if (loggedInUser?.metamask) {
            currentUserWallet = loggedInUser?.metamask;
          } else if (loggedInUser?.web3auth) {
            currentUserWallet = loggedInUser?.web3auth;
          }

          const web3Instance = new Web3(
            new Web3.providers.HttpProvider(process.env.REACT_APP_INFURA_ID)
          );
          const { abi } = require("../../contracts/SofanNft.json");

          for (let a = 0; a < tempAllAthleteCollection.length; a++) {
            const collectionElement = tempAllAthleteCollection[a];
            const contractInfura = new web3Instance.eth.Contract(
              abi,
              `${collectionElement.collection_address}`
            );
            let balanceOf;
            try {
              balanceOf = await contractInfura.methods
                .balanceOf(currentUserWallet)
                .call();
            } catch (error) {
              console.error();
            }

            if (balanceOf > 0) {
              isUserFan = true;
              break;
            }
          }

          let judgement;
          if (isUserFan === false && dataPost[i]?.visibility === false) {
            // console.log("pas fan et post privé");
            judgement = true;
          } else if (isUserFan === true && dataPost[i]?.visibility === false) {
            // console.log("Fan et post privé");
            judgement = false;
          } else if (dataPost[i]?.visibility === true) {
            // console.log("post public");
            judgement = false;
          }

          tempIsUserFanArray.push(judgement);
        }
        // console.log(tempIsUserFanArray);
        setIsUserFanArray(tempIsUserFanArray);
      };
// console.log("appel de la fontion feedDataFrom")
      feedDataFromAlchemyAndFirebase();

      
    }
  }, [dataPost, loggedInUser]);

  const getCommentCount = (postId) => {
    const commentsRef = collection(db, `feed_post/${postId}/post_comments`);
    const q = query(commentsRef, where("status", "==", true));

    // Real-time listener for comments
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const commentCount = querySnapshot.size;
      setCommentCounts((prevState) => ({
        ...prevState,
        [postId]: commentCount,
      }));
    });

    // Save this unsubscribe somewhere so you can call it when you don't need it anymore.
    return unsubscribe;
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const userIdToFind = loggedInUser?.id;
      const usersRef = collection(db, "users");
      const q1 = query(usersRef, where("account_type", "==", "athlete"));

      const querySnapshot1 = await getDocs(q1);
      const foundAthletes = [];
      for (let doc of querySnapshot1.docs) {
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
                display_name: userData.display_name,
              });
            }
          }
        });
      }
      setAthletesFollowing(foundAthletes);

      const unsubscribes = []; // To keep track of all unsubscribe functions for comments

      const feedPostCollectionRef = collection(db, "feed_post");
      const q2 = query(
        feedPostCollectionRef,
        where("status", "==", true),
        orderBy("createdAt", "desc")
      );

      // Real-time listener for feed posts
      const unsubscribePosts = onSnapshot(q2, (querySnapshot) => {
        const feedData = [];
        querySnapshot.forEach((doc) => {
          feedData.push({
            ...doc.data(),
            id: doc.id,
            isDropdownClicked: false,
          });
        });
        setPostData(feedData);
        setIsLoading(false);

        unsubscribes.forEach((unsub) => unsub()); // Unsubscribe previous comment listeners
        unsubscribes.length = 0; // Reset unsubscribe array

        feedData.forEach((post) => {
          const unsubscribeComments = getCommentCount(post.id);
          unsubscribes.push(unsubscribeComments);
        });
      });

      return () => {
        unsubscribePosts(); // Cleanup: unsubscribe from real-time posts listener
        unsubscribes.forEach((unsub) => unsub()); // Cleanup: unsubscribe from all real-time comment listeners
      };
    };

    fetchData();

    // Cleanup could also go here if needed for other async operations
    return () => {
      // ...
    };
  }, [loggedInUser]); // or whatever dependency array makes sense here

  // retrouver les athlete supportés

  const handleDropdownPostFeedClick = useCallback(
    (e) => {
      for (let i = 0; i < dataPost.length; i++) {
        if (
          e.currentTarget.id === dataPost[i].id &&
          dataPost[i].isDropdownClicked === false
        ) {
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
  function handleClickCopyPostLink(postId) {
    navigator.clipboard.writeText(`https://staging.sofan.app/post/${postId}`);
    setIsCopyPostLinkClicked(true);
    setTimeout(() => {
      setCopyPostAnimationHide(true);
    }, 5000);
    setTimeout(() => {
      setIsCopyPostLinkClicked(false);
      setCopyPostAnimationHide(false);
    }, 5700);
  }
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
        setNftsFromOwner(nftsFromOwner?.ownedNfts);
      } catch (error) {
        console.error(error);
      }
    }
    if (isLogged && alchemy) {
      getNftsForOwner();
    }
  }, [isLogged, alchemy]);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const modalStyle = useMemo(() => ({ top: "24px", right: "20px" }), []);
  const year = new Date().getFullYear();
  return (
    <>
      <section className="home-component">
        
        <div
          className="home-left-container"
          style={(() => {
            if (
              isLogged?.account_type === "admin" ||
              isLogged?.account_type === "athlete"
            ) {
              if (windowWidth < 950) {
                return { height: "500px" };
              } else {
                return { height: "726px", maxHeight: "726px" };
              }
            } else if (
              athletesFollowing.length === 0 &&
              athletesSupportingData.length === 0
            ) {
              return { height: "398px" };
            } else {
              return { maxHeight: "580px" };
            }
          })()}
        >
          <div
            className="home-navlink-create-post-wrap"
            style={{ height: "0px" }}
          >
            {(() => {
              if (
                isLogged?.account_type === "admin" ||
                isLogged?.account_type === "athlete"
              ) {
                return (
                  <>
                    <Button
                      createPostButtonclassName="button-component-create-post"
                      style={CreatePostButtonStyle.inlineStyle}
                      customMediaQueries={
                        CreatePostButtonStyle.customMediaQueries
                      }
                      text="Créer une publication"
                      onClick={handleCreatePostClick}
                      hover="button-hover-props"
                      active="button-active-props"
                    />
                  </>
                );
              }
            })()}
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
            loggedInUser={loggedInUser}
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
              © {year} Sofan
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
                  // console.log(isUserFanArray[index]);
                  return (
                    <PostsFeed
                      key={post.id}
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
                      lockPremiumContent={
                        isUserFanArray.length > 0
                          ? isUserFanArray[index]
                          : handleDisplayPremiumContent(index)
                      }
                      // lockPremiumContent={handleDisplayPremiumContent(index)}
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
                      likesCounterIncrementLocal={likesCounterIncrementLocal}
                      setLikesCounterIncrementLocal={
                        setLikesCounterIncrementLocal
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
