import React from "react";
import "./Poll.css";
import ArrowBottom from "../../../Assets/Image/arrow_bottom.svg";
import YellowCross from "../../../Assets/Image/cross_add_yellow.svg";
const Poll = () => {
  return (
    <div className="poll-component">
      <span>Quel est le gagnant de la course selon vous ?</span>
      <div className="poll-container">
        <div className="poll-choice-container">
          <div className="poll-choice-wrap">
            <div>
              {/* faire un mapping */}
              <input type="text" placeholder="Choix 1" />
              <input type="text" placeholder="Choix 2" />
            </div>
            <button>
              <img src={YellowCross} alt="yellow cross" />
            </button>
          </div>
          <div className="poll-duration-container">
            <span>Poll Length</span>
            <div className="poll-duration-choice-container">
              <div className="poll-duration-choice-wrap">
                <div className="poll-duration-choice-subwrap">
                  <div>
                    <span className="poll-duration-text">Days</span>
                    <span className="poll-duration-number">1</span>
                  </div>
                  <img src={ArrowBottom} alt="arrow bottom" />
                </div>
              </div>
              <div className="poll-duration-choice-wrap">
                <div className="poll-duration-choice-subwrap">
                  <div>
                    <span className="poll-duration-text">Hours</span>
                    <span className="poll-duration-number">1</span>
                  </div>
                  <img src={ArrowBottom} alt="arrow bottom" />
                </div>
              </div>
              <div className="poll-duration-choice-wrap">
                <div className="poll-duration-choice-subwrap">
                  <div>
                    <span className="poll-duration-text">Minutes</span>
                    <span className="poll-duration-number">1</span>
                  </div>
                  <img src={ArrowBottom} alt="arrow bottom" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <button>
          <span>Remove the poll</span>
        </button>
      </div>
    </div>
  );
};

export default Poll;
