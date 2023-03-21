import React, { useEffect, useState } from "react";
import "./CreationPostPoll.css";
import PostPoll from "./PostPoll/PostPoll";

const CreationPostPoll = () => {
  const [file, setFile] = useState(null);
  const [isFile, setIsFile] = useState(0);
  const [step, setStep] = useState(0);
  const [isVisibilityClicked, setIsVisibilityClicked] = useState({
    0: { backgroundColor: "white" },
    1: { backgroundColor: "white" },
  });
  const [text, setText] = useState("");
  const handleFileUpload = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
  };
  const handleImgCrossClick = () => {
    // e.preventDefault();
    // setIsFile(0);
    setFile(null);
  };

  const handleNextClick = () => {
    if (step === 0 && text !== "") {
      setStep(step + 1);
    } else if (
      (step === 1 && isVisibilityClicked[0].backgroundColor !== "white") ||
      isVisibilityClicked[1].backgroundColor !== "white"
    ) {
      // Publier le contenu dans la BDD
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
          <div className="creation-text-wrap">
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
              postPollComponentTextArea={
                select.postPollComponentTextArea[isFile]
              }
              postPollPollTextArea={select.postPollComponentTextArea[2]}
              text={text}
              handleTextChange={handleTextChange}
            />
          ) : (
            <div className="creation-visibility-choice-container">
              <div
                id="0"
                onClick={handleVisibilityClicked}
                className=""
                style={isVisibilityClicked[0]}
              >
                <span>Only my fans</span>
              </div>
              <div
                id="1"
                onClick={handleVisibilityClicked}
                style={isVisibilityClicked[1]}
              >
                <span>All SoFan users</span>
              </div>
            </div>
          )}
          <button onClick={handleNextClick}>
            {step != 1 ? "Next" : "Publish"}
          </button>
        </div>
      </div>
    // </div>
  );
};

export default CreationPostPoll;
