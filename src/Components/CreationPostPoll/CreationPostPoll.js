import React, {useState} from "react";
import "./CreationPostPoll.css";
import Cross from "../../Assets/image/cross.svg";
import PostPoll from "./PostPoll/PostPoll";

const CreationPostPoll = () => {

    const [file, setFile] = useState(null);

    const handleFileUpload = e => {
        console.log(e);
        setFile(URL.createObjectURL(e.target.files[0]))
    }

    const select = {
        creationPostContainer: [
            {height: "566px"}
        ],
        creationPostWrap: [
            {height: "524px"}
        ],
        postPollComponentTextArea: [
            {height: "349px"}
        ]
    }
  return (
    <div className="creation-post-component">
      <div className="creation-post-container" style={select.creationPostContainer[0]}>
        <div className="creation-post-wrap" style={select.creationPostWrap[0]}>
          <div className="creation-text-wrap">
            <span>Create a post</span>
            <img src={Cross} alt="a cross" />
          </div>
          <PostPoll file={file} setFile={setFile} handleFileUpload={e => handleFileUpload(e)} postPollComponentTextArea={select.postPollComponentTextArea[0]} />
          <button>{/* replaced by button component*/} Next</button>
        </div>
      </div>
    </div>
  );
};

export default CreationPostPoll;
