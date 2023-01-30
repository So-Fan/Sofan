import React, { useState } from "react";
import "./PollPost.css";
import HeadOfPost from "../HeadOfPost/HeadOfPost";
import LikesCommentsCounter from "../LikesCommentsCounter/LikesCommentsCounter";
import AddCommentInput from "../AddCommentInput/AddCommentInput";
import checkMark from "../../../Assets/Image/checkmark.svg";

const PollPost = (choiceNumber) => {
  const [surveyResults, setSurveyResults] = useState([57, 98, 120, 302]);
  // Reçu de la BDD
  const [choiceName, setChoiceName] = useState([
    "Barrier",
    "Attanasio",
    "John",
    "Arthur",
  ]);
  const [isVoted, setIsVoted] = useState(false);
  const [choiceSelected, setChoiceSelected] = useState({
    choice1: false,
    choice2: false,
    choice3: false,
    choice4: false,
  });
  console.log(choiceSelected.choice2);
  // This function calculate the percent of survey and return the result for 4
  const surveyCalc = (choiceNumber) => {
    const totalPropositions = surveyResults.length;
    const sum = surveyResults.reduce((acc, currentValue) => acc + currentValue);
    const percentages = surveyResults.map((value) => (value / sum) * 100);
    // console.log(percentages);
    const roundedPercentages = percentages.map((percentage) =>
      percentage.toFixed(1)
    );

    if (choiceNumber == 1) {
      return roundedPercentages[0];
    } else if (choiceNumber == 2) {
      return roundedPercentages[1];
    } else if (choiceNumber == 3) {
      return roundedPercentages[2];
    } else if (choiceNumber == 4) {
      return roundedPercentages[3];
    } else {
      return "ERROR";
    }
  };
  const choiceNumber1 = surveyCalc((choiceNumber = 1));
  const choiceNumber2 = surveyCalc((choiceNumber = 2));
  const choiceNumber3 = surveyCalc((choiceNumber = 3));
  const choiceNumber4 = surveyCalc((choiceNumber = 4));

  const showSurveyResult = (e) => {
    setIsVoted(true);
    const choiceNameEl = e.target.querySelector(".choice-name");
    console.log(choiceNameEl.innerText);
    if (choiceNameEl.innerText === choiceName[0]) {
      setChoiceSelected({
        choice1: true,
        choice2: false,
        choice3: false,
        choice4: false,
      });
    } else if (choiceNameEl.innerText === choiceName[1]) {
      setChoiceSelected({
        choice1: false,
        choice2: true,
        choice3: false,
        choice4: false,
      });
    } else if (choiceNameEl.innerText === choiceName[2]) {
      setChoiceSelected({
        choice1: false,
        choice2: false,
        choice3: true,
        choice4: false,
      });
    } else if (choiceNameEl.innerText === choiceName[3]){
      setChoiceSelected({
        choice1: false,
        choice2: false,
        choice3: false,
        choice4: true,
      });
    }
  };
  return (
    <section className="pollpost-container">
      {/* <div className="pollpost-wrap"> */}
      <div className="headofpost-pollpost-container">
        <HeadOfPost dropDownMenuSize="dropdown-button-point-size-M" />
      </div>
      <div className="description-pollpost">Qui est le gagnant ?</div>
      <div className="pollpost-wrap">
        <div className="progressbar-poll-subwrap">
          <div className="progressbar-poll">
            {isVoted ? (
              <>
                {/* <div className="resizing-element-bar"> */}
                  <div
                    className="pollstate-bar"
                    style={{ width: `${choiceNumber1}%` }}
                  >
                    <div className="choice-name">
                      {choiceName[0]}

                      {choiceSelected.choice1 && (
                        <>
                          <img
                            className="checkmark-logo"
                            src={checkMark}
                            alt=""
                          />
                        </>
                      )}
                    </div>
                    <div className="survey-percent">{choiceNumber1}%</div>
                  </div>
                {/* </div> */}
              </>
            ) : (
              <>
                <button onClick={showSurveyResult}>
                  <div className="pollstate-bar" style={{ width: "0%" }}>
                    <div className="survey-percent"></div>
                    <div className="choice-name">{choiceName[0]}</div>
                  </div>
                </button>
              </>
            )}
          </div>
        </div>
        <div className="progressbar-poll-subwrap">
          <div className="progressbar-poll">
            {isVoted ? (
              <>
                <div
                  className="pollstate-bar"
                  style={{ width: `${choiceNumber2}%` }}
                >
                  <div className="survey-percent">{choiceNumber2}%</div>
                  <div className="choice-name">
                    {choiceName[1]}

                    {choiceSelected.choice2 && (
                      <>
                        <img
                          className="checkmark-logo"
                          src={checkMark}
                          alt=""
                        />
                      </>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <>
                <button onClick={showSurveyResult}>
                  <div className="pollstate-bar" style={{ width: "0%" }}>
                    <div className="survey-percent"></div>
                    <div className="choice-name">{choiceName[1]}</div>
                  </div>
                </button>
              </>
            )}
          </div>
        </div>

        <div className="progressbar-poll-subwrap">
          <div className="progressbar-poll">
            {isVoted ? (
              <>
                <div
                  className="pollstate-bar"
                  style={{ width: `${choiceNumber3}%` }}
                >
                  <div className="survey-percent">{choiceNumber3}%</div>
                  <div className="choice-name">
                    {choiceName[2]}
                    {choiceSelected.choice3 && (
                      <>
                        <img
                          className="checkmark-logo"
                          src={checkMark}
                          alt=""
                        />
                      </>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <>
                <button onClick={showSurveyResult}>
                  <div className="pollstate-bar" style={{ width: "0%" }}>
                    <div className="survey-percent"></div>
                    <div className="choice-name">{choiceName[2]}</div>
                  </div>
                </button>
              </>
            )}
          </div>
        </div>

        <div className="progressbar-poll-subwrap">
          <div className="progressbar-poll">
            {isVoted ? (
              <>
                <div
                  className="pollstate-bar"
                  style={{ width: `${choiceNumber4}%` }}
                >
                  <div className="survey-percent">{choiceNumber4}%</div>
                  <div className="choice-name">
                    {choiceName[3]}
                    {choiceSelected.choice4 && (
                      <>
                        <img
                          className="checkmark-logo"
                          src={checkMark}
                          alt=""
                        />
                      </>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <>
                <button onClick={showSurveyResult}>
                  <div className="pollstate-bar" style={{ width: "0%" }}>
                    <div className="survey-percent"></div>
                    <div className="choice-name">{choiceName[3]}</div>
                  </div>
                </button>
              </>
            )}
          </div>
        </div>

        <div className="ageofpost-poll-container">
          <div className="ageofpost-poll-wrap">
            <div className="ageofpost-and-timeleft-poll">
              <div>2456 votes</div>
              <div>-</div>
              <div>1 day</div>
            </div>
          </div>
        </div>
        <div className="line-separation-pollpost-container">
          <div className="line-separation-pollpost"></div>
        </div>
        <div className="likes-comments-counter-pollpost-container">
          <LikesCommentsCounter />
        </div>
        <div className="likes-comments-container-pollpost">
          <div className="show-comments-button-publication-pollpost-container">
            <div className="show-comments-button-publication-pollpost">
              <a href="">Show 10 comments</a>
            </div>
          </div>
        </div>
        <div className="add-comment-pollpost-container-pollpost">
          <AddCommentInput />
        </div>
      </div>
      {/* </div> */}
    </section>
  );
};
export default PollPost;
