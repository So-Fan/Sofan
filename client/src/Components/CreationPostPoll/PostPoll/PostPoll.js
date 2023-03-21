import React, { useRef, useState } from "react";
import "./PostPoll.css";
import Img from "../../../Assets/Image/img.svg";
import Form from "../../../Assets/Image/form.svg";
import ImgCross from "../../../Assets/Image/cross_background_white.svg";
import Poll from "../Poll/Poll";
const PostPoll = ({
  file,
  setFile,
  setIsFile,
  handleFileUpload,
  handleImgCrossClick,
  postPollComponent,
  postPollComponentTextArea,
  postPollPollTextArea,
  text,
  handleTextChange
}) => {
  const [addOption, setAddOption] = useState(0);
  const ref = useRef();
  const handleAddPictureClick = () => {
    if (addOption !== 2) {
      ref.current.click();
      setAddOption(1);
    }
  };
  const handleAddPollClick = () => {
    if (file === null) {
      setAddOption(2);
    }
  };

  return (
    <div style={postPollComponent} className="post-poll-component">
      <textarea
        style={
          addOption !== 2 ? postPollComponentTextArea : postPollPollTextArea
        }
        type="text"
        placeholder="Write your thoughts.."
        value={text}
        onChange={handleTextChange}
      />

      {addOption === 2 && <Poll setAddOption={setAddOption} />}

      {file != null && (
        <div className="post-poll-file-wrap">
          <img src={file} alt="your file" className="post-poll-file" />
          <img
            onClick={handleImgCrossClick}
            src={ImgCross}
            alt="black cross with white background"
            className="post-poll-file-cross"
          />
        </div>
      )}
      <div className="post-poll-add-container">
        <button
          onClick={handleAddPictureClick}
          style={addOption !== 2 ? {} : { opacity: "0.3" }}
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
        </button>
        <button
          onClick={handleAddPollClick}
          style={file === null ? {} : { opacity: "0.3" }}
          className="post-poll-add-poll-wrap"
        >
          <img src={Form} alt="form" />
          <span>Add a Poll</span>
        </button>
      </div>
    </div>
  );
};

export default PostPoll;
