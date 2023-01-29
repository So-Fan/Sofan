import React, { useRef, useState } from "react";
import "./PostPoll.css";
import Img from "../../../Assets/image/img.svg"
import Form from "../../../Assets/image/form.svg"
const PostPoll = ({file, setFile, handleFileUpload, postPollComponentTextArea}) => {
    
    const ref = useRef();
    const handleAddPictureClick = () => {
        console.log(ref);
        ref.current.click();
    }
    
  return (
    <div className="post-poll-component">
      <textarea style={postPollComponentTextArea} type="text" placeholder="Write your thoughts.." />
      {file !=null && <img src={file} alt="your file" className="post-poll-file" />}
      <div className="post-poll-add-container">
        <div onClick={handleAddPictureClick} className="post-poll-add-picture-wrap">
          <img src={Img} alt="paint" />
          <span>Add a picture</span>
          <input ref={ref} onChange={handleFileUpload} type="file" accept="image/*" />
        </div>
        <div className="post-poll-add-poll-wrap">
          <img src={Form} alt="form" />
          <span>Add a Poll</span>
        </div>
      </div>
    </div>
  );
};

export default PostPoll;
