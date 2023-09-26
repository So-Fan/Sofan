import React, { useState, useEffect } from "react";
import PostsFeed from "../PostsComponents/PostsFeed/PostsFeed";
import "./AthleteProfileFeed.css";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  getDocs,
} from "@firebase/firestore";
import { db } from "../../Configs/firebase";
import useUserCollection from "../../contexts/UserContext/useUserCollection";

function AthleteProfileFeed({
  athleteProfilePageStyling,
  athleteUserId,
  pixelScrolledAthleteProfilePage,
  isUserFan,
}) {
  // console.log(isUserFan);
  // console.log(dataPosts);
  // console.log(athleteProfileFeedPageStyling)
  // const [isUserFan, setIsUserFan] = useState(false);
  const [lockPremiumContent, setLockPremiumContent] = useState(false);
  const [freePosts, setFreePosts] = useState([]);
  const [premiumPosts, setPremiumPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [commentCounts, setCommentCounts] = useState({});
  const [commentCounterIncrementLocal, setCommentCounterIncrementLocal] =
    useState(0);
  const [likesCounterIncrementLocal, setLikesCounterIncrementLocal] = useState(
    parseInt(0)
  );
  const { loggedInUser } = useUserCollection();

  // useEffect(() => {
  //   setIsLoading(true);

  //   const feedPostCollectionRef = collection(db, "feed_post"); // Make sure to set your collection name
  //   // Add a condition to filter posts by user ID (assuming user's ID is stored in a 'userId' field)
  //   const userSpecificQuery = query(
  //     feedPostCollectionRef,
  //     where("userId", "==", athleteUserId), // Replace with the actual user ID or prop
  //     where("status", "==", true),
  //     orderBy("createdAt", "desc")
  //   );

  //   const unsubscribe = onSnapshot(userSpecificQuery, (querySnapshot) => {
  //     const freeData = [];
  //     const premiumData = [];

  //     querySnapshot.forEach((doc) => {
  //       const postData = {
  //         ...doc.data(),
  //         id: doc.id,
  //         isDropdownClicked: false,
  //       };

  //       if (postData.visibility) {
  //         freeData.push(postData);
  //       } else {
  //         premiumData.push(postData);
  //       }
  //     });

  //     setFreePosts(freeData);
  //     setPremiumPosts(premiumData);
  //     setIsLoading(false);
  //   });

  //   return () => unsubscribe(); // Cleanup on component unmount
  // }, [athleteUserId]);
  useEffect(() => {
    setIsLoading(true);
    const feedPostCollectionRef = collection(db, "feed_post");
    const q = query(
      feedPostCollectionRef,
      where("status", "==", true),
      where("visibility", "==", true),
      where("userId", "==", athleteUserId),
      orderBy("createdAt", "desc")
    );
    const unsubscribeFreePosts = onSnapshot(q, (querySnapshot) => {
      const feedData = [];
      querySnapshot.forEach((doc) => {
        feedData.push({
          ...doc.data(),
          id: doc.id,
          isDropdownClicked: false,
        });
      });
      setFreePosts(feedData);
      setIsLoading(false);
      feedData.forEach((post) => {
        getCommentCount(post.id);
      });
    });

    const qPremium = query(
      feedPostCollectionRef,
      where("status", "==", true),
      where("visibility", "==", false),
      where("userId", "==", athleteUserId),
      orderBy("createdAt", "desc")
    );
    const unsubscribePremiumPosts = onSnapshot(qPremium, (querySnapshot) => {
      const feedDataPremium = [];
      querySnapshot.forEach((doc) => {
        feedDataPremium.push({
          ...doc.data(),
          id: doc.id,
          isDropdownClicked: false,
        });
      });
      setPremiumPosts(feedDataPremium);
      setIsLoading(false);
      feedDataPremium.forEach((post) => {
        getCommentCount(post.id);
      });
    });

    // Combine both freePosts and premiumPosts into one array for processing
    const allPosts = [...freePosts, ...premiumPosts];
    allPosts.forEach((post) => {
      getCommentCount(post.id);
    });

    // Cleanup function
    return () => {
      unsubscribeFreePosts();
      unsubscribePremiumPosts();
    };
  }, []);

  function handleDisplayPremiumContent(i) {
    if (isUserFan === false && premiumPosts[i]?.visibility === false) {
      return true;
    } else if (isUserFan === true && premiumPosts[i]?.visibility === false) {
      return false;
    } else if (premiumPosts[i]?.visibility === true) {
      return false;
    }
  }
  // const getCommentCount = async (postId) => {
  //   const commentsRef = collection(db, `feed_post/${postId}/post_comments`);
  //   const q = query(commentsRef, where("status", "==", true));

  //   const querySnapshot = await getDocs(q);
  //   const commentCount = querySnapshot.size;

  //   setCommentCounts((prevState) => ({ ...prevState, [postId]: commentCount }));
  // };
  const getCommentCount = async (postId) => {
    const commentsRef = collection(db, `feed_post/${postId}/post_comments`);
    const q = query(commentsRef, where("status", "==", true));

    const querySnapshot = await getDocs(q);
    const commentCount = querySnapshot.size;

    setCommentCounts((prevState) => ({ ...prevState, [postId]: commentCount }));
  };

  // console.log(Object.values(commentCounts)[0]);
  // const postCommentNumber = Object.values(commentCounts)[0];
  // console.log(postCommentNumber);
  useEffect(() => {
    // Combine both freePosts and premiumPosts into one array for processing
    const allPosts = [...freePosts, ...premiumPosts];
    allPosts.forEach((post) => {
      getCommentCount(post.id);
    });
  }, [freePosts, premiumPosts]);
  Object.values(commentCounts).forEach((count) => {
    // console.log(count);
  });

  return (
    <section className="athlete-profile-feed-container">
      <div className="athlete-profie-feed-free-container">
        {freePosts?.map((post, index) => {
          return (
            // <PostsFeed
            //   athleteProfilePageStyling={athleteProfilePageStyling}
            //   key={uuidv4()}
            //   postDate={post.postDate}
            //   postDateType={post.postDateType}
            //   postType={post.postType}
            //   postName={post.postName}
            //   postPicture={post.postPicture}
            //   postDescription={post.postDescription}
            //   postLikeNumber={post.postLikeNumber}
            //   postCommentNumber={post.postCommentNumber}
            // />
            <PostsFeed
              key={post.id}
              id={post.id}
              singlePostData={post}
              postDate={post.createdAt.seconds}
              postDescription={post.text}
              postLikes={post.likes ? post.likes.length : 0}
              postCommentNumber={commentCounts[post.id] || 0}
              postType={post.visibility}
              postPicture={post.imagePath}
              postCreatorId={post.userId}
              loggedInUser={loggedInUser}
              polldata={post.pollData}
              setCommentCounterIncrementLocal={setCommentCounterIncrementLocal}
              commentCounterIncrementLocal={commentCounterIncrementLocal}
              pixelScrolledAthleteProfilePage={pixelScrolledAthleteProfilePage}
              setLikesCounterIncrementLocal={setLikesCounterIncrementLocal}
              likesCounterIncrementLocal={likesCounterIncrementLocal}
              //setIsPostClicked={setIsPostClicked}
              //lockPremiumContent={handleDisplayPremiumContent(index)}
              //handleDropdownPostFeedClick={handleDropdownPostFeedClick}
              //isDropdownClicked={isDropdownClicked}
            />
          );
        })}
      </div>
      <div className="athlete-profile-feed-premium-container">
        {premiumPosts?.map((post, index) => {
          return (
            // <PostsFeed
            //   athleteProfilePageStyling={athleteProfilePageStyling}
            //   key={uuidv4()}
            //   postDate={post.postDate}
            //   postDateType={post.postDateType}
            //   postType={post.postType}
            //   postName={post.postName}
            //   postDescription={post.postDescription}
            //   postLikeNumber={post.postLikeNumber}
            //   postCommentNumber={post.postCommentNumber}
            //   lockPremiumContent={handleDisplayPremiumContent}
            // />
            <PostsFeed
              key={post.id}
              id={post.id}
              singlePostData={post}
              postDate={post.createdAt.seconds}
              postDescription={post.text}
              postLikes={post.likes ? post.likes.length : 0}
              postCommentNumber={commentCounts[post.id] || 0}
              postType={post.visibility}
              postPicture={post.imagePath}
              postCreatorId={post.userId}
              loggedInUser={loggedInUser}
              polldata={post.pollData}
              lockPremiumContent={handleDisplayPremiumContent(index)}
              setCommentCounterIncrementLocal={setCommentCounterIncrementLocal}
              commentCounterIncrementLocal={commentCounterIncrementLocal}
              setLikesCounterIncrementLocal={setLikesCounterIncrementLocal}
              likesCounterIncrementLocal={likesCounterIncrementLocal}
              //setIsPostClicked={setIsPostClicked}
              //lockPremiumContent={handleDisplayPremiumContent(index)}
              //handleDropdownPostFeedClick={handleDropdownPostFeedClick}
              //isDropdownClicked={isDropdownClicked}
            />
          );
        })}
      </div>
    </section>
  );
}

export default AthleteProfileFeed;
