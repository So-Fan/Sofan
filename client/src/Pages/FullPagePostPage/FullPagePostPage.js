import "./FullPagePostPage.css";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import FullPagePost from "../FullPagePost/FullPagePost";
import { v4 as uuidv4 } from "uuid";
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
function FullPagePostPage({ dataPost, isLogged, postType }) {
  const [fullpagePostPageData, setFullPagePostPageData] = useState([]);
  const location = useLocation();
  const segments = location.pathname.split("/");
  const postId = segments[2];
  console.log(location.pathname);
  const feedPostCollection = collection(db, "feed_post");
  //   useEffect(() => {
  //     async function getFullPagePostPageData() {
  //       // Create a query against the collection
  //       const q = query(
  //         suggestionCollectionAthlete,
  //         where("account_type", "==", "athlete"),
  //         // limit(4)
  //       );

  //       const data = await getDocs(q);
  //       setFullPagePostPageData(
  //         data.docs.map((doc) => {
  //           const docData = doc.data();
  //           return {
  //             display_name: docData.display_name,
  //             profile_avatar: docData.profile_avatar,
  //             sport: docData.sport,
  //             id: doc.id, // Include the document ID if needed
  //           };
  //         })
  //       );
  //     }
  //     getFullPagePostPageData();
  //   }, []);
  //   id
  //   async function getDocumentById() {
  //     const docRef = doc(feedPostCollection, postId);
  //     const docSnap = await getDoc(docRef);

  //     if (docSnap.exists()) {
  //       console.log("Document data:", docSnap.data());
  //     //   setFullPagePostPageData((prevData) => [...prevData, docSnap.data()]);
  //     } else {
  //       console.log("No such document!");
  //     }
  //   }
  //   getDocumentById();
  useEffect(() => {
    async function getDocumentById() {
      const docRef = doc(feedPostCollection, postId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data());
        setFullPagePostPageData((prevData) => {
          if (!prevData.some((post) => post.id === docSnap.id)) {
            return [...prevData, docSnap.data()];
          }
          return prevData;
        });
      }
    }

    getDocumentById();
  }, [postId]);
  console.log(fullpagePostPageData);
  return (
    <div className="fullpagepost-page-container">
      {fullpagePostPageData.length !== 0 && (
        <FullPagePost
          key={uuidv4()}
          id={postId}
          postType={fullpagePostPageData[0]?.visibility}
          postDate={fullpagePostPageData[0]?.createdAt.seconds}
          postDescription={fullpagePostPageData[0]?.text}
          postCreatorId={fullpagePostPageData[0]?.userId}
          loggedInUserId={isLogged?.id}
          postLikes={
            fullpagePostPageData[0]?.likes
              ? fullpagePostPageData[0]?.likes.length
              : 0
          }
          postCommentNumber={fullpagePostPageData[0]?.comments?.length}
          postPicture={fullpagePostPageData[0]?.imagePath}
          polldata={fullpagePostPageData[0]?.pollData}
        />
      )}
    </div>
  );
}

export default FullPagePostPage;
