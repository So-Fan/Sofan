import React, { useEffect, useState } from "react";
import "./CreationPostPoll.css";
import arrowPrevious from "../../Assets/Image/arrow-previous.svg";

import validationLogo from "../../Assets/Image/greencross-offers.svg";
import PostPoll from "./PostPoll/PostPoll";
import {
  db,
  storage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "../../Configs/firebase";
import { collection, addDoc, getDoc, doc, updateDoc, Timestamp } from "firebase/firestore";

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
  const [dateTimeValue, setDateTimeValue] = useState();
  console.log(dateTimeValue);
  const [pollData, setPollData] = useState({
    choices: [
      { id: 1, text: "" },
      { id: 2, text: "" },
      { id: 3, text: "" },
      { id: 4, text: "" },
    ],
    timer: {
      days: 0,
      hours: 0,
      minutes: 0,
      timestamp: 0,
    },
  });
  const handleFileUpload = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
  };
  const handleImgCrossClick = () => {
    // e.preventDefault();
    // setIsFile(0);
    setFile(null);
  };

  const arrayVerifier = {
    choices: [
      { id: 1, text: "" },
      { id: 2, text: "" },
      { id: 3, text: "" },
      { id: 4, text: "" },
    ],
    timer: {
      days: 0,
      hours: 0,
      minutes: 0,
      timestamp: 0,
    },
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

      // console.log(pollData);
      let post;

      if (
        pollData.choices[0].text === arrayVerifier.choices[0].text &&
        pollData.choices[1].text === arrayVerifier.choices[1].text &&
        pollData.choices[2].text === arrayVerifier.choices[2].text &&
        pollData.choices[3].text === arrayVerifier.choices[3].text &&
        pollData.timer.days === arrayVerifier.timer.days &&
        pollData.timer.hours === arrayVerifier.timer.hours &&
        pollData.timer.minutes === arrayVerifier.timer.minutes &&
        pollData.timer.timestamp === arrayVerifier.timer.timestamp
      ) {
        const postType = "post";
        post = {
          userId,
          text,
          visibility:
            isVisibilityClicked[0].backgroundColor === "#F6D463" ? false : true, // false = premium post | true = free post
          createdAt,
          imagePath: "",
          postType,
          pollData,
          likes: [],
          status: true,
          ...(dateTimeValue && { publish_timestamp: Timestamp.fromMillis(dateTimeValue * 1000) })
        };
      } else {
        const postType = "poll";
        post = {
          userId,
          text,
          visibility:
            isVisibilityClicked[0].backgroundColor === "#F6D463" ? false : true, // false = premium post | true = free post
          createdAt,
          postType,
          pollData,
          likes: [],
          status: true,
          ...(dateTimeValue && { publish_timestamp: Timestamp.fromMillis(dateTimeValue * 1000) })
        };
      }

      // Create a new post object to upload to Firestore

      try {
        // Upload the post object to Firestore
        // const postRef = collection(db, "scheduled_posts");
        const collectionName = dateTimeValue ? "scheduled_posts" : "feed_post";
        const postRef = collection(db, collectionName);
        let postUid;
        await addDoc(postRef, post).then((snapshot) => {
          postUid = snapshot.id;
        });

        // If an image was uploaded, upload it to Firebase Storage
        if (image) {
          const imagePath =
            image && image.name
              ? `feed_post_img/sofan_post_${createdAt.getTime()}_${image.name}`
              : null;

          const imageRef = ref(storage, imagePath);
          if (image && imagePath) {
            uploadBytes(imageRef, image).then((snapshot) => {
              console.log(snapshot);
              console.log("Uploaded a blob or file!");
              getDownloadURL(ref(storage, imagePath)).then((url) => {
                updatePostImagePath(postUid, url);
              });
            });
          }
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
  function handlePreviousStepPublishPost() {
    setStep(step - 1);
    console.log(step,"clickk")
  }
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
        <div
          style={validationPublishPost ? { visibility: "hidden" } : {}}
          className="creation-text-wrap"
        >
          <span>
            {step !== 1
              ? "Créer une publication"
              : "Qui peut voir votre publication ?"}
          </span>
          {step !== 1 ? (
            <></>
          ) : (
            <>
              <div
                onClick={handlePreviousStepPublishPost}
                className="creation-text-wrap-previous-arrow-container"
              >
                <img src={arrowPrevious} alt="FLECHE ETAPE PRECEDENTE" />
              </div>
            </>
          )}
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
            pollData={pollData}
            setPollData={setPollData}
            setDateTimeValue={setDateTimeValue}
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
              <p>Votre publication a bien été posté !</p>
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
              <span>Seulement mes fans</span>
            </div>
            <div
              id="1"
              onClick={handleVisibilityClicked}
              className="creation-visibility-choice-everyone"
              style={isVisibilityClicked[1]}
            >
              <span>Tout les users Sofan</span>
            </div>
          </div>
        )}
        <button
          style={validationPublishPost ? { visibility: "hidden" } : {}}
          onClick={handleNextClick}
        >
          {step !== 1 ? "Suivant" : "Publier"}
        </button>
      </div>
    </div>
    // </div>
  );
};

export default CreationPostPoll;
