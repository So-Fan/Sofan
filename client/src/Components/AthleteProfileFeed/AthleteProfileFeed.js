import React, { useState, useEffect } from "react";
import PostsFeed from "../PostsComponents/PostsFeed/PostsFeed";
import "./AthleteProfileFeed.css";
import { v4 as uuidv4 } from "uuid";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "@firebase/firestore";
import { db } from "../../Configs/firebase";
import useUserCollection from "../../contexts/UserContext/useUserCollection";

function AthleteProfileFeed({ athleteProfilePageStyling, athleteUserId }) {
  // console.log(dataPosts);
  // console.log(athleteProfileFeedPageStyling)
  const [isUserFan, setIsUserFan] = useState(false);
  const [lockPremiumContent, setLockPremiumContent] = useState(false);
  const [freePosts, setFreePosts] = useState([]);
  const [premiumPosts, setPremiumPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { loggedInUser } = useUserCollection();

  useEffect(() => {
    setIsLoading(true);

    const feedPostCollectionRef = collection(db, "feed_post"); // Make sure to set your collection name

    // Add a condition to filter posts by user ID (assuming user's ID is stored in a 'userId' field)
    const userSpecificQuery = query(
      feedPostCollectionRef,
      where("userId", "==", athleteUserId), // Replace with the actual user ID or prop
      where("status", "==", true),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(userSpecificQuery, (querySnapshot) => {
      const freeData = [];
      const premiumData = [];

      querySnapshot.forEach((doc) => {
        const postData = {
          ...doc.data(),
          id: doc.id,
          isDropdownClicked: false,
        };

        if (postData.visibility) {
          freeData.push(postData);
        } else {
          premiumData.push(postData);
        }
      });

      setFreePosts(freeData);
      setPremiumPosts(premiumData);
      setIsLoading(false);
    });

    return () => unsubscribe(); // Cleanup on component unmount
  }, []);

  // function handleDisplayPremiumContent(i) {
  //   if (isUserFan === false && dataPosts[i]?.postType === "Premium") {
  //     setLockPremiumContent(true);
  //     // return true;
  //   } else if (isUserFan === true && dataPosts[i]?.postType === "Premium") {
  //     setLockPremiumContent(false);
  //     // return ;
  //   } else if (dataPosts[i]?.postType === "Free") {
  //     setLockPremiumContent(false);
  //     // return ;
  //   }
  // }
  //handleDisplayPremiumContent();
  // function separatorPremiumFree() {
  //   const freePosts = dataPosts?.filter((post) => post.postType === "Free");
  //   const premiumPosts = dataPosts?.filter(
  //     (post) => post.postType === "Premium"
  //   );
  //   return { freePosts, premiumPosts };
  // }
  // const { freePosts, premiumPosts } = separatorPremiumFree();
  // Tri des posts par ordre croissant de postDate
  // A trier par type de date (month, hours ...)
  //dataPosts?.sort((a, b) => a.postDate - b.postDate);
  function handleDisplayPremiumContent(i) {
    if (isUserFan === false && premiumPosts[i]?.visibility === false) {
      return true;
    } else if (isUserFan === true && premiumPosts[i]?.visibility === false) {
      return false;
    } else if (premiumPosts[i]?.visibility === true) {
      return false;
    }
  }
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
              key={uuidv4()}
              id={post.id}
              singlePostData={post}
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
              key={uuidv4()}
              id={post.id}
              singlePostData={post}
              postDate={post.createdAt.seconds}
              postDescription={post.text}
              postLikes={post.likes ? post.likes.length : 0}
              postCommentNumber={post?.comments?.length}
              postType={post.visibility}
              postPicture={post.imagePath}
              postCreatorId={post.userId}
              loggedInUser={loggedInUser}
              lockPremiumContent={handleDisplayPremiumContent(index)}
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
