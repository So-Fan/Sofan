import React, { useState } from "react";
import "./PollPost.css";
import HeadOfPost from "../PostsComponents/HeadOfPost/HeadOfPost";
import LikesCommentsCounter from "../PostsComponents/LikesCommentsCounter/LikesCommentsCounter";
import AddCommentInput from "../PostsComponents/AddCommentInput/AddCommentInput";

const PollPost = (choiceNumber) => {
  const [surveyResults, setSurveyResults] = useState([57, 98, 120, 302]);
  const [choiceName, setChoiceName] = useState(["Barrier", "Attanasio"]);
  const [isVoted, setIsVoted] = useState(false);

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

  const showSurveyResult = () => {
    setIsVoted(true);
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
                <div
                  className="pollstate-bar"
                  style={{ width: `${choiceNumber1}%` }}
                >
                  <div className="survey-percent">{choiceNumber1}%</div>
                  <div className="choice-name">{choiceName[1]}</div>
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
                  style={{ width: `${choiceNumber2}%` }}
                >
                  <div className="survey-percent">{choiceNumber2}%</div>
                  <div className="choice-name">{choiceName[1]}</div>
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
                  <div className="choice-name">{choiceName[0]}</div>
                </div>
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
                  style={{ width: `${choiceNumber4}%` }}
                >
                  <div className="survey-percent">{choiceNumber4}%</div>
                  <div className="choice-name">{choiceName[0]}</div>
                </div>
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
