import React, { useState } from "react";
import "./Poll.css";
import ArrowBottom from "../../../Assets/Image/arrow_bottom.svg";
import YellowCross from "../../../Assets/Image/cross_add_yellow.svg";
const Poll = ({ setAddOption }) => {
  const [day, setDay] = useState(0);
  const [displayDay, setDisplayDay] = useState(false);
  const [hour, setHour] = useState(0);
  const [displayHour, setDisplayHour] = useState(false);
  const [min, setMin] = useState(0);
  const [displayMin, setDisplayMin] = useState(false);
  // const [choiceCounter, setChoiceCounter] = useState(2)
  const [inputs, setInputs] = useState([
    { id: 1, placeholder: "Choix 1" },
    { id: 2, placeholder: "Choix 2" },
  ]);
  const handleDayClick = () => {
    setDisplayDay(!displayDay);
    setDisplayHour(false);
    setDisplayMin(false);
  };
  const handleHourClick = () => {
    setDisplayHour(!displayHour);
    setDisplayDay(false);
    setDisplayMin(false);
  };
  const handleMinClick = () => {
    setDisplayMin(!displayMin);
    setDisplayDay(false);
    setDisplayHour(false);
  };

  const handleMinNumberClick = (e) => {
    console.log(e.target.value);
    setMin(e.target.value);
  };
  const handleHourNumberClick = (e) => {
    setHour(e.target.value);
  };
  const handleDayNumberClick = (e) => {
    setDay(e.target.value);
  };

  const handleRemoveClick = () => {
    setAddOption(0);
  };
  // const handleAddChoiceClick = e => {

  // }
  const handleAddInput = () => {
    if (inputs.length < 4) {
      setInputs([
        ...inputs,
        { id: inputs.length + 1, placeholder: `Choix ${inputs.length + 1}` },
      ]);
    }
  };

  const dayArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  const hourArray = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23,
  ];
  const minArray = [];

  for (let i = 0; i < 60; i++) {
    minArray.push(i);
  }
  return (
    <div className="poll-component">
      <div className="poll-container">
        <div className="poll-choice-container">
          <div className="poll-choice-wrap">
            <div>
              {/* faire un mapping */}
              {inputs.map((input) => (
                <input
                  key={input.id}
                  type="text"
                  placeholder={input.placeholder}
                />
              ))}
            </div>
            <button onClick={handleAddInput}>
              <img src={YellowCross} alt="yellow cross" />
            </button>
          </div>
          <div className="poll-duration-container">
            <span>Poll Length</span>
            <div className="poll-duration-choice-container">
              <div
                onClick={handleDayClick}
                className={
                  displayDay
                    ? "poll-duration-choice-wrap poll-duration-choice-wrap-open"
                    : "poll-duration-choice-wrap"
                }
              >
                <div className="poll-duration-choice-subwrap">
                  <div>
                    <span className="poll-duration-text">Days</span>
                    <span className="poll-duration-number">{day}</span>
                  </div>
                  <img src={ArrowBottom} alt="arrow bottom" />
                </div>
                {displayDay && (
                  <div className="poll-duration-day-content">
                    <ol>
                      {dayArray.map((number) => (
                        <li onClick={handleDayNumberClick} value={number}>
                          {number}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
              <div
                onClick={handleHourClick}
                className={
                  displayHour
                    ? "poll-duration-choice-wrap poll-duration-choice-wrap-open"
                    : "poll-duration-choice-wrap"
                }
              >
                <div className="poll-duration-choice-subwrap">
                  <div>
                    <span className="poll-duration-text">Hours</span>
                    <span className="poll-duration-number">{hour}</span>
                  </div>
                  <img src={ArrowBottom} alt="arrow bottom" />
                </div>
                {displayHour && (
                  <div className="poll-duration-day-content">
                    <ol>
                      {hourArray.map((number) => (
                        <li onClick={handleHourNumberClick} value={number}>
                          {number}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
              <div
                onClick={handleMinClick}
                className={
                  displayMin
                    ? "poll-duration-choice-wrap poll-duration-choice-wrap-open"
                    : "poll-duration-choice-wrap"
                }
              >
                <div className="poll-duration-choice-subwrap">
                  <div>
                    <span className="poll-duration-text">Minutes</span>
                    <span className="poll-duration-number">{min}</span>
                  </div>
                  <img src={ArrowBottom} alt="arrow bottom" />
                </div>
                {displayMin && (
                  <div className="poll-duration-day-content">
                    <ol>
                      {minArray.map((number) => (
                        <li onClick={handleMinNumberClick} value={number}>
                          {number}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <button onClick={handleRemoveClick}>
          <span>Remove the poll</span>
        </button>
      </div>
    </div>
  );
};

export default Poll;
