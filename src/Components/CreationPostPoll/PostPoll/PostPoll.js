import React, { useEffect, useRef, useState } from "react";
import "./PostPoll.css";
import Img from "../../../Assets/image/img.svg";
import Form from "../../../Assets/image/form.svg";
import ImgCross from "../../../Assets/image/cross_background_white.svg";
import Poll from "../Poll/Poll";
const PostPoll = ({
  file,
  setFile,
  setIsFile,
  handleFileUpload,
  handleImgCrossClick,
  postPollComponent,
  postPollComponentTextArea,
}) => {
  const ref = useRef();
  const handleAddPictureClick = () => {
    ref.current.click();
  };

  return (
    <div style={postPollComponent} className="post-poll-component">
      <Poll />
      {/* <textarea
        style={postPollComponentTextArea}
        type="text"
        placeholder="Write your thoughts.."
      />
      {file != null && (
        <div className="post-poll-file-wrap">
          <img src={file} alt="your file" className="post-poll-file" />
          <img onClick={handleImgCrossClick} src={ImgCross} alt="black cross with white background" className="post-poll-file-cross" />
        </div>
      )} */}
      <div className="post-poll-add-container">
        <div
          onClick={handleAddPictureClick}
          className="post-poll-add-picture-wrap"
        >
          <img src={Img} alt="paint" />
          <span>Add a picture</span>
          <input
            ref={ref}
            onChange={handleFileUpload}
            type="file"
            accept="image/*"
          />
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
