import React, { useEffect, useState } from "react";
import "./PollPost.css";
import HeadOfPost from "../HeadOfPost/HeadOfPost";
import LikesCommentsCounter from "../LikesCommentsCounter/LikesCommentsCounter";
import AddCommentInput from "../AddCommentInput/AddCommentInput";
import checkMark from "../../../Assets/Image/checkmark.svg";
// import DropDownButtonMenu from "../DropDownButtonMenu/DropDownButtonMenu";
import DropDownMenu from "../DropDownMenu/DropDownMenu";
import ProgressBarPollPost from "./ProgressBarPollPost/ProgressBarPollPost";

const PollPost = (choiceNumber) => {
  const [isDropDownButtonClicked, setIsDropDownButtonClicked] = useState(false);
  function displayDropDown() {
    if (isDropDownButtonClicked) {
      return <DropDownMenu />;
    } else {
      return <></>;
    }
  }
  const [surveyResults, setSurveyResults] = useState([570, 98, 120, 302]);
  // Reçu de la BDD
  const choiceName = [
    "Barrier",
    "Attanasio",
    "John",
    "Arthur",
  ]
  const [isVoted, setIsVoted] = useState(false);
  const [choiceSelected, setChoiceSelected] = useState({
    choice1: false,
    choice2: false,
    choice3: false,
    choice4: false,
  });

  // This function calculate the percent of survey and return the result for 4
  const surveyCalc = (choiceNumber) => {
    const totalPropositions = surveyResults.length;
    const sum = surveyResults.reduce((acc, currentValue) => acc + currentValue);
    const percentages = surveyResults.map((value) => (value / sum) * 100);
    // console.log(percentages);
    const roundedPercentages = percentages.map((percentage) =>
      percentage.toFixed(1)
    );

    if (choiceNumber === 1) {
      return roundedPercentages[0];
    } else if (choiceNumber === 2) {
      return roundedPercentages[1];
    } else if (choiceNumber === 3) {
      return roundedPercentages[2];
    } else if (choiceNumber === 4) {
      return roundedPercentages[3];
    } else {
      return "ERROR";
    }
  };
  const choiceNumber1 = surveyCalc((choiceNumber = 1));
  const choiceNumber2 = surveyCalc((choiceNumber = 2));
  const choiceNumber3 = surveyCalc((choiceNumber = 3));
  const choiceNumber4 = surveyCalc((choiceNumber = 4));

  const choiceNumberArray = [
    choiceNumber1,
    choiceNumber2,
    choiceNumber3,
    choiceNumber4,
  ];

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
    } else if (choiceNameEl.innerText === choiceName[3]) {
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
      {displayDropDown()}
      <div className="headofpost-pollpost-container">
        <HeadOfPost
          isDropDownButtonClicked={isDropDownButtonClicked}
          setIsDropDownButtonClicked={setIsDropDownButtonClicked}
          dropDownMenuSize="dropdown-button-point-size-M"
          headOfPostSizeLeft="publication-head-left-container-size-pollpost"
          headOfPostSizeRight="publication-head-right-container-pollpost"
          publicationTypeHeadOfPostPollPost="publication-type-pollpost"
          athleteNamePollPost="athlete-name-publication-pollpost"
          agePublicationPollPost="age-publication-pollpost"
        />
      </div>
      <div className="description-pollpost">Qui est le gagnant ?</div>
      <div className="pollpost-wrap">

        <ProgressBarPollPost
          isVoted={isVoted}
          choiceNumberArray={choiceNumberArray[0]}
          choiceName={choiceName[0]}
          choiceSelected={choiceSelected.choice1}
          checkMark={checkMark}
          showSurveyResult={showSurveyResult}
        />
        <ProgressBarPollPost
          isVoted={isVoted}
          choiceNumberArray={choiceNumberArray[1]}
          choiceName={choiceName[1]}
          choiceSelected={choiceSelected.choice2}
          checkMark={checkMark}
          showSurveyResult={showSurveyResult}
        />
        <ProgressBarPollPost
          isVoted={isVoted}
          choiceNumberArray={choiceNumberArray[2]}
          choiceName={choiceName[2]}
          choiceSelected={choiceSelected.choice3}
          checkMark={checkMark}
          showSurveyResult={showSurveyResult}
        />
        <ProgressBarPollPost
          isVoted={isVoted}
          choiceNumberArray={choiceNumberArray[3]}
          choiceName={choiceName[3]}
          choiceSelected={choiceSelected.choice4}
          checkMark={checkMark}
          showSurveyResult={showSurveyResult}
        />

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
          <LikesCommentsCounter
            likesCommentsContainerPublicationPollPost="likes-comments-container-publication-pollpost"
            likeButtonSizePollPost="logo-likes-pollpost"
            likesCounterPublicationPollPost="likes-counter-publication-pollpost"
            commentsCounterPublicationPollPost="comments-counter-publication-pollpost"
            commentPublicationPollPost="comments-publication-pollpost"
            likeButtonContainerPollPost="like-button-container-pollpost"
            logoCommentsPublicationPollPost="logo-comments-publication-pollpost"
          />
        </div>
        <div className="likes-comments-container-pollpost">
          <div className="show-comments-button-publication-pollpost-container">
            <div className="show-comments-button-publication-pollpost">
              <a href="/">Show 10 comments</a>
            </div>
          </div>
        </div>
        <div className="add-comment-pollpost-container-pollpost">
          <AddCommentInput
            inputAddCommentContainer="input-comment-container-publication-pollpost"
            inputCommentElementsPollPost="input-comment-elements-pollpost"
            emojiCommentPublicationPollPost="emoji-comment-publication-pollpost"
            inputCommentPublicationPollPost="input-comment-publication-pollpost"
            publishButtonAddCommentPollPost="publish-comments-button-container-publication-pollpost"
          />
        </div>
      </div>
      {/* </div> */}
    </section>
  );
};
export default PollPost;
