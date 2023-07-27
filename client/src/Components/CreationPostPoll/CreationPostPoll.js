import React, { useEffect, useState } from "react";
import "./CreationPostPoll.css";
import validationLogo from "../../Assets/Image/greencross-offers.svg";
import PostPoll from "./PostPoll/PostPoll";
import {
  db,
  storage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "../../Configs/firebase";
import { collection, addDoc, getDoc, doc } from "firebase/firestore";
import { updateDoc, query, where, getDocs } from "firebase/firestore";

const CreationPostPoll = ({ userId }) => {
  const [file, setFile] = useState(null);
  const [image, setImage] = useState({});
  const [isFile, setIsFile] = useState(0);
  const [step, setStep] = useState(0);
  const [isVisibilityClicked, setIsVisibilityClicked] = useState({
    0: { backgroundColor: "white" },
    1: { backgroundColor: "white" },
  });
  const [text, setText] = useState("");
  const [loadingPublishPost, setLoadingPublishPost] = useState(false);
  const [validationPublishPost, setValidationPublishPost] = useState(false);
  const handleFileUpload = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
  };
  const handleImgCrossClick = () => {
    // e.preventDefault();
    // setIsFile(0);
    setFile(null);
  };

  const handleNextClick = async () => {
    console.log(image.name);
    if (step === 0 && text !== "") {
      setStep(step + 1);
    } else if (
      (step === 1 && isVisibilityClicked[0].backgroundColor !== "white") ||
      isVisibilityClicked[1].backgroundColor !== "white"
    ) {
      // Publier le contenu dans la BDD
      console.log("Post about to be posted");
      setLoadingPublishPost(true);
      const createdAt = new Date();
      const postType = "normal";

      const imagePath = image.name
        ? `feed_post_img/sofan_post_${createdAt.getTime()}_${image.name}`
        : null;
      // Create a new post object to upload to Firestore
      const post = {
        userId,
        text,
        visibility:
          isVisibilityClicked[0].backgroundColor === "#F6D463" ? false : true, // false = premium post | true = free post
        createdAt,
        imagePath: "",
        postType,
        likes: 0,
        comments: [],
        // Add any other data you want to save for the post
      };

      try {
        // Upload the post object to Firestore
        const postRef = collection(db, "feed_post");
        let postUid;
        await addDoc(postRef, post).then((snapshot) => {
          postUid = snapshot.id;
        });

        // If an image was uploaded, upload it to Firebase Storage
        if (image) {
          const imageRef = ref(storage, imagePath);
          uploadBytes(imageRef, image).then((snapshot) => {
            console.log(snapshot);
            console.log("Uploaded a blob or file!");

            if (imagePath) {
              getDownloadURL(ref(storage, imagePath)).then((url) => {
                updatePostImagePath(postUid, url);
              });
            }

            // Mettre une message de validation
          });
        }
        console.log("Post added successfully!");
        setLoadingPublishPost(false);
        setValidationPublishPost(true);
        // Reset state and navigate to the homepage or display a success message
      } catch (error) {
        console.error("Error adding post: ", error);
        // Display an error message to the user
      }
    }
  };

  // Update Post Image Path With URL
  const updatePostImagePath = async (uid, path) => {
    try {
      const postRef = doc(db, "feed_post", uid);
      const postDoc = await getDoc(postRef);

      if (postDoc.exists()) {
        const updatedData = { imagePath: path };

        updateDoc(postRef, updatedData)
          .then(() => {
            console.log("Image path updated successfully!");
          })
          .catch((error) => {
            console.error("Error updating image path:", error);
          });
      } else {
        console.log("No post found");
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const handleVisibilityClicked = (e) => {
    if (e.target.id === "0") {
      setIsVisibilityClicked({
        0: { backgroundColor: "#F6D463" },
        1: { backgroundColor: "white" },
      });
    } else {
      setIsVisibilityClicked({
        0: { backgroundColor: "white" },
        1: { backgroundColor: "#F6D463" },
      });
    }
  };
  const select = {
    creationPostContainer: [{ height: "566px" }, { minHeight: "771px" }],
    creationPostWrap: [{ height: "524px" }, { minHeight: "728px" }],
    postPollComponent: [{ height: "369px" }, { minHeight: "610px" }],
    postPollComponentTextArea: [
      { height: "349px" },
      { minHeight: "70px" },
      { maxHeight: "30px" },
    ],
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };
  useEffect(() => {
    if (isFile === 0) {
      setIsFile(1);
    } else {
      setIsFile(0);
    }
  }, [file]);

  useEffect(() => {
    setIsFile(0);
  }, []);

  return (
    // <div className="creation-post-component">
    <div
      className="creation-post-container"
      style={select.creationPostContainer[isFile]}
    >
      <div
        className="creation-post-wrap"
        style={select.creationPostWrap[isFile]}
      >
        <div style={validationPublishPost ? {visibility:"hidden"}: {}} className="creation-text-wrap">
          <span>{step != 1 ? "Create a post" : "Who can see your post"}</span>
          <button className="cancel-button-creation-post">
            {/* <img src={Cross} alt="a cross" /> */}
          </button>
        </div>
        {step !== 1 ? (
          <PostPoll
            file={file}
            setFile={setFile}
            setIsFile={setIsFile}
            handleFileUpload={(e) => handleFileUpload(e)}
            handleImgCrossClick={(e) => handleImgCrossClick(e)}
            postPollComponent={select.postPollComponent[isFile]}
            postPollComponentTextArea={select.postPollComponentTextArea[isFile]}
            postPollPollTextArea={select.postPollComponentTextArea[2]}
            text={text}
            handleTextChange={handleTextChange}
          />
        ) : loadingPublishPost ? (
          <>
            <div className="lds-ripple">
              <div></div>
              <div></div>
            </div>
          </>
        ) : validationPublishPost ? (
          <>
            <div className="creation-post-validation-message">
              <div>
                <img src={validationLogo} alt="" />
              </div>
              <p>
              Votre publication a bien été posté !
              </p>
              </div>
          </>
        ) : (
          <div className="creation-visibility-choice-container">
            <div
              id="0"
              onClick={handleVisibilityClicked}
              className="creation-visibility-choice-fans-only"
              style={isVisibilityClicked[0]}
            >
              <span>Only my fans</span>
            </div>
            <div
              id="1"
              onClick={handleVisibilityClicked}
              className="creation-visibility-choice-everyone"
              style={isVisibilityClicked[1]}
            >
              <span>All SoFan users</span>
            </div>
          </div>
        )}
        <button style={validationPublishPost ? {visibility:"hidden"}: {}} onClick={handleNextClick}>
          {step != 1 ? "Next" : "Publish"}
        </button>
      </div>
    </div>
    // </div>
  );
};

export default CreationPostPoll;
