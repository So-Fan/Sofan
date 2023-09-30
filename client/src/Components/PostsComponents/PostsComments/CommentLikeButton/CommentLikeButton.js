import React, { useState, useEffect } from "react";
import "../../../PostsComponents/LikeButton/LikeButton.css";
import { db } from "../../../../Configs/firebase";
import {
  doc,
  collection,
  getDoc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";

function CommentLikeButton({
  likeButtonSize,
  likeButtonSizePollPost,
  postId,
  loggedInUserId,
  // setIsPostClicked,
    // isPostClicked,
  commentId,
  isMediaQueriesFullPagePostDisabled,
  fullPagePostModalStyle,
  fullPagePostPageStyle
}) {
    const [isCommentLiked, setIsCommentLiked] = useState(false);

  useEffect(() => {
    const commentRef = doc(collection(doc(db, "feed_post", postId), "post_comments"), commentId);
    const unsubscribe = onSnapshot(commentRef, (docSnap) => {
      if (docSnap.exists()) {
        const likes = docSnap.data().likes || [];
        setIsCommentLiked(likes.includes(loggedInUserId));
      }
    });

    return () => unsubscribe();
  }, [postId, commentId, loggedInUserId]);

  const handleClick = async (e) => {
    e.preventDefault();
    if (loggedInUserId) {
      try {
        const commentRef = doc(collection(doc(db, "feed_post", postId), "post_comments"), commentId);
        const commentSnap = await getDoc(commentRef);

        if (!commentSnap.exists()) {
          console.log("No such comment!");
          return;
        }

        const likes = commentSnap.data().likes || [];

        if (likes.includes(loggedInUserId)) {
          likes.splice(likes.indexOf(loggedInUserId), 1);
        } else {
          likes.push(loggedInUserId);
        }

        await updateDoc(commentRef, { likes });
      } catch (err) {
        console.error(err);
      }
    } else {
      console.log("please log in first");
    }
  };

  const handleSizeWidth = () => {
    if (likeButtonSize === "likeButton-M-size") {
      return 22;
    } else if (likeButtonSize === "likeButton-S-size") {
      return 15;
    }
  };
  const handleSizeHeight = () => {
    if (likeButtonSize === "likeButton-M-size") {
      return 19;
    } else if (likeButtonSize === "likeButton-S-size") {
      return 13;
    }
  };

  return (
    <>
      <div
        className={
          isMediaQueriesFullPagePostDisabled
            ? `logo-likes-no-media-queries ${likeButtonSizePollPost}`
            : fullPagePostModalStyle || fullPagePostPageStyle
            ? `logo-likes-fullpagepost-modal-and-page ${likeButtonSizePollPost}`
            : `logo-likes ${likeButtonSizePollPost}`
        }
      >
        {isCommentLiked ? (
          <>
            <>
              <div className="logo-like-red">
                <button
                  className="button-like-toggle-color"
                  onClick={handleClick}
                >
                  <svg
                    width={handleSizeWidth()}
                    height={handleSizeHeight()}
                    viewBox="0 0 22 19"
                    fill="none"
                    version="1.1"
                    id="svg44"
                  >
                    <defs id="defs48" />
                    <path
                      d="m 6.97514,2.28213 c 1.24267,0.02553 2.45311,0.59193 3.32076,2.09537 0.3224,0.55763 1.1271,0.55763 1.4508,0 0.8679,-1.50318 2.0784,-2.06958 3.3208,-2.09537 1.2427,-0.02709 2.5148,0.55892 3.2994,1.50189 1.514,1.82171 1.7074,5.00527 -0.5092,7.23558 L 11.0212,16.91 4.18363,11.0196 C 1.96832,8.78954 2.16047,5.60573 3.67578,3.78402 4.46038,2.84105 5.73246,2.25504 6.97514,2.28213 Z M 7.01125,0.60459 C 5.23544,0.566675 3.51199,1.35953 2.38616,2.71209 0.303937,5.21627 0.178844,9.38045 3.00001,12.2109 c 0.01496,0.0152 0.03096,0.0297 0.0472,0.0444 l 7.42739,6.3967 c 0.3145,0.2701 0.7792,0.2701 1.0934,0 l 7.4287,-6.3967 c 0.0163,-0.0147 0.031,-0.0292 0.0459,-0.0444 C 21.8638,9.38019 21.7371,5.21627 19.6552,2.71209 18.5309,1.35928 16.8059,0.566417 15.0311,0.60459 13.5589,0.635025 12.139,1.45316 11.0212,2.79256 9.9036,1.45316 8.48373,0.635025 7.01125,0.60459 Z"
                      fill="#000000"
                      id="path42"
                    />
                    <path
                      style={{
                        fill: "#ff0000",
                        stroke: "none",
                        strokeWidth: 0,
                      }}
                      d="M 7.5527159,13.867641 C 5.512685,12.106541 3.9595644,10.714722 3.7698805,10.477678 3.3394552,9.9397843 2.992175,9.2624746 2.7732861,8.5339942 2.5341929,7.7382721 2.517617,6.5446486 2.7344686,5.7387475 3.1758031,4.0985839 4.4024821,2.8312066 5.9226547,2.4447851 6.4357269,2.3143643 7.3612834,2.31488 7.8641764,2.445867 c 0.869008,0.2263478 1.7145707,0.8760498 2.2771026,1.7496492 0.302135,0.4692086 0.518934,0.6250882 0.86938,0.6250882 0.373161,0 0.592142,-0.152872 0.903471,-0.6307184 0.156573,-0.240317 0.48886,-0.6295546 0.738415,-0.8649726 0.729064,-0.6877616 1.466842,-0.9793592 2.481468,-0.9807694 3.358147,-0.00467 5.390003,3.8290853 3.775462,7.1236241 -0.474332,0.9678939 -0.673094,1.1665369 -4.246803,4.2442619 -1.859615,1.601524 -3.441376,2.963962 -3.515024,3.027639 -0.130273,0.112635 -0.2278,0.03472 -3.5949321,-2.872028 z"
                      id="path380"
                    />
                  </svg>
                </button>
              </div>
            </>
          </>
        ) : (
          <>
            <button className="button-like-toggle-color" onClick={handleClick}>
              <svg
                width={handleSizeWidth()}
                height={handleSizeHeight()}
                viewBox="0 0 22 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.97514 2.28213C8.21781 2.30766 9.42825 2.87406 10.2959 4.3775C10.6183 4.93513 11.423 4.93513 11.7467 4.3775C12.6146 2.87432 13.8251 2.30792 15.0675 2.28213C16.3102 2.25504 17.5823 2.84105 18.3669 3.78402C19.8809 5.60573 20.0743 8.78929 17.8577 11.0196L11.0212 16.91L4.18363 11.0196C1.96832 8.78954 2.16047 5.60573 3.67578 3.78402C4.46038 2.84105 5.73246 2.25504 6.97514 2.28213ZM7.01125 0.60459C5.23544 0.566675 3.51199 1.35953 2.38616 2.71209C0.303937 5.21627 0.178844 9.38045 3.00001 12.2109C3.01497 12.2261 3.03097 12.2406 3.04721 12.2553L10.4746 18.652C10.7891 18.9221 11.2538 18.9221 11.568 18.652L18.9967 12.2553C19.013 12.2406 19.0277 12.2261 19.0426 12.2109C21.8638 9.38019 21.7371 5.21627 19.6552 2.71209C18.5309 1.35928 16.8059 0.566417 15.0311 0.60459C13.5589 0.635025 12.139 1.45316 11.0212 2.79256C9.9036 1.45316 8.48373 0.635025 7.01125 0.60459Z"
                  fill="black"
                />
              </svg>
            </button>
          </>
        )}
      </div>
    </>
  );
}

export default CommentLikeButton;
