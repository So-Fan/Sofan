import React, { useEffect, useState } from "react";
import "./CreationPostPoll.css";
import Cross from "../../Assets/image/cross.svg";
import PostPoll from "./PostPoll/PostPoll";

const CreationPostPoll = () => {
  const [file, setFile] = useState(null);
  const [isFile, setIsFile] = useState(0);
  const handleFileUpload = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
  };
  const handleImgCrossClick = () => {
    // e.preventDefault();
    // setIsFile(0);
    setFile(null);
  }
  const select = {
    creationPostContainer: [{ height: "566px" }, { minHeight: "771px" }],
    creationPostWrap: [{ height: "524px" }, { minHeight: "728px" }],
    postPollComponent: [{height: "369px"}, { minHeight: "610px" }],
    postPollComponentTextArea: [{ height: "349px" }, { minHeight: "70px" }],
  };
  useEffect(() => {
    if(isFile === 0){
      setIsFile(1);
    }else {
      setIsFile(0);
    }
  }, [file]);

  useEffect(() => {
    setIsFile(0);
  }, []);
 
  return (
    <div className="creation-post-component" >
      <div
        className="creation-post-container"
        style={select.creationPostContainer[isFile]}
      >
        <div
          className="creation-post-wrap"
          style={select.creationPostWrap[isFile]}
        >
          <div className="creation-text-wrap">
            <span>Create a post</span>
            <img src={Cross} alt="a cross" />
          </div>
          <PostPoll
            file={file}
            setFile={setFile}
            setIsFile={setIsFile}
            handleFileUpload={(e) => handleFileUpload(e)}
            handleImgCrossClick={(e) => handleImgCrossClick(e)}
            postPollComponent={select.postPollComponent[isFile]}
            postPollComponentTextArea={select.postPollComponentTextArea[isFile]}
          />
          <button>{/* replaced by button component*/}Next</button>
        </div>
      </div>
    </div>
  );
};

export default CreationPostPoll;
