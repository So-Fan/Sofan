import "./FullPagePostPage.css";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import FullPagePost from "../FullPagePost/FullPagePost";
import { v4 as uuidv4 } from "uuid";
import { db } from "../../Configs/firebase";
import { collection, getDoc, doc } from "firebase/firestore";
function FullPagePostPage({ dataPost, isLogged, postType }) {
  const [fullpagePostPageData, setFullPagePostPageData] = useState([]);
  const [isCopyPostLinkClicked, setIsCopyPostLinkClicked] = useState(false);
  const [copyPostAnimationHide, setCopyPostAnimationHide] = useState(false);
  const location = useLocation();
  const segments = location.pathname.split("/");
  const postId = segments[2];
  console.log(location.pathname);
  const feedPostCollection = collection(db, "feed_post");
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
  }
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
          handleClickCopyPostLink={handleClickCopyPostLink}
          fullPagePostPageStyle={true}
        />
      )}
    </div>
  );
}

export default FullPagePostPage;
