import React, { useRef, useState } from "react";
import "./PostPoll.css";
import Img from "../../../Assets/Image/img.svg";
import Form from "../../../Assets/Image/form.svg";
import ImgCross from "../../../Assets/Image/cross_background_white.svg";
import Poll from "../Poll/Poll";
import clock from "../../../Assets/Image/clock.svg";
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
  handleTextChange,
  pollData,
  setPollData,
  setDateTimeValue,
}) => {
  const [addOption, setAddOption] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isProgrammedPostClicked, setIsProgrammedPostClicked] = useState();
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
  function handleChangeDateTime(e) {
    const valueDateTime = e.target.value;
    const dateObj = new Date(valueDateTime);
    const unixTimestamp = Math.floor(dateObj.getTime() / 1000); // Convertir en secondes
    console.log(`Timestamp Unix: ${unixTimestamp}`);
    setDateTimeValue(unixTimestamp);
  }
  function handleClickProgramPost() {
    setIsProgrammedPostClicked(!isProgrammedPostClicked);
  }
  return (
    <div style={postPollComponent} className="post-poll-component">
      <textarea
        style={
          addOption !== 2 ? postPollComponentTextArea : postPollPollTextArea
        }
        type="text"
        placeholder="Rédigez votre publication..."
        value={text}
        onChange={handleTextChange}
      />
      {addOption === 2 && (
        <Poll
          setAddOption={setAddOption}
          setPollData={setPollData}
          pollData={pollData}
        />
      )}

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
      <div className="post-poll-programmed-post-container">
        <div
          onClick={handleClickProgramPost}
          style={
            isProgrammedPostClicked ? { backgroundColor: "#00000015" } : {}
          }
          className="post-poll-programmed-post-wrap"
        >
          <img src={clock} alt="" />
          <div className="post-poll-programmed-post-title">
            Programmer le post
          </div>
        </div>
        {isProgrammedPostClicked && (
          <div className="post-poll-programmed-post-date-time-picker-container">
            <>
              <input
                onChange={handleChangeDateTime}
                type="datetime-local"
                name=""
                id=""
              />
            </>
          </div>
        )}
      </div>
      <div className="post-poll-add-container">
        <button
          onClick={handleAddPictureClick}
          style={addOption !== 2 ? {} : { opacity: "0.3" }}
          className="post-poll-add-picture-wrap"
        >
          <img src={Img} alt="paint" />
          <span>Ajouter image</span>
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
          <span>Ajouter sondage</span>
        </button>
      </div>
    </div>
  );
};

export default PostPoll;
