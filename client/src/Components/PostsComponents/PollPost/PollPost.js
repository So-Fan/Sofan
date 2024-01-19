import React, { useEffect, useState } from "react";
import "./PollPost.css";
import HeadOfPost from "../HeadOfPost/HeadOfPost";
import LikesCommentsCounter from "../LikesCommentsCounter/LikesCommentsCounter";
import AddCommentInput from "../AddCommentInput/AddCommentInput";
import checkMark from "../../../Assets/Image/checkmark.svg";
import DropDownMenu from "../DropDownMenu/DropDownMenu";
import ProgressBarPollPost from "./ProgressBarPollPost/ProgressBarPollPost";
import { db } from "../../../Configs/firebase";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

function PollPost({
  choiceNumber,
  pollFirstChoice,
  pollSecondChoice,
  pollThirdChoice,
  pollFourthChoice,
  // pollDate,
  // pollDateType,
  //
  // pollTotalVote,
  pollFirstChoiceNumber,
  pollSecondChoiceNumber,
  pollThirdChoiceNumber,
  pollFourthChoiceNumber,
  loggedInUser,
  postId,
  polldata,
}) {
  const [surveyResults, setSurveyResults] = useState([
    pollFirstChoiceNumber,
    pollSecondChoiceNumber,
    pollThirdChoiceNumber,
    pollFourthChoiceNumber,
  ]);
  // Reçu de la BDD
  const choiceName = [
    pollFirstChoice,
    pollSecondChoice,
    pollThirdChoice,
    pollFourthChoice,
  ];
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

  const showSurveyResult = async (e) => {
    setIsVoted(true);
    const choiceNameEl = e.target.querySelector(".choice-name");
    let choiceIndex;
    if (choiceNameEl.innerText === choiceName[0]) {
      setChoiceSelected({
        choice1: true,
        choice2: false,
        choice3: false,
        choice4: false,
      });
      choiceIndex = 0;
    } else if (choiceNameEl.innerText === choiceName[1]) {
      setChoiceSelected({
        choice1: false,
        choice2: true,
        choice3: false,
        choice4: false,
      });
      choiceIndex = 1;
    } else if (choiceNameEl.innerText === choiceName[2]) {
      setChoiceSelected({
        choice1: false,
        choice2: false,
        choice3: true,
        choice4: false,
      });
      choiceIndex = 2;
    } else if (choiceNameEl.innerText === choiceName[3]) {
      setChoiceSelected({
        choice1: false,
        choice2: false,
        choice3: false,
        choice4: true,
      });
      choiceIndex = 3;
    }

    // Firestore update
    if (choiceIndex !== undefined) {
      const feedPostRef = doc(db, "feed_post", postId);
      try {
        const docSnap = await getDoc(feedPostRef);

        if (docSnap.exists()) {
          let pollChoices = docSnap.data().pollData.choices;

          // Initialize userIds array if it doesn't exist
          if (!pollChoices[choiceIndex].userIds) {
            pollChoices[choiceIndex].userIds = [];
          }

          // Add the loggedInUser's UID if not already included
          if (!pollChoices[choiceIndex].userIds.includes(loggedInUser.id)) {
            pollChoices[choiceIndex].userIds.push(loggedInUser.id);
          }

          await updateDoc(feedPostRef, {
            "pollData.choices": pollChoices,
          });

          console.log("Poll data updated successfully!");
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error updating poll data: ", error);
      }
    }
  };

  const totalVotes = polldata?.choices.reduce((total, choice) => {
    return total + (choice.userIds ? choice.userIds.length : 0);
  }, 0);

  return (
    <section className="pollpost-container">
      <div className="pollpost-wrap">
        {pollFirstChoice === "" ? (
          <></>
        ) : (
          <>
            <ProgressBarPollPost
              isVoted={isVoted}
              choiceNumberArray={choiceNumberArray[0]}
              choiceName={choiceName[0]}
              choiceSelected={choiceSelected.choice1}
              checkMark={checkMark}
              showSurveyResult={showSurveyResult}
            />
          </>
        )}
        {pollSecondChoice === "" ? (
          <></>
        ) : (
          <>
            <ProgressBarPollPost
              isVoted={isVoted}
              choiceNumberArray={choiceNumberArray[1]}
              choiceName={choiceName[1]}
              choiceSelected={choiceSelected.choice2}
              checkMark={checkMark}
              showSurveyResult={showSurveyResult}
            />
          </>
        )}
        {pollThirdChoice === "" ? (
          <></>
        ) : (
          <>
            <ProgressBarPollPost
              isVoted={isVoted}
              choiceNumberArray={choiceNumberArray[2]}
              choiceName={choiceName[2]}
              choiceSelected={choiceSelected.choice3}
              checkMark={checkMark}
              showSurveyResult={showSurveyResult}
            />
          </>
        )}
        {pollFourthChoice === "" ? (
          <></>
        ) : (
          <>
            <ProgressBarPollPost
              isVoted={isVoted}
              choiceNumberArray={choiceNumberArray[3]}
              choiceName={choiceName[3]}
              choiceSelected={choiceSelected.choice4}
              checkMark={checkMark}
              showSurveyResult={showSurveyResult}
            />
          </>
        )}

        <div className="ageofpost-poll-container">
          <div className="ageofpost-poll-wrap">
            <div className="ageofpost-and-timeleft-poll">
              <div>
                votes: {totalVotes}
              </div>
              <div>
                {/* {pollDate}  */}
                {/* {pollDateType} */}
              </div>
            </div>
          </div>
        </div>
        <div className="line-separation-pollpost-container"></div>
      </div>
    </section>
  );
}
export default PollPost;
